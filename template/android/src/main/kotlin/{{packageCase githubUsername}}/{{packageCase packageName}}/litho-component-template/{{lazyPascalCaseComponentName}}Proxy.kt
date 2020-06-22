package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Color
import android.widget.FrameLayout
import com.facebook.litho.*
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

@SuppressLint("SetTextI18n")
class {{lazyPascalCaseComponentName}}Proxy(context: Context) : FrameLayout(context) {
  private val ctx = ComponentContext(context)
  private val lithoView = LithoView.create(ctx, render())

  init {
    addView(lithoView)
  }

  var count = 0
    set(value) {
      field = value
      lithoView.setComponentAsync(render())
    }

  var color = Color.TRANSPARENT
    set(value) {
      field = value
      lithoView.setComponentAsync(render())
    }

  private fun render() =
    {{lazyPascalCaseComponentName}}.create(ctx)
      .count(count)
      .color(color)
      .increment(this::increment)
      .build()

  private fun increment() {
    val map = Arguments.createMap()
    map.putInt("count", count + 1)

    (context as ReactContext).getJSModule(RCTEventEmitter::class.java).receiveEvent(
      id,
      "onCountChange",
      map
    )
  }
}
