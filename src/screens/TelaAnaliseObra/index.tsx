import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker"; 
import Header from "../../Header/header";
import BottomNavigation from "../../navigation/BottomNavigation";

// Importação dos estilos separados
import styles from "./TelaAnaliseObra"; 

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
      // Simulação de envio
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
          <TouchableOpacity 
            style={styles.analyzeButton} 
            onPress={handleAnalyze} 
            activeOpacity={0.8} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" /> 
            ) : (
              <Text style={styles.analyzeText}>🔍  Analisar Conformidade</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}