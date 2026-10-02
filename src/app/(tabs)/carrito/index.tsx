import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Undo2, ShoppingCart, SquarePen, ArrowRight } from 'lucide-react-native';
import { useApp } from '../../../context/AppContext';
import { PlatoIcon } from '../../../components/PlatoIcon';
import { DondeEstoy } from '../../../components/DondeEstoy';

export default function PantallaCarritoIndex() {
  const { carrito, totalCarrito, deshacerCarrito, puedeDeshacer, nota } = useApp();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.titulo}>Ítems en Carrito</Text>
        <Pressable
          style={[styles.botonDeshacer, !puedeDeshacer && styles.botonInactivo]}
          onPress={deshacerCarrito}
          disabled={!puedeDeshacer}
        >
          <Undo2 size={16} color={puedeDeshacer ? '#ffffff' : '#94a3b8'} />
          <Text style={[styles.textoDeshacer, !puedeDeshacer && styles.textoDeshacerInactivo]}>
            Deshacer último
          </Text>
        </Pressable>
      </View>

      {carrito.length === 0 ? (
        <View style={styles.vacio}>
          <View style={styles.vacioIconWrapper}>
            <ShoppingCart size={48} color="#94a3b8" />
          </View>
          <Text style={styles.vacioTexto}>El carrito está vacío</Text>
          <Text style={styles.vacioSub}>Agrega platos desde la pestaña Menú para armar tu pedido.</Text>
        </View>
      ) : (
        <View style={styles.lista}>
          {carrito.map((item) => (
            <View key={item.plato.id} style={styles.itemRow}>
              <View style={styles.itemIconWrapper}>
                <PlatoIcon icono={item.plato.icono} categoria={item.plato.categoria} size={20} />
              </View>
              <Text style={styles.itemNombre}>{item.plato.nombre}</Text>
              <Text style={styles.itemCantidad}>x{item.cantidad}</Text>
              <Text style={styles.itemSubtotal}>${item.plato.precio * item.cantidad}</Text>
            </View>
          ))}

          <View style={styles.notaCard}>
            <View style={styles.notaHeader}>
              <SquarePen size={16} color="#b45309" />
              <Text style={styles.notaTitulo}>Aclaración para cocina:</Text>
            </View>
            <Text style={styles.notaTexto}>{nota || 'Sin aclaraciones especiales'}</Text>
            <Link href="/carrito/nota" asChild>
              <Pressable style={styles.botonNota}>
                <Text style={styles.textoBotonNota}>{nota ? 'Editar nota' : 'Agregar nota'}</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalEtiqueta}>Total:</Text>
            <Text style={styles.totalMonto}>${totalCarrito}</Text>
          </View>

          <Pressable style={styles.botonConfirmar} onPress={() => router.push('/confirmar')}>
            <Text style={styles.textoConfirmar}>Ir a Confirmación</Text>
            <ArrowRight size={18} color="#ffffff" />
          </Pressable>
        </View>
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  botonDeshacer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonInactivo: { backgroundColor: '#e2e8f0' },
  textoDeshacer: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  textoDeshacerInactivo: { color: '#94a3b8' },
  vacio: { padding: 40, alignItems: 'center' },
  vacioIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  vacioTexto: { color: '#475569', fontSize: 18, fontWeight: 'bold' },
  vacioSub: { color: '#94a3b8', fontSize: 13, textAlign: 'center', marginTop: 6 },
  lista: { backgroundColor: '#ffffff', padding: 16, borderRadius: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  itemIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemNombre: { flex: 2, fontSize: 14, color: '#334155', fontWeight: '500' },
  itemCantidad: { width: 40, textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#d97706' },
  itemSubtotal: { width: 70, textAlign: 'right', fontSize: 14, fontWeight: 'bold', color: '#16a34a' },
  notaCard: { backgroundColor: '#fef3c7', padding: 12, borderRadius: 8, marginVertical: 14 },
  notaHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  notaTitulo: { fontSize: 12, fontWeight: 'bold', color: '#92400e' },
  notaTexto: { fontSize: 13, color: '#78350f', marginVertical: 6 },
  botonNota: { alignSelf: 'flex-start', marginTop: 2 },
  textoBotonNota: { fontSize: 12, color: '#d97706', fontWeight: 'bold' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, paddingTop: 10, borderTopWidth: 2, borderTopColor: '#e2e8f0' },
  totalEtiqueta: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  totalMonto: { fontSize: 20, fontWeight: 'bold', color: '#16a34a' },
  botonConfirmar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 8,
  },
  textoConfirmar: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});