import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => 
          (
           <View className='flex items-center justify-center'>
              <Ionicons size={24} name="home" color={color}/>
           </View> 
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <View className='flex items-center justify-center'>
              <FontAwesome6 size={24} name="user" color={color} solid />
            </View>
          ),
        }}
      />
         <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => 
          (
           <View className='flex items-center justify-center'>
              <FontAwesome6 size={24} name="gear" color={color} solid/>
           </View> 
          )
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <View className='flex items-center justify-center'>
              <FontAwesome6 size={24} name="bell" color={color} solid />
            </View>
          ),
        }}
      />
      

    </Tabs>
  );
}
