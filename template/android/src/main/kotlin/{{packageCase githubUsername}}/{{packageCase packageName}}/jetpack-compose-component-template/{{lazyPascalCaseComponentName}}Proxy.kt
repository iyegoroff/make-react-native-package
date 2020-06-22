package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.annotation.SuppressLint
import android.content.Context
import android.widget.FrameLayout
import androidx.compose.*
import androidx.lifecycle.MutableLiveData
import androidx.ui.core.setContent
import androidx.ui.graphics.Color
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

@SuppressLint("SetTextI18n")
class {{lazyPascalCaseComponentName}}Proxy(context: Context) : FrameLayout(context) {
  private val defaultCount = 0
  private val defaultColor = Color.Transparent

  init {
    setContent(Recomposer.current()) {
      {{lazyPascalCaseComponentName}}(
        defaultCount = defaultCount,
        defaultColor = defaultColor,
        count = count,
        color = color,
        onIncrement = this::increment
      )
    }
  }

  val count = MutableLiveData(defaultCount)
  val color = MutableLiveData(defaultColor)

  private fun increment() {
    val map = Arguments.createMap()
    map.putInt("count", (count.value ?: defaultCount) + 1)

    (context as ReactContext).getJSModule(RCTEventEmitter::class.java).receiveEvent(
      id,
      "onCountChange",
      map
    )
  }
}
