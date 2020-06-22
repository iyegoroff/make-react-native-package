package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.annotation.SuppressLint
import android.content.Context
import android.widget.FrameLayout
import androidx.compose.*
import androidx.lifecycle.MutableLiveData
import androidx.ui.core.Alignment
import androidx.ui.core.Modifier
import androidx.ui.core.setContent
import androidx.ui.foundation.Text
import androidx.ui.graphics.Color
import androidx.ui.layout.*
import androidx.ui.material.Button
import androidx.ui.unit.Dp
import androidx.ui.livedata.observeAsState
import androidx.ui.material.Surface
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

@SuppressLint("SetTextI18n")
class {{lazyPascalCaseComponentName}}(context: Context) : FrameLayout(context) {
  private val defaultCount = 0
  private val defaultColor = Color.Transparent

  init {
    setContent(Recomposer.current()) {
      val counter = count.observeAsState(initial = defaultCount)
      val backgroundColor = color.observeAsState(initial = defaultColor)

      Surface(color = backgroundColor.value) {
        Column(
          modifier = Modifier.fillMaxSize().padding(all = Dp(5.0f)),
          verticalArrangement = Arrangement.SpaceBetween,
          horizontalGravity = Alignment.CenterHorizontally
        ) {
          Text(text = "Count ${counter.value}")
          Button(
            modifier = Modifier.fillMaxWidth(),
            onClick = this@{{lazyPascalCaseComponentName}}::increment
          ) {
            Text("+")
          }
        }
      }
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
