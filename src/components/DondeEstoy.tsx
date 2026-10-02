import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';
import { MapPin } from 'lucide-react-native';

const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MapPin size={16} color="#38bdf8" />
        <Text style={styles.titulo}>Debug: ¿Dónde estoy?</Text>
      </View>
      <Text style={styles.texto}>
        <Text style={styles.label}>usePathname(): </Text>
        {pathname}
      </Text>

      <Text style={styles.texto}>
        <Text style={styles.label}>useSegments(): </Text>
        {JSON.stringify(segments)}
      </Text>

      <Text style={styles.texto}>
        <Text style={styles.label}>useLocalSearchParams(): </Text>
        {JSON.stringify(params)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    margin: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  titulo: {
    color: '#38bdf8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  texto: {
    color: '#f8fafc',
    fontSize: 11,
    marginBottom: 3,
  },
  label: {
    color: '#94a3b8',
    fontWeight: '600',
  },
});