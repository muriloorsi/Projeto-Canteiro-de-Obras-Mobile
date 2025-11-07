export default {
  expo: {
    name: "Canteiro de Obras",
    slug: "Canteiro-de-Obras",
    version: "1.0.0",
    orientation: "portrait",
    icon: "src/assets/logo-metro.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "src/assets/logo2.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "src/assets/logo-metro.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "src/assets/logo-metro.png",
    },

    // 🔥 AQUI vão as variáveis de ambiente:
    extra: {
      FIREBASE_API_KEY: "AIzaSyB7oB-eT_R1buRnQHLUnXC2_wuyKsi7W1Y",
      FIREBASE_AUTH_DOMAIN: "projeto-integrador-66.firebaseapp.com",
      FIREBASE_PROJECT_ID: "projeto-integrador-66",
      FIREBASE_STORAGE_BUCKET: "projeto-integrador-66.firebasestorage.app",
      FIREBASE_MESSAGING_SENDER_ID: "883825739944",
      FIREBASE_APP_ID: "1:883825739944:web:78e9249cee71dbe1615a9d",
      FIREBASE_MEASUREMENT_ID: "G-8EWPB6QZ3V",
      CLOUDINARY_CLOUD_NAME: "dw4vyiqc2",
      CLOUDINARY_API_KEY: "241792472824252",
      CLOUDINARY_API_SECRET: "Q25tJObQR7vFxizEqK7ET0Wd7H4",
    },
  },
};
