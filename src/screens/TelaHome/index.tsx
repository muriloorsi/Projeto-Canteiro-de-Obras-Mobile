import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";
import { styles } from "./telahome";
import imgObras from "../../assets/img-teste-obras.png";
import { getAllProjects, calcularProgressoProjeto } from "../../services/projectService";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function TelaHome() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [projetos, setProjetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await getAllProjects();
        console.log("🔥 Projetos recebidos:", projects);
        setProjetos(projects);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        Alert.alert("Erro", "Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress <= 33) return "#EF4444";
    if (progress <= 66) return "#FACC15";
    return "#22C55E";
  };

  const renderItem = ({ item }: { item: any }) => {
    const progresso = calcularProgressoProjeto([item]);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("TelaProjetosDetalhes", { projeto: item })}
      >
        <Image
          source={item.images?.[0] ? { uri: item.images[0] } : imgObras}
          style={styles.cardImage}
        />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            {item.name}
            {"\n"}
            <Text style={styles.infoText}>{item.station || item.line}</Text>
          </Text>

          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Data de Início:</Text>{" "}
            {item.startDate?.seconds
              ? new Date(item.startDate.seconds * 1000).toLocaleDateString("pt-BR")
              : "—"}
          </Text>

          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Status:</Text> {item.status || "—"}
          </Text>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progresso}%`, backgroundColor: getProgressColor(progresso) },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{progresso}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Carregando projetos...</Text>
        </View>
      ) : projetos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum projeto encontrado.</Text>
          <Text style={styles.emptySubText}>Crie um novo projeto!</Text>
        </View>
      ) : (
        <FlatList
          data={projetos}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
      <BottomNavigation />
    </View>
  );
}
