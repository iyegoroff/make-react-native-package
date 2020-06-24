#import <ComponentKit.h>
#import "{{objcPrefix}}{{lazyPascalCaseComponentName}}Proxy.h"
#import "{{objcPrefix}}{{lazyPascalCaseComponentName}}.h"

@implementation {{objcPrefix}}{{lazyPascalCaseComponentName}}Proxy
{
  CKComponentHostingView *_hostingView;
}

- (instancetype)init
{
  if ((self = [super initWithFrame:CGRectZero])) {
    _count = 0;
    _color = [UIColor clearColor];
    _hostingView =
    [[CKComponentHostingView alloc]
     initWithComponentProvider:[{{objcPrefix}}{{lazyPascalCaseComponentName}} class]
     sizeRangeProvider:[CKComponentFlexibleSizeRangeProvider providerWithFlexibility:CKComponentSizeRangeFlexibleWidthAndHeight]];

    [self addSubview:_hostingView];

    [_hostingView updateContext:[{{objcPrefix}}{{lazyPascalCaseComponentName}}Context newWithOnIncrement:^{ [self updateCount]; }]
                           mode:CKUpdateModeSynchronous];
    [self updateModel];
  }

  return self;
}

- (void)updateModel
{
  [_hostingView updateModel:[{{objcPrefix}}{{lazyPascalCaseComponentName}}Model newWithCount:_count color:_color]
                       mode:CKUpdateModeSynchronous];
}

- (void)layoutSubviews
{
  [super layoutSubviews];

  _hostingView.frame = CGRectMake(0.0f, 0.0f, self.frame.size.width, self.frame.size.height);
}

- (void)updateCount
{
  _onCountChange(@{ @"count": @(_count + 1) });
}

- (void)setCount:(NSInteger)count
{
  _count = count;

  [self updateModel];
}

- (void)setColor:(UIColor *)color
{
  _color = color;

  [self updateModel];
}

@end
