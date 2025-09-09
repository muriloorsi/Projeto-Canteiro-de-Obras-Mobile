import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import Header from "../../Header/header";
import { styles } from "./TelaUsuarios";
const defaultProfileImage = require('../../../assets/perfil.png');

export default function Usuario() {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<any>(null);

  // Simulação de requisição ao banco
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Aqui você faria a chamada real à API
        // const response = await fetch("http://seu-backend.com/api/usuario/1");
        // const data = await response.json();

        // Mock de resposta do banco
        const data = {
          imagemusuario: "", // vazio = sem foto
          nome: "Murilo Orsi Marchezzane",
          permissao: "Administrador",
          email: "murilo@email.com",
        };

        setUsuario(data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#003087" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 16, color: "#333" }}>Não foi possível carregar os dados do usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Perfil do Usuário</Text>

          {/* Imagem de Perfil */}
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Image
              source={usuario.imagemusuario ? { uri: usuario.imagemusuario } : defaultProfileImage}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                resizeMode: "cover",
              }}
            />
          </View>

          {/* Nome */}
          <View style={styles.formRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.input}>{usuario.nome}</Text>
            </View>
          </View>

          {/* Permissão */}
          <View style={styles.formRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Permissão</Text>
              <Text style={styles.input}>{usuario.permissao}</Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.formRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.input}>{usuario.email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
