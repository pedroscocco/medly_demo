import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import useSessionQuery from "../hooks/useSessioQuery";

export default function Index() {
  const router = useRouter();
  // const setSession = useAppSessionStore((state) => state.setSession);

  const { data, isLoading, error } = useSessionQuery();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading questions: {error.message}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Questions loaded: {data?.steps.length || 0}</Text>
      <Button
        title='Start Questions Flow'
        onPress={() => router.push('./practice-flow' )}
      />
    </View>
  );
}
