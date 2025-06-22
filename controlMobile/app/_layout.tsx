import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta headers GLOBALMENTE
        contentStyle: { backgroundColor: '#fff' }, // Fondo blanco
      }}
    >
      {/* Todas las pantallas heredarán headerShown: false */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false, // Doble seguridad para tabs
        }} 
      />
      
      {/* Si tienes otras pantallas fuera de tabs */}
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'modal',
          headerShown: true // Solo muestra header en modales
        }} 
      />
    </Stack>
  );
}