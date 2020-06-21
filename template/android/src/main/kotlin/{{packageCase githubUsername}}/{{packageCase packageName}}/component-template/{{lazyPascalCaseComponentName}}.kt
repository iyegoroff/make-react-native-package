package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.annotation.SuppressLint
import android.content.Context
import android.view.Gravity
import android.widget.Button
import android.widget.FrameLayout
import android.widget.TextView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

@SuppressLint("SetTextI18n")
class {{lazyPascalCaseComponentName}}(context: Context) : FrameLayout(context) {
  private val label = TextView(context)
  private val button = Button(context)
  var count = 0
    set(value) {
      field = value
      label.text = "Count: $value"
    }

  init {
    label.text = "Count: 0"
    label.gravity = Gravity.CENTER
    label.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)

    button.text = "+"
    button.layoutParams = LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.WRAP_CONTENT,
      Gravity.BOTTOM
    )
    button.setOnClickListener {
      val map = Arguments.createMap()
      map.putInt("count", count + 1)

      (getContext() as ReactContext).getJSModule(RCTEventEmitter::class.java).receiveEvent(
        id,
        "onCountChange",
        map
      )
    }

    addView(label)
    addView(button)
  }

  fun setColor(color: Int) {
    setBackgroundColor(color)
  }
}
