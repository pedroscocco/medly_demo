import ActivityKit
import WidgetKit
import SwiftUI

struct WidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var questionsLeft: Int
        var currentStreak: Int
        var lessonStartTime: Date?
    }

  // Fixed non-changing properties about your activity go here!
  var lessonName: String
}

struct WidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            HStack {
                VStack(alignment: .leading, spacing: 10) {
                    Text("\(context.state.questionsLeft) questions left")
                        .font(.system(size: 24, weight: .heavy))
                        .fontDesign(.rounded)
                        .foregroundColor(.white)

                    HStack(spacing: 20) {
                        HStack(spacing: 6) {
                            Text("🔥")
                                .font(.system(size: 24))
                            Text("\(context.state.currentStreak)")
                                .font(.system(size: 22, weight: .bold))
                                .fontDesign(.rounded)
                                .foregroundColor(.orange)
                        }

                        HStack(spacing: 6) {
                            Image(systemName: "clock.fill")
                                .font(.system(size: 20))
                                .foregroundColor(.blue)
                            if let startTime = context.state.lessonStartTime {
                                Text(startTime, style: .timer)
                                    .font(.system(size: 22, weight: .bold))
                                    .fontDesign(.rounded)
                                    .foregroundColor(.blue)
                                    .monospacedDigit()
                            } else {
                                Text("-")
                                    .font(.system(size: 22, weight: .bold))
                                    .fontDesign(.rounded)
                                    .foregroundColor(.blue)
                                    .monospacedDigit()
                            }
                        }
                    }
                }.offset(y: -15)

                Spacer()

                VStack(alignment: .trailing) {
                    Text("medly")
                        .font(.system(size: 24, weight: .heavy))
                        .fontDesign(.rounded)
                        .foregroundColor(.white.opacity(0.4))
                    Text("🐼")
                        .font(.system(size: 120))
                }
                .offset(y: 38)
            }
            .padding()
            .activityBackgroundTint(Color(red: 0.094, green: 0.129, blue: 0.137))
            .activitySystemActionForegroundColor(Color.primary)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    HStack(spacing: 6) {
                        Text("🔥")
                            .font(.system(size: 20))
                        Text("\(context.state.currentStreak)")
                            .font(.system(size: 18, weight: .bold))
                            .fontDesign(.rounded)
                            .foregroundColor(.orange)
                    }
                }
                DynamicIslandExpandedRegion(.trailing) {
                    HStack(spacing: 6) {
                      Text("⏱️")
                          .font(.system(size: 20))
                        if let startTime = context.state.lessonStartTime {
                            Text(startTime, style: .timer)
                                .font(.system(size: 18, weight: .bold))
                                .fontDesign(.rounded)
                                .foregroundColor(.blue)
                                .monospacedDigit()
                        } else {
                            Text("-")
                                .font(.system(size: 18, weight: .bold))
                                .fontDesign(.rounded)
                                .foregroundColor(.blue)
                                .monospacedDigit()
                        }
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                  VStack(alignment: .leading) {
                      Text("\(context.state.questionsLeft) questions left")
                          .font(.system(size: 24, weight: .heavy))
                          .fontDesign(.rounded)
                          .foregroundColor(.white)
                          .offset(y: 15)

                      HStack {
                          Text("medly")
                              .font(.system(size: 20, weight: .heavy))
                              .fontDesign(.rounded)
                              .foregroundColor(.white.opacity(0.4))
                          Spacer()
                          Text("🐼")
                              .font(.system(size: 80))
                      }
                  }
                  .offset(y: 10)
                  .padding(.horizontal)
                  .frame(maxWidth: .infinity, alignment: .leading)
                  .activityBackgroundTint(Color(red: 0.094, green: 0.129, blue: 0.137))
                  .activitySystemActionForegroundColor(Color.primary)
                }
            } compactLeading: {
                Text("🔥 \(context.state.currentStreak)")
                    .fontDesign(.rounded)
                    .foregroundColor(.orange)
            } compactTrailing: {
              if let startTime = context.state.lessonStartTime {
                  Text("⏱️ \(startTime, style: .timer)")
                      .fontDesign(.rounded)
                      .foregroundColor(.blue)
              } else {
                  Text("⏱️ -")
                      .fontDesign(.rounded)
                      .foregroundColor(.blue)
              }
            } minimal: {
              Text("\(context.state.currentStreak)")
                  .fontDesign(.rounded)
                  .foregroundColor(.orange)
            }
            .widgetURL(URL(string: "medlydemo://practice-flow"))
            .keylineTint(Color.red)
        }
    }
}

extension WidgetAttributes {
    fileprivate static var preview: WidgetAttributes {
        WidgetAttributes(lessonName: "Math Practice")
    }
}

extension WidgetAttributes.ContentState {
    fileprivate static var inProgress: WidgetAttributes.ContentState {
        WidgetAttributes.ContentState(
            questionsLeft: 3,
            currentStreak: 5,
            lessonStartTime: Date().addingTimeInterval(-300)
        )
     }

     fileprivate static var almostDone: WidgetAttributes.ContentState {
         WidgetAttributes.ContentState(
            questionsLeft: 1,
            currentStreak: 7,
            lessonStartTime: nil
         )
     }
}

#Preview("Notification", as: .content, using: WidgetAttributes.preview) {
   WidgetLiveActivity()
} contentStates: {
    WidgetAttributes.ContentState.inProgress
    WidgetAttributes.ContentState.almostDone
}
