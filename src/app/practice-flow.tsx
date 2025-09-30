import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CheckButton from "../components/CheckButton";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import QuestionHeader from "../components/QuestionHeader";
import useSessionQuery from "../hooks/useSessioQuery";
import { useAppSessionStore } from "../store/useAppSessionStore";
import { colors, fontSize } from "../styles/designSystem";

export default function () {
    const router = useRouter();
    const { data, isLoading, error } = useSessionQuery();
    const fullQuestionStepsList = data?.steps || [];
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const currentSessionStep = useAppSessionStore(
        (state) => state.currentSessionStep
    );
    const setNextStep = useAppSessionStore(
        (state) => state.setNextStep
    );
    const setCurrentSessionStep = useAppSessionStore(
        (state) => state.setCurrentSessionStep
    );

    const currentQuestion = fullQuestionStepsList[currentSessionStep];

    const edgeCaseView = renderEdgeCase(isLoading, error, currentQuestion);
    if (edgeCaseView) {
        return edgeCaseView;
    }

    const handleCheck = () => {
        // For now, just move to next question
        // TODO: Validate answer and show feedback
        if (currentSessionStep < fullQuestionStepsList.length - 1) {
            setNextStep();
            setSelectedAnswer(null); // Reset selection for next question
        } else {
            // Finished all questions, go back to home
            setCurrentSessionStep(0);
            router.push("/" as any);
        }
    };

    const handleClose = () => {
        setCurrentSessionStep(0);
        router.dismissTo("/" as any);
    };

    // Render based on question type
    return (
        <View style={styles.container}>
            <QuestionHeader
                currentStep={currentSessionStep}
                totalSteps={fullQuestionStepsList.length}
                questionType="Multiple choice"
                onClose={handleClose}
            />
            {
                currentQuestion.questionData.questionType === "mcq" ?
                    (<MultipleChoiceQuestion
                        heading={currentQuestion.heading}
                        options={currentQuestion.questionData.options}
                        selectedAnswer={selectedAnswer}
                        onSelectAnswer={setSelectedAnswer}
                    />) : <View style={{height: '70%', alignItems:'center', justifyContent:'center'}}><Text>Unsupported question type</Text></View>
            }

            <CheckButton onPress={handleCheck} disabled={!selectedAnswer} />
        </View>
    );

}

function renderEdgeCase(isLoading: boolean, error: any, currentQuestion: any): React.ReactElement | null {
    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error loading questions</Text>
            </View>
        );
    }

    if (!currentQuestion) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No question found</Text>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 50,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: fontSize.sm,
        color: colors.error,
    },
});