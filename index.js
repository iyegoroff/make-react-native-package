#!/usr/bin/env node

const path = require('path')
const { spawn } = require('child_process')
const { promisify } = require('util')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const { pascalCase, paramCase, camelCase } = require('change-case')
const { lowerCase } = require('lower-case')
const copy = require('recursive-copy')
const through = require('through2')
const Confirm = require('prompt-confirm')
const Handlebars = require('handlebars')
const rimraf = require('rimraf')
const chalk = require('chalk')
const randomColor = require('randomcolor')

const { version: mrnpVersion } = require('./package.json')
const { dependencies } = require('./template/example/{{package}}.json')
const rnVersion = dependencies['react-native']
const kotlinVersion = '1.3.72'

const del = promisify(rimraf)

const packageCase = (input) => lowerCase(camelCase(input))

Handlebars.registerHelper({
  pascalCase,
  paramCase,
  camelCase,
  packageCase,
  randomColor,
})

const sections = [
  {
    header: 'Usage',
    content:
      '$ make-react-native-package <{bold --packageName} {underline name}> ' +
      '<{bold --githubUsername} {underline user}> ...',
  },
  {
    header: 'Required options',
    optionList: [
      {
        name: 'packageName',
        alias: 'p',
        description: 'The name of project folder, github repo and npm package.',
      },
      {
        name: 'githubUsername',
        alias: 'g',
        description: 'Your github username.',
      },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'appName',
        alias: 'a',
        description: 'Example app name.',
      },
      {
        name: 'objcPrefix',
        alias: 'o',
        description: 'Objective-C file prefix.',
      },
      {
        name: 'components',
        alias: 'c',
        multiple: true,
        description: 'List of space-separated native component names.',
      },
      {
        name: 'modules',
        alias: 'm',
        multiple: true,
        description: 'List of space-separated native module names.',
      },
      {
        name: 'description',
        alias: 'd',
        description: 'Package description.',
      },
      {
        name: 'npmUsername',
        alias: 'n',
        description: 'Your npm username.',
      },
      {
        name: 'email',
        alias: 'e',
        description: 'Your npm email.',
      },
      {
        name: 'withoutConfirmation',
        alias: 'w',
        type: Boolean,
        description: 'Skip confirmation prompt.',
      },
      {
        name: 'skipInstall',
        alias: 's',
        type: Boolean,
        description: 'Skip dependency installation.',
      },
      {
        name: 'jetpackComposeAndSwiftUiEnabled',
        alias: 'j',
        type: Boolean,
        description: 'Use Jetpack Compose and Swift UI for components.',
      },
      {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Print this usage guide.',
      },
    ],
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
        '{bold --email} {underline me@mail.org}',
    ],
  },
]

const usage = commandLineUsage(sections)

const optionDefinitions = sections.flatMap((s) => s.optionList || [])

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
  withoutConfirmation,
  skipInstall,
  jetpackComposeAndSwiftUiEnabled,
  help,
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
  description: description || 'Yet another react-native package',
  email: email ? ` <${email}>` : '',
  npmUsername: npmUsername || githubUsername,
  components: [
    ...new Set(
      components ||
        (modules ? [] : [pascalCase(packageName).replace('ReactNative', '')])
    ),
  ],
  modules: [...new Set(modules || [])],
  jetpackComposeAndSwiftUiEnabled,
}

const componentMaps = packageMap.components.map((componentName) => ({
  componentName,
}))
const moduleMaps = packageMap.modules.map((moduleName) => ({ moduleName }))
const miscMap = {
  package: 'package',
  gitignore: '.gitignore',
  mrnpVersion,
  rnVersion,
  kotlinVersion,
  iosVersion: jetpackComposeAndSwiftUiEnabled ? '13.0' : '9.0',
  currentYear: `${new Date().getFullYear()}`,
  lazyPascalCaseComponentName: '{{pascalCase componentName}}',
  lazyParamCaseComponentName: '{{paramCase componentName}}',
  lazyPackageCaseComponentName: '{{packageCase componentName}}',
  lazyPascalCaseModuleName: '{{pascalCase moduleName}}',
  lazyParamCaseModuleName: '{{paramCase moduleName}}',
  lazyPackageCaseModuleName: '{{packageCase moduleName}}',
}

const transform = (map) => (data) => Handlebars.compile(data)(map)

const copyOptions = (map) => ({
  overwrite: true,
  dot: true,
  rename: transform(map),

  transform: function (src) {
    const skipTransform = ['.png', '.jar', '.keystore'].includes(
      path.extname(src)
    )

    return (
      !skipTransform &&
      through(function (chunk, enc, done) {
        try {
          done(null, transform(map)(chunk.toString()))
        } catch (e) {
          console.log(e, src)
        }
      })
    )
  },
})

const packagePath = `${process.cwd()}/${packageMap.packageName}`
const androidSourcesPath =
  `${packagePath}/android/src/main/kotlin/` +
  `${packageCase(packageMap.githubUsername)}/${packageCase(
    packageMap.packageName
  )}`
const iosSourcesPath = `${packagePath}/ios`
const typescriptSourcesPath = `${packagePath}/src`

console.log(`\nUsing project template from react-native ${rnVersion}`)
console.log('\nConfiguration:\n')
console.log(packageMap)
console.log()

const copyTemplates = async (src, map, name) => {
  const options = copyOptions(map)

  await copy(
    `${androidSourcesPath}/${src.native || src}`,
    `${androidSourcesPath}/${packageCase(name)}`,
    options
  )

  await copy(
    `${iosSourcesPath}/${src.native || src}`,
    `${iosSourcesPath}/${pascalCase(name)}`,
    options
  )

  await copy(
    `${typescriptSourcesPath}/${src.js || src}`,
    `${typescriptSourcesPath}/${pascalCase(name)}`,
    options
  )
}

const done = () => {
  console.log(
    chalk.green.bold(`\nSuccessfully bootstrapped ${packageName} package!\n`)
  )
}

const removeContextDependentFiles = async () => {
  if (jetpackComposeAndSwiftUiEnabled) {
    await del(`${packagePath}/**/UIButton+Highlighted.swift`)
  } else {
    await del(`${packagePath}/**/${objcPrefix}Defines.swift`)
  }
}

const makePackage = async () => {
  await copy(
    `${__dirname}/template`,
    packagePath,
    copyOptions({ ...packageMap, ...miscMap })
  )

  await Promise.all(
    componentMaps.map(async (map) =>
      copyTemplates(
        {
          native: jetpackComposeAndSwiftUiEnabled
            ? 'advanced-component-template'
            : 'component-template',
          js: 'component-template'
        },
        map,
        map.componentName
      )
    )
  )

  await Promise.all(
    moduleMaps.map(async (map) =>
      copyTemplates('module-template', map, map.moduleName)
    )
  )

  await del(`${packagePath}/**/component-template`)
  await del(`${packagePath}/**/advanced-component-template`)
  await del(`${packagePath}/**/module-template`)

  await removeContextDependentFiles()

  if (!skipInstall) {
    await new Promise((resolve) => {
      spawn('npm', ['run', 'init:package'], {
        stdio: 'inherit',
        cwd: packageName,
      }).on('close', (code) => {
        if (code === 0) {
          done()
        }

        resolve(code)
      })
    })
  } else {
    done()

    console.log(
      'You can run `npm run init:package` from your package root folder to install dependencies ' +
        'later.\n'
    )
  }
}

if (withoutConfirmation) {
  makePackage()
} else {
  const prompt = new Confirm('Is this OK?')
  prompt.ask(async (answer) => {
    if (answer) {
      await makePackage()
    }
  })
}
