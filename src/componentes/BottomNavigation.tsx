import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function BottomNavigation() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={require("../../assets/home.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("TelaGerenciamentoUsuario")}>
        <Image source={require("../../assets/usuarios.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("TelaRelatorios")}>
        <Image source={require("../../assets/relatorio.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("TelaCriarProjeto")}>
        <Image source={require("../../assets/add.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("TelaUsuario")}>
        <Image source={require("../../assets/perfil.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    backgroundColor: "#001489",
    width: 360,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    elevation: 8,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
  },
});