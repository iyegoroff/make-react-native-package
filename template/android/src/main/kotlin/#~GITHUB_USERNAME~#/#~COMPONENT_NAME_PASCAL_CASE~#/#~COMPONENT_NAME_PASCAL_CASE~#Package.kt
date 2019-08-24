package #~GITHUB_USERNAME~##~COMPONENT_NAME_PASCAL_CASE~#

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class #~COMPONENT_NAME_PASCAL_CASE~#Package : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf()
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(#~COMPONENT_NAME_PASCAL_CASE~#Manager())
  }
}
