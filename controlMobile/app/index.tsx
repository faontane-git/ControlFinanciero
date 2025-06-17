import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

type Movimiento = {
  id: string;
  tipo: 'Ingreso' | 'Gasto';
  monto: number;
  descripcion: string;
};

export default function HomeScreen() {
  const router = useRouter();

  // 🔸 Simulación de movimientos
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    { id: '1', tipo: 'Ingreso', monto: 1000, descripcion: 'Sueldo' },
    { id: '2', tipo: 'Gasto', monto: 200, descripcion: 'Comida' },
    { id: '3', tipo: 'Gasto', monto: 150, descripcion: 'Transporte' },
  ]);

  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalIngresos = movimientos
      .filter((m) => m.tipo === 'Ingreso')
      .reduce((acc, curr) => acc + curr.monto, 0);

    const totalGastos = movimientos
      .filter((m) => m.tipo === 'Gasto')
      .reduce((acc, curr) => acc + curr.monto, 0);

    setIngresos(totalIngresos);
    setGastos(totalGastos);
    setBalance(totalIngresos - totalGastos);
  }, [movimientos]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen Financiero</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Ingresos: <Text style={styles.ingreso}>${ingresos}</Text></Text>
        <Text style={styles.label}>Gastos: <Text style={styles.gasto}>${gastos}</Text></Text>
        <Text style={styles.label}>Balance: <Text style={styles.balance}>${balance}</Text></Text>
      </View>

      <Button title="Agregar Movimiento" onPress={() => router.push('/agregar')} />

      <Text style={styles.subtitle}>Últimos Movimientos:</Text>
      <FlatList
        data={movimientos.slice(0, 5)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.mov}>
            • {item.descripcion}: ${item.monto} ({item.tipo})
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: { fontSize: 18, marginBottom: 5 },
  ingreso: { color: 'green', fontWeight: 'bold' },
  gasto: { color: 'red', fontWeight: 'bold' },
  balance: { color: 'blue', fontWeight: 'bold' },
  subtitle: { fontSize: 20, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  mov: { fontSize: 16, marginBottom: 5 },
});
