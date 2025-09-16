import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importando todas as telas
import Home from "../screens/TelaHome";
import TelaProjetosDetalhes from "../screens/TelaProjetosDetalhes";
import TelaRelatorios from "../screens/TelaRelatorios";
import TelaCriarProjeto from "../screens/TelaCriarProjeto";
import TelaLogin from "../screens/TelaLogin";
import TelaUsuario from "../screens/TelaUsuarios";

export type RootStackParamList = {
  Home: undefined;
  TelaUsuario: undefined;
  TelaRelatorios: undefined;
  TelaProjetosDetalhes: { projeto: any };
  TelaCriarProjeto: undefined;
  TelaLogin: undefined;
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} // ⬅️ Desabilita o header para a tela Home
        />
        <Stack.Screen
          name="TelaProjetosDetalhes"
          component={TelaProjetosDetalhes}
          options={{ headerShown: false }} // ⬅️ Desabilita para a tela de Detalhes
        />
        <Stack.Screen
          name="TelaCriarProjeto"
          component={TelaCriarProjeto}
          options={{ headerShown: false }} // ⬅️ Desabilita para a tela de Criação
        />
        <Stack.Screen
          name="TelaUsuario"
          component={TelaUsuario}
          options={{ headerShown: false }} // ⬅️ Desabilita para a tela de Usuário
        />
        <Stack.Screen
          name="TelaRelatorios"
          component={TelaRelatorios}
          options={{ headerShown: false }} // ⬅️ Esta é a sua correção
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}