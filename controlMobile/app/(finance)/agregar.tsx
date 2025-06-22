import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export  function AddTransactionScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSave = () => {
    console.log({ amount, description });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Movimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
