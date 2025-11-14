import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Header/header";
import { styles } from "./TelaCriarProjeto";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const stationOptions: Record<string, string[]> = {
  "Linha 1 - Azul": [
    "Tucuruvi",
    "Parada Inglesa",
    "Jardim São Paulo-Ayrton Senna",
    "Santana",
    "Carandiru",
    "Portuguesa-Tietê",
    "Armênia",
    "Tiradentes",
    "Luz",
    "São Bento",
    "Sé",
    "Liberdade-Japão",
    "São Joaquim",
    "Vergueiro",
    "Paraíso",
    "Ana Rosa",
    "Vila Mariana",
    "Santa Cruz",
    "Praça da Árvore",
    "Saúde-Ultrafarma",
    "São Judas",
    "Conceição",
    "Jabaquara-Comitê Paralímpico Brasileiro",
  ],
  "Linha 2 - Verde": [
    "Vila Madalena",
    "Sumaré",
    "Clínicas",
    "Consolação",
    "Trianon-Masp",
    "Brigadeiro",
    "Paraíso",
    "Ana Rosa",
    "Chácara Klabin",
    "Santos-Imigrantes",
    "Alto do Ipiranga",
    "Sacomã",
    "Tamanduateí",
    "Vila Prudente",
  ],
  "Linha 3 - Vermelha": [
    "Palmeiras-Barra Funda",
    "Marechal Deodoro",
    "Santa Cecília",
    "República",
    "Anhangabaú",
    "Sé",
    "Pedro II",
    "Brás",
    "Bresser-Mooca",
    "Belém",
    "Tatuapé",
    "Carrão-Assaí Atacadista",
    "Penha-Lojas Besni",
    "Vila Matilde",
    "Guilhermina-Esperança",
    "Patriarca-Vila Ré",
    "Artur Alvim",
    "Corinthians-Itaquera",
  ],
};

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

const lines = ["Selecionar", "Linha 1 - Azul", "Linha 2 - Verde", "Linha 3 - Vermelha"];
const statuses = ["Selecionar", "Pendente", "Em Andamento", "Concluído"];

