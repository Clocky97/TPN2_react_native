import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { TriangleAlert, House } from 'lucide-react-native';
import { DondeEstoy } from '../components/DondeEstoy';

export default function PantallaNotFound() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <TriangleAlert size={48} color="#dc2626" />
        </View>
        <Text style={styles.codigo}>404</Text>
        <Text style={styles.titulo}>Pantalla no encontrada</Text>
        <Text style={styles.subtitulo}>La URL "{pathname}" no existe en el sistema Comedor IPF.</Text>

        <Link href="/" asChild>
          <Pressable style={styles.boton}>
            <House size={18} color="#ffffff" />
            <Text style={styles.textoBoton}>Volver a Inicio</Text>
          </Pressable>
        </Link>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', justifyContent: 'space-between', padding: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  codigo: { fontSize: 36, fontWeight: 'bold', color: '#dc2626' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginTop: 4 },
  subtitulo: { fontSize: 13, color: '#64748b', textAlign: 'center', marginVertical: 12, maxWidth: 280 },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  textoBoton: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});