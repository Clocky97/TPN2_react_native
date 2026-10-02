import React from 'react';
import { Stack } from 'expo-router';

export default function LayoutCarritoStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Mi Carrito' }} />
      <Stack.Screen
        name="nota"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.85],
          title: 'Nota para Cocina',
        }}
      />
    </Stack>
  );
}