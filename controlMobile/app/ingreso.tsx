import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Movimiento } from './types';
import { useFinanzas } from './FinanzasContext';
import { styles } from './styles';

export default function AgregarIngreso() {
  const router = useRouter();
  const { agregarMovimiento } = useFinanzas();
  
  const [ingreso, setIngreso] = useState<Omit<Movimiento, 'id' | 'tipo'>>({ 
    monto: 0,
    descripcion: '',
    fecha: new Date(),
    categoria: ''
  });

  const categoriasIngresos = [
    'Salario', 'Freelance', 'Inversiones', 'Regalo',
    'Venta', 'Reembolso', 'Otros'
  ];

  const handleAgregarIngreso = () => {
    if (!ingreso.descripcion || ingreso.monto <= 0) {
      Alert.alert('Error', 'Por favor completa todos los campos correctamente');
      return;
    }

    const nuevoIngreso: Movimiento = {
      ...ingreso,
      id: Math.random().toString(36).substring(7),
      tipo: 'Ingreso',
      fecha: ingreso.fecha || new Date()
    };

    agregarMovimiento(nuevoIngreso);
    Alert.alert('Éxito', 'Ingreso agregado correctamente', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Ingreso</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Pago nómina, Trabajo freelance, etc."
          value={ingreso.descripcion}
          onChangeText={(text) => setIngreso({...ingreso, descripcion: text})}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Monto ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={ingreso.monto > 0 ? ingreso.monto.toString() : ''}
          onChangeText={(text) => {
            const numericValue = parseFloat(text) || 0;
            setIngreso({...ingreso, monto: numericValue});
          }}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoría</Text>
        <View style={styles.categoriasContainer}>
          {categoriasIngresos.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaPill,
                ingreso.categoria === cat && styles.categoriaPillSelected
              ]}
              onPress={() => setIngreso({...ingreso, categoria: cat})}
            >
              <Text style={ingreso.categoria === cat 
                ? styles.categoriaPillTextSelected 
                : styles.categoriaPillText
              }>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha</Text>
        <TouchableOpacity 
          style={styles.input} 
          onPress={() => {/* Abrir date picker */}}
        >
          <Text>{ingreso.fecha?.toLocaleDateString() || 'Seleccionar fecha'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, styles.ingresoButton]}
        onPress={handleAgregarIngreso}
      >
        <Text style={styles.buttonText}>Registrar Ingreso</Text>
      </TouchableOpacity>
    </View>
  );
}