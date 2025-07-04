import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTabBar from '../CustomTabBar';

export default function ActivosScreen() {
  const activos = [
    {
      id: 1,
      tipo: 'Cuenta Bancaria',
      nombre: 'Banco del Guayaquil',
      saldo: '$15,245.60',
      icono: 'card-outline',
      detalles: 'Cuenta Corriente · ***4567'
    },
    {
      id: 2,
      tipo: 'Cuenta Bancaria',
      nombre: 'Banco del Austro',
      saldo: '$8,730.20',
      icono: 'card-outline',
      detalles: 'Cuenta Ahorros · ***8912'
    },
    {
      id: 3,
      tipo: 'Inversiones',
      nombre: 'Acciones Banco de Guayaquil',
      saldo: '$23,500.00',
      icono: 'trending-up-outline',
      detalles: '120 acciones · +5.2% este mes'
    },
    {
      id: 4,
      tipo: 'Seguros',
      nombre: 'Póliza Recurrente',
      saldo: '$45,000.00',
      icono: 'shield-checkmark-outline',
      detalles: 'Vida · Próximo pago: 15/07/2023'
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Activos</Text>

        {/* Botón debajo del título */}
        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Añadir activo')}>
          <Ionicons name="add-circle-outline" size={20} color="#1E88E5" />
          <Text style={styles.addButtonText}>Añadir Activo</Text>
        </TouchableOpacity>

        <ScrollView style={styles.activosContainer} contentContainerStyle={{ paddingBottom: 120 }}>
          {activos.map((activo) => (
            <View key={activo.id} style={styles.activoCard}>
              <View style={styles.activoHeader}>
                <Ionicons
                  name={activo.icono as any}
                  size={22}
                  color="#1E88E5"
                  style={styles.activoIcon}
                />
                <View>
                  <Text style={styles.activoTipo}>{activo.tipo}</Text>
                  <Text style={styles.activoNombre}>{activo.nombre}</Text>
                </View>
              </View>

              <Text style={styles.activoSaldo}>{activo.saldo}</Text>

              <View style={styles.activoDetalles}>
                <Text style={styles.activoDetalleText}>{activo.detalles}</Text>
                <Ionicons name="chevron-forward" size={16} color="#888" />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
    backgroundColor: '#f4f6f8',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    marginLeft: 6,
    color: '#1E88E5',
    fontWeight: '600',
    fontSize: 14,
  },
  activosContainer: {
    flex: 1,
  },
  activoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  activoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  activoIcon: {
    marginRight: 10,
  },
  activoTipo: {
    fontSize: 12,
    color: '#888',
  },
  activoNombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activoSaldo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 4,
  },
  activoDetalles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activoDetalleText: {
    fontSize: 12,
    color: '#555',
  },
});
