import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Clock, House, CircleCheck } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaTurno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { colaPedidos } = useApp();
  const router = useRouter();

  const numTurno = Number(numero);
  const listaCola = colaPedidos.aArray();
  const posicionEnCola = listaCola.findIndex((p) => p.numero === numTurno);
  const pedidosAdelante = posicionEnCola >= 0 ? posicionEnCola : 0;
  const tiempoEstimado = (pedidosAdelante + 1) * 3;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.badgeWrapper}>
          <CircleCheck size={24} color="#16a34a" />
          <Text style={styles.etiqueta}>Tu Número de Turno:</Text>
        </View>
        <Text style={styles.numero}>#{numero}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTexto}>Pedidos adelante en cola: {pedidosAdelante}</Text>
          <View style={styles.tiempoRow}>
            <Clock size={18} color="#0284c7" />
            <Text style={styles.tiempoTexto}>Tiempo estimado: {tiempoEstimado} mins</Text>
          </View>
        </View>

        <Pressable style={styles.botonInicio} onPress={() => router.dismissTo('/')}>
          <House size={18} color="#ffffff" />
          <Text style={styles.textoBoton}>Volver al Inicio</Text>
        </Pressable>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#ffffff', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 3 },
  badgeWrapper: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  etiqueta: { fontSize: 16, color: '#64748b', fontWeight: '500' },
  numero: { fontSize: 52, fontWeight: 'bold', color: '#d97706', marginVertical: 12 },
  infoBox: { backgroundColor: '#f1f5f9', padding: 14, borderRadius: 10, width: '100%', alignItems: 'center', marginVertical: 16 },
  infoTexto: { fontSize: 14, color: '#334155', fontWeight: '600' },
  tiempoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  tiempoTexto: { fontSize: 15, color: '#0284c7', fontWeight: 'bold' },
  botonInicio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBoton: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
});