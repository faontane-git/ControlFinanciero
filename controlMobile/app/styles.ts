import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f8f9fa'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#343a40'
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    resumenRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    label: {
        fontSize: 18,
        color: '#495057'
    },
    ingreso: {
        color: '#28a745',
        fontWeight: 'bold',
        fontSize: 18
    },
    gasto: {
        color: '#dc3545',
        fontWeight: 'bold',
        fontSize: 18
    },
    balance: {
        fontWeight: 'bold',
        fontSize: 18
    },
    positivo: {
        color: '#007bff'
    },
    negativo: {
        color: '#dc3545'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 15,
        color: '#343a40'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    button: {
        padding: 15,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center'
    },
    ingresoButton: {
        backgroundColor: '#28a745'
    },
    gastoButton: {
        backgroundColor: '#dc3545'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    movItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1
    },
    movItemIngreso: {
        borderLeftWidth: 4,
        borderLeftColor: '#28a745'
    },
    movItemGasto: {
        borderLeftWidth: 4,
        borderLeftColor: '#dc3545'
    },
    movContent: {
        flex: 1
    },
    movDescripcion: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212529'
    },
    movCategoria: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4
    },
    movMonto: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    emptyText: {
        textAlign: 'center',
        color: '#6c757d',
        marginTop: 20
    },
    // Estilos para el formulario
    formGroup: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },

    // Estilos para categorías
    categoriasContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    categoriaPill: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#e9ecef',
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    categoriaPillSelected: {
        backgroundColor: '#dc3545',
        borderColor: '#dc3545',
    },
    categoriaPillText: {
        color: '#495057',
    },
    categoriaPillTextSelected: {
        color: '#fff',
    },

    // Estilo para categorías de ingresos seleccionadas
    categoriaPillSelectedIngreso: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    // Selector de mes
    mesSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    mesButton: {
        backgroundColor: '#e9ecef',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mesButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#495057',
    },
    mesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212529',
    },

    // Gráficos
    graficoContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },

    // Movimientos
    movFecha: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 4,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    pickerWrapper: {
        flex: 1,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 30, // Espacio extra al final
    },
    movimientosContainer: {
        marginBottom: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 15,
        color: '#333',
    },
    activosContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },
    activoCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    activoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    activoIcon: {
        marginRight: 12,
    },
    activoTipo: {
        fontSize: 14,
        color: '#666',
    },
    activoNombre: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    activoSaldo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E88E5',
        marginVertical: 8,
    },
    activoDetalles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingTop: 10,
        marginTop: 10,
    },
    activoDetalleText: {
        fontSize: 14,
        color: '#666',
    },
    dateInput: {
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },

    // Estilos específicos para iOS (botón Aceptar)
    datePickerButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end',
    },

    datePickerButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});