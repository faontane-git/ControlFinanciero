import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({ activeRoute }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const tabs = [
    {
      name: 'home',
      title: 'Inicio',
      iconActive: 'pie-chart',
      iconInactive: 'pie-chart-outline'
    },
    {
      name: 'activos',
      title: 'Activos',
      iconActive: 'trending-up',
      iconInactive: 'trending-up-outline'
    },
    {
      name: 'pasivos',
      title: 'Pasivos',
      iconActive: 'trending-down',
      iconInactive: 'trending-down-outline'
    },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      {tabs.map((tab) => {
        const isActive = activeRoute === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => router.navigate(`/(finance)/${tab.name}`)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.iconActive : tab.iconInactive}
              size={26}
              color={isActive ? '#ecf0f1' : '#bdc3c7'}
            />
            <Text style={[
              styles.tabLabel,
              { color: isActive ? '#ecf0f1' : '#bdc3c7' }
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#34495e', // color de fondo diferenciado
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
});
