import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
{{#each modules}}
  {{pascalCase this}},
{{/each}}
{{#each components}}
  {{pascalCase this}}{{#unless @last}},{{/unless}}
{{/each}}
} from '{{packageName}}'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexWrap: 'wrap'
  },
  component: {
    width: 100,
    height: 100,
    margin: 5
  }
})

const App = () => (
  <View style={styles.container}>
  {{#each components}}
    <{{pascalCase this}}
      style={styles.component}
      color={'red'}
    />
  {{/each}}
  </View>
)

export default App
