# #~PROJECT_NAME~#
[![npm version](https://badge.fury.io/js/#~PROJECT_NAME~#.svg)](https://badge.fury.io/js/#~PROJECT_NAME~#)
[![CircleCI](https://circleci.com/gh/#~GITHUB_USERNAME~#/#~PROJECT_NAME~#.svg?style=svg)](https://circleci.com/gh/#~GITHUB_USERNAME~#/#~PROJECT_NAME~#)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Dependency Status](https://david-dm.org/#~NPM_USERNAME~#/#~PROJECT_NAME~#.svg)](https://david-dm.org/#~NPM_USERNAME~#/#~PROJECT_NAME~#)
[![devDependencies Status](https://david-dm.org/#~NPM_USERNAME~#/#~PROJECT_NAME~#/dev-status.svg)](https://david-dm.org/#~NPM_USERNAME~#/#~PROJECT_NAME~#?type=dev)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg?t=1495378566925)](package.json)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/#~PROJECT_NAME~#)

#~DESCRIPTION~#

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

`$ npm i #~PROJECT_NAME~# -S`

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
import { #~COMPONENT_NAME_PASCAL_CASE~# } from '#~PROJECT_NAME~#'

export const Component = () => (
  <#~COMPONENT_NAME_PASCAL_CASE~#
    color={'red'}
  />
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
