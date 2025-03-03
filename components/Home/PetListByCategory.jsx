import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./PetListItem";
import Category from "./Category";
import Colors from "../../constants/Colors";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      getPetsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const getPetsByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, "Pets"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const pets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPetList(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError("Failed to fetch pets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Category
        onCategorySelect={(category) => setSelectedCategory(category)}
      />
      {selectedCategory && (
        <Text style={styles.categoryTitle}>Pets in {selectedCategory}</Text>
      )}
      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={petList}
          horizontal={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PetListItem pet={item} />}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No pets found in this category.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginVertical: 10,
  },
  listContent: {
    paddingVertical: 10,
  },
  errorText: {
    color: Colors.ERROR,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyText: {
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 10,
  },
});