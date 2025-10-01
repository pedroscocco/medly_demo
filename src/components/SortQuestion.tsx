import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AnswerOption } from "../types";
import { styles } from "../styles/SortQuestion.styles";

interface SortQuestionProps {
  heading: string;
  options: AnswerOption[];
  categories: string[];
  onAnswerChange: (categoryMapping: { [key: string]: string[] }) => void;
  disabled?: boolean;
}

export default function SortQuestion({
  heading,
  options,
  categories,
  onAnswerChange,
  disabled = false,
}: SortQuestionProps) {
  // State: { categoryName: [itemTexts] }
  const [categoryItems, setCategoryItems] = useState<{
    [key: string]: string[];
  }>(() => {
    // Initialize empty arrays for each category
    const initial: { [key: string]: string[] } = {};
    categories.forEach((cat) => {
      initial[cat] = [];
    });
    return initial;
  });

  // Items that haven't been placed in any category yet
  const [unassignedItems, setUnassignedItems] = useState<string[]>(
    options.map((opt) => opt.option)
  );

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemPress = (item: string) => {
    if (disabled) return;
    setSelectedItem(item);
  };

  const handleCategoryPress = (category: string) => {
    if (disabled || !selectedItem) return;

    // Check if item is already in a category, remove it from there
    const newCategoryItems = { ...categoryItems };
    Object.keys(newCategoryItems).forEach((cat) => {
      newCategoryItems[cat] = newCategoryItems[cat].filter(
        (i) => i !== selectedItem
      );
    });

    // Add to the selected category
    newCategoryItems[category] = [...newCategoryItems[category], selectedItem];

    // Remove from unassigned if it was there
    const newUnassigned = unassignedItems.filter((i) => i !== selectedItem);

    setCategoryItems(newCategoryItems);
    setUnassignedItems(newUnassigned);
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
                {categoryItems[category].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.itemInCategory}
                    onPress={() => handleItemInCategoryPress(item, category)}
                  >
                    <Text style={styles.itemInCategoryText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Draggable Items Area */}
      {unassignedItems.length > 0 && (
        <View style={styles.draggableArea}>
          {unassignedItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.draggableItem,
                selectedItem === item && styles.draggableItemActive,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.draggableItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
