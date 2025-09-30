import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Button, Text, View } from "react-native";
import fetch_questions from "../api/fetch_questions";
import { QuestionsContext } from "./_layout";

export default function Index() {
  const router = useRouter()
  const [questionsSpec, setQuestionsSpec] = useContext<any>(QuestionsContext);


  const callAPI = async () => {
    const response = await fetch_questions();
    const formatedResponse = response.steps.reduce(
      (formated, question) => {
        return {...formated, [question.index]: question };
      }, {});
    console.log(formatedResponse);
    setQuestionsSpec(formatedResponse);
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen. {Object.values(questionsSpec).length}</Text>

      <Button title='Start Questions Flow' onPress={() => router.push("/0")}></Button>
    </View>
  );
}
