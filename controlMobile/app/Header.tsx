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
  onBack?: () => void;
  logo?: any; // require('path/to/logo.png')
};

export default function Header({ onLogout, onBack, logo }: HeaderProps) {
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

          {/* Botones a la derecha */}
          <View style={styles.actions}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#333" />
              </TouchableOpacity>
            )}
            {onLogout && (
              <TouchableOpacity onPress={onLogout} style={styles.iconButton}>
                <Ionicons name="log-out-outline" size={24} color="#333" />
              </TouchableOpacity>
            )}
          </View>
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});
