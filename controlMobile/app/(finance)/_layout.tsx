import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        // Configuración global
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60 + insets.bottom, // Altura dinámica
          paddingBottom: insets.bottom > 0 ? 5 : 15, // Ajuste para dispositivos sin notch
          paddingTop: 5,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          borderTopWidth: 0,
          backgroundColor: '#ffffff',
        },
        headerShown: false,
      }}
    >
      {/* Tab 1 */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Posición Consolidada',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" color={color} size={size} />
          ),
        }}
      />
      
      {/* Tab 2 */}
      <Tabs.Screen
        name="activos"
        options={{
          title: 'Activos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" color={color} size={size} />
          ),
        }}
      />
      
      {/* Tab 3 */}
      <Tabs.Screen
        name="pasivos"
        options={{
          title: 'Pasivos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-down" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}