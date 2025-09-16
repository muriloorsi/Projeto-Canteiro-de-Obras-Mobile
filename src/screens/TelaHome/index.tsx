import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Header from "../../Header/header";
import BottomNavigation from "../../componentes/BottomNavigation";
import styles from "./telahome";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function TelaProjetos() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [projetos, setProjetos] = useState<any[]>([]);

  useEffect(() => {
    setProjetos([
      {
        titulo: "Expansão Linha 2 - Verde",
        estacao: "Estação Vila Formosa",
        ultimaAlteracao: "20/08/2025",
        status: "Em Andamento",
        progresso: 80,
        imagem: require("../../../assets/img-teste-obras.png"),
      },
      {
        titulo: "Expansão Linha 3 - Vermelho",
        estacao: "Estação Tatuapé",
        ultimaAlteracao: "20/08/2025",
        status: "Em Andamento",
        progresso: 51,
        imagem: require("../../../assets/img-teste-obras.png"),
      },
      {
        titulo: "Expansão Linha 1 - Azul",
        estacao: "Estação Sé",
        ultimaAlteracao: "20/08/2025",
        status: "Em Andamento",
        progresso: 13,
        imagem: require("../../../assets/img-teste-obras.png"),
      },
    ]);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("TelaProjetosDetalhes", { projeto: item })
      }
    >
      <Image
        source={item.imagem}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item.titulo}
          {"\n"}
          {item.estacao}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Última Alteração: {item.ultimaAlteracao}</Text>
          <Text style={styles.infoText}>Status: {item.status}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${item.progresso}%` }]} />
          </View>
          <Text style={styles.progressText}>{item.progresso}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={projetos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      <BottomNavigation />
    </View>
  );
}