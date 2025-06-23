import React, { useState } from 'react';
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
  onLogout?: () => void; // Nueva prop para manejar cierre de sesión
};

export default function Header({
  title,
  onLogout,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';

  return (
    <SafeAreaView style={{ backgroundColor: '#1E88E5' }}>
      <View style={[styles.container, { 
        paddingTop: isIOS ? insets.top : 15,
      }]}>
        {/* Título Centrado */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title || ''}
          </Text>
        </View>

        {/* Botón de Cerrar Sesión */}
        {onLogout && (
          <TouchableOpacity 
            onPress={onLogout}
            style={styles.logoutButton}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1E88E5',
    paddingHorizontal: 15,
    justifyContent: 'center', // Centra el contenido
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 15,
    padding: 8,
  },
});