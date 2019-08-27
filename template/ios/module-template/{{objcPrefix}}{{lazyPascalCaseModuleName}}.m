#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE({{objcPrefix}}{{lazyPascalCaseModuleName}}, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXTERN_METHOD(show:(NSString *)message)

@end
