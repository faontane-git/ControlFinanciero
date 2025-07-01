import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
  onLogout?: () => void;
  logo?: any; // require('path/to/logo.png')
};

export default function Header({ onLogout, logo }: HeaderProps) {
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
          {/* Logo a la izquierda */}
          {logo && <Image source={logo} style={styles.logo} resizeMode="contain" />}

          {/* Botón logout a la derecha */}
          {onLogout && (
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={24} color="#333" />
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
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: 35,
    width: 140,
  },
  logoutButton: {
    padding: 8,
  },
});
