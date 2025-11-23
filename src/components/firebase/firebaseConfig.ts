// src/components/firebase/firebaseConfig.tsx
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
};

// Inicializa o app apenas se ainda não foi inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializa o auth apenas se ainda não foi inicializado
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error: any) {
  // Se o auth já foi inicializado, apenas obtém a instância existente
  if (error?.code === 'auth/already-initialized' || 
      error?.message?.includes('already initialized')) {
    auth = getAuth(app);
  } else {
    // Para outros erros, tenta usar getAuth como fallback
    console.warn("Erro ao inicializar auth, tentando getAuth:", error);
    auth = getAuth(app);
  }
}

const db = getFirestore(app);

export { app, auth, db };
