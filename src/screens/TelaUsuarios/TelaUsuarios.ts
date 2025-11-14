import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ===========================
     ESTRUTURA PRINCIPAL
  ============================ */
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingBottom: 100, // espaço extra para o BottomNavigation
  },

  /* ===========================
     CARTÃO DE PERFIL / CONTEÚDO
  ============================ */
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },

  /* ===========================
     AVATAR / IMAGEM DE PERFIL
  ============================ */
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  /* ===========================
     CAMPOS E INFORMAÇÕES
  ============================ */
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  disabledInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputText: {
    fontSize: 15,
    color: "#111827",
  },
});
