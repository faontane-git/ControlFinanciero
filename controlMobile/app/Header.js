import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ 
  title, 
  showBack = false, 
  onBackPress, 
  rightAction 
}) {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';

  return (
    <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
      <View style={[styles.container, { paddingTop: isIOS ? insets.top : 15 }]}>
        {/* Botón de retroceso */}
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#2f95dc" />
            </TouchableOpacity>
          )}
        </View>

        {/* Título centrado */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Acción derecha */}
        <View style={styles.rightSection}>
          {rightAction && (
            <TouchableOpacity onPress={rightAction.onPress}>
              <Ionicons 
                name={rightAction.icon} 
                size={24} 
                color={rightAction.color || '#2f95dc'} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 15,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 5,
  },
});