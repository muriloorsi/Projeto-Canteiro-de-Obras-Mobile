import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";
import { styles } from "./TelaUsuarios";

const avatar = require("../../assets/perfil.png");

export default function Usuario() {
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [permissao, setPermissao] = useState<string | null>(null);

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const nomeUsuario = await AsyncStorage.getItem("nomeUsuario");
        const emailUsuario = await AsyncStorage.getItem("emailUsuario");
        const permissaoUsuario = await AsyncStorage.getItem("permissaoUsuario");

        setNome(nomeUsuario);
        setEmail(emailUsuario);
        setPermissao(permissaoUsuario);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosUsuario();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003087" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Image source={avatar} style={styles.avatar} />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <View style={styles.disabledInput}>
              <Text style={styles.inputText}>{nome || "—"}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Permissão</Text>
            <View style={styles.disabledInput}>
              <Text style={styles.inputText}>{permissao || "—"}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.disabledInput}>
              <Text style={styles.inputText}>{email || "—"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}
