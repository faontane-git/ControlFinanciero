import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { VictoryPie, VictoryBar, VictoryChart } from 'victory';
import { Svg } from 'react-native-svg';
import { DatoGraficoBarras, DatoGraficoTorta, Movimiento } from './types';
import { styles } from './styles';

export default function HomeScreen() {
  const router = useRouter();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    {
      id: '1',
      tipo: 'Ingreso',
      monto: 1000,
      descripcion: 'Sueldo',
      fecha: new Date(2023, 5, 15), // Mes 5 = junio (0-indexed)
      categoria: 'Trabajo'
    },
    {
      id: '2',
      tipo: 'Gasto',
      monto: 200,
      descripcion: 'Supermercado',
      fecha: new Date(2023, 5, 10),
      categoria: 'Comida'
    },
    // ... otros movimientos de ejemplo
  ]);

  const [mesSeleccionado, setMesSeleccionado] = useState<number>(new Date().getMonth());
  const [anoSeleccionado, setAnoSeleccionado] = useState<number>(new Date().getFullYear());
  const [resumen, setResumen] = useState({
    ingresos: 0,
    gastos: 0,
    balance: 0
  });

  // Obtener movimientos del mes seleccionado
  const movimientosDelMes = movimientos.filter(mov => {
    const fechaMov = new Date(mov.fecha!);
    return fechaMov.getMonth() === mesSeleccionado &&
      fechaMov.getFullYear() === anoSeleccionado;
  });

  // Función para calcular resumen
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

  // Actualizar resumen cuando cambian los movimientos o el mes seleccionado
  useEffect(() => {
    setResumen(calcularResumen(movimientosDelMes));
  }, [movimientosDelMes, calcularResumen]);

  // Nombres de los meses
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Cambiar mes
  const cambiarMes = (incremento: number) => {
    let nuevoMes = mesSeleccionado + incremento;
    let nuevoAno = anoSeleccionado;

    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAno--;
    } else if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAno++;
    }

    setMesSeleccionado(nuevoMes);
    setAnoSeleccionado(nuevoAno);
  };

  // Datos para el gráfico de torta (categorías de gastos)
  const datosGraficoTorta = () => {
    const gastosPorCategoria: Record<string, number> = {};

    movimientosDelMes
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

  // Datos para el gráfico de barras (ingresos vs gastos)
  const datosGraficoBarras = [
    { x: 'Ingresos', y: resumen.ingresos },
    { x: 'Gastos', y: resumen.gastos }
  ];

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Renderizar item de la lista
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

      {/* Selector de mes */}
      <View style={styles.mesSelector}>
        <TouchableOpacity
          style={styles.mesButton}
          onPress={() => cambiarMes(-1)}
        >
          <Text style={styles.mesButtonText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.mesText}>
          {meses[mesSeleccionado]} {anoSeleccionado}
        </Text>

        <TouchableOpacity
          style={styles.mesButton}
          onPress={() => cambiarMes(1)}
        >
          <Text style={styles.mesButtonText}>›</Text>
        </TouchableOpacity>
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

      {/* Gráfico de barras (Ingresos vs Gastos) */}
      <Text style={styles.subtitle}>Comparación Ingresos/Gastos</Text>
      <View style={styles.graficoContainer}>
        <Svg width="100%" height={250}>
          <VictoryChart
            domainPadding={{ x: 30 }}
            width={350}
            height={250}
            standalone={false}
          >
            <VictoryBar
              data={datosGraficoBarras}
              x="x"
              y="y"
              style={{
                data: {
                  fill: ({ datum }) => datum.x === 'Ingresos' ? '#28a745' : '#dc3545',
                  width: 30
                }
              }}
              labels={({ datum }) => formatCurrency(datum.y)}
            />
          </VictoryChart>
        </Svg>

        <Svg width="100%" height={300}>
          <VictoryPie
            data={datosGraficoTorta()}
            colorScale={[
              '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0',
              '#9966ff', '#ff9f40', '#8ac24a', '#607d8b'
            ]}
            width={350}
            height={300}
            padAngle={2}
            innerRadius={50}
            labelRadius={80}
            style={{
              labels: {
                fill: 'white',
                fontSize: 12,
                fontWeight: 'bold'
              }
            }}
            standalone={false}
            labels={({ datum }: { datum: DatoGraficoTorta }) => `${datum.x}: ${formatCurrency(datum.y)}`}
          />
        </Svg>
      </View>

      {/* Gráfico de torta (Distribución de gastos) */}
      {resumen.gastos > 0 && (
        <>
          <Text style={styles.subtitle}>Distribución de Gastos</Text>
          <View style={styles.graficoContainer}>
            <Svg width="100%" height={300}>
              <VictoryPie
                data={datosGraficoTorta()}
                colorScale={[
                  '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0',
                  '#9966ff', '#ff9f40', '#8ac24a', '#607d8b'
                ]}
                width={350}
                height={300}
                padAngle={2}
                innerRadius={50}
                labelRadius={80}
                style={{
                  labels: {
                    fill: 'white',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }
                }}
                standalone={false}
              />
            </Svg>
          </View>
        </>
      )}

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
        data={[...movimientosDelMes].sort((a, b) =>
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