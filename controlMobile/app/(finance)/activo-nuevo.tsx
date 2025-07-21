import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Header from '../Header';

export default function NuevoActivoScreen() {
    const router = useRouter();
    const [tipo, setTipo] = useState('Cuenta Bancaria');
    const [nombre, setNombre] = useState('');
    const [saldo, setSaldo] = useState('');

    const handleGuardar = () => {
        console.log({ tipo, nombre, saldo });
        router.back(); // Puedes reemplazar esto con lógica para guardar en Firestore
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                onBack={() => router.back()}
                logo={require('../../assets/images/logo.png')}
            />

            <Text style={styles.title}>Nuevo Activo</Text>

            <Text style={styles.label}>Tipo de Activo</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={tipo}
                    onValueChange={(itemValue) => setTipo(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#333"
                >
                    <Picker.Item label="Cuenta Bancaria" value="Cuenta Bancaria" />
                    <Picker.Item label="Acciones" value="Acciones" />
                    <Picker.Item label="Póliza de Inversión" value="Póliza de Inversión" />
                </Picker>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Nombre del Activo"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                style={styles.input}
                placeholder="Saldo"
                keyboardType="numeric"
                value={saldo}
                onChangeText={setSaldo}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
                <Ionicons name="save-outline" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 14, marginBottom: 6, color: '#333' },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#1E88E5',
        padding: 14,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: 'bold',
    },
});
