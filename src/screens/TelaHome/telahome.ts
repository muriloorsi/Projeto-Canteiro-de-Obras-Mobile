import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    marginBottom: 4,
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
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    marginTop: 4,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
    color: "#1E293B",
  },
});
