import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AñadirCredito() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario para Añadir Crédito</Text>
      {/* Aquí iría tu formulario */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold' },
});
