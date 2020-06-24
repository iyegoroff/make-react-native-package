#import <ComponentKit/CKComponentProvider.h>

NS_ASSUME_NONNULL_BEGIN

@interface {{objcPrefix}}{{lazyPascalCaseComponentName}}Model : NSObject

+ (instancetype)newWithCount:(NSInteger)count color:(UIColor *)color;

@end


typedef void (^OnIncrement)(void);

@interface {{objcPrefix}}{{lazyPascalCaseComponentName}}Context : NSObject

+ (instancetype)newWithOnIncrement:(OnIncrement)onIncrement;

@end


@interface {{objcPrefix}}{{lazyPascalCaseComponentName}} : NSObject <CKComponentProvider>

@end

NS_ASSUME_NONNULL_END
