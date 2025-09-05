import React from "react";
import { View, Text } from "react-native";
import Header from "../../Header/header";
import BottomNavigation from "../../componentes/BottomNavigation";

export default function TelaHome() {
  return (
    <View style={{ flex: 1, backgroundColor: "#001489" }}>
      <Header />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Tela Home</Text>
      </View>
      <BottomNavigation />
    </View>
  );
}