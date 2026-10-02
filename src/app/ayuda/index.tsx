import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Info, Banknote, CreditCard, Clock, ChevronRight } from 'lucide-react-native';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaAyudaIndex() {
  const articulos = [
    { href: '/ayuda/pagos/efectivo' as const, titulo: 'Pagos en Efectivo', icon: Banknote },
    { href: '/ayuda/pagos/tarjeta' as const, titulo: 'Pagos con Tarjeta', icon: CreditCard },
    { href: '/ayuda/horarios' as const, titulo: 'Horarios de Atención', icon: Clock },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Info size={24} color="#1e293b" />
        <Text style={styles.titulo}>Centro de Ayuda</Text>
      </View>

      {articulos.map((art) => {
        const IconComp = art.icon;
        return (
          <Link key={art.href} href={art.href} asChild>
            <Pressable style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <IconComp size={20} color="#0284c7" />
                </View>
                <Text style={styles.cardTitulo}>{art.titulo}</Text>
              </View>
              <ChevronRight size={18} color="#94a3b8" />
            </Pressable>
          </Link>
        );
      })}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitulo: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
});