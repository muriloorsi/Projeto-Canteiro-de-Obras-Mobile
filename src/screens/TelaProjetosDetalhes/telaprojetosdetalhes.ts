import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1E3A8A",
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#475569",
  },

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
  cardTitle: { fontSize: 17, fontWeight: "bold", marginBottom: 10},

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

  capturas: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginVertical: 10 },
  capturaImg: { width: 70, height: 70, borderRadius: 8 },
  caption: { fontSize: 12, color: "#6b7280" },

  alertNumber: { fontSize: 30, fontWeight: "bold", marginVertical: 10},

  btn: {
    backgroundColor: "#1E40AF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

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
  btnVoltarText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default styles;
