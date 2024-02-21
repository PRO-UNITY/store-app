import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
interface CategoryProp {
  name: string;
  id: number;
  activeCategory: number;
  setActiveCategory: any;
  handleFilter: any;
}
const Categories: React.FC<CategoryProp> = ({
  name,
  id,
  activeCategory,
  setActiveCategory,
  handleFilter,
}) => {
  return (
    <Pressable
      onPress={() => {
        setActiveCategory(id);
        handleFilter(id);
      }}
      style={[
        styles.categoryCard,
        { backgroundColor: id == activeCategory ? "#8BA4D9" : "#eeeff3" },
      ]}
    >
      <Text
        style={{
          color: id == activeCategory ? "#fff" : "#526caf",
          fontSize: 16,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default Categories;
const styles = StyleSheet.create({
  categoryCard: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 15,
  },
});
