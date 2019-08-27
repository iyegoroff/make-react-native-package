import Foundation

@objc ({{objcPrefix}}{{lazyPascalCaseModuleName}})
class {{lazyPascalCaseModuleName}}: NSObject {

  @objc func show(_ message: String) {
    let alert = UIAlertController(title: "{{objcPrefix}}{{lazyPascalCaseModuleName}}",
                                  message: message,
                                  preferredStyle: UIAlertController.Style.actionSheet)
    alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
    RCTPresentedViewController()?.present(alert, animated: true)
  }
}