const Picker = ({
  label,
  value,
  onPress,
  disabled = false,
}: {
  label: string;
  value: string;
  onPress: () => void;
  disabled?: boolean;
}) => (
  <View style={isTabletOrDesktop ? styles.inputGroupDesktop : styles.inputGroupMobile}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
      style={[
        styles.pickerContainer,
        disabled && { opacity: 0.5, backgroundColor: "#f0f0f0" },
      ]}
    >
      <Text style={[styles.pickerText, disabled && { color: "#888" }]}>
        {disabled ? "Selecione a linha primeiro" : value || "Selecionar"}
      </Text>
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
  const [novaEtapa, setNovaEtapa] = useState<Etapa>({ nome: "", inicio: "", fim: "" });
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<
    "inicio" | "termino" | "etapaInicio" | "etapaFim" | null
  >(null);
  const [showLinePicker, setShowLinePicker] = useState(false);
  const [showStationPicker, setShowStationPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  useEffect(() => {
    if (form.linha !== "Selecionar") {
      setForm((prev) => ({ ...prev, estacao: "Selecionar" }));
    }
  }, [form.linha]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigation.navigate("Home" as never);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleChange = (field: keyof ProjetoForm, value: any) =>
    setForm({ ...form, [field]: value });

const handleDateChange = (event: any, selectedDate?: Date) => {
  setShowDatePicker(null);
  if (!selectedDate) return;

  const formattedDate = selectedDate.toLocaleDateString("pt-BR");

  if (showDatePicker === "inicio") {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(selectedDate.getDate() + 7);

    setForm({
      ...form,
      inicio: selectedDate,
      fim: nextWeek, 
    });
  }

  if (showDatePicker === "termino") {
    setForm({ ...form, fim: selectedDate });
  }

if (showDatePicker === "etapaInicio") {
  const next3Days = new Date(selectedDate);
  next3Days.setDate(selectedDate.getDate() + 3); // soma 3 dias
  setNovaEtapa({
    ...novaEtapa,
    inicio: formattedDate,
    fim: next3Days.toLocaleDateString("pt-BR"),
  });
}

  if (showDatePicker === "etapaFim") {
    setNovaEtapa({ ...novaEtapa, fim: formattedDate });
  }
};


  const pickImage = async () => {
    if (form.imagens.length >= 1) {
      Alert.alert("Limite de Imagem", "Você pode adicionar no máximo 1 imagem.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled)
      setForm({ ...form, imagens: [...form.imagens, result.assets[0].uri] });
  };

  const adicionarEtapa = () => {
    if (!novaEtapa.nome || !novaEtapa.inicio || !novaEtapa.fim) {
      Alert.alert("Erro", "Preencha todos os campos da etapa.");
      return;
    }
    setEtapas([...etapas, novaEtapa]);
    setNovaEtapa({ nome: "", inicio: "", fim: "" });
  };

  const excluirEtapa = (index: number) =>
    setEtapas(etapas.filter((_, i) => i !== index));

  const excluirImagem = (index: number) =>
    setForm({ ...form, imagens: form.imagens.filter((_, i) => i !== index) });

  const handleNextStep1 = () => {
    const camposInvalidos =
      !form.nome ||
      form.linha === "Selecionar" ||
      form.estacao === "Selecionar" ||
      form.status === "Selecionar" ||
      !form.inicio ||
      !form.fim;

    if (camposInvalidos) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
    } else {
      setStep(2);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Confirmar Cancelamento",
      "Deseja cancelar? Todo o progresso será perdido.",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => navigation.navigate("Home" as never) },
      ]
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <View style={isTabletOrDesktop ? styles.formRowDesktop : styles.formRowMobile}>
              <View style={isTabletOrDesktop ? styles.inputGroupDesktop : styles.inputGroupMobile}>
                <Text style={styles.label}>Nome do Projeto</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome"
                  value={form.nome}
                  onChangeText={(t) => handleChange("nome", t)}
                />
              </View>
              <Picker label="Linha do Projeto" value={form.linha} onPress={() => setShowLinePicker(true)} />
            </View>

            <View style={isTabletOrDesktop ? styles.formRowDesktop : styles.formRowMobile}>
              <Picker
                label="Estação"
                value={form.estacao}
                onPress={() => form.linha !== "Selecionar" && setShowStationPicker(true)}
                disabled={form.linha === "Selecionar"}
              />
              <Picker label="Status" value={form.status} onPress={() => setShowStatusPicker(true)} />
            </View>

            <View style={isTabletOrDesktop ? styles.formRowDesktop : styles.formRowMobile}>
             <Picker   label="Data de Início"   value={form.inicio ? form.inicio.toLocaleDateString("pt-BR") : "DD/MM/AAAA"}   onPress={() => setShowDatePicker("inicio")} />
             <Picker   label="Data de Término"   value={form.fim ? form.fim.toLocaleDateString("pt-BR") : "DD/MM/AAAA"}   onPress={() => setShowDatePicker("termino")} />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.nextBtn]} onPress={handleNextStep1}>
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
                <Text style={styles.placeholderText}>Adicione uma imagem do projeto</Text>
                <TouchableOpacity style={[styles.button, styles.browseBtn]} onPress={pickImage}>
                  <Text style={styles.buttonText}>Escolher Imagem</Text>
                </TouchableOpacity>
              </View>
            </View>

            {form.imagens.length > 0 && (
              <View style={styles.imagePreviewContainer}>
                {form.imagens.map((uri, i) => (
                  <View key={i} style={styles.imagePreview}>
                    <Image source={{ uri }} style={styles.imageThumbnail} />
                    <TouchableOpacity style={styles.deleteImageBtn} onPress={() => excluirImagem(i)}>
                      <Text style={styles.deleteImageText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.bottomButtons}>
              <TouchableOpacity style={[styles.button, styles.backBtn]} onPress={() => setStep(1)}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.nextBtn]} onPress={() => setStep(3)}>
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
                {["etapaInicio", "etapaFim"].map((type, i) => (
                  <View key={i} style={styles.inputGroupMobile}>
                    <Text style={styles.label}>
                      {type === "etapaInicio" ? "Data de Início" : "Data de Término"}
                    </Text>
                    <TouchableOpacity
                      style={styles.dateInputContainer}
                      onPress={() => setShowDatePicker(type as any)}
                    >
                      <TextInput
                        style={styles.dateInput}
                        placeholder="DD/MM/AAAA"
                        value={type === "etapaInicio" ? novaEtapa.inicio : novaEtapa.fim}
                        editable={false}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity style={[styles.button, styles.addBtn]} onPress={adicionarEtapa}>
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={styles.stageListScroll} contentContainerStyle={styles.stageListContent}>
              {etapas.map((etapa, i) => (
                <View key={i} style={styles.stageItem}>
                  <View style={styles.stageInfo}>
                    <Text style={styles.stageName}>{etapa.nome}</Text>
                    <Text style={styles.stageDate}>{etapa.inicio} - {etapa.fim}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteBtn]}
                    onPress={() => excluirEtapa(i)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.bottomButtons}>
              <TouchableOpacity style={[styles.button, styles.backBtn]} onPress={() => setStep(2)}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveBtn]}
                onPress={() => {
                  if (etapas.length === 0) {
                    Alert.alert("Erro", "Adicione pelo menos uma etapa antes de criar o projeto.");
                    return;
                  }
                  setShowPopup(true);
                }}
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
            form.inicio || form.fim || new Date()
          }
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Modal Linhas */}
      <Modal transparent visible={showLinePicker} animationType="fade" onRequestClose={() => setShowLinePicker(false)}>
        <TouchableOpacity style={styles.popupOverlay} activeOpacity={1} onPressOut={() => setShowLinePicker(false)}>
          <View style={styles.pickerModalCard}>
            {lines.slice(1).map((line) => (
              <TouchableOpacity key={line} style={styles.pickerItem} onPress={() => {
                setForm({ ...form, linha: line });
                setShowLinePicker(false);
              }}>
                <Text style={styles.pickerModalText}>{line}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Estações */}
      <Modal transparent visible={showStationPicker} animationType="fade" onRequestClose={() => setShowStationPicker(false)}>
        <TouchableOpacity style={styles.popupOverlay} activeOpacity={1} onPressOut={() => setShowStationPicker(false)}>
          <View style={[styles.pickerModalCard, { maxHeight: "70%" }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {(stationOptions[form.linha] || ["Nenhuma estação disponível"]).map((station) => (
                <TouchableOpacity key={station} style={styles.pickerOption} onPress={() => {
                  setForm({ ...form, estacao: station });
                  setShowStationPicker(false);
                }}>
                  <Text style={styles.pickerOptionText}>{station}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Status */}
      <Modal transparent visible={showStatusPicker} animationType="fade" onRequestClose={() => setShowStatusPicker(false)}>
        <TouchableOpacity style={styles.popupOverlay} activeOpacity={1} onPressOut={() => setShowStatusPicker(false)}>
          <View style={styles.pickerModalCard}>
            {statuses.slice(1).map((status) => (
              <TouchableOpacity key={status} style={styles.pickerItem} onPress={() => {
                setForm({ ...form, status });
                setShowStatusPicker(false);
              }}>
                <Text style={styles.pickerModalText}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Confirmação */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupCard}>
            <Text style={styles.popupTitle}>Projeto Adicionado</Text>
            <TouchableOpacity style={[styles.button, styles.popupBtn]} onPress={() => {
              setShowPopup(false);
              navigation.navigate("Home" as never);
            }}>
              <Text style={styles.buttonText}>Voltar ao Início</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
