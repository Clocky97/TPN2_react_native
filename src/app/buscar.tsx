import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { Search, ChevronRight, Coffee, Utensils, CupSoda, Store } from 'lucide-react-native';
import { PLATOS } from '../data/platos';
import { PlatoIcon } from '../components/PlatoIcon';
import { DondeEstoy } from '../components/DondeEstoy';

export default function PantallaBuscar() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const router = useRouter();

  const handleTextChange = (text: string) => {
    router.setParams({ q: text });
  };

  const handleCatSelect = (cat: string) => {
    const nuevaCat = categoria === cat ? '' : cat;
    router.setParams({ categoria: nuevaCat });
  };

  const categorias = [
    { key: 'desayuno', label: 'Desayuno', icon: Coffee },
    { key: 'almuerzo', label: 'Almuerzo', icon: Utensils },
    { key: 'bebidas', label: 'Bebidas', icon: CupSoda },
    { key: 'kiosco', label: 'Kiosco', icon: Store },
  ] as const;

  const resultados = PLATOS.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(q.toLowerCase()) || p.descripcion.toLowerCase().includes(q.toLowerCase());
    const coincideCat = categoria ? p.categoria === categoria : true;
    return coincideTexto && coincideCat;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Search size={22} color="#1e293b" />
        <Text style={styles.titulo}>Buscador de Platos</Text>
      </View>

      <View style={styles.searchBar}>
        <Search size={18} color="#94a3b8" />
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o ingrediente..."
          value={q}
          onChangeText={handleTextChange}
        />
      </View>

      <View style={styles.filtros}>
        {categorias.map((cat) => {
          const IconComp = cat.icon;
          const activo = categoria === cat.key;
          return (
            <Pressable
              key={cat.key}
              style={[styles.chip, activo && styles.chipActivo]}
              onPress={() => handleCatSelect(cat.key)}
            >
              <IconComp size={14} color={activo ? '#ffffff' : '#475569'} />
              <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>{cat.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.subtitulo}>Resultados ({resultados.length}):</Text>

      {resultados.map((plato) => (
        <Link key={plato.id} href={{ pathname: '/menu/[id]', params: { id: plato.id.toString() } }} asChild>
          <Pressable style={styles.card}>
            <View style={styles.iconWrapper}>
              <PlatoIcon icono={plato.icono} categoria={plato.categoria} size={24} />
            </View>
            <View style={styles.info}>
              <Text style={styles.nombre}>{plato.nombre}</Text>
              <Text style={styles.precio}>${plato.precio}</Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </Pressable>
        </Link>
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  input: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 14, color: '#1e293b' },
  filtros: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e2e8f0',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  chipActivo: { backgroundColor: '#0284c7' },
  chipTexto: { fontSize: 12, color: '#334155' },
  chipTextoActivo: { color: '#ffffff', fontWeight: 'bold' },
  subtitulo: { fontSize: 14, fontWeight: 'bold', color: '#64748b', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  info: { flex: 1 },
  nombre: { fontSize: 14, fontWeight: '600', color: '#1e293b' },
  precio: { fontSize: 13, fontWeight: 'bold', color: '#16a34a' },
});