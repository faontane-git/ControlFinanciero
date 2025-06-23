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
            name: 'index',
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
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={styles.tabContent}>
                {tabs.map((tab) => {
                    const isActive = activeRoute === tab.name;
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tabButton}
                            onPress={() => router.navigate(`/${tab.name}`)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={isActive ? tab.iconActive : tab.iconInactive}
                                size={26}
                                color={isActive ? '#2f95dc' : '#95a5a6'}
                            />
                            <Text style={[
                                styles.tabLabel,
                                { color: isActive ? '#2f95dc' : '#95a5a6' }
                            ]}>
                                {tab.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    tabContent: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        minHeight: 70,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
        textAlign: 'center',
    },
});
