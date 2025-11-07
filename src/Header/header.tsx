import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.section}>
        <Image
          source={require("../../src/assets/logo-metro.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.title}>Metro SP -{"\n"}Canteiro de Obras</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#001489",
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: "center"
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 69,
  },
  divider: {
    width: 3,
    height: 60,
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});