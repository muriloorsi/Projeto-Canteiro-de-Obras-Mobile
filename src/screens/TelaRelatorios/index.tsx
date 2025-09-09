import React from "react";
import { View, Text } from "react-native";
import Header from "../../Header/header";
import BottomNavigation from "../../componentes/BottomNavigation";
import styles from "./TelaRelatorios";

export default function TelaRelatorios() {
  return (
    <View style={styles.container}>
      {/* Header fixo já existente */}
      <Header />

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Relatórios</Text>
        <Text style={styles.subtitle}>
          Aqui você poderá visualizar os relatórios disponíveis.
        </Text>
      </View>

      {/* Bottom Navigation fixo */}
      <BottomNavigation />
    </View>
  );
}
