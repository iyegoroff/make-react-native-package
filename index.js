const path = require('path')
const { promisify } = require('util')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const { pascalCase, paramCase, camelCase, lowerCase } = require('change-case')
const copy = require('recursive-copy')
const through = require('through2')
const Confirm = require('prompt-confirm')
const Handlebars = require('handlebars')
const rimraf = require('rimraf')

const del = promisify(rimraf)

const packageCase = (input) => lowerCase(camelCase(input))

Handlebars.registerHelper({ pascalCase, paramCase, camelCase, packageCase })

const sections = [
  {
    header: 'Usage',
    content: '$ make-react-native-package <{bold --packageName} {underline name}> ' +
      '<{bold --githubUsername} {underline user}> ...'
  },
  {
    header: 'Required options',
    optionList: [
      {
        name: 'packageName',
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
        name: 'appName',
        alias: 'a',
        description: 'Example app name.'
      },
      {
        name: 'objcPrefix',
        alias: 'o',
        description: 'ObjC file prefix.'
      },
      {
        name: 'components',
        alias: 'c',
        multiple: true,
        description: 'List of space-separated native component names.'
      },
      {
        name: 'modules',
        alias: 'm',
        multiple: true,
        description: 'List of space-separated native module names.'
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
        alias: 'e',
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
      '{bold --packageName} {underline react-native-cool-component}',
      '{hidden   }{bold --githubUsername} {underline octocat} ' +
      '{bold --appName} {underline CoolExample} ' +
      '{bold --objcPrefix} {underline RNCC}',
      '{hidden   }{bold --description} {underline "Cool description"} ' +
      '{bold --npmUsername} {underline wombat} ' +
      '{bold --email} {underline me@mail.org}'
    ]
  }
]

const usage = commandLineUsage(sections)

const optionDefinitions = [
  { name: 'packageName', alias: 'p', type: String },
  { name: 'githubUsername', alias: 'g', type: String },
  { name: 'appName', alias: 'a', type: String },
  { name: 'objcPrefix', alias: 'o', type: String },
  { name: 'components', alias: 'c', type: String, multiple: true },
  { name: 'modules', alias: 'm', type: String, multiple: true },
  { name: 'description', alias: 'd', type: String },
  { name: 'npmUsername', alias: 'n', type: String },
  { name: 'email', alias: 'e', type: String },
  { name: 'help', alias: 'h', type: Boolean }
]

const {
  packageName,
  githubUsername,
  appName,
  objcPrefix,
  components,
  modules,
  description,
  npmUsername,
  email,
  help
} = commandLineArgs(optionDefinitions)

if (help) {
  console.log(usage)
  process.exit()
}

if (packageName === undefined) {
  console.log('\nERROR: Skipped required `packageName` option!\n', usage)
  process.exit(1)
}

if (githubUsername === undefined) {
  console.log('\nERROR: Skipped required `githubUsername` option!\n', usage)
  process.exit(1)
}

const packageMap = {
  packageName,
  githubUsername,
  appName: pascalCase(appName || `${packageName}Example`),
  objcPrefix: objcPrefix
    ? objcPrefix.toUpperCase()
    : pascalCase(packageName).replace(/[^A-Z]/g, ''),
  description: description || '???',
  email: email ? `<${email}>` : '',
  npmUsername: npmUsername || githubUsername,
  components: components || (modules ? [] : [pascalCase(packageName).replace('ReactNative', '')]),
  modules: modules || []
}

const componentMaps = packageMap.components.map((componentName) => ({ componentName }))
const moduleMaps = packageMap.modules.map((moduleName) => ({ moduleName }))
const miscMap = {
  currentYear: `${new Date().getFullYear()}`,
  lazyPascalCaseComponentName: '{{pascalCase componentName}}',
  lazyParamCaseComponentName: '{{paramCase componentName}}',
  lazyPackageCaseComponentName: '{{packageCase componentName}}',
  lazyPascalCaseModuleName: '{{pascalCase moduleName}}',
  lazyParamCaseModuleName: '{{paramCase moduleName}}',
  lazyPackageCaseModuleName: '{{packageCase moduleName}}'
}

const transform = (map) => (data) => (
  Handlebars.compile(data)(map)
)

const copyOptions = (map) => ({
  overwrite: true,
  dot: true,
  rename: transform(map),

  transform: function (src) {
    const skipTransform = ['.png', '.jar', '.keystore'].includes(path.extname(src))

    return !skipTransform && through(function (chunk, enc, done)  {
      try {
        done(null, transform(map)(chunk.toString()))
      } catch (e) {
        console.log(e, src)
      }
		})
	}
})

const packagePath = `${process.cwd()}/${packageMap.packageName}`
const androidSourcesPath = `${packagePath}/android/src/main/kotlin/` +
  `${packageCase(packageMap.githubUsername)}/${packageCase(packageMap.packageName)}`
const androidComponentTemplatePath = `${androidSourcesPath}/${miscMap.lazyPackageCaseComponentName}`
const typescriptSourcesPath = `${packagePath}/src`
const typescriptComponentTemplatePath =
  `${typescriptSourcesPath}/${miscMap.lazyPascalCaseComponentName}`

console.log('\nPackage generator configuration:\n')
console.log(packageMap)
console.log()

const prompt = new Confirm('Is it OK?')
prompt.ask(async (answer) => {
  if (answer) {
    await copy(`${__dirname}/template`, packagePath, copyOptions({ ...packageMap, ...miscMap }))

    await Promise.all(componentMaps.map(async (map) => {
      const options = copyOptions(map)

      await copy(
        androidComponentTemplatePath,
        `${androidSourcesPath}/${packageCase(map.componentName)}`,
        options
      )

      await copy(
        typescriptComponentTemplatePath,
        `${typescriptSourcesPath}/${pascalCase(map.componentName)}`,
        options
      )
    }))

    await del(androidComponentTemplatePath)
    await del(typescriptComponentTemplatePath)
  }
})
