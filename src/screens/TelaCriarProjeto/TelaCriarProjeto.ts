import { StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 600,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#003087",
  },
  formRowMobile: {
    flexDirection: "column",
    gap: 15,
    marginBottom: 15,
  },
  formRowDesktop: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 15,
  },
  inputGroupMobile: {
    width: "100%",
  },
  inputGroupDesktop: {
    flex: 1,
    minWidth: "45%",
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    fontSize: 14,
    width: "100%",
    marginBottom: 0,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 12,
  },
  pickerText: {
    fontSize: 14,
    color: "#000",
  },
  pickerModalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: 300,
  },
  pickerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pickerModalText: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  nextBtn: {
    backgroundColor: "#003087",
  },
  cancelBtn: {
    backgroundColor: "#d62828", // Cor para o botão de cancelar
  },
  backBtn: {
    backgroundColor: "#d62828",
  },
  saveBtn: {
    backgroundColor: "#003087",
  },
  deleteBtn: {
    backgroundColor: "#d62828",
    paddingHorizontal: 15,
  },
  addBtn: {
    backgroundColor: "#003087",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-end",
  },
  buttonRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between", // Alterado para 'space-between'
    marginTop: 10,
  },
  stageForm: {
    flexDirection: "column",
    gap: 15,
    marginBottom: 15,
  },
  stageList: {
    gap: 10,
    marginBottom: 20,
  },
  stageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 15,
  },
  stageInfo: {
    flexDirection: "column",
    gap: 5,
  },
  stageName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },
  stageDate: {
    backgroundColor: "#0a288f",
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupCard: {
    backgroundColor: "#f3f3f3",
    padding: 30,
    borderRadius: 14,
    alignItems: "center",
    width: "80%",
  },
  popupTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "700",
  },
  popupBtn: {
    backgroundColor: "#003087",
    marginTop: 10,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    paddingRight: 10,
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  calendarIcon: {
    fontSize: 20,
  },
  imageUploadContainer: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    alignItems: "center",
    gap: 10,
  },
  placeholderIcon: {
    fontSize: 50,
    color: "#888",
  },
  placeholderText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  browseBtn: {
    backgroundColor: "#003087",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  imagePreview: {
    position: "relative",
    width: 100,
    height: 100,
  },
  imageThumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  deleteImageBtn: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#d62828",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteImageText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  dateInputWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    alignItems: 'flex-end',
  },
});