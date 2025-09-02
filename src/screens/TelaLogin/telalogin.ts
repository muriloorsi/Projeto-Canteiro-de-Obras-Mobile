import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001489",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 223,
    height: 61,
    marginBottom: 20,
  },
  innerContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    color: "#34405A",
    fontWeight: "400",
    letterSpacing: 2,
    marginBottom: 24,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#34405A",
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#B0B8C1",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#F8F9FB",
    fontSize: 16,
    color: "#34405A",
  },
  button: {
    marginTop: 16,
    width: "80%",
    height: 48,
    backgroundColor: "#3B5BFE",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    letterSpacing: 1,
  },
});

export default styles;