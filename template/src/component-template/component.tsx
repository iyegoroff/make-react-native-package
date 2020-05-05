import React, { useState } from 'react'
import { NativeProps, NativeComponent } from './native-component'

type Props = Omit<NativeProps, 'count' | 'onCountChange'>

const RefComponent = (props: Props, forwardedRef?: React.Ref<React.Component<NativeProps>>) => {
  const [count, updateCount] = useState(0)

  return (
    <NativeComponent
      {...props}
      count={count}
      onCountChange={(e) => updateCount(e.nativeEvent.count)}
      ref={forwardedRef}
    />
  )
}

export const Component = React.forwardRef(RefComponent)
Component.displayName = '{{lazyPascalCaseComponentName}}'
