import React from 'react'
import { NativeProps, NativeComponent } from './native-component'

type Props = NativeProps

const RefComponent = (props: Props, forwardedRef?: React.Ref<React.Component<NativeProps>>) => (
  <NativeComponent
    {...props}
    ref={forwardedRef}
  />
)

export const Component = React.forwardRef(RefComponent)
Component.displayName = '{{lazyPascalCaseComponentName}}'
