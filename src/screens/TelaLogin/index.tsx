import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TelaLogin"
>;

const TelaLogin: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos!");
      return;
    }

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* Logo e título */}
      <View style={styles.logoContainer}>
        {/* Troque pela logo oficial caso tenha no assets */}
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Card branco */}
      <View style={styles.card}>
        <Text style={styles.loginTitle}>LOGIN</Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o seu usuário"
          value={usuario}
          onChangeText={setUsuario}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Termo de Uso e Aviso de Privacidade
        </Text>
      </View>
    </View>
  );
};

export default TelaLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001489", // Azul de fundo
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 50,
  },
  card: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#111",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#333",
  },
});
