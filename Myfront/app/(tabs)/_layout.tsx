import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import TopNavbar from '@/components/TopNavbar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 90,
            paddingBottom: 25,
            paddingTop: 10,
            paddingHorizontal: 10,
          },
          default: {
            height: 70,
            paddingBottom: 12,
            paddingTop: 10,
            paddingHorizontal: 8,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 6,
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <View className="flex items-center justify-center w-8 h-8">
              <FontAwesome6 
                size={focused ? 26 : 24} 
                name="house" 
                color={color} 
                solid={focused}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Paiements',
          tabBarIcon: ({ color, focused }) => (
            <View className="flex items-center justify-center w-8 h-8">
              <FontAwesome6 
                size={focused ? 26 : 24} 
                name="credit-card" 
                color={color} 
                solid={focused}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="map"
        options={{
          title: 'Réseau',
          tabBarIcon: ({ color, focused }) => (
            <View className="flex items-center justify-center w-8 h-8">
              <FontAwesome6 
                size={focused ? 26 : 24} 
                name="map-location-dot" 
                color={color} 
                solid={focused}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <View className="flex items-center justify-center w-8 h-8">
              <FontAwesome6 
                size={focused ? 26 : 24} 
                name="user" 
                color={color} 
                solid={focused}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color, focused }) => (
            <View className="flex items-center justify-center w-8 h-8">
              <FontAwesome6 
                size={focused ? 26 : 24} 
                name="gear" 
                color={color} 
                solid={focused}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
