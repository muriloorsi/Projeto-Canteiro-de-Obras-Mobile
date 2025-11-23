import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { LineChart } from "react-native-chart-kit";
import * as ImagePicker from "expo-image-picker";
import Svg, { Circle } from "react-native-svg";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { styles } from "./telaprojetosdetalhes";

type DetalhesRouteProp = RouteProp<RootStackParamList, "TelaProjetosDetalhes">;
type NavigationProp = StackNavigationProp<RootStackParamList, "TelaProjetosDetalhes">;

export default function TelaProjetosDetalhes() {
  const route = useRoute<DetalhesRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { projeto } = route.params;

  // 🔥 Garante sempre um número válido
  const rawProgress = String(projeto?.progresso ?? "").replace("%", "");
  const progressoObra = Number(rawProgress);
  const progressoSeguro = isNaN(progressoObra) ? 0 : progressoObra;

  console.log("PROGRESSO RECEBIDO:", projeto.progresso);
  console.log("PROGRESSO TRATADO:", progressoSeguro);

  const [capturas, setCapturas] = useState([
    require("../../assets/img-teste-obras.png"),
    require("../../assets/img-teste-obras.png"),
    require("../../assets/img-teste-obras.png"),
  ]);

  // 🎯 Círculo de progresso protegido
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressoSeguro / 100) * circumference;

  // 🎯 Gráfico protegido (sem NaN)
  const graficoData = {
    labels: ["Jan", "Mar", "Mai", "Jul", "Set", "Nov"],
    datasets: [
      {
        data: [0, 10, 35, 45, 70, progressoSeguro],
        color: () => "#1E40AF",
      },
      {
        data: [0, 20, 50, 60, 85, 100],
        color: () => "#93c5fd",
      },
    ],
    legend: ["Executado", "Planejado"],
  };

  const proximasEtapas = [
    { nome: "Drenagem", inicio: "13/01/25", fim: "25/02/25" },
    { nome: "Revestimento", inicio: "26/02/25", fim: "20/04/25" },
    { nome: "Concreto", inicio: "21/04/25", fim: "31/06/25" },
  ];

  const handleNovaCaptura = async () => {
    Alert.alert("Adicionar Captura", "Escolha uma opção:", [
      {
        text: "Galeria",
        onPress: async () => {
          const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          if (!res.canceled)
            setCapturas((prev) => [...prev, { uri: res.assets[0].uri }]);
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

          if (!res.canceled)
            setCapturas((prev) => [...prev, { uri: res.assets[0].uri }]);
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

        {/* 🏗️ Título */}
        <Text style={styles.title}>
          {projeto.titulo}
          {projeto.estacao ? ` - ${projeto.estacao}` : ""}
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

            <Text style={styles.progressText}>{progressoSeguro}%</Text>
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
          <Text style={styles.alertText}>Problemas detectados</Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Ver Mais</Text>
          </TouchableOpacity>
        </View>

        {/* 📅 Próximas Etapas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Próximas Etapas</Text>

          {proximasEtapas.map((etapa, idx) => (
            <View key={idx} style={styles.etapaItem}>
              <Text style={styles.etapaTitulo}>{etapa.nome}</Text>
              <Text style={styles.etapaPeriodo}>
                {etapa.inicio} - {etapa.fim}
              </Text>
            </View>
          ))}

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Ver Mais</Text>
          </TouchableOpacity>
        </View>

        {/* 📊 Gráfico */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cronograma das Etapas</Text>

          <LineChart
            data={graficoData}
            width={Dimensions.get("window").width - 60}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
              labelColor: () => "#374151",
              propsForDots: { r: "4" },
              decimalPlaces: 0,
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* 🧾 Observações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Observações</Text>
          <Text style={styles.observacaoTexto}>
            Detectada parede faltando no 2º andar. O progresso está 10% atrasado
            em relação ao cronograma planejado.
          </Text>
        </View>

        {/* 📸 Nova Captura */}
        <TouchableOpacity style={styles.btnPrimary} onPress={handleNovaCaptura}>
          <Text style={styles.btnPrimaryText}>Nova Captura</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* 🔙 Voltar */}
      <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.btnVoltarText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
