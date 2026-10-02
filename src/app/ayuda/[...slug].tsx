import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FileText } from 'lucide-react-native';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaAyudaCatchAll() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const rutaCompleta = Array.isArray(slug) ? slug.join(' / ') : slug;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FileText size={22} color="#1e293b" />
        <Text style={styles.titulo}>Artículo de Ayuda</Text>
      </View>
      <Text style={styles.subtitulo}>Ruta consultada: {rutaCompleta}</Text>

      <View style={styles.contenidoBox}>
        <Text style={styles.texto}>
          Aquí se muestra la información correspondiente al artículo de ayuda solicitado ({rutaCompleta}).
        </Text>
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  subtitulo: { fontSize: 13, color: '#0284c7', marginBottom: 12 },
  contenidoBox: { backgroundColor: '#ffffff', padding: 16, borderRadius: 10, marginVertical: 8, elevation: 1 },
  texto: { fontSize: 14, color: '#334155', lineHeight: 22 },
});