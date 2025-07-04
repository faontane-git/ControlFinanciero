import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Movimiento } from '../types';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';

export default function AgregarGasto() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [movimientoId, setMovimientoId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gasto, setGasto] = useState<Omit<Movimiento, 'id' | 'tipo'>>({
    monto: '',
    descripcion: '',
    fecha: new Date(),
    categoria: ''
  });

  const categoriasGastos = [
    'Comida', 'Transporte', 'Vivienda', 'Entretenimiento',
    'Salud', 'Educación', 'Ropa', 'Otros'
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Para iOS necesitamos ocultar el picker después de seleccionar
    if (Platform.OS === 'ios') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setGasto({ ...gasto, fecha: selectedDate });
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
        setGasto({
          monto: String(movData.monto),
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


  const handleAgregarGasto = async () => {
    const montoNumerico = parseFloat(gasto.monto);

    if (!gasto.descripcion || isNaN(montoNumerico) || montoNumerico <= 0 || !gasto.categoria) {
      Alert.alert('Error', 'Por favor completa todos los campos correctamente');
      return;
    }

    try {
      const dataToSave = {
        ...gasto,
        monto: montoNumerico,
        fecha: Timestamp.fromDate(gasto.fecha || new Date()),
      };

      if (isEditing) {
        await updateDoc(doc(db, 'movimientos', movimientoId), dataToSave);
        Alert.alert('Éxito', 'Ingreso actualizado correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        await addDoc(collection(db, 'movimientos'), {
          ...dataToSave,
          tipo: 'Gasto'
        });
        Alert.alert('Éxito', 'Gasto agregado correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
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
          keyboardType="decimal-pad" // Mejor opción para decimales
          value={gasto.monto}
          onChangeText={(text) => {
            // Validar formato decimal opcionalmente
            const decimalRegex = /^(\d+)?(\.\d*)?$/;
            if (text === '' || decimalRegex.test(text)) {
              setGasto({ ...gasto, monto: text });
            }
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

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha</Text>
        <TouchableOpacity
          style={[styles.input, styles.dateInput]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{gasto.fecha ? formatDate(gasto.fecha) : 'Seleccionar fecha'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={gasto.fecha || new Date()}
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
        onPress={handleAgregarGasto}
      >
        <Text style={styles.buttonText}>
          {isEditing ? 'Editar Gasto' : 'Agregar Gasto'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
