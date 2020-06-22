package {{packageCase githubUsername}}.{{packageCase packageName}}.{{lazyPackageCaseComponentName}}

import android.annotation.SuppressLint
import android.graphics.Color
import android.view.MotionEvent
import android.view.View
import com.facebook.litho.Column
import com.facebook.litho.Component
import com.facebook.litho.ComponentContext
import com.facebook.litho.TouchEvent
import com.facebook.litho.annotations.*
import com.facebook.litho.widget.Text
import com.facebook.litho.widget.TextAlignment
import com.facebook.litho.widget.VerticalGravity
import com.facebook.yoga.YogaAlign
import com.facebook.yoga.YogaEdge
import com.facebook.yoga.YogaJustify

@LayoutSpec
object {{lazyPascalCaseComponentName}}Spec {
  @OnCreateLayout
  fun onCreateLayout(ctx: ComponentContext, @Prop count: Int, @Prop color: Int): Component =
    Column.create(ctx)
      .backgroundColor(color)
      .paddingDip(YogaEdge.ALL, 5.0f)
      .justifyContent(YogaJustify.SPACE_BETWEEN)
      .alignItems(YogaAlign.CENTER)
      .child(
        Text.create(ctx)
          .text("Count $count")
      )
      .child(
        Text.create(ctx)
          .text("+")
          .touchHandler({{lazyPascalCaseComponentName}}.onIncrement(ctx))
          .alignment(TextAlignment.CENTER)
          .backgroundColor(Color.LTGRAY)
          .verticalGravity(VerticalGravity.CENTER)
          .widthPercent(100.0f)
          .heightPercent(50.0f)
      )
      .build()

  @OnEvent(TouchEvent::class)
  fun onIncrement(
    @SuppressLint("UNUSED_PARAMETER") ctx: ComponentContext,
    @FromEvent view: View,
    @FromEvent motionEvent: MotionEvent,
    @Prop increment: () -> Unit
  ): Boolean {
    view.alpha = if (motionEvent.action == MotionEvent.ACTION_UP) 1.0f else 0.5f

    if (motionEvent.action == MotionEvent.ACTION_UP) {
      increment()
    }

    return true
  }
}
