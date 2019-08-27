import React from 'react'
import { NativeProps, NativeComponent } from './native-component'

type Props = NativeProps

export const Component = (props: Props) => (
  <NativeComponent {...props} />
)
