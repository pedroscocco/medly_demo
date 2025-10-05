import ActivityKit
import ExpoModulesCore

// MUST exactly match the WidgetAttributes struct in WidgetLiveActivity.
struct WidgetAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    // Dynamic stateful properties about your activity go here!
    var questionsLeft: Int
    var currentStreak: Int
    var lessonStartTime: Date?
  }

  // Fixed non-changing properties about your activity go here!
  var lessonName: String
}

public class ExpoLiveActivityModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoLiveActivity')` in JavaScript.
    Name("ExpoLiveActivity")

    Events("onLiveActivityCancel")

    Function("areActivitiesEnabled") { () -> Bool in
      if #available(iOS 16.2, *) {
        return ActivityAuthorizationInfo().areActivitiesEnabled
      } else {
        return false
      }
    }

    Function("isActivityInProgress") { () -> Bool in
      if #available(iOS 16.2, *) {
        return !Activity<WidgetAttributes>.activities.isEmpty
      } else {
        return false
      }
    }

    Function("startActivity") {
      (lessonName: String, lessonStartTime: Double?, questionsLeft: Int, currentStreak: Int) -> Bool in
      if #available(iOS 16.2, *) {
        let attributes = WidgetAttributes(lessonName: lessonName)
        let contentState = WidgetAttributes.ContentState(
          questionsLeft: questionsLeft,
          currentStreak: currentStreak,
          lessonStartTime: lessonStartTime.map { Date(timeIntervalSince1970: $0) }
        )
        let activityContent = ActivityContent(state: contentState, staleDate: nil)
        do {
          let activity = try Activity.request(attributes: attributes, content: activityContent)
          NotificationCenter.default.addObserver(
            self, selector: #selector(self.onLiveActivityCancel),
            name: Notification.Name("onLiveActivityCancel"), object: nil)
          return true
        } catch (let error) {

          return false
        }
      } else {
        return false
      }
    }

    Function("updateActivity") {
      (questionsLeft: Int, currentStreak: Int, lessonStartTime: Double?) -> Void in
      if #available(iOS 16.2, *) {
        Task {
          for activity in Activity<WidgetAttributes>.activities {
            let newState = WidgetAttributes.ContentState(
              questionsLeft: questionsLeft,
              currentStreak: currentStreak,
              lessonStartTime: lessonStartTime.map { Date(timeIntervalSince1970: $0) }
            )
            await activity.update(using: newState)
          }
        }
      }
    }

    Function("endActivity") { () -> Void in
      if #available(iOS 16.2, *) {
        Task {
          for activity in Activity<WidgetAttributes>.activities {
            await activity.end(nil, dismissalPolicy: .immediate)
          }
        }

        NotificationCenter.default.removeObserver(
          self, name: Notification.Name("onLiveActivityCancel"), object: nil)
      }
    }
  }

  @objc
  func onLiveActivityCancel() {
    sendEvent("onLiveActivityCancel", [:])
  }
}
