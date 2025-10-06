import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/practice-flow/SortQuestion.styles";
import { AnswerOption } from "../../types";
import DraggableItem from "./DraggableItem";

interface SortQuestionProps {
  heading: string;
  options: AnswerOption[];
  categories: string[];
  currentAnswer: { [key: string]: string[] };
  onAnswerChange: (categoryMapping: { [key: string]: string[] }) => void;
  disabled?: boolean;
}

export default function SortQuestion({
  heading,
  options,
  categories,
  currentAnswer,
  onAnswerChange,
  disabled = false,
}: SortQuestionProps) {
  // Calculate unassigned items based on currentAnswer
  const placedItems = Object.values(currentAnswer).flat();
  const unassignedItems = options
    .map((opt) => opt.option)
    .filter((item) => !placedItems.includes(item));

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemPress = (item: string) => {
    if (disabled) return;
    setSelectedItem(item);
  };

  const handleCategoryPress = (category: string) => {
    if (disabled || !selectedItem) return;

    // Ensure all categories exist in the answer object
    const newCategoryItems: { [key: string]: string[] } = {};
    categories.forEach((cat) => {
      newCategoryItems[cat] = currentAnswer[cat] || [];
    });

    // Check if item is already in a category, remove it from there
    Object.keys(newCategoryItems).forEach((cat) => {
      newCategoryItems[cat] = newCategoryItems[cat].filter(
        (i) => i !== selectedItem,
      );
    });

    // Add to the selected category
    newCategoryItems[category] = [...newCategoryItems[category], selectedItem];

    setSelectedItem(null);

    // Notify parent of change
    onAnswerChange(newCategoryItems);
  };

  const handleItemInCategoryPress = (item: string, fromCategory: string) => {
    if (disabled) return;
    setSelectedItem(item);
  };

  return (
    <ScrollView>
      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{heading}</Text>
      </View>

      {/* Categories Grid */}
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryBox,
                selectedItem && styles.categoryBoxActive,
              ]}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={selectedItem ? 0.7 : 1}
            >
              <Text style={styles.categoryLabel}>{category}</Text>
              <View style={styles.categoryItems}>
                {currentAnswer[category]?.map((item) => (
                  <DraggableItem
                    key={item}
                    text={item}
                    isSelected={selectedItem === item}
                    onPress={() => handleItemInCategoryPress(item, category)}
                    style={styles.itemInCategory}
                    activeStyle={styles.draggableItemActive}
                    textStyle={styles.itemInCategoryText}
                  />
                ))}
              </View>
            </TouchableOpacity>
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
              isSelected={selectedItem === item}
              onPress={() => handleItemPress(item)}
              style={styles.draggableItem}
              activeStyle={styles.draggableItemActive}
              textStyle={styles.draggableItemText}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
