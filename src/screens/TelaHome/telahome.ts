import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
    gap: 12,
    flexShrink: 1, // ⬅️ Adicione esta linha
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: "#555",
    paddingHorizontal: 4,
  },
  progressBarContainer: {
    width: "100%",
  },
  progressBarBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#eee",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: "#059669",
    borderRadius: 6,
  },
  progressText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    color: "#222",
    marginTop: 4,
  },
});