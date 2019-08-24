import React from 'react'
import { requireNativeComponent } from 'react-native'

export type NativeProps = {
  readonly color: string
}

export const #~OBJC_PREFIX~##~COMPONENT_NAME_PASCAL_CASE~#: React.ComponentClass<NativeProps> = requireNativeComponent(
  '#~OBJC_PREFIX~##~COMPONENT_NAME_PASCAL_CASE~#'
)
