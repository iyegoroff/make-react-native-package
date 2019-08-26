package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.content.Context
import android.view.View

class {{lazyPascalCaseComponentName}}(context: Context) : View(context) {

  fun setColor(color: Int) {
    setBackgroundColor(color)
  }
}
