import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Coffee, Utensils, CupSoda, Store, ChevronRight } from 'lucide-react-native';
import { PLATOS } from '../../../data/platos';
import { PlatoIcon } from '../../../components/PlatoIcon';
import { DondeEstoy } from '../../../components/DondeEstoy';

export default function PantallaMenuIndex() {
  const categorias = [
    { key: 'desayuno', label: 'Desayuno', icon: Coffee },
    { key: 'almuerzo', label: 'Almuerzo', icon: Utensils },
    { key: 'bebidas', label: 'Bebidas', icon: CupSoda },
    { key: 'kiosco', label: 'Kiosco', icon: Store },
  ] as const;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.catChips}>
        {categorias.map((cat) => {
          const IconComp = cat.icon;
          return (
            <Link key={cat.key} href={{ pathname: '/categorias/[categoria]', params: { categoria: cat.key } }} asChild>
              <Pressable style={styles.chip}>
                <IconComp size={14} color="#b45309" />
                <Text style={styles.chipTexto}>{cat.label.toUpperCase()}</Text>
              </Pressable>
            </Link>
          );
        })}
      </View>

      {categorias.map((cat) => {
        const platosCat = PLATOS.filter((p) => p.categoria === cat.key);
        return (
          <View key={cat.key} style={styles.seccion}>
            <View style={styles.seccionHeader}>
              <cat.icon size={18} color="#475569" />
              <Text style={styles.tituloCat}>{cat.label.toUpperCase()}</Text>
            </View>
            {platosCat.map((plato) => (
              <Link key={plato.id} href={{ pathname: '/menu/[id]', params: { id: plato.id.toString() } }} asChild>
                <Pressable style={styles.platoCard}>
                  <View style={styles.iconWrapper}>
                    <PlatoIcon icono={plato.icono} categoria={plato.categoria} size={28} />
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.nombre}>{plato.nombre}</Text>
                    <Text style={styles.precio}>${plato.precio}</Text>
                  </View>
                  <ChevronRight size={18} color="#94a3b8" />
                </Pressable>
              </Link>
            ))}
          </View>
        );
      })}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  catChips: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, backgroundColor: '#ffffff' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef3c7',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  chipTexto: { fontSize: 11, fontWeight: 'bold', color: '#b45309' },
  seccion: { marginHorizontal: 16, marginTop: 16 },
  seccionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  tituloCat: { fontSize: 15, fontWeight: 'bold', color: '#475569' },
  platoCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: { flex: 1 },
  nombre: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  precio: { fontSize: 14, fontWeight: 'bold', color: '#16a34a', marginTop: 2 },
});