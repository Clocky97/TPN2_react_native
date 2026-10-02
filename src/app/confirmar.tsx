import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { FileText, CircleCheck, ArrowLeft, SquarePen } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { PlatoIcon } from '../components/PlatoIcon';
import { DondeEstoy } from '../components/DondeEstoy';

export default function PantallaConfirmar() {
  const { carrito, totalCarrito, nota, confirmarPedido } = useApp();
  const router = useRouter();

  const handleConfirmar = () => {
    const numeroTurno = confirmarPedido();
    if (numeroTurno > 0) {
      router.replace({ pathname: '/turno/[numero]', params: { numero: numeroTurno.toString() } });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FileText size={24} color="#1e293b" />
        <Text style={styles.titulo}>Resumen del Pedido</Text>
      </View>

      <View style={styles.card}>
        {carrito.map((item) => (
          <View key={item.plato.id} style={styles.row}>
            <View style={styles.itemInfo}>
              <PlatoIcon icono={item.plato.icono} categoria={item.plato.categoria} size={18} />
              <Text style={styles.itemTexto}>{item.cantidad}x {item.plato.nombre}</Text>
            </View>
            <Text style={styles.itemSubtotal}>${item.plato.precio * item.cantidad}</Text>
          </View>
        ))}

        {nota ? (
          <View style={styles.notaBox}>
            <View style={styles.notaHeader}>
              <SquarePen size={14} color="#92400e" />
              <Text style={styles.notaLabel}>Nota para cocina:</Text>
            </View>
            <Text style={styles.notaText}>{nota}</Text>
          </View>
        ) : null}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total a Pagar:</Text>
          <Text style={styles.totalMonto}>${totalCarrito}</Text>
        </View>
      </View>

      <Pressable style={styles.botonEnviar} onPress={handleConfirmar}>
        <CircleCheck size={20} color="#ffffff" />
        <Text style={styles.textoEnviar}>Confirmar y Enviar Pedido</Text>
      </Pressable>

      <Pressable style={styles.botonCancelar} onPress={() => router.back()}>
        <ArrowLeft size={16} color="#64748b" />
        <Text style={styles.textoCancelar}>Volver al Carrito</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 12, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  itemInfo: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  itemTexto: { fontSize: 14, color: '#334155' },
  itemSubtotal: { fontSize: 14, fontWeight: 'bold', color: '#16a34a' },
  notaBox: { backgroundColor: '#fef3c7', padding: 10, borderRadius: 8, marginTop: 12 },
  notaHeader: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  notaLabel: { fontSize: 11, fontWeight: 'bold', color: '#92400e' },
  notaText: { fontSize: 12, color: '#78350f', marginTop: 4 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTopWidth: 2, borderTopColor: '#e2e8f0' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  totalMonto: { fontSize: 18, fontWeight: 'bold', color: '#16a34a' },
  botonEnviar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  textoEnviar: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  botonCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  textoCancelar: { color: '#64748b', fontSize: 14 },
});