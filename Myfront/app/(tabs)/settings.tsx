import React from 'react'
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router' // Added useRouter
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '@/services/api'

export default function SettingsScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter() // Get router instance
  const [notifEnabled, setNotifEnabled] = React.useState(true)

  const handleLogout = async () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Déconnecter",
          style: "destructive",
          onPress: async () => {
            try {
              // Call the logout API endpoint
              await api.post('/auth/logout')
            } catch (error) {
              console.log('Logout API call failed, but continuing with local logout')
            }

            // Clear the authentication token from AsyncStorage
            await AsyncStorage.removeItem('authToken')
            
            // Navigate to login screen
            router.replace('/login')
          }
        }
      ]
    )
  }

  const SettingItem = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
    <Link href={href} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row items-center justify-between px-4 py-4 mb-3 bg-white shadow-sm rounded-xl"
      >
        <View className="flex-row items-center">
          <View className="items-center justify-center w-10 h-10 mr-3 rounded-full bg-primary/10">
            <FontAwesome5 name={icon} size={18} color="#22B2DC" />
          </View>
          <Text className="text-base font-medium text-neutral-800">{label}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={22} color="#999" />
      </TouchableOpacity>
    </Link>
  )

  return (
    <View className="flex-1 px-5 pb-6 bg-gray-50" style={{ paddingTop: insets.top + 70 }}>
      
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute p-2 bg-white rounded-full shadow top-14 left-5"
        activeOpacity={0.7}
      >
        <MaterialIcons name="arrow-back" size={28} color="#22B2DC" />
      </TouchableOpacity>
      
      <Text className="mb-6 text-4xl font-semibold text-neutral-800">Paramètres</Text>

      {/* Mon compte */}
      <View className="mb-8">
        <Text className="mb-3 text-sm font-semibold uppercase text-neutral-500">Mon compte</Text>
        <SettingItem icon="user" label="Profil" href="/profile" />
        <SettingItem icon="credit-card" label="Paiements & factures" href="/payments" />
      </View>

      {/* Préférences */}
      <View className="mb-8">
        <Text className="mb-3 text-sm font-semibold uppercase text-neutral-500">Préférences</Text>
        <View className="flex-row items-center justify-between px-4 py-4 mb-3 bg-white shadow-sm rounded-xl">
          <View className="flex-row items-center">
            <View className="items-center justify-center w-10 h-10 mr-3 rounded-full bg-primary/10">
              <FontAwesome5 name="bell" size={18} color="#22B2DC" />
            </View>
            <Text className="text-base font-medium text-neutral-800">Notifications</Text>
          </View>
          <Switch
            value={notifEnabled}
            onValueChange={() => setNotifEnabled(!notifEnabled)}
            trackColor={{ false: '#ddd', true: '#22B2DC' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Assistance */}
      <View className="mb-8">
        <Text className="mb-3 text-sm font-semibold uppercase text-neutral-500">Assistance</Text>
        <SettingItem icon="question-circle" label="Centre d’aide" href="/help" />
        <SettingItem icon="envelope" label="Nous contacter" href="/contact" />
      </View>

      {/* Logout */}
      <View className="mt-auto">
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center justify-center py-4 bg-red-100 rounded-full"
          onPress={handleLogout}
        >
          <FontAwesome5 name="sign-out-alt" size={18} color="#DC2626" />
          <Text className="ml-3 text-base font-semibold text-red-600" >
            Se déconnecter
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
