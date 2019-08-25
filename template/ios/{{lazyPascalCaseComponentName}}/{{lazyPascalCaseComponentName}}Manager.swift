import Foundation

@objc ({{objcPrefix}}{{lazyPascalCaseComponentName}}Manager)
class {{lazyPascalCaseComponentName}}Manager: RCTViewManager {

  override func view() -> UIView! {
    return {{lazyPascalCaseComponentName}}()
  }
}
