import React from 'react'
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

export default App
