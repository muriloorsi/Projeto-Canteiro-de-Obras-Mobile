// src/screens/TelaLogin/index.tsx
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { styles } from "./telalogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://10.11.66.92:5000/api/auth/login";

export default function TelaLogin() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Usuário ou senha inválidos.");
        setLoading(false);
        return;
      }

      await AsyncStorage.multiSet([
        ["token", data.token],
        ["nomeUsuario", data.user.name],
        ["permissaoUsuario", data.user.permission],
        ["emailUsuario", data.user.email],
      ]);

      setLoading(false);
      navigation.navigate("Home");
    } catch (err) {
      console.error("Erro ao conectar ao backend:", err);
      setError("Erro no servidor. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>

        {/* LOGO SUPERIOR */}
        <Image
          source={require("../../assets/logo-horizontal.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* CARD BRANCO IGUAL SEU STYLE */}
        <View style={styles.innerContainer}>
          <Text style={styles.title}>LOGIN</Text>

          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#7A869A"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* SENHA */}
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

          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

          {/* BOTÃO */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
