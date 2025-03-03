import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";
import Colors from "./../../constants/Colors";

export default function Category({ onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Category"));
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategoryList(categories);

      if (categories.length > 0) {
        setSelectedCategory(categories[0].id);
        onCategorySelect(categories[0].name);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
    onCategorySelect(category.name);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Categories</Text>
      <FlatList
        data={categoryList}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.PRIMARY,
    marginBottom: 15,
  },
  listContent: {
    paddingVertical: 5,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    width: 90,
    height: 90,
    elevation: 3,
  },
  selectedCategory: {
    backgroundColor: Colors.BG,
  },
  imageContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    padding: 5,
    marginBottom: 5,
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryName: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});
