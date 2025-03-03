import { ScrollView, View, Text } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";

export default function Home() {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingTop: 40, 
      }}
    >
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Pet List by Category */}
      <PetListByCategory />
      {/* Add new pet option */}
      <View
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#f9f9f9",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Add New Pet</Text>
      </View>
    </ScrollView>
  );
}
