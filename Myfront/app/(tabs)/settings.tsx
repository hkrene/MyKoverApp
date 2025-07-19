import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{color:'blue'}}>Parametres</Text>
      <Text style={{}}>Rien n'a parametrer pour le moment.</Text>
    </View>
  );
}