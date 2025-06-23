import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
 
export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#f8f9fa' } 
        }}
      />
     </View>
  );
}