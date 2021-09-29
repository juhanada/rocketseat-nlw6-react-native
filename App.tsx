import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font"; // expo install aqui
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani";
import AppLoading from "expo-app-loading";

import { AuthProvider } from './src/hooks/auth';

import { Background } from "./src/components/Background";
import { Routes } from "./src/routes";

export default function App() {
  // importando fontes. retorna boolean de error
  const [fontsLoaded] = useFonts({
    // hook para carregamento das fontes?
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  // verifica carregamento das fontes
  if (!fontsLoaded) {
    return <AppLoading />; // componente que segura tela de splash
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}
