import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Linking } from 'react-native'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function PaymentScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const paymentInfo = {
    amount: '15,000 FC',
    dueDate: '30 juillet 2025',
    policyNumber: 'ASS-123456789',
  }

  const initiateCerdipayMobileMoney = async () => {
    try {
      setLoading(true)
      // Replace URL with your backend Cerdipay Mobile Money initiate endpoint
      const res = await fetch('https://your-api.com/cerdipay/mobile-money/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 15000, // Numeric amount, adjust as needed
          currency: 'XAF',
          // additional required fields: phone number, transaction reference, etc.
        }),
      })

      const data = await res.json()
      if (data.redirect_url) {
        Alert.alert('Redirection vers le paiement')
        await Linking.openURL(data.redirect_url)
      } else {
        Alert.alert('Erreur', 'Impossible de démarrer le paiement Mobile Money.')
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors du paiement Mobile Money.')
    } finally {
      setLoading(false)
    }
  }

  const initiateFlutterwaveCardPayment = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://your-api.com/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'card' }),
      })

      const data = await res.json()
      if (data.redirect_url) {
        Alert.alert('Redirection vers le paiement')
        await Linking.openURL(data.redirect_url)
      } else {
        Alert.alert('Erreur', 'Impossible de démarrer le paiement par carte.')
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors du paiement par carte.')
    } finally {
      setLoading(false)
    }
  }

  const PaymentOption = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-4 py-4 mb-4 bg-white shadow-sm rounded-xl ${loading ? 'opacity-50' : ''}`}
      activeOpacity={0.8}
      onPress={() => !loading && onPress()}
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
      {/* Return button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute p-2 bg-white rounded-full shadow"
        activeOpacity={0.7}
        style={{ zIndex: 10, top: insets.top + 15, left: 15 }}
      >
        <MaterialIcons name="arrow-back" size={24} color="#22B2DC" />
      </TouchableOpacity>

      <Text className="mb-2 text-4xl font-semibold text-neutral-800">Méthode de paiement</Text>

      {/* Payment Info */}
      <View className="p-4 mb-6 bg-white shadow-sm rounded-xl">
        <Text className="text-lg text-gray-700">
          Montant dû : <Text className="font-bold text-[#22B2DC]">{paymentInfo.amount}</Text>
        </Text>
        <Text className="text-gray-600">Date limite de paiement : {paymentInfo.dueDate}</Text>
        <Text className="text-gray-600">Numéro de police : {paymentInfo.policyNumber}</Text>
      </View>

      <Text className="mb-4 text-sm text-gray-500">
        Choisissez une méthode de paiement sécurisée pour régler votre cotisation santé.
      </Text>

      {loading && (
        <View className="items-center justify-center mb-4">
          <ActivityIndicator size="small" color="#22B2DC" />
          <Text className="mt-2 text-neutral-500">Connexion au service de paiement...</Text>
        </View>
      )}

      {/* Mobile Money via Cerdipay */}
      <PaymentOption
        icon="mobile-alt"
        label="Mobile Money (M-Pesa, Airtel, Orange) via Cerdipay"
        onPress={initiateCerdipayMobileMoney}
      />
      {/* Card payments via Flutterwave */}
      <PaymentOption
        icon="credit-card"
        label="Carte bancaire (Visa, MasterCard via Flutterwave)"
        onPress={initiateFlutterwaveCardPayment}
      />
    </View>
  )
}
