#!/usr/bin/env node

const path = require('path')
const { spawn } = require('child_process')
const { promisify } = require('util')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const { pascalCase, paramCase, camelCase, snakeCase } = require('change-case')
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
const rnVersion = dependencies['react-native'];

const availableTemplates = [
  ['ios:default', 'default Swift template'],
  ['android:default', 'default Kotlin template'],
  ['ios:swift-ui', 'SwiftUI component template'],
  ['android:jetpack-compose', 'Jetpack Compose component template'],
  ['android:litho', 'Litho Kotlin component template']
]

const del = promisify(rimraf)

const packageCase = (input) => lowerCase(camelCase(input))

Handlebars.registerHelper({
  pascalCase,
  paramCase,
  packageCase,
  randomColor,
  snakeCase
})

const sections = [
  {
    header: 'Usage',
    content:
      '$ make-react-native-package <{bold --packageName} {underline name}> ' +
      '<{bold --githubUsername} {underline user}> ...'
  },
  {
    header: 'Required options',
    optionList: [
      {
        name: 'packageName',
        alias: 'p',
        description: 'The name of project folder, github repo and npm package'
      },
      {
        name: 'githubUsername',
        alias: 'g',
        description: 'Your github username'
      }
    ]
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Print this usage guide'
      },
      {
        name: 'appName',
        alias: 'a',
        description: 'Example app name'
      },
      {
        name: 'objcPrefix',
        alias: 'o',
        description: 'Objective-C file prefix'
      },
      {
        name: 'components',
        alias: 'c',
        multiple: true,
        description: 'List of space-separated native component names'
      },
      {
        name: 'modules',
        alias: 'm',
        multiple: true,
        description: 'List of space-separated native module names'
      },
      {
        name: 'description',
        alias: 'd',
        description: 'Package description'
      },
      {
        name: 'npmUsername',
        alias: 'n',
        description: 'Your npm username'
      },
      {
        name: 'email',
        alias: 'e',
        description: 'Your npm email'
      },
      {
        name: 'withoutConfirmation',
        alias: 'w',
        type: Boolean,
        description: 'Skip confirmation prompt'
      },
      {
        name: 'skipInstall',
        alias: 's',
        type: Boolean,
        description: 'Skip dependency installation'
      },
      {
        name: 'templates',
        alias: 't',
        multiple: true,
        description: 'List of space-separated component templates:\n' +
          availableTemplates.map(([name, desc]) => `{bold ${name}} - ${desc}`).join('\n')
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
        '{bold --email} {underline me@mail.org}',
      '{hidden   }{bold --templates} {underline ios:swift-ui android:jetpack-compose}'
    ]
  }
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
  templates = [],
  help
} = commandLineArgs(optionDefinitions)

if (help) {
  console.log(usage)
  process.exit()
}

if (packageName === undefined) {
  console.log(chalk.bold.red('\nERROR: Skipped required `packageName` option!\n'))
  process.exit(1)
}

if (githubUsername === undefined) {
  console.log(chalk.bold.red('\nERROR: Skipped required `githubUsername` option!\n'))
  process.exit(1)
}

if (!templates.every(t => availableTemplates.map(([name]) => name).includes(t))) {
  console.log(chalk.bold.red('\nERROR: Specified unknown component template!\n'))
  process.exit(1)
}

for (const platform of ['ios', 'android']) {
  if (templates.reduce((acc, val) => val.startsWith(platform) ? acc + 1 : acc, 0) > 1) {
    console.log(chalk.bold.red(`\nERROR: Only one ${platform} template can be used!\n`))
    process.exit(1)
  }
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
  modules: [...new Set(modules || [])],
  components: [
    ...new Set(
      components ||
        (modules ? [] : [pascalCase(packageName).replace('ReactNative', '')])
    )
  ],
  templates: [
    ...templates,
    ...templates.some(t => t.startsWith('ios')) ? [] : ['ios:default'],
    ...templates.some(t => t.startsWith('android')) ? [] : ['android:default']
  ]
}

const usesSwiftUI = templates.includes('ios:swift-ui')
const usesJetpackCompose = templates.includes('android:jetpack-compose')
const usesLitho = templates.includes('android:litho')

const componentMaps = packageMap.components.map((componentName) => ({
  componentName
}))

const moduleMaps = packageMap.modules.map((moduleName) => ({ moduleName }))

const miscMap = {
  package: 'package',
  gitignore: '.gitignore',
  mrnpVersion,
  rnVersion,
  kotlinVersion: '1.3.72',
  composeVersion: '0.1.0-dev13',
  lithoVersion: '0.36.0',
  composeKotlinCompilerVersion: '1.3.70-dev-withExperimentalGoogleExtensions-20200424',
  usesSwiftUI,
  usesJetpackCompose,
  usesLitho,
  compileSdkVersion: usesJetpackCompose ? '29' : '28',
  targetSdkVersion: usesJetpackCompose ? '29' : '28',
  buildToolsVersion: usesJetpackCompose ? '29.0.2' : '28.0.3',
  minSdkVersion: usesJetpackCompose ? '21' : '16',
  buildToolsPluginVersion: usesJetpackCompose ? '4.2.0-alpha02' : '3.5.2',
  gradleWrapperVersion: usesJetpackCompose ? '6.5-rc-1' : '6.0.1',
  iosVersion: usesSwiftUI ? '13.0' : '9.0',
  currentYear: `${new Date().getFullYear()}`,
  lazyPascalCaseComponentName: '{{pascalCase componentName}}',
  lazyParamCaseComponentName: '{{paramCase componentName}}',
  lazyPackageCaseComponentName: '{{packageCase componentName}}',
  lazyPascalCaseModuleName: '{{pascalCase moduleName}}',
  lazyParamCaseModuleName: '{{paramCase moduleName}}',
  lazyPackageCaseModuleName: '{{packageCase moduleName}}'
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
  }
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
    `${androidSourcesPath}/${src.android || src}`,
    `${androidSourcesPath}/${packageCase(name)}`,
    options
  )

  await copy(
    `${iosSourcesPath}/${src.ios || src}`,
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
  if (usesSwiftUI) {
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
          ios: usesSwiftUI ? 'swift-ui-component-template' : 'component-template',
          android: usesJetpackCompose
            ? 'jetpack-compose-component-template'
            : usesLitho
              ? 'litho-component-template'
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
  await del(`${packagePath}/**/swift-ui-component-template`)
  await del(`${packagePath}/**/jetpack-compose-component-template`)
  await del(`${packagePath}/**/litho-component-template`)
  await del(`${packagePath}/**/module-template`)

  await removeContextDependentFiles()

  if (!skipInstall) {
    await new Promise((resolve) => {
      spawn('npm', ['run', 'init:package'], {
        stdio: 'inherit',
        cwd: packageName
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
