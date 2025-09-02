import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importando todas as telas
import Home from "../screens/TelaHome";
import TelaProjetosDetalhes from "../screens/TelaProjetosDetalhes";
import TelaAdicionarImagem from "../screens/TelaAdicionarImagem";
import TelaCriarProjeto from "../screens/TelaCriarProjeto";
import TelaCriarProjetoAdicionarImagem from "../screens/TelaCriarProjeto/TelaCriarProjetoAdicionarImagem";
import TelaCriarProjetoAdicionarEtapas from "../screens/TelaCriarProjeto/TelaCriarProjetoAdicionarEtapas";
import TelaLogin from "../screens/TelaLogin";
import TelaProximaEtapas from "../screens/TelaProximaEtapas";
import TelaTodosAlerta from "../screens/TelaTodosAlerta";
import TelaAlerta from "../screens/TelaTodosAlerta/TelaAlerta";

// Tipagem das rotas
export type RootStackParamList = {
  Home: undefined;
  TelaProjetosDetalhes: undefined;
  TelaAdicionarImagem: undefined;
  TelaCriarProjeto: undefined;
  TelaCriarProjetoAdicionarImagem: undefined;
  TelaCriarProjetoAdicionarEtapas: undefined;
  TelaLogin: undefined;
  TelaProximaEtapas: undefined;
  TelaTodosAlerta: undefined;
  TelaAlerta: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="TelaProjetosDetalhes"
          component={TelaProjetosDetalhes}
        />
        <Stack.Screen
          name="TelaAdicionarImagem"
          component={TelaAdicionarImagem}
        />
        <Stack.Screen name="TelaCriarProjeto" component={TelaCriarProjeto} />
        <Stack.Screen
          name="TelaCriarProjetoAdicionarImagem"
          component={TelaCriarProjetoAdicionarImagem}
        />
        <Stack.Screen
          name="TelaCriarProjetoAdicionarEtapas"
          component={TelaCriarProjetoAdicionarEtapas}
        />
        <Stack.Screen
          name="TelaProximaEtapas"
          component={TelaProximaEtapas}
        />
        <Stack.Screen name="TelaTodosAlerta" component={TelaTodosAlerta} />
        <Stack.Screen name="TelaAlerta" component={TelaAlerta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}