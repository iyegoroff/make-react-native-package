import SwiftUI

class ButtonProps: ObservableObject {
  @Published var color: UIColor = UIColor.clear
  @Published var count: Int = 0
  @Published var onCountChange: RCTDirectEventBlock = { _ in }
}

struct {{lazyPascalCaseComponentName}}: View {
  @ObservedObject var props = ButtonProps()

  var body: some View {
    GeometryReader { geometry in
      VStack {
        Text("Count \(self.props.count)")
          .padding()

        Button(action: {
          self.props.onCountChange(["count": self.props.count + 1])
        }) {
          Image(systemName: "plus.circle.fill")
            .foregroundColor(.white)
            .padding()
            .background(Color.red)
            .clipShape(Circle())
        }
      }
      .frame(width: geometry.size.width, height: geometry.size.height, alignment: .center)
      .background(Color.init(self.props.color))
    }
  }
}
