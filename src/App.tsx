import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { HeaderProvider } from "./Header/headerContext";

export default function App() {
  return (
    <HeaderProvider>
      <AppNavigator />
    </HeaderProvider>
  );
}