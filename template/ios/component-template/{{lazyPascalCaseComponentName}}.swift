import Foundation

class {{lazyPascalCaseComponentName}}: UIView {
  private var label = UILabel()
  private var button = UIButton()

  public init() {
    super.init(frame: CGRect.zero)

    label.text = "Count: 0"
    label.textAlignment = NSTextAlignment.center

    button.setTitle("+", for: UIControl.State.normal)

    button.addTarget(
      self,
      action: #selector({{lazyPascalCaseComponentName}}.updateCount),
      for: UIControl.Event.touchUpInside)

    button.setBackgroundImage(UIImage.new(with: UIColor.lightGray), for: UIControl.State.normal)
    button.setBackgroundImage(UIImage.new(with: UIColor.clear), for: UIControl.State.highlighted)

    addSubview(label)
    addSubview(button)
  }

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  override func draw(_ rect: CGRect) {
    super.draw(rect)

    (button.frame, label.frame) = rect.divided(
      atDistance: rect.height / 2,
      from: CGRectEdge.maxYEdge)
  }

  @objc var onCountChange: RCTDirectEventBlock = { _ in }

  @objc var count: NSInteger = 0 {
    didSet {
      label.text = "Count: \(count)"
    }
  }

  @objc func setColor(_ color: UIColor) {
    backgroundColor = color
  }

  @objc func updateCount() {
    onCountChange(["count": count + 1])
  }
}
