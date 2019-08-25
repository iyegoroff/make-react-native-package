import React from 'react'
import { requireNativeComponent } from 'react-native'

export type NativeProps = {
  readonly color: string
}

export const NativeComponent: React.ComponentClass<NativeProps> = requireNativeComponent(
  '{{objcPrefix}}{{lazyPascalCaseComponentName}}'
)
