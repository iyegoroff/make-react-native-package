# make-react-native-package
[![npm version](https://badge.fury.io/js/make-react-native-package.svg)](https://badge.fury.io/js/make-react-native-package)
[![CircleCI](https://circleci.com/gh/iyegoroff/make-react-native-package.svg?style=svg)](https://circleci.com/gh/iyegoroff/make-react-native-package)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Dependency Status](https://david-dm.org/iyegoroff/make-react-native-package.svg)](https://david-dm.org/iyegoroff/make-react-native-package)
[![devDependencies Status](https://david-dm.org/iyegoroff/make-react-native-package/dev-status.svg)](https://david-dm.org/iyegoroff/make-react-native-package?type=dev)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/make-react-native-package)

CLI tool for bootstrapping react-native packages with Kotlin & Swift & Typescript

## About

- CLI tool:
  - single command to scaffold a monorepo with package itself and ready-to-run example app
  - can create any amount of dummy native components and modules inside same package
  - has multiple component templates
  - versioning doesn't follow 'semver', major and minor numbers match the ones from specific version of <code>react&#x2011;native</code> whose project template is used by MRNP
- Bootstrapped package:
  - supports `iOS` & `Android` & react-native "<strong>&gt;= 0.60.0</strong>"
  - contains (absolutely optional) basic CI setup: CircleCI -&gt; lint & build -&gt; npm
  - has setup instructions for package end-users in generated `README.md` files
  - includes a `Dockerfile` for creating a release example `.apk` in 'neutral' environment

## Getting started

```
$ npx make-react-native-package -p react-native-cool-component --githubUsername cool-github-user
```

## Usage guide

```
$ npx make-react-native-package --help
```

<pre>
<strong>Usage</strong>

  $ make-react-native-package &lt;<strong>--packageName</strong> <em>name</em>&gt; &lt;<strong>--githubUsername</strong> <em>user</em>&gt; ...

<strong>Required options</strong>

  <strong>-p, --packageName</strong> <em>string</em>      The name of project folder, github repo and npm package
  <strong>-g, --githubUsername</strong> <em>string</em>   Your github username

<strong>Options</strong>

  <strong>-h, --help</strong>                   Print this usage guide
  <strong>-a, --appName</strong> <em>string</em>         Example app name
  <strong>-o, --objcPrefix</strong> <em>string</em>      Objective-C file prefix
  <strong>-c, --components</strong> <em>string[]</em>    List of space-separated native component names
  <strong>-m, --modules</strong> <em>string[]</em>       List of space-separated native module names
  <strong>-d, --description</strong> <em>string</em>     Package description
  <strong>-n, --npmUsername</strong> <em>string</em>     Your npm username
  <strong>-e, --email</strong> <em>string</em>           Your npm email
  <strong>-w, --withoutConfirmation</strong>    Skip confirmation prompt
  <strong>-s, --skipInstall</strong>            Skip dependency installation
  <strong>-t, --templates</strong> <em>string[]</em>     List of space-separated component templates:
                               <strong>ios:default</strong> - default Swift template
                               <strong>android:default</strong> - default Kotlin template
                               <strong>ios:swift-ui</strong> - SwiftUI component template
                               <strong>android:jetpack-compose</strong> - Jetpack Compose component template

<strong>Example</strong>

  $ make-react-native-package <strong>--packageName</strong> <em>react-native-cool-component</em>
    <strong>--githubUsername</strong> <em>octocat</em> <strong>--appName</strong> <em>CoolExample</em> <strong>--objcPrefix</strong> <em>RNCC</em>
    <strong>--description</strong> <em>"Cool description"</em> <strong>--npmUsername</strong> <em>wombat</em> <strong>--email</strong> <em>me@mail.org</em>
    <strong>--templates</strong> <em>ios:swift-ui android:jetpack-compose</em>
</pre>

## Workflow

### Installation

Usually no additional steps required after bootstrapping a package. However, if you have skipped dependency installation with <strong>--skipInstall</strong> option you can setup everything later by running `npm run init:package` from package root folder.

### Development

Generated folder contains the package itself in the root and the sample app inside `./example` folder.
Example app imports package dependency locally as a `file:..` symlink, so all changes inside the root folder will be available for a running app and editors/IDEs immediately.

To watch on Typescript sources changes you have to run `npm run watch` commands from <strong>both</strong> root and `./example` folders. Most of 'development' commands are located in `./example/package.json` scripts section, and `watch` script from `./package.json` probably is the only common 'development' command in the root folder.

To open a project in `Xcode` go to `./example/ios` folder and open `.xcworkspace` file, package `Swift` sources should be found inside `Pods > Development Pods > {{packageName}}` group in project navigator.

To open a project from `Android Studio` 'welcome to' window press `Import project` and open `./example/android` folder, after `gradle` sync task completes package `Kotlin` sources should be found inside `{{packageName}} > java` group in project tool window.

To build native code and run sample app on device/simulator just use standard react-native 'run' commands or 'run' buttons from `Xcode`/`Android Studio`.

### Publishing

There are two options: publishing from local machine or publishing from CircleCI.

To publish from a local machine just run `npm version <your_package_next_version> && npm publish` from package root folder. It will run linters and build Typescript sources in `preversion` hook and push changes and git tags to a remote repo in `postversion` hook. Then if everything succeed, the package will be published to npm.

If you have an account on CircleCI you can use it for publishing a package when git tags are being pushed to a remote repo. Note that before enabling your package in CircleCI dashboard you should either ask their support for [macOS plan](https://circleci.com/pricing/#faq-section-linux) (it is free for open-source projects) or remove `test-ios` job related code from `.circleci/config.yml` file. Also you have to set `NPM_TOKEN` environment variable in CircleCI dashboard project settings - this token can be created directly on [npmjs.com](https://npmjs.com) or imported from your other CircleCI project. When everything is ready run `npm version <your_package_next_version> -m "%s [skip ci]"` to initiate just `publish` job on CircleCI without triggering surplus `test-ios` & `test-android` jobs because of master branch changes. It won't only lint sources and build Typescript, but also will check that native code compiles (this can take some time). After both `test-ios` and `test-android` jobs succeed the `publish` job will be triggered.

## Created with MRNP

- [iyegoroff/react-native-multi-segmented-control](https://github.com/iyegoroff/react-native-multi-segmented-control)

Packages that were bootstrapped with MRNP most likely will contain `Bootstrapped with make-react-native-package` string  marker in their `README.md` files, so they could be easily found with Github search.

## Credits

- `SwiftUI` component template is based on [this approach](https://github.com/Kureev/ReactNativeWithSwiftUITutorial) by @Kureev
