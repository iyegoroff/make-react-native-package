package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Color
import android.view.Gravity
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.events.RCTEventEmitter

@SuppressLint("SetTextI18n")
class {{lazyPascalCaseComponentName}}(context: Context) : ViewGroup(context) {
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
    label.layoutParams = LinearLayout.LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT
    )

    button.text = "+"
    button.gravity = Gravity.CENTER
    button.setOnClickListener {
      val map = Arguments.createMap()
      map.putInt("count", count + 1)

      (getContext() as ReactContext).getJSModule(RCTEventEmitter::class.java).receiveEvent(
        id,
        "onCountChange",
        map
      )
    }
    button.layoutParams = LinearLayout.LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT
    )
    addView(label)
    addView(button)
  }

  fun setColor(color: Int) {
    setBackgroundColor(color)
  }

  override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
    val l = getLeft()
    val t = getTop()
    label.layout(left - l, top - t, right - l, bottom / 2 - t)
    button.layout(left - l, bottom / 2 - t, right - l, bottom - t)
  }
}
