// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen Financiero</Text>
      <Text>Ingresos: $0</Text>
      <Text>Gastos: $0</Text>
      <Text>Balance: $0</Text>

      <Button
        title="Agregar Movimiento"
        onPress={() => navigation.navigate('Agregar Movimiento')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
