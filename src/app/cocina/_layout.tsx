import React from 'react';
import Drawer from 'expo-router/drawer';
import { ClipboardList, ListOrdered } from 'lucide-react-native';

export default function LayoutCocinaDrawer() {
  return (
    <Drawer screenOptions={{ headerTintColor: '#dc2626' }}>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Pedidos Pendientes (Cola)',
          drawerIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{
          title: 'Historial de Atendidos (Pila)',
          drawerIcon: ({ color, size }) => <ListOrdered size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}