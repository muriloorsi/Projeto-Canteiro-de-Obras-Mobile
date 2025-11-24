import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ===========================
      ESTRUTURA PRINCIPAL
   ============================ */
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  // O container do ScrollView ocupa toda a tela disponível
  scrollContainer: {
    flex: 1,
  },
  
  // O conteúdo interno tem padding e, crucialmente, um paddingBottom grande
  // para compensar a BottomNavigation flutuante
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Aumentei aqui para liberar o último card
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
      TÍTULOS E TEXTOS
   ============================ */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003087",
    marginVertical: 10,
  },

  /* ===========================
      CARTÕES (CARDS)
   ============================ */
  projectCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    // Sombra suave
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, 
    borderWidth: 1,
    borderColor: "#f0f0f0"
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },

  /* ===========================
      BOTÃO DE DOWNLOAD (PDF)
   ============================ */
  reportButton: {
    backgroundColor: "#003087",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  reportButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  /* ===========================
      ESTADOS VAZIOS
   ============================ */  
  noProjects: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontStyle: "italic",
  },
});