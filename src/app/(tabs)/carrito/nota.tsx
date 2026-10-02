import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SquarePen, Check } from 'lucide-react-native';
import { useApp } from '../../../context/AppContext';
import { DondeEstoy } from '../../../components/DondeEstoy';

export default function PantallaNotaCarrito() {
  const { nota, setNota } = useApp();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <SquarePen size={22} color="#d97706" />
        <Text style={styles.titulo}>Nota para la cocina</Text>
      </View>
      <Text style={styles.subtitulo}>Aclaraciones especiales (ej: sin sal, salsa aparte):</Text>

      <TextInput
        style={styles.input}
        value={nota}
        onChangeText={setNota}
        placeholder="Escribe tu aclaración aquí..."
        multiline
        numberOfLines={4}
      />

      <Pressable style={styles.botonGuardar} onPress={() => router.back()}>
        <Check size={18} color="#ffffff" />
        <Text style={styles.textoBoton}>Guardar Nota</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  subtitulo: { fontSize: 13, color: '#64748b', marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, height: 100, textAlignVertical: 'top', marginVertical: 12 },
  botonGuardar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d97706',
    paddingVertical: 12,
    borderRadius: 8,
  },
  textoBoton: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
});