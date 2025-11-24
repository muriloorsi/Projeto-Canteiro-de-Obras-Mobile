import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  ScrollView 
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";
import { db } from "../../components/firebase/firebaseConfig";
import { styles } from "./TelaRelatorios";

// Interfaces mantidas iguais
interface Step {
  name: string;
  startDate: any;
  endDate: any;
}

interface Project {
  id?: string;
  name: string;
  line: string;
  station?: string;
  status: string;
  startDate: any;
  endDate: any;
  steps?: Step[];
}

interface AnalysisReport {
  id?: string;
  projectName: string;
  createdBy?: string;
  createdAt: any;
  contexto?: string;
  resultado: {
    percentual_conformidade: number;
    status_obra: string;
    resumo_executivo: string;
    divergencias_encontradas?: { tipo: string; criticidade: string; descricao: string }[];
    recomendacoes_imediatas?: string[];
  };
}

export default function TelaRelatorios() {
  const [tipoRelatorio, setTipoRelatorio] = useState("Todos");
  const [filtro, setFiltro] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [analysisReports, setAnalysisReports] = useState<AnalysisReport[]>([]);
  const [loading, setLoading] = useState(true);

  function formatDate(dateObj: any) {
    if (!dateObj) return "";
    if (dateObj.toDate) return dateObj.toDate().toLocaleDateString("pt-BR");
    if (dateObj._seconds) return new Date(dateObj._seconds * 1000).toLocaleDateString("pt-BR");
    if (typeof dateObj === "string") return dateObj;
    return "";
  }

  async function carregarDados() {
    try {
      setLoading(true);
      const [projSnap, analSnap] = await Promise.all([
        getDocs(collection(db, "projects")),
        getDocs(collection(db, "analysisReports")),
      ]);

      setProjects(projSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Project[]);
      setAnalysisReports(analSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as AnalysisReport[]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      Alert.alert("Erro", "Não foi possível carregar relatórios.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function gerarRelatorioProjeto(project: Project) {
    try {
      const dataEmissao = new Date().toLocaleDateString("pt-BR");
      const etapasHTML = project.steps?.length
        ? project.steps
            .map((etapa, i) =>
              `<p><b>${i + 1}.</b> ${etapa.name} (${formatDate(etapa.startDate)} até ${formatDate(etapa.endDate)})</p>`
            ).join("")
        : "<p>Nenhuma etapa cadastrada.</p>";

      const html = `
        <html>
          <body style="font-family: Arial; padding: 24px;">
            <h2 style="color:#003087;">Relatório do Projeto</h2>
            <p><b>Nome do Projeto:</b> ${project.name}</p>
            <p><b>Data de Emissão:</b> ${dataEmissao}</p>
            <p><b>Status:</b> ${project.status}</p>
            <p><b>Data de Início:</b> ${formatDate(project.startDate)}</p>
            <p><b>Data de Fim:</b> ${formatDate(project.endDate)}</p>
            <h3>Etapas:</h3>
            ${etapasHTML}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch {
      Alert.alert("Erro", "Falha ao gerar relatório do projeto.");
    }
  }

  async function gerarRelatorioAnaliseIA(report: AnalysisReport) {
    try {
      const dataEmissao = formatDate(report.createdAt);
      const { resultado } = report;

      const divergenciasHTML = resultado.divergencias_encontradas?.length
        ? resultado.divergencias_encontradas
            .map((div, i) =>
              `<p><b>${i + 1}.</b> ${div.tipo} [${div.criticidade.toUpperCase()}]: ${div.descricao}</p>`
            ).join("")
        : "<p>Nenhuma divergência encontrada.</p>";

      const recomendacoesHTML = resultado.recomendacoes_imediatas?.length
        ? resultado.recomendacoes_imediatas.map((rec, i) => `<p><b>${i + 1}.</b> ${rec}</p>`).join("")
        : "<p>Sem recomendações imediatas.</p>";

      const html = `
        <html>
          <body style="font-family: Arial; padding: 24px;">
            <h2 style="color:#003087;">Relatório de Análise com IA</h2>
            <p><b>Data da Análise:</b> ${dataEmissao}</p>
            <p><b>Projeto:</b> ${report.projectName || "Não especificado"}</p>
            <p><b>Responsável:</b> ${report.createdBy || "Não informado"}</p>
            <p><b>Conformidade:</b> ${resultado.percentual_conformidade}%</p>
            <p><b>Status da Obra:</b> ${resultado.status_obra}</p>
            <h3>Resumo Executivo</h3>
            <p>${resultado.resumo_executivo}</p>
            <h3>Divergências Encontradas</h3>
            ${divergenciasHTML}
            <h3>Recomendações Imediatas</h3>
            ${recomendacoesHTML}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch {
      Alert.alert("Erro", "Falha ao gerar relatório da Análise IA.");
    }
  }

  const filteredProjects = projects.filter((p) => {
    if (tipoRelatorio === "Análises IA") return false;
    const statusOk = filtro === "Todos" || p.status === filtro;
    const match =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.line.toLowerCase().includes(searchTerm.toLowerCase());
    return statusOk && match;
  });

  const filteredReports = analysisReports.filter((r) => {
    if (tipoRelatorio === "Projetos") return false;
    const match =
      (r.projectName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.contexto || "").toLowerCase().includes(searchTerm.toLowerCase());
    return match;
  });

  return (
    <View style={styles.container}>
      <Header />

      {/* CORREÇÃO AQUI: 
         - style controla o layout do componente na tela.
         - contentContainerStyle controla o padding interno do conteúdo rolável.
      */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar relatórios..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {/* Filtro de Tipo */}
        <View style={styles.filterContainer}>
          {["Todos", "Projetos", "Análises IA"].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[styles.filterButton, tipoRelatorio === tipo && styles.filterButtonActive]}
              onPress={() => setTipoRelatorio(tipo)}
            >
              <Text style={[styles.filterText, tipoRelatorio === tipo && styles.filterTextActive]}>
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtro de Status (apenas se não for IA) */}
        {tipoRelatorio !== "Análises IA" && (
          <View style={styles.filterContainer}>
            {["Todos", "Finalizado", "Em andamento", "Não iniciado"].map((status) => (
              <TouchableOpacity
                key={status}
                style={[styles.filterButton, filtro === status && styles.filterButtonActive]}
                onPress={() => setFiltro(status)}
              >
                <Text style={[styles.filterText, filtro === status && styles.filterTextActive]}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#003087" style={{ marginTop: 20 }} />
        ) : (
          <>
            {/* 🤖 Relatórios IA */}
            {filteredReports.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>🤖 Análises IA</Text>
                {filteredReports.map((r) => (
                  <View key={r.id} style={styles.projectCard}>
                    <Text style={styles.projectTitle}>{r.projectName || "Análise de Conformidade"}</Text>
                    <Text>Conformidade: {r.resultado.percentual_conformidade}%</Text>
                    <Text>Status: {r.resultado.status_obra}</Text>

                    <TouchableOpacity
                      style={styles.reportButton}
                      onPress={() => gerarRelatorioAnaliseIA(r)}
                    >
                      <Text style={styles.reportButtonText}>Baixar PDF</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* 📊 Projetos */}
            {filteredProjects.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>📊 Projetos</Text>
                {filteredProjects.map((p) => (
                  <View key={p.id} style={styles.projectCard}>
                    <Text style={styles.projectTitle}>{p.name} - {p.line}</Text>
                    <Text>{p.status}</Text>

                    <TouchableOpacity
                      style={styles.reportButton}
                      onPress={() => gerarRelatorioProjeto(p)}
                    >
                      <Text style={styles.reportButtonText}>Baixar PDF</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {filteredProjects.length === 0 && filteredReports.length === 0 && (
              <Text style={styles.noProjects}>Nenhum relatório encontrado.</Text>
            )}
          </>
        )}
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}