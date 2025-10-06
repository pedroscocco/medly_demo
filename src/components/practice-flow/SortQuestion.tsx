import React, { useState } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "../../styles/practice-flow/SortQuestion.styles";
import { AnswerOption } from "../../types";
import { swipeEntering, swipeExiting } from "../../utils/swipeAnimations";
import CategoryBox from "./CategoryBox";
import DraggableItem from "./DraggableItem";
import { DropZonesProvider } from "./DropZonesContext";

interface SortQuestionProps {
  heading: string;
  options: AnswerOption[];
  categories: string[];
  currentAnswer: { [key: string]: string[] };
  onAnswerChange: (categoryMapping: { [key: string]: string[] }) => void;
  disabled?: boolean;
  lockedItems?: { [key: string]: boolean };
  isFirstQuestion?: boolean;
}

export default function SortQuestion({
  heading,
  options,
  categories,
  currentAnswer,
  onAnswerChange,
  disabled = false,
  lockedItems = {},
  isFirstQuestion = false,
}: SortQuestionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Calculate unassigned items based on currentAnswer
  const placedItems = Object.values(currentAnswer).flat();
  const unassignedItems = options
    .map((opt) => opt.option)
    .filter((item) => !placedItems.includes(item));

  const handleDrop = (item: string, categoryId: string) => {
    if (disabled) return;

    // Don't allow moving locked items
    if (!!lockedItems[item]) return;

    // Ensure all categories exist in the answer object
    const newCategoryItems: { [key: string]: string[] } = {};
    categories.forEach((cat) => {
      newCategoryItems[cat] = currentAnswer[cat] || [];
    });

    // Remove item from all categories
    Object.keys(newCategoryItems).forEach((cat) => {
      newCategoryItems[cat] = newCategoryItems[cat].filter((i) => i !== item);
    });

    // Add to the dropped category
    newCategoryItems[categoryId] = [...newCategoryItems[categoryId], item];

    // Notify parent of change
    onAnswerChange(newCategoryItems);
  };

  return (
    <DropZonesProvider>
      <Animated.View
        entering={isFirstQuestion ? undefined : swipeEntering}
        exiting={swipeExiting}
        key={heading}
      >
        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{heading}</Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryBox
                key={category}
                categoryId={category}
                label={category}
                style={styles.categoryBox}
                isHovered={hoveredCategory === category}
              >
                <View style={styles.categoryItems}>
                  {currentAnswer[category]?.map((item) => (
                    <DraggableItem
                      key={item}
                      text={item}
                      onDrop={handleDrop}
                      onHover={setHoveredCategory}
                      isLocked={!!lockedItems[item]}
                    />
                  ))}
                </View>
              </CategoryBox>
            ))}
          </View>
        </View>

        {/* Draggable Items Area */}
        {unassignedItems.length > 0 && (
          <View style={styles.draggableArea}>
            {unassignedItems.map((item) => (
              <DraggableItem
                key={item}
                text={item}
                onDrop={handleDrop}
                onHover={setHoveredCategory}
                isLocked={false}
              />
            ))}
          </View>
        )}
      </Animated.View>
    </DropZonesProvider>
  );
}
