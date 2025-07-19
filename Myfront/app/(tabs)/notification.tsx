import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{color:'blue'}}>Notifications</Text>
      <Text style={{}}>Aucune notification pour le moment.</Text>
    </View>
  );
}