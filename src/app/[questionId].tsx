import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import { QuestionsContext } from "./_layout";


export default function () {
    const router = useRouter();
    const [questionsSpec, setQuestionsSpec] = useContext<any>(QuestionsContext);

    const questionId = parseInt(useLocalSearchParams()['questionId']);

    const selectedQuestion = questionsSpec[questionId];
    console.log(selectedQuestion);

    return <View>
        {selectedQuestion.questionData.questionType == 'mcq' ?
            <MultipleChoiceQuestion questionSpec={selectedQuestion}/> :
            null}
    </View>;
}


function MultipleChoiceQuestion({questionSpec}) {
    return <View style={{alignItems: 'center', gap=20}}>
        <Text>{questionSpec.title}</Text>
        <Text>{questionSpec.heading}</Text>
    </View>;
}