import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Movimiento } from '../types';
import { styles } from '../styles';

import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AgregarGasto() {
  const router = useRouter();
  const [gasto, setGasto] = useState<Omit<Movimiento, 'id' | 'tipo'>>({
    monto: 0,
    descripcion: '',
    fecha: new Date(),
    categoria: ''
  });

  const categoriasGastos = [
    'Comida', 'Transporte', 'Vivienda', 'Entretenimiento',
    'Salud', 'Educación', 'Ropa', 'Otros'
  ];

  const handleAgregarGasto = async () => {
    if (!gasto.descripcion || gasto.monto <= 0 || !gasto.categoria) {
      Alert.alert('Error', 'Por favor completa todos los campos correctamente');
      return;
    }

    try {
      await addDoc(collection(db, 'movimientos'), {
        ...gasto,
        tipo: 'Gasto',
        fecha: Timestamp.fromDate(gasto.fecha || new Date())
      });

      Alert.alert('Éxito', 'Gasto agregado correctamente', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error al guardar gasto:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el gasto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Gasto</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Supermercado, Taxi, etc."
          value={gasto.descripcion}
          onChangeText={(text) => setGasto({ ...gasto, descripcion: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Monto ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={gasto.monto.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text) || 0;
            setGasto({ ...gasto, monto: numericValue });
          }}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoría</Text>
        <View style={styles.categoriasContainer}>
          {categoriasGastos.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaPill,
                gasto.categoria === cat && styles.categoriaPillSelected
              ]}
              onPress={() => setGasto({ ...gasto, categoria: cat })}
            >
              <Text style={
                gasto.categoria === cat
                  ? styles.categoriaPillTextSelected
                  : styles.categoriaPillText
              }>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.gastoButton]}
        onPress={handleAgregarGasto}
      >
        <Text style={styles.buttonText}>Agregar Gasto</Text>
      </TouchableOpacity>
    </View>
  );
}
