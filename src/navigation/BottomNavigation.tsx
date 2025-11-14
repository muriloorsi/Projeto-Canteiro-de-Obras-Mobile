import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "./AppNavigator";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function BottomNavigation() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const handleLogout = () => {
    Alert.alert(
      "Confirmar Saída",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => navigation.navigate("TelaLogin") },
      ]
    );
  };

  // Função para verificar se a tela atual está ativa
  const isActive = (screenName: keyof RootStackParamList) => route.name === screenName;

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TelaUsuario")}
        style={[styles.button, isActive("TelaUsuario") && styles.activeButton]}
      >
        <Image
          source={require("../assets/perfil.png")}
          style={[styles.icon, isActive("TelaUsuario") && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("TelaRelatorios")}
        style={[styles.button, isActive("TelaRelatorios") && styles.activeButton]}
      >
        <Image
          source={require("../assets/relatorio.png")}
          style={[styles.icon, isActive("TelaRelatorios") && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={[styles.button, isActive("Home") && styles.activeButton]}
      >
        <Image
          source={require("../assets/home.png")}
          style={[styles.icon, isActive("Home") && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={[styles.button, isActive("Home") && styles.activeButton]}
      >
        <Image
          source={require("../assets/home.png")}
          style={[styles.icon, isActive("Home") && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("TelaCriarProjeto")}
        style={[styles.button, isActive("TelaCriarProjeto") && styles.activeButton]}
      >
        <Image
          source={require("../assets/add.png")}
          style={[styles.icon, isActive("TelaCriarProjeto") && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.button, isActive("TelaLogin") && styles.activeButton]}
      >
        <Image
          source={require("../assets/sair.png")}
          style={[styles.icon, isActive("TelaLogin") && styles.activeIcon]}
        />
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
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    elevation: 10,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    borderRadius: 50,
  },
  activeButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: "#FFFFFF", // cor padrão (inativo)
  },
  activeIcon: {
    tintColor: "#001489", // cor quando ativo
  },
});
