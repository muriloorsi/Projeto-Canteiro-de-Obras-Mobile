import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/logo-metro.png")} // ajuste o caminho conforme seu projeto
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.divider} />
      <Text style={styles.title}>Canteiro de{"\n"}Obras</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 69,
    marginRight: 16,
  },
  divider: {
    width: 3,
    height: 60,
    backgroundColor: "#222",
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    color: "#111",
    fontWeight: "bold",
    flexShrink: 1,
  },
});