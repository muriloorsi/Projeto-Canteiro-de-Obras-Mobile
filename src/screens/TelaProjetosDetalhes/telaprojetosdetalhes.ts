import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginVertical: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#1E40AF",
    borderRadius: 10,
  },
  progressText: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
  capturas: { flexDirection: "row", gap: 10, marginVertical: 10 },
  capturaImg: { width: 60, height: 60, borderRadius: 5 },
  alertNumber: { fontSize: 28, fontWeight: "bold", marginVertical: 10 },
  btn: {
    backgroundColor: "#1E40AF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});

export default styles;
