import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 450,
    borderRadius: 15,
    backgroundColor: "#D9D9D9",
    overflow: "hidden",
    elevation: 4,
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 16,
    justifyContent: 'space-between',
    gap: 20,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Garante que ocupe toda a largura do cardContent
    marginBottom: 10,
  },
  infoText: {
    fontSize: 10,
    color: "#222",
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 4, // Espaço interno para não colar na borda
  },
  progressBarContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  progressBarBackground: {
    width: "100%",
    height: 32, 
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 4, 
  },
  progressBarFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 32, 
    backgroundColor: "#6EF97B",
    borderRadius: 16,
  },
  progressText: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#222",
    marginTop: 2, // Espaço acima do texto
    position: "relative",
    top: undefined,
  },
});