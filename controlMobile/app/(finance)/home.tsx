import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { Movimiento } from '../types';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTabBar from '../CustomTabBar';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { Alert } from 'react-native';
import Header from '../Header';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [mesSeleccionado, setMesSeleccionado] = useState<number>(new Date().getMonth());
  const [anoSeleccionado, setAnoSeleccionado] = useState<number>(new Date().getFullYear());
  const [resumen, setResumen] = useState({
    ingresos: 0,
    gastos: 0,
    balance: 0
  });
  const [refreshing, setRefreshing] = useState(false);

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Funciones existentes
  const cargarMovimientos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'movimientos'));
      const datos: Movimiento[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        datos.push({
          id: doc.id,
          tipo: data.tipo,
          monto: data.monto,
          descripcion: data.descripcion,
          fecha: new Date(data.fecha.seconds * 1000),
          categoria: data.categoria
        });
      });

      setMovimientos(datos);
    } catch (error) {
      console.error('Error al cargar movimientos:', error);
    }
  };

  const handleLogout = () => {
    // Aquí tu lógica para cerrar sesión
    console.log('Cerrando sesión...');
    router.replace('/' as never); // Redirige al login
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    cargarMovimientos().finally(() => setRefreshing(false));
  }, []);

  const calcularResumen = useCallback((movs: Movimiento[]) => {
    const totalIngresos = movs
      .filter((m) => m.tipo === 'Ingreso')
      .reduce((acc, curr) => acc + Number(curr.monto), 0);

    const totalGastos = movs
      .filter((m) => m.tipo === 'Gasto')
      .reduce((acc, curr) => acc + Number(curr.monto), 0);

    return {
      ingresos: totalIngresos,
      gastos: totalGastos,
      balance: totalIngresos - totalGastos
    };
  }, []);

  const generarAnos = () => {
    const anos = [];
    const anoActual = new Date().getFullYear();
    for (let i = 2020; i <= anoActual + 1; i++) {
      anos.push(i);
    }
    return anos;
  };

  const handleMesChange = (mesIndex: number) => setMesSeleccionado(mesIndex);
  const handleAnoChange = (ano: number) => setAnoSeleccionado(ano);


  const handleEliminarMovimiento = (id: string) => {
    Alert.alert(
      'Eliminar movimiento',
      '¿Estás seguro de eliminar este movimiento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'movimientos', id));
              setMovimientos((prev) => prev.filter((mov) => mov.id !== id));
            } catch (error) {
              console.error('Error al eliminar el movimiento:', error);
            }
          }
        }
      ]
    );
  };


  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

  useEffect(() => {
    const movimientosDelMes = movimientos.filter(mov => {
      const fechaMov = new Date(mov.fecha!);
      return (
        fechaMov.getMonth() === mesSeleccionado &&
        fechaMov.getFullYear() === anoSeleccionado
      );
    });
    setResumen(calcularResumen(movimientosDelMes));
  }, [movimientos, mesSeleccionado, anoSeleccionado]);

  const movimientosFiltrados = movimientos.filter(mov => {
    const fechaMov = new Date(mov.fecha!);
    return (
      fechaMov.getMonth() === mesSeleccionado &&
      fechaMov.getFullYear() === anoSeleccionado
    );
  });

  const renderItem = ({ item }: { item: Movimiento }) => (
    <TouchableOpacity
      style={[
        styles.movItem,
        item.tipo === 'Ingreso' ? styles.movItemIngreso : styles.movItemGasto
      ]}
    >
      <View style={styles.movContent}>
        <Text style={styles.movDescripcion}>{item.descripcion}</Text>
        <Text style={styles.movCategoria}>{item.categoria}</Text>
        <Text style={styles.movFecha}>
          {new Date(item.fecha!).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short'
          })}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            if (item.tipo === 'Ingreso') {
              router.push({
                pathname: '/ingreso' as never,
                params: { movimiento: JSON.stringify(item) }
              });
            } else {
              router.push({
                pathname: '/gasto' as never,
                params: { movimiento: JSON.stringify(item) }
              });
            }
          }}
        >

          <Ionicons name="create-outline" size={20} color="#2980b9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEliminarMovimiento(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#e74c3c" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <Text style={styles.movMonto}>
        {item.tipo === 'Ingreso' ? '+' : '-'}{formatCurrency(Number(item.monto))}
      </Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header
          onLogout={handleLogout}
          logo={require('../../assets/images/logo.png')}
        />

        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            paddingBottom: 80 + insets.bottom,
            paddingTop: 10
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2f95dc']}
              tintColor="#2f95dc"
            />
          }
        >
          {/* Título del resumen */}
          <Text style={styles.titulo}>Posición Consolidada</Text>
          {/* Selector de mes/año */}
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={mesSeleccionado}
                onValueChange={handleMesChange}
                style={styles.picker}
                dropdownIconColor="#333"
              >
                {meses.map((mes, index) => (
                  <Picker.Item key={index} label={mes} value={index} />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={anoSeleccionado}
                onValueChange={handleAnoChange}
                style={styles.picker}
                dropdownIconColor="#333"
              >
                {generarAnos().map((ano) => (
                  <Picker.Item key={ano} label={ano.toString()} value={ano} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Resumen */}
          <View style={styles.card}>
            <View style={styles.resumenRow}>
              <Text style={styles.label}>Ingresos:</Text>
              <Text style={styles.ingreso}>{formatCurrency(resumen.ingresos)}</Text>
            </View>
            <View style={styles.resumenRow}>
              <Text style={styles.label}>Gastos:</Text>
              <Text style={styles.gasto}>{formatCurrency(resumen.gastos)}</Text>
            </View>
            <View style={styles.resumenRow}>
              <Text style={styles.label}>Balance:</Text>
              <Text style={[
                styles.balance,
                resumen.balance < 0 ? styles.negativo : styles.positivo
              ]}>
                {formatCurrency(resumen.balance)}
              </Text>
            </View>
          </View>

          {/* Botones */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.ingresoButton]}
              onPress={() => router.push('/ingreso' as never)}
            >
              <Text style={styles.buttonText}>Agregar Ingreso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.gastoButton]}
              onPress={() => router.push('/gasto' as never)}
            >
              <Text style={styles.buttonText}>Agregar Gasto</Text>
            </TouchableOpacity>
          </View>

          {/* Movimientos */}
          <Text style={styles.subtitle}>Movimientos de {meses[mesSeleccionado]}</Text>

          {movimientosFiltrados.length > 0 ? (
            <View style={styles.movimientosContainer}>
              {[...movimientosFiltrados]
                .sort((a, b) => new Date(b.fecha!).getTime() - new Date(a.fecha!).getTime())
                .map((item) => (
                  <View key={item.id}>{renderItem({ item })}</View>
                ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No hay movimientos este mes</Text>
          )}
        </ScrollView>

        <CustomTabBar activeRoute="home" />
      </View>
    </SafeAreaView>

  );
}

// Estilos (ajusta según tu archivo styles.ts)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#2c3e50',
  },
  pickerContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    paddingBottom: 51,
    color: '#000'  
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resumenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  ingreso: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  gasto: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positivo: {
    color: '#2ecc71',
  },
  negativo: {
    color: '#e74c3c',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  ingresoButton: {
    backgroundColor: '#2ecc71',
  },
  gastoButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  movimientosContainer: {
    marginHorizontal: 15,
  },
  movItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  movItemIngreso: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  movItemGasto: {
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  movContent: {
    flex: 1,
  },
  movDescripcion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  movCategoria: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  movFecha: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  movMonto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#95a5a6',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    gap: 8,
  },
});