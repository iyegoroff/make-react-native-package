package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import androidx.compose.Composable
import androidx.lifecycle.MutableLiveData
import androidx.ui.core.Alignment
import androidx.ui.core.Modifier
import androidx.ui.foundation.Text
import androidx.ui.graphics.Color
import androidx.ui.layout.*
import androidx.ui.livedata.observeAsState
import androidx.ui.material.Button
import androidx.ui.material.Surface
import androidx.ui.tooling.preview.Preview
import androidx.ui.unit.Dp

@Composable
fun {{lazyPascalCaseComponentName}}(
  defaultCount: Int,
  defaultColor: Color,
  count: MutableLiveData<Int>,
  color: MutableLiveData<Color>,
  onIncrement: () -> Unit
) {
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
        onClick = onIncrement
      ) {
        Text("+")
      }
    }
  }
}

@Preview
@Composable
fun {{lazyPascalCaseComponentName}}Preview() {
  val defaultCount = 0
  val defaultColor = Color.Magenta
  val count = MutableLiveData(defaultCount)
  val color = MutableLiveData(defaultColor)
  val increment = fun () { count.value = (count.value ?: defaultCount) + 1 }

  {{lazyPascalCaseComponentName}}(
    defaultCount = defaultCount,
    defaultColor = defaultColor,
    count = count,
    color = color,
    onIncrement = increment
  )
}
