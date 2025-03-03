import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");
const itemSize = width * 0.43;

export default function PetListItem({ pet }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pet.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {pet.name}
        </Text>
        <Text style={styles.breed} numberOfLines={1}>
          {pet.breed}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: itemSize,
    height: itemSize,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    padding: 8,
    height: "30%",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginBottom: 2,
  },
  breed: {
    fontSize: 12,
    color: Colors.GRAY,
  },
});