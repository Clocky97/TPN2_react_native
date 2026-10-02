import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LogOut, CircleCheck, CheckCheck, SquarePen, ClipboardList } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';
import { PlatoIcon } from '../../components/PlatoIcon';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaCocina() {
  const { colaPedidos, atenderSiguientePedido, logout, pedidosVersion } = useApp();

  const frentePedido = colaPedidos.frente();
  const cantidadEnEspera = colaPedidos.tamanio;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.esperaBox}>
          <ClipboardList size={18} color="#dc2626" />
          <Text style={styles.esperaTexto}>Pedidos en espera: {cantidadEnEspera}</Text>
        </View>
        <Pressable style={styles.botonLogout} onPress={logout}>
          <LogOut size={14} color="#ffffff" />
          <Text style={styles.textoLogout}>Cerrar Sesión</Text>
        </Pressable>
      </View>

      {!frentePedido ? (
        <View style={styles.sinPedidos}>
          <CircleCheck size={48} color="#16a34a" />
          <Text style={styles.sinPedidosTexto}>No hay pedidos pendientes en la cola</Text>
          <Text style={styles.sinPedidosSub}>Los nuevos pedidos aparecerán aquí automáticamente.</Text>
        </View>
      ) : (
        <View style={styles.cardPedido}>
          <View style={styles.badgeFrente}>
            <Text style={styles.badgeFrenteTexto}>FRENTE DE LA COLA</Text>
          </View>
          <Text style={styles.numeroTurno}>Turno #{frentePedido.numero}</Text>

          <Text style={styles.seccionLabel}>Detalle de Items:</Text>
          {frentePedido.items.map((item) => (
            <View key={item.plato.id} style={styles.itemRow}>
              <PlatoIcon icono={item.plato.icono} categoria={item.plato.categoria} size={18} />
              <Text style={styles.itemTexto}>
                {item.cantidad}x {item.plato.nombre}
              </Text>
            </View>
          ))}

          {frentePedido.nota ? (
            <View style={styles.notaBox}>
              <View style={styles.notaHeader}>
                <SquarePen size={14} color="#92400e" />
                <Text style={styles.notaLabel}>Nota Alumno:</Text>
              </View>
              <Text style={styles.notaTexto}>{frentePedido.nota}</Text>
            </View>
          ) : null}

          <Pressable style={styles.botonAtender} onPress={atenderSiguientePedido}>
            <CheckCheck size={20} color="#ffffff" />
            <Text style={styles.textoAtender}>Atender Siguiente Pedido</Text>
          </Pressable>
        </View>
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  esperaBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  esperaTexto: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  botonLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#475569',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoLogout: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  sinPedidos: {
    backgroundColor: '#ffffff',
    padding: 40,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  sinPedidosTexto: { fontSize: 16, color: '#16a34a', fontWeight: 'bold', marginTop: 12 },
  sinPedidosSub: { fontSize: 13, color: '#94a3b8', textAlign: 'center', marginTop: 6 },
  cardPedido: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dc2626',
    elevation: 2,
  },
  badgeFrente: {
    backgroundColor: '#fee2e2',
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeFrenteTexto: { color: '#dc2626', fontSize: 10, fontWeight: 'bold' },
  numeroTurno: { fontSize: 32, fontWeight: 'bold', color: '#dc2626', marginBottom: 12 },
  seccionLabel: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  itemTexto: { fontSize: 15, color: '#1e293b' },
  notaBox: { backgroundColor: '#fef3c7', padding: 10, borderRadius: 8, marginVertical: 12 },
  notaHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 },
  notaLabel: { fontSize: 11, fontWeight: 'bold', color: '#92400e' },
  notaTexto: { fontSize: 13, color: '#78350f' },
  botonAtender: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  textoAtender: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});