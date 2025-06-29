import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Movimiento } from '../types';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';

export default function AgregarIngreso() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [movimientoId, setMovimientoId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Para iOS necesitamos ocultar el picker después de seleccionar
    if (Platform.OS === 'ios') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setIngreso({ ...ingreso, fecha: selectedDate });
      setShowDatePicker(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };


  // Cargar datos si estamos editando
  useEffect(() => {
    if (params.movimiento) {
      try {
        const movData = JSON.parse(params.movimiento as string);
        setIngreso({
          monto: movData.monto,
          descripcion: movData.descripcion,
          fecha: new Date(movData.fecha),
          categoria: movData.categoria
        });
        setMovimientoId(movData.id);
        setIsEditing(true);
      } catch (error) {
        console.error('Error al parsear movimiento:', error);
      }
    }
  }, [params.movimiento]);

  const handleGuardarIngreso = async () => {
    if (!ingreso.descripcion || ingreso.monto <= 0 || !ingreso.categoria) {
      Alert.alert('Error', 'Por favor completa todos los campos correctamente');
      return;
    }

    try {
      if (isEditing) {
        // Actualizar documento existente
        await updateDoc(doc(db, 'movimientos', movimientoId), {
          ...ingreso,
          fecha: Timestamp.fromDate(ingreso.fecha || new Date())
        });

        Alert.alert('Éxito', 'Ingreso actualizado correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        // Crear nuevo documento
        await addDoc(collection(db, 'movimientos'), {
          ...ingreso,
          tipo: 'Ingreso',
          fecha: Timestamp.fromDate(ingreso.fecha || new Date())
        });

        Alert.alert('Éxito', 'Ingreso agregado correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error) {
      console.error('Error al guardar ingreso:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el ingreso');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? 'Editar Ingreso' : 'Agregar Nuevo Ingreso'}
      </Text>

      {/* Resto del formulario permanece igual */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Pago nómina, Trabajo freelance, etc."
          value={ingreso.descripcion}
          onChangeText={(text) => setIngreso({ ...ingreso, descripcion: text })}
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
            setIngreso({ ...ingreso, monto: numericValue });
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
              onPress={() => setIngreso({ ...ingreso, categoria: cat })}
            >
              <Text style={
                ingreso.categoria === cat
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
          style={[styles.input, styles.dateInput]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{ingreso.fecha ? formatDate(ingreso.fecha) : 'Seleccionar fecha'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={ingreso.fecha || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()} // No permitir fechas futuras
            locale="es-ES" // Configuración regional en español
          />
        )}

        {Platform.OS === 'ios' && showDatePicker && (
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(false)}
          >
            <Text style={styles.datePickerButtonText}>Aceptar</Text>
          </TouchableOpacity>
        )}
      </View>


      <TouchableOpacity
        style={[styles.button, styles.ingresoButton]}
        onPress={handleGuardarIngreso}
      >
        <Text style={styles.buttonText}>
          {isEditing ? 'Actualizar Ingreso' : 'Registrar Ingreso'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}