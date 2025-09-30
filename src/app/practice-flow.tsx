import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import useSessionQuery from "../hooks/useSessioQuery";
import { useAppSessionStore } from "../store/useAppSessionStore";


export default function () {
    const router = useRouter();
    const { data, isLoading, error } = useSessionQuery();
    const fullQuestionStepsList = data?.steps || [];
    const currentSessionStep = useAppSessionStore((state) => state.currentSessionStep);

    return <View>
        <Text>{JSON.stringify(fullQuestionStepsList[currentSessionStep])}</Text>
    </View>;
}