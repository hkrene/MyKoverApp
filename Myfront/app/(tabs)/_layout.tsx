import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { FontAwesome, FontAwesome5, FontAwesome6} from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
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
               <FontAwesome6 size={24} name="house" color={color} solid />
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



      {/* Security */}

      <Tabs.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => 
          (
           <View className='flex items-center justify-center'>
              <FontAwesome6 size={24} name="circle-left" color={color} solid/>
           </View> 
          )
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => (
            <View className='flex items-center justify-center'>
              <FontAwesome6 size={24} name="circle-right" color={color} solid />
            </View>
          ),
        }}
      />
      

    </Tabs>
  );
}
