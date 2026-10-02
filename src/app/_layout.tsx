import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { AppProvider, useApp } from '../context/AppContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function ContenidoRaiz() {
  const { usuario } = useApp();
  const conSesion = usuario !== null;

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar Platos' }} />
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar Pedido' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Estado del Turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Centro de Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Artículo de Ayuda' }} />
      <Stack.Screen name="pedido" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ title: 'No Encontrado' }} />
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Acceso Cocina' }} />
      </Stack.Protected>
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <ContenidoRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}