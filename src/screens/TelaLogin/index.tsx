import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./telalogin";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaLogin">;

const API_URL = "http://10.0.2.2:5000/api/auth/login";

const TEST_MODE = true;
const TEST_EMAIL = "teste@admin.com";
const TEST_PASSWORD = "1234";
const TEST_TOKEN = "token_teste_local";

export default function TelaLogin() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Usuário ou senha inválidos. Tente novamente.");
      return;
    }

    // --- Furo temporário para testes ---
    if (TEST_MODE && email === TEST_EMAIL && password === TEST_PASSWORD) {
      try {
        await AsyncStorage.setItem("token", TEST_TOKEN);
        await AsyncStorage.setItem("nomeUsuario", "Usuário Teste");
        await AsyncStorage.setItem("permissaoUsuario", "admin");
        await AsyncStorage.setItem("emailUsuario", email);

        navigation.navigate("Home");
        return;
      } catch (err) {
        setError("Erro interno de teste. Verifique o console.");
        return;
      }
    }
    // --- Fim do furo temporário ---

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Usuário ou senha inválidos. Tente novamente.");
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("nomeUsuario", data.user.name);
      await AsyncStorage.setItem("permissaoUsuario", data.user.permission);
      await AsyncStorage.setItem("emailUsuario", data.user.email);

      navigation.navigate("Home");
    } catch (err) {
      console.error("Falha na requisição:", err);
      Alert.alert("Erro de Conexão", "Não foi possível se conectar ao servidor. Verifique sua rede.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-horizontal.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o seu usuário"
            placeholderTextColor="#7A869A"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#7A869A"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Mensagem de erro exibida logo abaixo do campo de senha */}
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {TEST_MODE && (
          <Text style={styles.helperText}>
            Modo de teste ativo — atalho: {TEST_EMAIL} / {TEST_PASSWORD}
          </Text>
        )}
      </View>
    </View>
  );
}
