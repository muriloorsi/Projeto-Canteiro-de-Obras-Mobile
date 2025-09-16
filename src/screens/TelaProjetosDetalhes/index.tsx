import React from "react";
import { View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { RootStackParamList } from "../../navigation/AppNavigator";
import styles from "./telaprojetosdetalhes";

type DetalhesRouteProp = RouteProp<RootStackParamList, "TelaProjetosDetalhes">;

export default function TelaProjetosDetalhes() {
  const route = useRoute<DetalhesRouteProp>();
  const { projeto } = route.params;

  const progressoObra = projeto.progresso;

  const ultimasCapturas = [
    require("../../../assets/img-teste-obras.png"),  
    require("../../../assets/img-teste-obras.png"),
    require("../../../assets/img-teste-obras.png"),
  ];

  const proximasEtapas = [
    { nome: "Drenagem", inicio: "13/01/25", fim: "25/02/25" },
    { nome: "Revestimento", inicio: "26/02/25", fim: "20/04/25" },
    { nome: "Concreto", inicio: "21/04/25", fim: "31/06/25" },
  ];

  const graficoData = {
    labels: ["Jan", "Mar", "Mai", "Jul", "Set", "Nov"],
    datasets: [
      { data: [0, 10, 35, 45, 70, progressoObra], color: () => "#1E40AF" },
      { data: [0, 20, 50, 60, 85, 100], color: () => "#c7d2fe" },
    ],
    legend: ["Executado", "Planejado"],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {projeto.titulo} - {projeto.estacao}
      </Text>
      {/* resto do código igual */}
    </ScrollView>
  );
}
