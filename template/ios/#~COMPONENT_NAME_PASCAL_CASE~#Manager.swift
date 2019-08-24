import Foundation

@objc (#~OBJC_PREFIX~##~COMPONENT_NAME_PASCAL_CASE~#Manager)
class #~COMPONENT_NAME_PASCAL_CASE~#Manager: RCTViewManager {

  override func view() -> UIView! {
    return #~COMPONENT_NAME_PASCAL_CASE~#()
  }
}
