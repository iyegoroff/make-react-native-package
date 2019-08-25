package {{packageCase githubUsername}}.{{packageCase packageName}}

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

{{#each modules}}
import {{packageCase ../githubUsername}}.{{packageCase ../packageName}}.{{packageCase this}}.{{pascalCase this}}Manager
{{/each}}
{{#each components}}
import {{packageCase ../githubUsername}}.{{packageCase ../packageName}}.{{packageCase this}}.{{pascalCase this}}Manager
{{/each}}

class {{pascalCase packageName}}Package : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    {{#if modules.length}}
    return listOf(
    {{#each modules}}
      {{pascalCase this}}Manager(){{#unless @last}},{{/unless}}
    {{/each}}
    )
    {{else}}
    return listOf()
    {{/if}}
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    {{#if components.length}}
    return listOf(
    {{#each components}}
      {{pascalCase this}}Manager(){{#unless @last}},{{/unless}}
    {{/each}}
    )
    {{else}}
    return listOf()
    {{/if}}
  }
}
