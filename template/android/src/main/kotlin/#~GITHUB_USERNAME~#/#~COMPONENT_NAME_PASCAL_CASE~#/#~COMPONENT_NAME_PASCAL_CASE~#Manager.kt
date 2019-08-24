package #~GITHUB_USERNAME~##~COMPONENT_NAME_PASCAL_CASE~#

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = #~COMPONENT_NAME_PASCAL_CASE~#Manager.reactClass)
class #~COMPONENT_NAME_PASCAL_CASE~#Manager : ViewGroupManager<#~COMPONENT_NAME_PASCAL_CASE~#>() {

  companion object {
    const val reactClass = "#~OBJC_PREFIX~##~COMPONENT_NAME_PASCAL_CASE~#"
  }

  override fun getName(): String {
    return reactClass
  }

  override fun createViewInstance(reactContext: ThemedReactContext): #~COMPONENT_NAME_PASCAL_CASE~# {
    return #~COMPONENT_NAME_PASCAL_CASE~#(reactContext)
  }

  @ReactProp(name = "color", customType = "Color", defaultInt = Color.RED)
  fun setColor(view: #~COMPONENT_NAME_PASCAL_CASE~#, color: Int) {
    view.setColor(color)
  }
}
