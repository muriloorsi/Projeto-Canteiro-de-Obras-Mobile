import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ===========================
        ESTRUTURA PRINCIPAL
  ============================ */
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },

  /* ===========================
        CARREGAMENTO / VAZIO
  ============================ */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#4B5563",
    fontSize: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  emptySubText: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 4,
  },

  /* ===========================
        CARD DO PROJETO
  ============================ */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",

    /* sombra */
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardImage: {
    width: "100%",
    height: 180,
  },

  cardContent: {
    padding: 14,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4,
  },

  infoLabel: {
    fontWeight: "bold",
    color: "#1E293B",
  },

  /* ===========================
        BOTÃO DELETAR
     (igual ao Web, versão mobile)
  ============================ */
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "rgba(220, 38, 38, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },

  deleteButtonText: {
    fontSize: 18,
    color: "#FFF",
  },

  /* ===========================
        BARRA DE PROGRESSO
  ============================ */
  progressBarContainer: {
    marginTop: 10,
  },

  progressBarBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },

  progressText: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
    color: "#1E293B",
  },
});
