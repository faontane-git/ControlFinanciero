import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  activeRoute: string;
};

export default function CustomTabBar({ activeRoute }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goTo = (route: string) => router.navigate(`/(finance)/${route}` as any);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>

      {/* Botón Home */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => goTo('home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeRoute === 'home' ? 'pie-chart' : 'pie-chart-outline'}
          size={26}
          color={activeRoute === 'home' ? '#ecf0f1' : '#bdc3c7'}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: activeRoute === 'home' ? '#ecf0f1' : '#bdc3c7' }
          ]}
        >
          Inicio
        </Text>
      </TouchableOpacity>

      {/* Botón Activos */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => goTo('activos')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeRoute === 'activos' ? 'trending-up' : 'trending-up-outline'}
          size={26}
          color={activeRoute === 'activos' ? '#ecf0f1' : '#bdc3c7'}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: activeRoute === 'activos' ? '#ecf0f1' : '#bdc3c7' }
          ]}
        >
          Activos
        </Text>
      </TouchableOpacity>

      {/* Botón Pasivos */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => goTo('pasivos')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeRoute === 'pasivos' ? 'trending-down' : 'trending-down-outline'}
          size={26}
          color={activeRoute === 'pasivos' ? '#ecf0f1' : '#bdc3c7'}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: activeRoute === 'pasivos' ? '#ecf0f1' : '#bdc3c7' }
          ]}
        >
          Pasivos
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 9,
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
});
