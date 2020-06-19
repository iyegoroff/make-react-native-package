#import <React/RCTViewManager.h>
#import "{{objcPrefix}}Defines.h"
#import "{{snakeCase packageName}}-Swift.h"

@interface RCT_EXTERN_MODULE({{objcPrefix}}{{lazyPascalCaseComponentName}}Manager, RCTViewManager)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

// - (dispatch_queue_t)methodQueue
// {
//   return dispatch_get_main_queue();
// }

RCT_CUSTOM_SWIFTUI_PROPERTY(color, UIColor, {{lazyPascalCaseComponentName}}Proxy) {
  return [RCTConvert UIColor:json] ?: UIColor.clearColor;
}
RCT_EXPORT_SWIFTUI_PROPERTY(count, int, {{lazyPascalCaseComponentName}}Proxy)
RCT_EXPORT_SWIFTUI_CALLBACK(onCountChange, RCTDirectEventBlock, {{lazyPascalCaseComponentName}}Proxy)

@end
