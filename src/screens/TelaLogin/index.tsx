import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import styles from "./telalogin";

export default function TelaLogin() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo-metro.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>LOGIN</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o seu usuario"
            placeholderTextColor="#7A869A"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#7A869A"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}