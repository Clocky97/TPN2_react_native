import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock, LogIn, TriangleAlert } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { DondeEstoy } from '../components/DondeEstoy';

export default function PantallaLoginModal() {
  const [usuario, setUsuarioInput] = useState('');
  const [clave, setClaveInput] = useState('');
  const [error, setError] = useState(false);
  const { login } = useApp();
  const router = useRouter();

  const handleLogin = () => {
    const exito = login(usuario, clave);
    if (!exito) {
      setError(true);
    } else {
      router.replace('/cocina');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Lock size={32} color="#dc2626" />
        </View>
        <Text style={styles.titulo}>Acceso Personal de Cocina</Text>
        <Text style={styles.subtitulo}>Credenciales exclusivas para operadores</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario (cocina)"
          value={usuario}
          onChangeText={setUsuarioInput}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña (1234)"
          value={clave}
          onChangeText={setClaveInput}
          secureTextEntry
        />

        {error ? (
          <View style={styles.errorBox}>
            <TriangleAlert size={14} color="#dc2626" />
            <Text style={styles.errorTexto}>Usuario o contraseña incorrectos</Text>
          </View>
        ) : null}

        <Pressable style={styles.botonLogin} onPress={handleLogin}>
          <LogIn size={18} color="#ffffff" />
          <Text style={styles.textoBoton}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable style={styles.botonCerrar} onPress={() => router.back()}>
          <Text style={styles.textoCerrar}>Cancelar</Text>
        </Pressable>
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f8fafc', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#ffffff', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 2 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' },
  subtitulo: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  errorTexto: { color: '#dc2626', fontSize: 13 },
  botonLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
  },
  textoBoton: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  botonCerrar: { marginTop: 14, alignItems: 'center' },
  textoCerrar: { color: '#64748b', fontSize: 14 },
});