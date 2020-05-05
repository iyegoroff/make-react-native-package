import React from 'react'
import { requireNativeComponent, ViewProps, NativeSyntheticEvent } from 'react-native'

export type NativeProps = ViewProps & {
  readonly color: string
  readonly count: number
  readonly onCountChange: (event: NativeSyntheticEvent<{ readonly count: number }>) => void
}

export const NativeComponent: React.ComponentClass<NativeProps> = requireNativeComponent(
  '{{objcPrefix}}{{lazyPascalCaseComponentName}}'
)
