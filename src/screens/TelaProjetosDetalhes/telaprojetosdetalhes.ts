import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ===========================
     ESTRUTURA PRINCIPAL
  ============================ */
  screen: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  /* ===========================
     TEXTOS
  ============================ */
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1E3A8A",
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center",
  },
  caption: {
    fontSize: 12,
    color: "#6b7280",
  },
  alertNumber: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  alertText: {
    marginBottom: 8,
    color: "#374151",
  },

  /* ===========================
     CARD
  ============================ */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  /* ===========================
     PROGRESSO
  ============================ */
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  progressStatus: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },

  /* ===========================
     CAPTURAS / IMAGENS
  ============================ */
  capturas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10,
  },
  capturaImg: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },

  /* ===========================
     ETAPAS
  ============================ */
  etapaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  etapaTitulo: {
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  etapaPeriodo: {
    color: "#475569",
  },

  /* ===========================
     BOTÕES
  ============================ */
  btn: {
    backgroundColor: "#1E40AF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnPrimary: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnVoltar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
  },
  btnVoltarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  /* ===========================
     OUTROS
  ============================ */
  observacaoTexto: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
  chart: {
    borderRadius: 12,
    marginTop: 10,
  },
});
