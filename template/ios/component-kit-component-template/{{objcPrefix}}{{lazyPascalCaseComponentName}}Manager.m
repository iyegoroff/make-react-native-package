#import <React/RCTBridge.h>
#import "{{objcPrefix}}{{lazyPascalCaseComponentName}}Manager.h"
#import "{{objcPrefix}}{{lazyPascalCaseComponentName}}Proxy.h"

@implementation {{objcPrefix}}{{lazyPascalCaseComponentName}}Manager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [{{objcPrefix}}{{lazyPascalCaseComponentName}}Proxy new];
}

//+ (BOOL)requiresMainQueueSetup
//{
//  return YES;
//}

//- (dispatch_queue_t)methodQueue
//{
//  return dispatch_get_main_queue();
//}

RCT_EXPORT_VIEW_PROPERTY(color, UIColor)
RCT_EXPORT_VIEW_PROPERTY(count, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(onCountChange, RCTDirectEventBlock)

@end
