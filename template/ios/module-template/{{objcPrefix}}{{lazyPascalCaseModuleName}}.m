{{#if usesComponentKit}}
#import <React/RCTUtils.h>
#import "{{objcPrefix}}{{lazyPascalCaseModuleName}}.h"

@implementation {{objcPrefix}}{{lazyPascalCaseModuleName}}

RCT_EXPORT_MODULE();

//+ (BOOL)requiresMainQueueSetup
//{
//  return YES;
//}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(show:(NSString *)message)
{
  UIAlertController *alert = [UIAlertController
                              alertControllerWithTitle:@"{{objcPrefix}}{{lazyPascalCaseModuleName}}"
                              message:message
                              preferredStyle:UIAlertControllerStyleAlert];

  [alert addAction:[UIAlertAction actionWithTitle:@"Cancel"
                                            style:UIAlertActionStyleCancel
                                          handler:^(UIAlertAction * _Nonnull action) {}]];

  [RCTPresentedViewController() presentViewController:alert animated:YES completion:^{}];
}

@end
{{else}}
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE({{objcPrefix}}{{lazyPascalCaseModuleName}}, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXTERN_METHOD(show:(NSString *)message)

@end
{{/if}}
