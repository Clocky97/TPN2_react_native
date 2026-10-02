import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { TriangleAlert, ShoppingCart, Check } from 'lucide-react-native';
import { PLATOS } from '../../../data/platos';
import { PlatoIcon } from '../../../components/PlatoIcon';
import { useApp } from '../../../context/AppContext';
import { DondeEstoy } from '../../../components/DondeEstoy';

export default function PantallaDetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { agregarAlCarrito } = useApp();
  const [agregado, setAgregado] = useState(false);

  const platoId = Number(id);
  const plato = PLATOS.find((p) => p.id === platoId);

  useEffect(() => {
    if (plato) {
      navigation.setOptions({ title: plato.nombre });
    }
  }, [plato, navigation]);

  if (!plato) {
    return (
      <View style={styles.errorContainer}>
        <TriangleAlert size={48} color="#dc2626" />
        <Text style={styles.errorTexto}>El plato #{id} no existe en la carta.</Text>
        <DondeEstoy />
      </View>
    );
  }

  const handleAgregar = () => {
    agregarAlCarrito(plato);
    setAgregado(true);
    setTimeout(() => {
      setAgregado(false);
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <PlatoIcon icono={plato.icono} categoria={plato.categoria} size={64} />
        </View>
        <Text style={styles.nombre}>{plato.nombre}</Text>
        <View style={styles.categoriaBadge}>
          <Text style={styles.categoriaTexto}>{plato.categoria.toUpperCase()}</Text>
        </View>
        <Text style={styles.descripcion}>{plato.descripcion}</Text>
        <Text style={styles.precio}>${plato.precio}</Text>

        <Pressable
          style={[styles.botonAgregar, agregado && styles.botonAgregado]}
          onPress={handleAgregar}
        >
          {agregado ? (
            <>
              <Check size={20} color="#ffffff" />
              <Text style={styles.textoBoton}>¡Agregado al carrito!</Text>
            </>
          ) : (
            <>
              <ShoppingCart size={20} color="#ffffff" />
              <Text style={styles.textoBoton}>Agregar al Carrito</Text>
            </>
          )}
        </Pressable>
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorTexto: { fontSize: 16, color: '#dc2626', fontWeight: 'bold', marginTop: 12 },
  card: { backgroundColor: '#ffffff', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 2 },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  nombre: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' },
  categoriaBadge: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginVertical: 8,
  },
  categoriaTexto: { fontSize: 11, fontWeight: 'bold', color: '#64748b' },
  descripcion: { fontSize: 14, color: '#334155', textAlign: 'center', marginVertical: 12, lineHeight: 20 },
  precio: { fontSize: 26, fontWeight: 'bold', color: '#16a34a', marginBottom: 20 },
  botonAgregar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d97706',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    width: '100%',
  },
  botonAgregado: { backgroundColor: '#16a34a' },
  textoBoton: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});