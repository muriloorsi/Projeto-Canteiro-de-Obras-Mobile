import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert} from "react-native";
import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";
import { styles } from "./TelaRelatorios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase/firebaseConfig";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

// Tipagem do projeto
interface Project {
  id?: string;
  name: string;
  line: string;
  station: string;
  status: string;
  startDate: any;
  endDate: any;
  steps?: { name: string; startDate: any; endDate: any }[];
}

export default function TelaRelatorios() {
  const [filtro, setFiltro] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para formatar data (Timestamp ou string)
  function formatDate(dateObj: any) {
    if (!dateObj) return "";

    if (dateObj.toDate) {
      return dateObj.toDate().toLocaleDateString("pt-BR");
    }
    if (dateObj._seconds) {
      return new Date(dateObj._seconds * 1000).toLocaleDateString("pt-BR");
    }
    if (typeof dateObj === "string") {
      return dateObj;
    }

    return "";
  }

  // 🔥 Buscar dados diretamente do Firestore
  async function carregarProjetos() {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "projects"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];

      setProjects(data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      Alert.alert("Erro", "Não foi possível carregar os projetos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProjetos();
  }, []);

  // ✅ Função para gerar PDF usando expo-print
  const gerarRelatorioPDF = async (project: Project) => {
    try {
      const dataEmissao = new Date().toLocaleDateString("pt-BR");
      const startDate = formatDate(project.startDate);
      const endDate = formatDate(project.endDate);

      const etapasHTML =
        project.steps && project.steps.length > 0
          ? project.steps
              .map(
                (etapa, i) => `
          <p style="margin:4px 0;">
            <b>${i + 1}.</b> ${etapa.name} (${formatDate(etapa.startDate)} até ${formatDate(
                  etapa.endDate
                )})
          </p>`
              )
              .join("")
          : "<p>Nenhuma etapa cadastrada.</p>";

      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body { font-family: Arial; padding: 24px; color: #222; }
              h1 { color: #003087; font-size: 22px; margin-bottom: 10px; }
              p, h3 { font-size: 14px; margin: 4px 0; }
              .section { margin-top: 15px; }
            </style>
          </head>
          <body>
            <h1>Relatório do Projeto</h1>
            <p><b>Nome do Projeto:</b> ${project.name}</p>
            <p><b>Data de Emissão:</b> ${dataEmissao}</p>
            <p><b>Status:</b> ${project.status}</p>
            <p><b>Data de Início:</b> ${startDate}</p>
            <p><b>Data de Fim:</b> ${endDate}</p>
            <div class="section">
              <h3>Etapas:</h3>
              ${etapasHTML}
            </div>
          </body>
        </html>
      `;

      // Gera o arquivo PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Compartilha o arquivo
      await Sharing.shareAsync(uri);

      Alert.alert("Sucesso", "Relatório gerado e pronto para compartilhamento!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o relatório.");
      console.error(error);
    }
  };

  // 🔍 Filtro e busca
  const filteredProjects = projects.filter((project) => {
    const statusMatch = filtro === "Todos" || project.status === filtro;
    const searchMatch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.line.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.mainContent}>
        {/* 🔎 Barra de busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do projeto"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {/* 🎯 Filtros */}
        <View style={styles.filterContainer}>
          {["Todos", "Finalizado", "Em andamento", "Não iniciado"].map(
            (status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  filtro === status && styles.filterButtonActive,
                ]}
                onPress={() => setFiltro(status)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filtro === status && styles.filterTextActive,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* 📋 Lista de projetos */}
        {loading ? (
          <ActivityIndicator size="large" color="#003087" />
        ) : (
          <FlatList
            data={filteredProjects}
            keyExtractor={(item) => item.id || item.name}
            renderItem={({ item }) => (
              <View style={styles.projectCard}>
                <View style={styles.projectInfo}>
                  <Text style={styles.projectTitle}>
                    {item.name} - {item.line}
                  </Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      item.status === "Finalizado"
                        ? styles.statusFinalizado
                        : item.status === "Em andamento"
                        ? styles.statusEmAndamento
                        : styles.statusNaoIniciado,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => gerarRelatorioPDF(item)}
                >
                  <Text style={styles.reportButtonText}>Obter Relatório</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noProjects}>Nenhum projeto encontrado.</Text>
            }
          />
        )}
      </View>

      <BottomNavigation />
    </View>
  );
}
