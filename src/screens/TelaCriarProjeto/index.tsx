import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Header/header";
import { styles } from "./TelaCriarProjeto";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

interface Etapa {
  nome: string;
  inicio: string;
  fim: string;
}

interface ProjetoForm {
  nome: string;
  linha: string;
  estacao: string;
  inicio: Date | null;
  fim: Date | null;
  status: string;
  imagens: string[];
}

const { width } = Dimensions.get("window");
const isTabletOrDesktop = width >= 768;

const lines = ["Selecionar", "Linha 1", "Linha 2", "Linha 3"];
const stations = ["Selecionar", "Estação A", "Estação B", "Estação C"];
const statuses = ["Selecionar", "Em Andamento", "Concluído", "Pendente"];

const Picker = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) => (
  <View style={isTabletOrDesktop ? styles.inputGroupDesktop : styles.inputGroupMobile}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity onPress={onPress} style={styles.pickerContainer}>
      <Text style={styles.pickerText}>{value}</Text>
    </TouchableOpacity>
  </View>
);

export default function CriarProjeto() {
  const navigation = useNavigation();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [form, setForm] = useState<ProjetoForm>({
    nome: "",
    linha: "Selecionar",
    estacao: "Selecionar",
    inicio: null,
    fim: null,
    status: "Selecionar",
    imagens: [],
  });

  const [novaEtapa, setNovaEtapa] = useState<Etapa>({
    nome: "",
    inicio: "",
    fim: "",
  });
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<
    "inicio" | "termino" | "etapaInicio" | "etapaFim" | null
  >(null);
  const [showLinePicker, setShowLinePicker] = useState(false);
  const [showStationPicker, setShowStationPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigation.navigate("Home" as never);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, navigation]);

  const handleChange = (field: keyof ProjetoForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(null);
    if (selectedDate) {
      if (showDatePicker === "inicio") {
        setForm({ ...form, inicio: selectedDate });
      } else if (showDatePicker === "termino") {
        setForm({ ...form, fim: selectedDate });
      } else if (showDatePicker === "etapaInicio") {
        setNovaEtapa({ ...novaEtapa, inicio: selectedDate.toLocaleDateString("pt-BR") });
      } else if (showDatePicker === "etapaFim") {
        setNovaEtapa({ ...novaEtapa, fim: selectedDate.toLocaleDateString("pt-BR") });
      }
    }
  };

  const pickImage = async () => {
    if (form.imagens.length >= 3) {
      Alert.alert("Limite de Imagens", "Você pode adicionar no máximo 3 imagens.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setForm({
        ...form,
        imagens: [...form.imagens, result.assets[0].uri],
      });
    }
  };

  const adicionarEtapa = () => {
    if (!novaEtapa.nome || !novaEtapa.inicio || !novaEtapa.fim) {
      Alert.alert("Erro", "Preencha todos os campos da etapa.");
      return;
    }
    setEtapas([...etapas, novaEtapa]);
    setNovaEtapa({ nome: "", inicio: "", fim: "" });
  };

  const excluirEtapa = (index: number) => {
    setEtapas(etapas.filter((_, i) => i !== index));
  };

  const excluirImagem = (index: number) => {
    setForm({ ...form, imagens: form.imagens.filter((_, i) => i !== index) });
  };

  const handleNextStep1 = () => {
    if (
      !form.nome ||
      form.linha === "Selecionar" ||
      form.estacao === "Selecionar" ||
      form.status === "Selecionar" ||
      !form.inicio ||
      !form.fim
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
    } else {
      setStep(2);
    }
  };

  const handleNextStep2 = () => {
    if (form.imagens.length === 0) {
      Alert.alert("Erro", "Por favor, adicione pelo menos uma imagem.");
    } else {
      setStep(3);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <View
              style={isTabletOrDesktop ? styles.formRowDesktop : styles.formRowMobile}
            >
              <View
                style={isTabletOrDesktop ? styles.inputGroupDesktop : styles.inputGroupMobile}
              >
                <Text style={styles.label}>Nome do Projeto</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome"
                  value={form.nome}
                  onChangeText={(t) => handleChange("nome", t)}
                />
              </View>
              <Picker
                label="Linha do Projeto"
                value={form.linha}
                onPress={() => setShowLinePicker(true)}
              />
            </View>

            <View
              style={isTabletOrDesktop ? styles.formRowDesktop : styles.formRowMobile}
            >
              <Picker
                label="Estação"
                value={form.estacao}
                onPress={() => setShowStationPicker(true)}
              />
            </View>

            <View
              style={isTabletOrDesktop ? styles.formRowDesktop : styles.formRowMobile}
            >
              <View
                style={isTabletOrDesktop ? styles.inputGroupDesktop : styles.inputGroupMobile}
              >
                <Text style={styles.label}>Data de Início</Text>
                <TouchableOpacity
                  style={styles.dateInputContainer}
                  onPress={() => setShowDatePicker("inicio")}
                >
                  <TextInput
                    style={styles.dateInput}
                    placeholder="DD/MM/AAAA"
                    value={form.inicio ? form.inicio.toLocaleDateString("pt-BR") : ""}
                    editable={false}
                  />
                  <Text style={styles.calendarIcon}>📅</Text>
                </TouchableOpacity>
              </View>
              <View
                style={isTabletOrDesktop ? styles.inputGroupDesktop : styles.inputGroupMobile}
              >
                <Text style={styles.label}>Data de Término</Text>
                <TouchableOpacity
                  style={styles.dateInputContainer}
                  onPress={() => setShowDatePicker("termino")}
                >
                  <TextInput
                    style={styles.dateInput}
                    placeholder="DD/MM/AAAA"
                    value={form.fim ? form.fim.toLocaleDateString("pt-BR") : ""}
                    editable={false}
                  />
                  <Text style={styles.calendarIcon}>📅</Text>
                </TouchableOpacity>
              </View>
              <Picker
                label="Status"
                value={form.status}
                onPress={() => setShowStatusPicker(true)}
              />
            </View>
            <View style={styles.buttonRight}>
              <TouchableOpacity
                style={[styles.button, styles.nextBtn]}
                onPress={handleNextStep1}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.label}>Imagem do Projeto</Text>
            <View style={styles.imageUploadContainer}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderIcon}>⬆️</Text>
                <Text style={styles.placeholderText}>
                  Arraste e solte para fazer upload de arquivo
                </Text>
                <Text style={styles.placeholderText}>ou</Text>
                <TouchableOpacity
                  style={[styles.button, styles.browseBtn]}
                  onPress={pickImage}
                >
                  <Text style={styles.buttonText}>Procurar Arquivo</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.imagePreviewContainer}>
              {form.imagens.map((uri, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{ uri }} style={styles.imageThumbnail} />
                  <TouchableOpacity
                    style={styles.deleteImageBtn}
                    onPress={() => excluirImagem(index)}
                  >
                    <Text style={styles.deleteImageText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.bottomButtons}>
              <TouchableOpacity
                style={[styles.button, styles.backBtn]}
                onPress={() => setStep(1)}
              >
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.nextBtn]}
                onPress={handleNextStep2}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.stageForm}>
              <View style={styles.inputGroupMobile}>
                <Text style={styles.label}>Etapa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome da etapa"
                  value={novaEtapa.nome}
                  onChangeText={(t) => setNovaEtapa({ ...novaEtapa, nome: t })}
                />
              </View>
              <View style={styles.dateInputWrapper}>
                <View style={styles.inputGroupMobile}>
                  <Text style={styles.label}>Data de Início</Text>
                  <TouchableOpacity
                    style={styles.dateInputContainer}
                    onPress={() => setShowDatePicker("etapaInicio")}
                  >
                    <TextInput
                      style={styles.dateInput}
                      placeholder="DD/MM/AAAA"
                      value={novaEtapa.inicio}
                      editable={false}
                    />
                    <Text style={styles.calendarIcon}>📅</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputGroupMobile}>
                  <Text style={styles.label}>Data de Término</Text>
                  <TouchableOpacity
                    style={styles.dateInputContainer}
                    onPress={() => setShowDatePicker("etapaFim")}
                  >
                    <TextInput
                      style={styles.dateInput}
                      placeholder="DD/MM/AAAA"
                      value={novaEtapa.fim}
                      editable={false}
                    />
                    <Text style={styles.calendarIcon}>📅</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.addBtn]}
                  onPress={adicionarEtapa}
                >
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.stageList}>
              {etapas.map((etapa, index) => (
                <View key={index} style={styles.stageItem}>
                  <View style={styles.stageInfo}>
                    <Text style={styles.stageName}>{etapa.nome}</Text>
                    <Text style={styles.stageDate}>
                      {etapa.inicio} - {etapa.fim}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteBtn]}
                    onPress={() => excluirEtapa(index)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.bottomButtons}>
              <TouchableOpacity
                style={[styles.button, styles.backBtn]}
                onPress={() => setStep(2)}
              >
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveBtn]}
                onPress={() => setShowPopup(true)}
              >
                <Text style={styles.buttonText}>Criar Projeto</Text>
              </TouchableOpacity>
            </View>
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Adicionar Projeto</Text>
          {renderStepContent()}
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={
            showDatePicker === "inicio"
              ? form.inicio || new Date()
              : showDatePicker === "termino"
              ? form.fim || new Date()
              : new Date()
          }
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Modal para Linhas */}
      <Modal transparent visible={showLinePicker} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.pickerModalCard}>
            {lines.map((line) => (
              <TouchableOpacity
                key={line}
                style={styles.pickerItem}
                onPress={() => {
                  setForm({ ...form, linha: line });
                  setShowLinePicker(false);
                }}
              >
                <Text style={styles.pickerModalText}>{line}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal para Estações */}
      <Modal transparent visible={showStationPicker} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.pickerModalCard}>
            {stations.map((station) => (
              <TouchableOpacity
                key={station}
                style={styles.pickerItem}
                onPress={() => {
                  setForm({ ...form, estacao: station });
                  setShowStationPicker(false);
                }}
              >
                <Text style={styles.pickerModalText}>{station}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal para Status */}
      <Modal transparent visible={showStatusPicker} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.pickerModalCard}>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                style={styles.pickerItem}
                onPress={() => {
                  setForm({ ...form, status: status });
                  setShowStatusPicker(false);
                }}
              >
                <Text style={styles.pickerModalText}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal de confirmação com temporizador */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupCard}>
            <Text style={styles.popupTitle}>Projeto Adicionado</Text>
            <TouchableOpacity
              style={[styles.button, styles.popupBtn]}
              onPress={() => {
                setShowPopup(false);
                navigation.navigate("Home" as never);
              }}
            >
              <Text style={styles.buttonText}>Voltar ao Início</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}