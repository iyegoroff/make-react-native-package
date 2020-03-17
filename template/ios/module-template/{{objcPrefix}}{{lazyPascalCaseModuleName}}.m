#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE({{objcPrefix}}{{lazyPascalCaseModuleName}}, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

// - (dispatch_queue_t)methodQueue
// {
//   return dispatch_get_main_queue();
// }

RCT_EXTERN_METHOD(show:(NSString *)message)

@end
