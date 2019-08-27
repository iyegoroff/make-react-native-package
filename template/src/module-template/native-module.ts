import { NativeModules } from 'react-native'

export const NativeModule = NativeModules.{{objcPrefix}}{{lazyPascalCaseModuleName}} as {
  readonly show: (message: string) => void
}
