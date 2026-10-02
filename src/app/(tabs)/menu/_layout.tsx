import React from 'react';
import { Stack } from 'expo-router';

export default function LayoutMenuStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Menú Completo' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle del Plato' }} />
    </Stack>
  );
}