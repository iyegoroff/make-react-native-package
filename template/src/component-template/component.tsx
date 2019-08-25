import React from 'react'
import { NativeProps, NativeComponent } from './native-component'

type Props = NativeProps

export class Component extends React.Component<Props> {

  render() {
    return (
      <NativeComponent {...this.props} />
    )
  }
}
