import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

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
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Mis Activos</Text>
      
      <ScrollView style={styles.activosContainer}>
        {activos.map((activo) => (
          <View key={activo.id} style={styles.activoCard}>
            <View style={styles.activoHeader}>
              <Ionicons 
                name={'trending-up-outline'} 
                size={24} 
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
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
