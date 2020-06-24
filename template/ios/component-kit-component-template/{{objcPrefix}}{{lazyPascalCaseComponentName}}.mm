#import <ComponentKit.h>
#import "{{objcPrefix}}{{lazyPascalCaseComponentName}}.h"
#import "UIImage+Color.h"

@interface {{objcPrefix}}{{lazyPascalCaseComponentName}}Model ()

@property (nonatomic, assign, readonly) NSInteger count;
@property (nonatomic, strong, readonly) UIColor* color;

@end

@implementation {{objcPrefix}}{{lazyPascalCaseComponentName}}Model

+ (instancetype)newWithCount:(NSInteger)count color:(UIColor *)color
{
  {{objcPrefix}}{{lazyPascalCaseComponentName}}Model *item = [{{objcPrefix}}{{lazyPascalCaseComponentName}}Model new];
  item->_count = count;
  item->_color = color;

  return item;
}

@end


@implementation {{objcPrefix}}{{lazyPascalCaseComponentName}}Context
{
  OnIncrement _onIncrement;
}

+ (instancetype)newWithOnIncrement:(OnIncrement)onIncrement
{
  {{objcPrefix}}{{lazyPascalCaseComponentName}}Context *item = [{{objcPrefix}}{{lazyPascalCaseComponentName}}Context new];
  item->_onIncrement = onIncrement;

  return item;
}

- (void)increment
{
  _onIncrement();
}

@end


@implementation {{objcPrefix}}{{lazyPascalCaseComponentName}}

+ (CKComponent *)componentForModel:({{objcPrefix}}{{lazyPascalCaseComponentName}}Model *)model context:({{objcPrefix}}{{lazyPascalCaseComponentName}}Context *)context
{
  return
  [CKFlexboxComponent
   newWithView:{
    [UIView class],
    {
      {@selector(setBackgroundColor:), model.color}
    }
   }
   size:{}
   style:{
    .direction = CKFlexboxDirectionColumn,
    .justifyContent = CKFlexboxJustifyContentSpaceBetween,
    .alignItems = CKFlexboxAlignItemsCenter,
    .padding = {5.0f, 5.0f, 5.0f, 5.0f}
   }
   children:{
    {
      .flexGrow = 1.0f,
      .component =
      [CKLabelComponent
       newWithLabelAttributes:{
        .string = [NSString stringWithFormat:@"Count %li", model.count],
        .font = [UIFont systemFontOfSize:20.0f]
       }
       viewAttributes:{
        {@selector(setBackgroundColor:), [UIColor clearColor]},
        {@selector(setUserInteractionEnabled:), @NO}
       }
       size:{}]
    },
    {
      .sizeConstraints = {.width = CKRelativeDimension::Percent(1.0f)},
      .flexGrow = 1.0f,
      .component =
      [CKButtonComponent
       newWithAction:{context, @selector(increment)}
       options:{
        .titles = @"+",
        .backgroundImages = {
          {UIControlStateNormal, [UIImage newWithColor:[UIColor lightGrayColor]]},
          {UIControlStateHighlighted, [UIImage newWithColor:[UIColor clearColor]]}
        }
       }]
    }
   }
  ];
}

@end
