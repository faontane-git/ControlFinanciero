import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { DatoGraficoBarras, DatoGraficoTorta, Movimiento } from '../types';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles';

import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function HomeScreen() {
  const router = useRouter();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [mesSeleccionado, setMesSeleccionado] = useState<number>(new Date().getMonth());
  const [anoSeleccionado, setAnoSeleccionado] = useState<number>(new Date().getFullYear());
  const [resumen, setResumen] = useState({
    ingresos: 0,
    gastos: 0,
    balance: 0
  });

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

  const calcularResumen = useCallback((movs: Movimiento[]) => {
    const totalIngresos = movs
      .filter((m) => m.tipo === 'Ingreso')
      .reduce((acc, curr) => acc + curr.monto, 0);

    const totalGastos = movs
      .filter((m) => m.tipo === 'Gasto')
      .reduce((acc, curr) => acc + curr.monto, 0);

    return {
      ingresos: totalIngresos,
      gastos: totalGastos,
      balance: totalIngresos - totalGastos
    };
  }, []);

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
  }, [movimientos, mesSeleccionado, anoSeleccionado, calcularResumen]);

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const generarAnos = () => {
    const anos = [];
    const anoActual = new Date().getFullYear();
    for (let i = 2020; i <= anoActual + 1; i++) {
      anos.push(i);
    }
    return anos;
  };

  const anosDisponibles = generarAnos();

  const handleMesChange = (mesIndex: number) => {
    setMesSeleccionado(mesIndex);
  };

  const handleAnoChange = (ano: number) => {
    setAnoSeleccionado(ano);
  };

  const movimientosFiltrados = movimientos.filter(mov => {
    const fechaMov = new Date(mov.fecha!);
    return (
      fechaMov.getMonth() === mesSeleccionado &&
      fechaMov.getFullYear() === anoSeleccionado
    );
  });

  const datosGraficoTorta = () => {
    const gastosPorCategoria: Record<string, number> = {};

    movimientosFiltrados
      .filter(m => m.tipo === 'Gasto')
      .forEach(mov => {
        gastosPorCategoria[mov.categoria || 'Otros'] =
          (gastosPorCategoria[mov.categoria || 'Otros'] || 0) + mov.monto;
      });

    return Object.entries(gastosPorCategoria).map(([categoria, monto]) => ({
      x: categoria,
      y: monto
    }));
  };

  const datosGraficoBarras = [
    { x: 'Ingresos', y: resumen.ingresos },
    { x: 'Gastos', y: resumen.gastos }
  ];

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

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
      <Text style={styles.movMonto}>
        {item.tipo === 'Ingreso' ? '+' : '-'}{formatCurrency(item.monto)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen Financiero</Text>

      {/* Selector de mes y año */}
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={mesSeleccionado}
            onValueChange={(itemValue) => handleMesChange(itemValue)}
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
            onValueChange={(itemValue) => handleAnoChange(itemValue)}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            {anosDisponibles.map((ano) => (
              <Picker.Item key={ano} label={ano.toString()} value={ano} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Tarjeta de resumen */}
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

      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.ingresoButton]}
          onPress={() => router.push('/ingreso')}
        >
          <Text style={styles.buttonText}>Agregar Ingreso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.gastoButton]}
          onPress={() => router.push('/gasto')}
        >
          <Text style={styles.buttonText}>Agregar Gasto</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de movimientos */}
      <Text style={styles.subtitle}>Movimientos de {meses[mesSeleccionado]}</Text>
      <FlatList
        data={[...movimientosFiltrados].sort((a, b) =>
          new Date(b.fecha!).getTime() - new Date(a.fecha!).getTime()
        )}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay movimientos este mes</Text>
        }
      />
    </ScrollView>
  );
}
