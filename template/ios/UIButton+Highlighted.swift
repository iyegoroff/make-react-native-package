import Foundation

extension UIButton {
  open override var isHighlighted: Bool {
    didSet {
      backgroundColor = isHighlighted ? UIColor.lightGray : UIColor.clear
    }
  }
}
