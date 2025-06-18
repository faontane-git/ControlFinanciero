import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Movimiento } from './types';
import { styles } from './styles';

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

  const handleAgregarGasto = () => {
    if (!gasto.descripcion || gasto.monto <= 0) {
      Alert.alert('Error', 'Por favor completa todos los campos correctamente');
      return;
    }

    // Aquí deberías guardar el gasto en tu estado global o base de datos
    const nuevoGasto: Movimiento = {
      ...gasto,
      id: Math.random().toString(36).substring(7),
      tipo: 'Gasto',
      fecha: gasto.fecha || new Date()
    };

    // Guardar el gasto (esto es temporal, luego implementarás persistencia)
    Alert.alert('Éxito', 'Gasto agregado correctamente', [
      { text: 'OK', onPress: () => router.back() }
    ]);
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
          onChangeText={(text) => setGasto({...gasto, descripcion: text})}
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
            setGasto({...gasto, monto: numericValue});
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
              onPress={() => setGasto({...gasto, categoria: cat})}
            >
              <Text style={gasto.categoria === cat 
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