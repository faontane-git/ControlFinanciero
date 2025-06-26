import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
  title: string;
  onLogout?: () => void;
  logo?: any; // No se usa en este ejemplo, pero lo puedes reintegrar si lo necesitas
};

export default function Header({
  title,
  onLogout,
  logo,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';

  return (
    <SafeAreaView style={{ backgroundColor: '#1E88E5' }}>
      <View
        style={[
          styles.headerContainer,
          {
            paddingTop: isIOS ? insets.top : 25,
          },
        ]}
      >
        <View style={styles.header}>
          {/* Título centrado */}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title || ''}
          </Text>

          {/* Botón logout alineado */}
          {onLogout && (
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1E88E5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10, // Hace el header más alto
    backgroundColor: '#34495e',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoutButton: {
    padding: 8,
    marginLeft: 10,
  },
});
