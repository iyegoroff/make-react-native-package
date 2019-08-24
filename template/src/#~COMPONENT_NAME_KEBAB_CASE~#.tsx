import React from 'react'
import { NativeProps, #~OBJC_PREFIX~##~COMPONENT_NAME_PASCAL_CASE~# } from './native-component'

type #~COMPONENT_NAME_PASCAL_CASE~#Props = NativeProps

export class #~COMPONENT_NAME_PASCAL_CASE~# extends React.Component<#~COMPONENT_NAME_PASCAL_CASE~#Props> {

  render() {
    return (
      <#~OBJC_PREFIX~##~COMPONENT_NAME_PASCAL_CASE~# {...this.props} />
    )
  }
}
