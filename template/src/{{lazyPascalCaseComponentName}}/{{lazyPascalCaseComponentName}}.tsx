import React from 'react'
import { NativeProps, {{objcPrefix}}{{lazyPascalCaseComponentName}} } from './{{objcPrefix}}{{lazyPascalCaseComponentName}}'

type {{lazyPascalCaseComponentName}}Props = NativeProps

export class {{lazyPascalCaseComponentName}} extends React.Component<{{lazyPascalCaseComponentName}}Props> {

  render() {
    return (
      <{{objcPrefix}}{{lazyPascalCaseComponentName}} {...this.props} />
    )
  }
}
