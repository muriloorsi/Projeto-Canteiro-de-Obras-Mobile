import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const contentPadding = 16;
const boxHeight = 200;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  scroll: {
    padding: contentPadding,
    paddingBottom: 140, 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#0b3b6f", 
    textAlign: "center", 
    marginBottom: 6 
  },
  subtitle: { 
    fontSize: 13, 
    color: "#6b7280", 
    textAlign: "center", 
    marginBottom: 16 
  },
  label: { 
    fontSize: 14, 
    color: "#0b3b6f", 
    fontWeight: "600", 
    marginBottom: 8 
  },
  uploadBox: {
    height: boxHeight,
    borderRadius: 8,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  placeholder: { 
    alignItems: "center" 
  },
  placeholderIcon: { 
    fontSize: 28, 
    marginBottom: 6 
  },
  placeholderText: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#0b3b6f" 
  },
  placeholderSub: { 
    fontSize: 12, 
    color: "#6b7280", 
    marginTop: 6 
  },
  previewImage: {
    width: windowWidth - contentPadding * 2 - 2, // -2 para compensar a borda
    height: boxHeight,
    resizeMode: "cover",
  },
  textarea: {
    marginTop: 8,
    minHeight: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    textAlignVertical: "top",
    color: "#111827",
    backgroundColor: "#fff",
  },
  buttonWrapper: { 
    alignItems: "center", 
    marginTop: 18 
  },
  analyzeButton: {
    backgroundColor: "#6b8bc6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  analyzeText: { 
    color: "#fff", 
    fontWeight: "700" 
  },
});

export default styles;