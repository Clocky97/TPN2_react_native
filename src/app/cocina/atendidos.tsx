import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListOrdered, CircleCheck, Clock } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';
import { PlatoIcon } from '../../components/PlatoIcon';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaAtendidos() {
  const { pilaAtendidos, pedidosVersion } = useApp();
  const listaAtendidos = [...pilaAtendidos.aArray()].reverse();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ListOrdered size={22} color="#1e293b" />
        <Text style={styles.titulo}>Historial de Pedidos Atendidos (Tope a Base)</Text>
      </View>

      {listaAtendidos.length === 0 ? (
        <View style={styles.vacioCard}>
          <Clock size={40} color="#94a3b8" />
          <Text style={styles.vacio}>No se ha atendido ningún pedido aún.</Text>
        </View>
      ) : (
        listaAtendidos.map((pedido) => (
          <View key={pedido.numero} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.turnoRow}>
                <CircleCheck size={18} color="#16a34a" />
                <Text style={styles.turno}>Turno #{pedido.numero}</Text>
              </View>
              <Text style={styles.total}>Total: ${pedido.total}</Text>
            </View>
            <View style={styles.itemsList}>
              {pedido.items.map((item) => (
                <View key={item.plato.id} style={styles.itemRow}>
                  <PlatoIcon icono={item.plato.icono} categoria={item.plato.categoria} size={16} />
                  <Text style={styles.item}>
                    {item.cantidad}x {item.plato.nombre}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  vacioCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  vacio: { fontSize: 14, color: '#64748b' },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  turnoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  turno: { fontSize: 17, fontWeight: 'bold', color: '#16a34a' },
  total: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
  itemsList: { borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 2 },
  item: { fontSize: 13, color: '#475569' },
});