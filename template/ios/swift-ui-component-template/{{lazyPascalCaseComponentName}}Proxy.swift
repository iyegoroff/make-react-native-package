import SwiftUI

@objcMembers open class {{lazyPascalCaseComponentName}}Proxy: NSObject {
  private var ctrl = UIHostingController(rootView: {{lazyPascalCaseComponentName}}())

  public static let storage = NSMutableDictionary()

  open var color: UIColor {
    set { ctrl.rootView.props.color = newValue }
    get { return ctrl.rootView.props.color }
  }

  open var count: Int {
    set { ctrl.rootView.props.count = newValue }
    get { return ctrl.rootView.props.count }
  }

  open var onCountChange: RCTBubblingEventBlock {
    set { ctrl.rootView.props.onCountChange = newValue }
    get { return ctrl.rootView.props.onCountChange }
  }

  open var view: UIView {
    return ctrl.view
  }
}
