import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ===========================
     ESTRUTURA PRINCIPAL
  ============================ */
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },

  /* ===========================
     CAMPO DE BUSCA
  ============================ */
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },

  /* ===========================
     FILTROS
  ============================ */
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#e6e6e6",
  },
  filterButtonActive: {
    backgroundColor: "#003087",
  },
  filterText: {
    fontWeight: "600",
    color: "#555",
  },
  filterTextActive: {
    color: "#fff",
  },

  /* ===========================
     TÍTULO DAS SEÇÕES
     (ex: "📊 Relatórios" / "🤖 IA")
  ============================ */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003087",
    marginVertical: 10,
  },

  /* ===========================
     CARTÕES DE PROJETO / RELATÓRIO
  ============================ */
  projectCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },

  /* ===========================
     BOTÃO DE RELATÓRIO
  ============================ */
  reportButton: {
    backgroundColor: "#003087",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  reportButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* ===========================
     TEXTO QUANDO NÃO HÁ PROJETOS
  ============================ */  
  noProjects: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontStyle: "italic",
  },
});
