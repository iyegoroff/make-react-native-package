package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.graphics.Color
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = {{lazyPascalCaseComponentName}}Manager.reactClass)
class {{lazyPascalCaseComponentName}}Manager : SimpleViewManager<{{lazyPascalCaseComponentName}}>() {

  companion object {
    const val reactClass = "{{objcPrefix}}{{lazyPascalCaseComponentName}}"
  }

  override fun getName(): String {
    return reactClass
  }

  override fun createViewInstance(reactContext: ThemedReactContext): {{lazyPascalCaseComponentName}} {
    return {{lazyPascalCaseComponentName}}(reactContext)
  }

  @ReactProp(name = "color", customType = "Color", defaultInt = Color.RED)
  fun setColor(view: {{lazyPascalCaseComponentName}}, color: Int) {
    view.setColor(color)
  }

  @ReactProp(name = "count")
  fun setCount(view: Swipeable, count: Int) {
    view.count = count
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return MapBuilder.of(
      "onCountChange",
      MapBuilder.of("registrationName", "onCountChange")
    )
  }
}
