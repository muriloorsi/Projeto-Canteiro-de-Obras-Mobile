import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function BottomNavigation() {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    Alert.alert(
      "Confirmar Saída", // Título do alerta
      "Tem certeza que deseja sair da sua conta?", // Mensagem do alerta
      [
        {
          text: "Cancelar", // Botão para cancelar a ação
          onPress: () => console.log("Saída cancelada"),
          style: "cancel",
        },
        {
          text: "Confirmar", // Botão para confirmar a ação
          onPress: () => navigation.navigate("TelaLogin"), // Navega para a tela de login
        },
      ],
      { cancelable: false } // Impede que o usuário feche o alerta clicando fora
    );
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={require("../../assets/sair.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("TelaRelatorios")}>
        <Image source={require("../../assets/relatorio.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={require("../../assets/home.png")} style={styles.icon} />
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