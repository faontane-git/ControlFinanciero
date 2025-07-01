import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTabBar from '../CustomTabBar';
import { styles } from '../styles';

export default function PasivosScreen() {
  // Datos de créditos
  const creditos = [
    {
      id: 1,
      tipo: 'Crédito Hipotecario',
      entidad: 'Banco Pichincha',
      monto: '$85,000.00',
      fechaFinalizacion: '15/05/2030',
      cuotaMensual: '$1,200.50',
      icono: 'home-outline'
    },
    {
      id: 2,
      tipo: 'Crédito Vehicular',
      entidad: 'Banco del Pacífico',
      monto: '$25,750.00',
      fechaFinalizacion: '10/12/2025',
      cuotaMensual: '$580.75',
      icono: 'car-outline'
    }
  ];

  // Datos de gastos mensuales
  const gastosMensuales = [
    {
      id: 1,
      servicio: 'Internet Hogar',
      proveedor: 'CNT',
      monto: '$45.99',
      fechaPago: '05 de cada mes',
      icono: 'wifi-outline'
    },
    {
      id: 2,
      servicio: 'Celular',
      proveedor: 'Movistar',
      monto: '$32.50',
      fechaPago: '10 de cada mes',
      icono: 'phone-portrait-outline'
    },
    {
      id: 3,
      servicio: 'Gimnasio',
      proveedor: 'Smart Fit',
      monto: '$39.99',
      fechaPago: '01 de cada mes',
      icono: 'barbell-outline'
    },
    {
      id: 4,
      servicio: 'Streaming',
      proveedor: 'Netflix',
      monto: '$12.99',
      fechaPago: '15 de cada mes',
      icono: 'tv-outline'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={localStyles.screenTitle}>Mis Pasivos</Text>

      {/* Botones debajo del título */}
      <View style={localStyles.buttonsContainer}>
        <TouchableOpacity style={localStyles.addButton} onPress={() => console.log('Añadir crédito')}>
          <Ionicons name="add-circle-outline" size={18} color="#1E88E5" />
          <Text style={localStyles.addButtonText}>Añadir Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.addButton} onPress={() => console.log('Añadir gasto')}>
          <Ionicons name="add-circle-outline" size={18} color="#1E88E5" />
          <Text style={localStyles.addButtonText}>Añadir Gasto</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={localStyles.scrollContainer}>
        {/* Sección de Créditos */}
        <Text style={localStyles.sectionTitle}>Créditos</Text>
        {creditos.map((credito) => (
          <View key={`credito-${credito.id}`} style={localStyles.itemCard}>
            <View style={localStyles.itemHeader}>
              <Ionicons
                name={credito.icono as any}
                size={24}
                color="#FF5252"
                style={localStyles.itemIcon}
              />
              <View style={localStyles.itemTextContainer}>
                <Text style={localStyles.itemName}>{credito.tipo}</Text>
                <Text style={localStyles.itemDetail}>{credito.entidad}</Text>
              </View>
            </View>

            <View style={localStyles.itemData}>
              <View style={localStyles.dataColumn}>
                <Text style={localStyles.dataLabel}>Monto total</Text>
                <Text style={localStyles.dataValue}>{credito.monto}</Text>
              </View>
              <View style={localStyles.dataColumn}>
                <Text style={localStyles.dataLabel}>Cuota mensual</Text>
                <Text style={localStyles.dataValue}>{credito.cuotaMensual}</Text>
              </View>
              <View style={localStyles.dataColumn}>
                <Text style={localStyles.dataLabel}>Finaliza</Text>
                <Text style={localStyles.dataValue}>{credito.fechaFinalizacion}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Sección de Gastos Mensuales */}
        <Text style={localStyles.sectionTitle}>Gastos Mensuales</Text>
        {gastosMensuales.map((gasto) => (
          <View key={`gasto-${gasto.id}`} style={localStyles.itemCard}>
            <View style={localStyles.itemHeader}>
              <Ionicons
                name={gasto.icono as any}
                size={24}
                color="#4CAF50"
                style={localStyles.itemIcon}
              />
              <View style={localStyles.itemTextContainer}>
                <Text style={localStyles.itemName}>{gasto.servicio}</Text>
                <Text style={localStyles.itemDetail}>{gasto.proveedor}</Text>
              </View>
              <Text style={localStyles.itemAmount}>{gasto.monto}</Text>
            </View>

            <View style={localStyles.itemFooter}>
              <Text style={localStyles.footerText}>Pago: {gasto.fechaPago}</Text>
              <Ionicons name="calendar-outline" size={16} color="#666" />
            </View>
          </View>
        ))}
      </ScrollView>

      <CustomTabBar activeRoute="pasivos" />
    </View>
  );
}

// Estilos específicos para esta pantalla
const localStyles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 10,
    gap: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    marginLeft: 6,
    color: '#1E88E5',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 5,
  },
  itemCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataColumn: {
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
    marginTop: 10,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
  },
});
