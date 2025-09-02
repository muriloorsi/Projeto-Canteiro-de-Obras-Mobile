import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TelaLogin() {
  console.log("TelaLogin renderizou!");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo ao Login!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#222",
    fontSize: 20,
  },
});