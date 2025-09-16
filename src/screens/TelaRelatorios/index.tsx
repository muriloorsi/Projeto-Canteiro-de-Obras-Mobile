import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../../Header/header";
import BottomNavigation from "../../componentes/BottomNavigation";
import styles from "./telarelatorios";

interface Projeto {
  id: number;
  nome: string;
  linha: string;
  estacao: string;
  status: "Finalizado" | "Em andamento" | "Não iniciado";
}

export default function TelaRelatorios() {
  const [filtro, setFiltro] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    // Dados de exemplo para simular a API
    setTimeout(() => {
      setProjetos([
        {
          id: 1,
          nome: "Expansão Linha 2",
          linha: "Verde Estação Vila Formosa",
          estacao: "Vila Formosa",
          status: "Em andamento",
        },
        {
          id: 2,
          nome: "Expansão Linha 3",
          linha: "Vermelha Estação Tatuapé",
          estacao: "Tatuapé",
          status: "Em andamento",
        },
        {
          id: 3,
          nome: "Expansão Linha 1",
          linha: "Azul Estação Sé",
          estacao: "Sé",
          status: "Finalizado",
        },
        {
          id: 4,
          nome: "Expansão Linha 4",
          linha: "Amarela Estação Pinheiros",
          estacao: "Pinheiros",
          status: "Não iniciado",
        },
        // Adicionando mais projetos para forçar a rolagem
        {
          id: 5,
          nome: "Nova Estação Jabaquara",
          linha: "Azul Estação Jabaquara",
          estacao: "Jabaquara",
          status: "Em andamento",
        },
        {
          id: 6,
          nome: "Melhoria Linha 5",
          linha: "Lilás Estação Chácara Klabin",
          estacao: "Chácara Klabin",
          status: "Finalizado",
        },
        {
          id: 7,
          nome: "Sinalização Linha 15",
          linha: "Prata Estação São Mateus",
          estacao: "São Mateus",
          status: "Não iniciado",
        },
        {
          id: 8,
          nome: "Reforma Estação Consolação",
          linha: "Verde Estação Consolação",
          estacao: "Consolação",
          status: "Em andamento",
        },
        {
          id: 9,
          nome: "Reforma Estação Sé",
          linha: "Azul Estação Sé",
          estacao: "Sé",
          status: "Finalizado",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjetos = projetos.filter((projeto) => {
    const statusMatch = filtro === "Todos" || projeto.status === filtro;
    const searchMatch =
      projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.linha.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.mainContent}>
        {/* Barra de busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do projeto"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {/* Filtros */}
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

        {/* Lista de projetos com rolagem */}
        {loading ? (
          <ActivityIndicator size="large" color="#003087" />
        ) : (
          <FlatList
            data={filteredProjetos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.projectCard}>
                <View style={styles.projectInfo}>
                  <Text style={styles.projectTitle}>
                    {item.nome} - {item.linha}
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
                <TouchableOpacity style={styles.reportButton}>
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