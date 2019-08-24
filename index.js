const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const { pascalCase, paramCase } = require('change-case')
const copy = require('recursive-copy')
const through = require('through2')
const Confirm = require('prompt-confirm')

const sections = [
  {
    header: 'Usage',
    content: '$ make-react-native-package <{bold --projectName} {underline name}> ' +
      '<{bold --githubUsername} {underline user}> ...'
  },
  {
    header: 'Required options',
    optionList: [
      {
        name: 'projectName',
        alias: 'p',
        description: 'The name of project folder, github repo and npm package.'
      },
      {
        name: 'githubUsername',
        alias: 'g',
        description: 'Your github username.'
      }
    ]
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'exampleName',
        alias: 'e',
        description: 'Example app name.'
      },
      {
        name: 'objcPrefix',
        alias: 'o',
        description: 'ObjC file prefix.'
      },
      {
        name: 'componentName',
        alias: 'c',
        description: 'Exported component name.'
      },
      {
        name: 'description',
        alias: 'd',
        description: 'Package description.'
      },
      {
        name: 'npmUsername',
        alias: 'n',
        description: 'Your npm username.'
      },
      {
        name: 'email',
        alias: 'm',
        description: 'Your npm email.'
      },
      {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Print this usage guide.'
      }
    ]
  },
  {
    header: 'Example',
    content: [
      '$ make-react-native-package ' +
      '{bold --projectName} {underline react-native-cool-component}',
      '{hidden   }{bold --githubUsername} {underline octocat} ' +
      '{bold --exampleName} {underline CoolExample} ' +
      '{bold --objcPrefix} {underline RNCC}',
      '{hidden   }{bold --description} {underline "Cool description"} ' +
      '{bold --npmUsername} {underline wombat} ' +
      '{bold --email} {underline me@mail.org}'
    ]
  }
]

const usage = commandLineUsage(sections)

const optionDefinitions = [
  { name: 'projectName', alias: 'p', type: String },
  { name: 'githubUsername', alias: 'g', type: String },
  { name: 'exampleName', alias: 'e', type: String },
  { name: 'objcPrefix', alias: 'o', type: String },
  { name: 'componentName', alias: 'c', type: String },
  { name: 'description', alias: 'd', type: String },
  { name: 'npmUsername', alias: 'n', type: String },
  { name: 'email', alias: 'm', type: String },
  { name: 'help', alias: 'h', type: Boolean }
]

const {
  projectName,
  githubUsername,
  exampleName,
  objcPrefix,
  componentName,
  description,
  npmUsername,
  email,
  help
} = commandLineArgs(optionDefinitions)

if (help) {
  console.log(usage)
  process.exit()
}

if (projectName === undefined) {
  console.log('\nERROR: Skipped required `projectName` option!\n', usage)
  process.exit(1)
}

if (githubUsername === undefined) {
  console.log('\nERROR: Skipped required `githubUsername` option!\n', usage)
  process.exit(1)
}

const component = pascalCase(componentName || projectName).replace('ReactNative', '')

const map = {
  PROJECT_NAME: projectName,
  GITHUB_USERNAME: githubUsername,
  EXAMPLE_NAME: pascalCase(exampleName || `${projectName}Example`),
  OBJC_PREFIX: objcPrefix
    ? objcPrefix.toUpperCase()
    : pascalCase(projectName).replace(/[^A-Z]/g, ''),
  COMPONENT_NAME_PASCAL_CASE: component,
  COMPONENT_NAME_KEBAB_CASE: paramCase(component),
  CURRENT_YEAR: `${new Date().getFullYear()}`,
  DESCRIPTION: description || '???',
  EMAIL: email ? `<${email}>` : '',
  NPM_USERNAME: npmUsername || githubUsername
}

const transform = (data) => (
  Object.keys(map).reduce(
    (path, key) => path.replace(new RegExp(`#~${key}~#`, 'g'), map[key]),
    data
  )
)

const copyOptions = {
  overwrite: true,
  dot: true,
  rename: transform,
  transform: function () {
		return through(function (chunk, enc, done)  {
			done(null, transform(chunk.toString()))
		});
	}
}

console.log('\nPackage generator configuration:\n')
console.log(map)
console.log()
const prompt = new Confirm('Is it OK?')
prompt.ask((answer) => {
  if (answer) {
    copy(`${__dirname}/template`, `${process.cwd()}/${projectName}`, copyOptions)
  }
})
