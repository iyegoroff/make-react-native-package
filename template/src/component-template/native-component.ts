import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'

export type NativeProps = ViewProps & {
  readonly color: string
}

export const NativeComponent: React.ComponentClass<NativeProps> = requireNativeComponent(
  '{{objcPrefix}}{{lazyPascalCaseComponentName}}'
)
