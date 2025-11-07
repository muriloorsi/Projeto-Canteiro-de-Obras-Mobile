import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    paddingBottom: 100, // Adiciona o padding inferior para evitar que o conteúdo fique atrás do BottomNavigation
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
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
    marginRight: 8,
    marginBottom: 8,
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
  projectInfo: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  statusFinalizado: {
    backgroundColor: "#059669",
  },
  statusEmAndamento: {
    backgroundColor: "#001489",
  },
  statusNaoIniciado: {
    backgroundColor: "#4a4a4a",
  },
  reportButton: {
    backgroundColor: "#003087",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  reportButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noProjects: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontStyle: "italic",
  },
});
