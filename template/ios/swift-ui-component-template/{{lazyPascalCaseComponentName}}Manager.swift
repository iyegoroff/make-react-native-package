import Foundation

@objc ({{objcPrefix}}{{lazyPascalCaseComponentName}}Manager)
class {{lazyPascalCaseComponentName}}Manager: RCTViewManager {

  override func view() -> UIView! {
    let proxy = {{lazyPascalCaseComponentName}}Proxy()
    let view = proxy.view
    {{lazyPascalCaseComponentName}}Proxy.storage[NSValue(nonretainedObject: view)] = proxy

    return view
  }
}
