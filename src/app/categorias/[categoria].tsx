import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { TriangleAlert, ChevronRight, Coffee, Utensils, CupSoda, Store } from 'lucide-react-native';
import { PLATOS } from '../../data/platos';
import { PlatoIcon } from '../../components/PlatoIcon';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const catValida = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'].includes(categoria || '');

  if (!catValida) {
    return (
      <View style={styles.errorContainer}>
        <TriangleAlert size={48} color="#dc2626" />
        <Text style={styles.errorTexto}>La categoría "{categoria}" no es válida.</Text>
        <DondeEstoy />
      </View>
    );
  }

  const getCatIcon = () => {
    switch (categoria) {
      case 'desayuno':
        return <Coffee size={22} color="#b45309" />;
      case 'almuerzo':
        return <Utensils size={22} color="#b45309" />;
      case 'bebidas':
        return <CupSoda size={22} color="#b45309" />;
      case 'kiosco':
        return <Store size={22} color="#b45309" />;
      default:
        return <Utensils size={22} color="#b45309" />;
    }
  };

  const platos = PLATOS.filter((p) => p.categoria === categoria);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {getCatIcon()}
        <Text style={styles.headerTexto}>Categoría: {categoria?.toUpperCase()}</Text>
      </View>

      {platos.map((plato) => (
        <Link key={plato.id} href={{ pathname: '/menu/[id]', params: { id: plato.id.toString() } }} asChild>
          <Pressable style={styles.card}>
            <View style={styles.iconWrapper}>
              <PlatoIcon icono={plato.icono} categoria={plato.categoria} size={28} />
            </View>
            <View style={styles.info}>
              <Text style={styles.nombre}>{plato.nombre}</Text>
              <Text style={styles.desc}>{plato.descripcion}</Text>
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
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorTexto: { fontSize: 16, color: '#dc2626', fontWeight: 'bold', marginTop: 12 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  headerTexto: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: { flex: 1 },
  nombre: { fontSize: 15, fontWeight: 'bold', color: '#1e293b' },
  desc: { fontSize: 12, color: '#64748b', marginVertical: 2 },
  precio: { fontSize: 14, fontWeight: 'bold', color: '#16a34a' },
});