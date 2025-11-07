import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import * as ImagePicker from "expo-image-picker";
import Svg, { Circle } from "react-native-svg";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { styles } from "./telaprojetosdetalhes";

type DetalhesRouteProp = RouteProp<RootStackParamList, "TelaProjetosDetalhes">;

export default function TelaProjetosDetalhes() {
  const route = useRoute<DetalhesRouteProp>();
  const navigation = useNavigation();
  const { projeto } = route.params;

  const [capturas, setCapturas] = useState([
    require("../../assets/img-teste-obras.png"),
    require("../../assets/img-teste-obras.png"),
    require("../../assets/img-teste-obras.png"),
  ]);

  const progressoObra = projeto.progresso;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressoObra / 100) * circumference;

  const graficoData = {
    labels: ["Jan", "Mar", "Mai", "Jul", "Set", "Nov"],
    datasets: [
      { data: [0, 10, 35, 45, 70, progressoObra], color: () => "#1E40AF" },
      { data: [0, 20, 50, 60, 85, 100], color: () => "#c7d2fe" },
    ],
    legend: ["Executado", "Planejado"],
  };

  const proximasEtapas = [
    { nome: "Drenagem", inicio: "13/01/25", fim: "25/02/25" },
    { nome: "Revestimento", inicio: "26/02/25", fim: "20/04/25" },
    { nome: "Concreto", inicio: "21/04/25", fim: "31/06/25" },
  ];

  // 📸 Escolher imagem ou tirar foto
  const handleNovaCaptura = async () => {
    const result = await Alert.alert(
      "Adicionar Captura",
      "Escolha uma opção:",
      [
        {
          text: "Galeria",
          onPress: async () => {
            const res = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!res.canceled) setCapturas([...capturas, { uri: res.assets[0].uri }]);
          },
        },
        {
          text: "Câmera",
          onPress: async () => {
            const res = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!res.canceled) setCapturas([...capturas, { uri: res.assets[0].uri }]);
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 150 }}>
        {/* 🏗️ Título */}
        <Text style={styles.title}>
          {projeto.titulo}{"\n"}
          <Text style={styles.subtitle}>{projeto.estacao}</Text>
        </Text>

        {/* 🔵 Progresso da Obra */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progresso da Obra</Text>
          <View style={styles.progressContainer}>
            <Svg height="120" width="120" viewBox="0 0 120 120">
              <Circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#1E40AF"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin="60,60"
              />
            </Svg>
            <Text style={styles.progressText}>{progressoObra}%</Text>
          </View>
          <Text style={styles.progressStatus}>Em andamento</Text>
        </View>

        {/* 📷 Últimas Capturas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Últimas Capturas</Text>
          <View style={styles.capturas}>
            {capturas.map((img, idx) => (
              <Image key={idx} source={img} style={styles.capturaImg} />
            ))}
          </View>
          <Text style={styles.caption}>Última Captura: 27/10/2025, 15:18</Text>
        </View>

        {/* ⚠️ Alertas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alertas</Text>
          <Text style={styles.alertNumber}>3</Text>
          <Text>Problemas detectados</Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Ver Mais</Text>
          </TouchableOpacity>
        </View>

        {/* 📅 Próximas Etapas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Próximas Etapas</Text>
          {proximasEtapas.map((etapa, idx) => (
            <View key={idx} style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>{etapa.nome}</Text>
              <Text>{etapa.inicio} - {etapa.fim}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Ver Mais</Text>
          </TouchableOpacity>
        </View>

        {/* 📈 Gráfico */}
        <View style={styles.card}>
          <LineChart
            data={graficoData}
            width={Dimensions.get("window").width - 60}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
              labelColor: () => "#000",
              propsForDots: { r: "4" },
            }}
            style={{ borderRadius: 10 }}
            bezier
          />
          <TouchableOpacity style={[styles.btn, { marginTop: 20 }]}>
            <Text style={styles.btnText}>Gerar Relatório</Text>
          </TouchableOpacity>
        </View>

        {/* 🧾 Observações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Observações</Text>
          <Text>
            Detectada parede faltando no 2º andar. O progresso está 10% atrasado
            em relação ao cronograma planejado.
          </Text>
        </View>

        {/* 📸 Botão Nova Captura */}
        <TouchableOpacity style={styles.btn} onPress={handleNovaCaptura}>
          <Text style={styles.btnText}>Nova Captura</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 🔙 Botão Voltar */}
      <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.btnVoltarText}>Voltar </Text>
      </TouchableOpacity>
    </View>
  );
}
