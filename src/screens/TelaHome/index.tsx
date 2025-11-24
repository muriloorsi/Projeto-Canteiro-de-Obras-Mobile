import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";
import { styles } from "./telahome";

import imgObras from "../../assets/img-teste-obras.png";
import { getAllProjects, deleteProject, calcularProgressoProjeto} from "../../services/projectService";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function TelaHome() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [projetos, setProjetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatarData = (value: any): string => {
    if (!value) return "Data inválida";

    try {
      let date: Date;

      if (value?.seconds) {
        date = new Date(value.seconds * 1000);
      } else if (typeof value?.toDate === "function") {
        date = value.toDate();
      } else if (typeof value === "string") {
        date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
      } else if (value instanceof Date) {
        date = value;
      } else if (typeof value === "number") {
        date = new Date(value);
      } else {
        return "Data inválida";
      }

      if (isNaN(date.getTime())) return "Data inválida";

      return date.toLocaleDateString("pt-BR");
    } catch (e) {
      console.log("Erro data:", e);
      return "Data inválida";
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllProjects();
        setProjetos(data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Excluir Projeto",
      "Tem certeza que deseja deletar este projeto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteProject(id);
              setProjetos((prev) => prev.filter((p) => p.id !== id));
              Alert.alert("Sucesso", "Projeto deletado!");
            } catch (error) {
              Alert.alert("Erro", "Falha ao deletar o projeto.");
            }
          },
        },
      ]
    );
  };

  const getProgressColor = (p: number) => {
    if (p < 33) return "#EF4444";
    if (p < 66) return "#FACC15";
    return "#22C55E";
  };

  const renderItem = ({ item }: { item: any }) => {
    let progresso = 0;

    try {
      progresso = calcularProgressoProjeto(item);
    } catch (error) {
      progresso = 0;
    }

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("TelaProjetosDetalhes", { projeto: item })
        }
      >
        <Image
          source={item.images?.[0] ? { uri: item.images[0] } : imgObras}
          style={styles.cardImage}
        />

        {/* Botão deletar */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>

          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Linha:</Text> {item.line || "—"}
          </Text>

          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Estação:</Text>{" "}
            {item.station || "—"}
          </Text>

          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Data de Início:</Text>{" "}
            {formatarData(item.startDate)}
          </Text>

          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Status:</Text> {item.status || "—"}
          </Text>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${progresso}%`,
                    backgroundColor: getProgressColor(progresso),
                  },
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

      <BottomNavigation />
    </View>
  );
}
