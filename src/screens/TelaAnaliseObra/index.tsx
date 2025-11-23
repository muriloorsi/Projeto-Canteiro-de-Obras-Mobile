import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker"; 
import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";

const windowWidth = Dimensions.get("window").width;
const contentPadding = 16;
const boxHeight = 200;

export default function TelaAnaliseObra() {
  const [bimUri, setBimUri] = useState<string | null>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async (setter: (uri: string | null) => void) => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        alert("Permissão de acesso ao álbum é necessária.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled) {
        const uri = (result as any).assets ? (result as any).assets[0].uri : (result as any).uri;
        setter(uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  const handleAnalyze = async () => {
    if (!bimUri || !fotoUri) {
      alert("Selecione o modelo BIM e a foto da obra antes de analisar.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      alert("Análise enviada (exemplo).");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar análise.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Análise de Conformidade da Obra</Text>
        <Text style={styles.subtitle}>Compare o modelo BIM com a foto atual da obra</Text>

        <Text style={styles.label}>Modelo BIM / Projeto</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          activeOpacity={0.8}
          onPress={() => pickImage(setBimUri)}
        >
          {bimUri ? (
            <Image source={{ uri: bimUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>📁</Text>
              <Text style={styles.placeholderText}>Clique para enviar</Text>
              <Text style={styles.placeholderSub}>Imagem do modelo BIM</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={[styles.label, { marginTop: 12 }]}>Foto da Obra</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          activeOpacity={0.8}
          onPress={() => pickImage(setFotoUri)}
        >
          {fotoUri ? (
            <Image source={{ uri: fotoUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>🖼️</Text>
              <Text style={styles.placeholderText}>Clique para enviar</Text>
              <Text style={styles.placeholderSub}>Foto atual do canteiro</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={[styles.label, { marginTop: 16 }]}>Informações Adicionais (Opcional)</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Ex: Linha 2 - Verde, Etapa de fundação..."
          multiline
          value={info}
          onChangeText={setInfo}
          placeholderTextColor="#999"
        />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze} activeOpacity={0.8} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.analyzeText}>🔍  Analisar Conformidade</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: {
    padding: contentPadding,
    paddingBottom: 140, 
  },
  title: { fontSize: 20, fontWeight: "700", color: "#0b3b6f", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 16 },
  label: { fontSize: 14, color: "#0b3b6f", fontWeight: "600", marginBottom: 8 },

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
  placeholder: { alignItems: "center" },
  placeholderIcon: { fontSize: 28, marginBottom: 6 },
  placeholderText: { fontSize: 16, fontWeight: "600", color: "#0b3b6f" },
  placeholderSub: { fontSize: 12, color: "#6b7280", marginTop: 6 },

  previewImage: {
    width: windowWidth - contentPadding * 2 - 2, // -2 para borda
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

  buttonWrapper: { alignItems: "center", marginTop: 18 },
  analyzeButton: {
    backgroundColor: "#6b8bc6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  analyzeText: { color: "#fff", fontWeight: "700" },
});