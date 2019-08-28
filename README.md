# make-react-native-package
[![npm version](https://badge.fury.io/js/make-react-native-package.svg)](https://badge.fury.io/js/make-react-native-package)
[![CircleCI](https://circleci.com/gh/iyegoroff/make-react-native-package.svg?style=svg)](https://circleci.com/gh/iyegoroff/make-react-native-package)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Dependency Status](https://david-dm.org/iyegoroff/make-react-native-package.svg)](https://david-dm.org/iyegoroff/make-react-native-package)
[![devDependencies Status](https://david-dm.org/iyegoroff/make-react-native-package/dev-status.svg)](https://david-dm.org/iyegoroff/make-react-native-package?type=dev)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/make-react-native-package)

CLI tool for bootstrapping react-native packages with Kotlin/Swift/Typescript

## About

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

  <strong>-p, --packageName</strong> <em>string</em>      The name of project folder, github repo and npm package.
  <strong>-g, --githubUsername</strong> <em>string</em>   Your github username.

<strong>Options</strong>

  <strong>-a, --appName</strong> <em>string</em>         Example app name.
  <strong>-o, --objcPrefix</strong> <em>string</em>      Objective-C file prefix.
  <strong>-c, --components</strong> <em>string[]</em>    List of space-separated native component names.
  <strong>-m, --modules</strong> <em>string[]</em>       List of space-separated native module names.
  <strong>-d, --description</strong> <em>string</em>     Package description.
  <strong>-n, --npmUsername</strong> <em>string</em>     Your npm username.
  <strong>-e, --email</strong> <em>string</em>           Your npm email.
  <strong>-w, --withoutConfirmation</strong>    Skip confirmation prompt.
  <strong>-s, --skipInstall</strong>            Skip dependency installation.
  <strong>-h, --help</strong>                   Print this usage guide.

<strong>Example</strong>

  $ make-react-native-package <strong>--packageName</strong> <em>react-native-cool-component</em>
    <strong>--githubUsername</strong> <em>octocat</em> <strong>--appName</strong> <em>CoolExample</em> <strong>--objcPrefix</strong> <em>RNCC</em>
    <strong>--description</strong> <em>"Cool description"</em> <strong>--npmUsername</strong> <em>wombat</em> <strong>--email</strong> <em>me@mail.org</em>
</pre>

## Workflow

### Development

### Publishing

## Created with MRNP

- [iyegoroff/react-native-multi-segmented-control](https://github.com/iyegoroff/react-native-multi-segmented-control)
