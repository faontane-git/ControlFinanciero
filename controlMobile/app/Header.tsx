import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
  title: string;
  onLogout?: () => void;
  logo?: any; // require('./path/logo.png') o {uri: 'https://...'}
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
      <View style={[styles.headerContainer, { 
        paddingTop: isIOS ? insets.top : 15,
      }]}>
        {/* Logo fijo a la izquierda */}
        {logo && (
          <View style={styles.fixedLogoContainer}>
            <Image 
              source={logo} 
              style={styles.fixedLogoImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Título adaptable */}
        <View style={styles.titleFlexContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title || ''}
          </Text>
        </View>

        {/* Botón fijo a la derecha */}
        {onLogout && (
          <View style={styles.fixedLogoutContainer}>
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
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60, // Altura fija
    backgroundColor: '#1E88E5',
    width: '100%',
  },
  fixedLogoContainer: {
    width: 40, // Ancho fijo
    height: 40, // Alto fijo
    marginLeft: 15, // Posición fija desde la izquierda
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Asegura que esté por encima
  },
  fixedLogoImage: {
    width: '100%',
    height: '100%',
  },
  titleFlexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Posición absoluta para centrado exacto
    left: 60, // Inicio después del logo
    right: 60, // Termina antes del botón
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    width: '100%',
    textAlign: 'center',
  },
  fixedLogoutContainer: {
    width: 40, // Mismo ancho que el logo
    height: 40, // Mismo alto que el logo
    marginRight: 15, // Posición fija desde la derecha
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Asegura que esté por encima
  },
  logoutButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});