import React from 'react'
{{#if components.length}}
import { View, StyleSheet } from 'react-native'
{{/if}}
import {
{{#each modules}}
  {{pascalCase this}}{{#unless @last}},{{else if ../components.length}},{{/unless}}
{{/each}}
{{#each components}}
  {{pascalCase this}}{{#unless @last}},{{/unless}}
{{/each}}
} from '{{packageName}}'
{{#if components.length}}

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
{{/if}}

class App extends React.Component<{}> {
  {{#if modules.length}}

  componentDidMount() {
  {{#each modules}}
    {{pascalCase this}}.show('{{pascalCase this}}')
  {{/each}}
  }
  {{/if}}

  render() {
    {{#if components.length}}
    return (
      <View style={styles.container}>
      {{#each components}}
        <{{pascalCase this}}
          style={styles.component}
          color={'{{randomColor}}'}
        />
      {{/each}}
      </View>
    )
    {{else}}
    return false
    {{/if}}
  }
}

export default App
