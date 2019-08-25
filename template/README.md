<!-- Bootstrapped with make-react-native-package v{{mrnpVersion}} -->

# {{packageName}}
[![npm version](https://badge.fury.io/js/{{packageName}}.svg)](https://badge.fury.io/js/{{packageName}})
[![CircleCI](https://circleci.com/gh/{{githubUsername}}/{{packageName}}.svg?style=svg)](https://circleci.com/gh/{{githubUsername}}/{{packageName}})
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Dependency Status](https://david-dm.org/{{npmUsername}}/{{packageName}}.svg)](https://david-dm.org/{{npmUsername}}/{{packageName}})
[![devDependencies Status](https://david-dm.org/{{npmUsername}}/{{packageName}}/dev-status.svg)](https://david-dm.org/{{npmUsername}}/{{packageName}}?type=dev)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg?t=1495378566925)](package.json)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/{{packageName}})

{{description}}

## Status

- iOS & Android:
  - ???
- react-native:
  - supported versions "<strong>&gt;= 0.60.0</strong>"

## Installation

<table>
<td>
<details style="border: 1px solid; border-radius: 5px; padding: 5px">
  <summary>with react-native "<strong>&gt;=0.60.0</strong>"</summary>

### 0. Setup Swift and Kotlin

- Open your iOS project in Xcode and create empty Swift file and bridging header to enable Swift support
- Modify `android/build.gradle`:

  ```diff
  buildscript {
    ext {
      ...
  +   kotlinVersion = "1.3.41"
    }
  ...

    dependencies {
  +   classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${kotlinVersion}")
      ...
  ```

### 1. Install latest version from npm

`$ npm i {{packageName}} -S`

### 2. Install pods

`$ cd ios && pod install && cd ..`

</details>
</td>
</table>

## Demo

 Android                                       |  iOS
:---------------------------------------------:|:---------------------------------------------:
???  |  ???

## Example

```jsx
import * as React from 'react'
import { View } from 'react-native'
import {
{{#each modules}}
  {{pascalCase this}},
{{/each}}
{{#each components}}
  {{pascalCase this}}{{#unless @last}},{{/unless}}
{{/each}}
} from '{{packageName}}'

const App = () => (
  <View style=\{{ width: '100%', height: '100%' }}>
  {{#each components}}
    <{{pascalCase this}}
      style=\{{ width: 100, height: 100, margin: 5 }}
      color={'red'}
    />
  {{/each}}
  </View>
)
```

## Reference

<table>
  <tr>
    <th>prop</th>
    <th>type</th>
    <th>default</th>
    <th>desc</th>
  </tr>
  <tr>
    <td>color</td>
    <td><code>string</code></td>
    <td><code>'red'</code></td>
    <td>-</td>
  </tr>
</table>
