#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN

@interface {{objcPrefix}}{{lazyPascalCaseComponentName}}Proxy : UIView

@property (nonatomic, assign) NSInteger count;
@property (nonatomic, strong) UIColor *color;
@property (nonatomic, copy) RCTDirectEventBlock onCountChange;

@end

NS_ASSUME_NONNULL_END
