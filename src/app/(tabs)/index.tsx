import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { UtensilsCrossed, Search, Info, ChefHat } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaInicio() {
  const { usuario } = useApp();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.saludo}>¡Hola, Alumno/a!</Text>
        <Text style={styles.subtitulo}>Bienvenido al Comedor Universitario IPF</Text>
      </View>

      <Text style={styles.seccionTitulo}>Accesos Rápidos</Text>

      <View style={styles.grid}>
        <Link href="/menu" asChild>
          <Pressable style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: '#fef3c7' }]}>
              <UtensilsCrossed size={28} color="#d97706" />
            </View>
            <Text style={styles.cardTitulo}>Ver Menú</Text>
            <Text style={styles.cardSub}>Explorar categorías y platos</Text>
          </Pressable>
        </Link>

        <Link href="/buscar" asChild>
          <Pressable style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: '#e0f2fe' }]}>
              <Search size={28} color="#0284c7" />
            </View>
            <Text style={styles.cardTitulo}>Buscador</Text>
            <Text style={styles.cardSub}>Buscar por nombre o filtro</Text>
          </Pressable>
        </Link>

        <Link href="/ayuda" asChild>
          <Pressable style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: '#dcfce7' }]}>
              <Info size={28} color="#16a34a" />
            </View>
            <Text style={styles.cardTitulo}>Ayuda</Text>
            <Text style={styles.cardSub}>Preguntas y formas de pago</Text>
          </Pressable>
        </Link>

        <Link href={usuario ? '/cocina' : '/login'} asChild>
          <Pressable style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: '#fee2e2' }]}>
              <ChefHat size={28} color="#dc2626" />
            </View>
            <Text style={styles.cardTitulo}>Cocina</Text>
            <Text style={styles.cardSub}>Ingreso personal autorizado</Text>
          </Pressable>
        </Link>
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, backgroundColor: '#fef3c7', borderRadius: 12, margin: 16 },
  saludo: { fontSize: 24, fontWeight: 'bold', color: '#78350f' },
  subtitulo: { fontSize: 14, color: '#92400e', marginTop: 4 },
  seccionTitulo: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 12, color: '#1e293b' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'space-between' },
  card: {
    width: '46%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: '2%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  cardSub: { fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: 2 },
});