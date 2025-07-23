import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Linking } from 'react-native'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PaymentScreen() {
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)

  const initiatePayment = async (method: string) => {
    try {
      setLoading(true)

      // POST to your backend which integrates with Flutterwave
      const res = await fetch('https://your-api.com/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method }),
      })

      const data = await res.json()
      if (data.redirect_url) {
        Alert.alert('Redirecting to payment')
        // Open Flutterwave payment page in browser
        await Linking.openURL(data.redirect_url)
      } else {
        Alert.alert('Erreur', 'Impossible de démarrer le paiement.')
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  const PaymentOption = ({ icon, label, method }: { icon: string, label: string, method: string }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between px-4 py-4 mb-4 bg-white shadow-sm rounded-xl"
      activeOpacity={0.8}
      onPress={() => initiatePayment(method)}
      disabled={loading}
    >
      <View className="flex-row items-center">
        <View className="items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <FontAwesome5 name={icon} size={18} color="#22B2DC" />
        </View>
        <Text className="ml-4 text-base font-medium text-neutral-800">{label}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 px-5 bg-gray-50" style={{ paddingTop: insets.top + 70 }}>
      <Text className="mb-6 text-4xl font-semibold text-neutral-800">Méthode de paiement</Text>

      {loading && (
        <View className="items-center justify-center mb-4">
          <ActivityIndicator size="small" color="#22B2DC" />
          <Text className="mt-2 text-neutral-500">Connexion à Flutterwave...</Text>
        </View>
      )}

      <PaymentOption icon="mobile-alt" label="Mobile Money (M-Pesa, Airtel, Orange)" method="mobile_money" />
      {/* For Flutterwave card payments (Visa, MasterCard) */}
      <PaymentOption icon="credit-card" label="Carte bancaire (Visa, MasterCard via Flutterwave)" method="card" />
    </View>
  )
}
