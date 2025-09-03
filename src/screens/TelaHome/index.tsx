import React from "react";
import { View, Text } from "react-native";
import Header from "../../Header/header";

export default function TelaHome() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Tela Home</Text>
      </View>
    </View>
  );
}