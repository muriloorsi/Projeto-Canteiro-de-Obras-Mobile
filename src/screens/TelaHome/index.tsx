import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";
import { styles } from "./telahome";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function TelaHome() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [projetos, setProjetos] = useState<any[]>([]);

  useEffect(() => {
    setProjetos([
      {
        titulo: "Expansão Linha 1 - Azul",
        estacao: "Estação Sé",
        ultimaAlteracao: "20/08/2025",
        status: "Em Andamento",
        progresso: 13,
        imagem: require("../../assets/img-teste-obras.png"),
      },
      {
        titulo: "Expansão Linha 2 - Verde",
        estacao: "Estação Vila Formosa",
        ultimaAlteracao: "20/08/2025",
        status: "Em Andamento",
        progresso: 80,
        imagem: require("../../assets/img-teste-obras.png"),
      },
      {
        titulo: "Expansão Linha 3 - Vermelho",
        estacao: "Estação Tatuapé",
        ultimaAlteracao: "20/08/2025",
        status: "Em Andamento",
        progresso: 51,
        imagem: require("../../assets/img-teste-obras.png"),
      },
    ]);
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress <= 33) return "#EF4444";
    if (progress <= 66) return "#FACC15";
    return "#22C55E";
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("TelaProjetosDetalhes", { projeto: item })
      }
      activeOpacity={0.8}
    >
      <Image source={item.imagem} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.infoText}>{item.estacao}</Text>

        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Última Alteração:</Text>{" "}
          {item.ultimaAlteracao}
        </Text>

        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Status:</Text> {item.status}
        </Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${item.progresso}%`,
                  backgroundColor: getProgressColor(item.progresso),
                },
              ]}
            />
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
        showsVerticalScrollIndicator={false}
      />
      <BottomNavigation />
    </View>
  );
}
