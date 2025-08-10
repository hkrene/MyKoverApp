import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Linking, ScrollView } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '@/services/api'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
  channel: string
}

export default function PaymentMethodScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const params = useLocalSearchParams()
  const [loading, setLoading] = useState(false)

  const planId = parseInt(params.planId as string)
  const planName = params.planName as string
  const planPrice = parseInt(params.planPrice as string)

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      description: 'M-Pesa, Airtel Money, Orange Money, Afrimoney',
      icon: 'mobile-alt',
      channel: 'MOBILE_MONEY'
    },
    {
      id: 'card',
      name: 'Carte Bancaire',
      description: 'Visa, MasterCard',
      icon: 'credit-card',
      channel: 'CARD'
    }
  ]

  const initiatePayment = async (paymentMethod: PaymentMethod) => {
    try {
      setLoading(true)
      
      const paymentData = {
        planId: planId,
        paymentMethod: paymentMethod.channel
      }

      console.log('Initiating payment with data:', paymentData)

      const response = await api.post('/api/subscriptions/select-plan', paymentData)
      
      console.log('Payment response:', response.data)

      if (response.data.success && response.data.payment.payment_url) {
        Alert.alert(
          'Redirection vers le paiement',
          `Vous allez être redirigé vers la page de paiement ${paymentMethod.name}.`,
          [
            {
              text: 'Annuler',
              style: 'cancel'
            },
            {
              text: 'Continuer',
              onPress: async () => {
                try {
                  await Linking.openURL(response.data.payment.payment_url)
                } catch (error) {
                  console.error('Error opening payment URL:', error)
                  Alert.alert('Erreur', 'Impossible d\'ouvrir la page de paiement.')
                }
              }
            }
          ]
        )
      } else {
        Alert.alert('Erreur', response.data.message || 'Impossible de démarrer le paiement.')
      }
    } catch (error: any) {
      console.error('Payment initiation error:', error)
      const message = error.response?.data?.message || 'Une erreur est survenue lors du paiement.'
      Alert.alert('Erreur', message)
    } finally {
      setLoading(false)
    }
  }

  const PaymentMethodCard = ({ method }: { method: PaymentMethod }) => (
    <TouchableOpacity
      className="mb-4 overflow-hidden bg-white shadow-sm rounded-xl"
      activeOpacity={0.8}
      onPress={() => initiatePayment(method)}
      disabled={loading}
    >
      <View className="flex-row items-center p-6">
        <View className="items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-full">
          <FontAwesome5 name={method.icon as any} size={20} color="#22B2DC" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{method.name}</Text>
          <Text className="text-gray-600">{method.description}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white shadow-sm">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full"
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#22B2DC" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">Méthode de paiement</Text>
        <View className="w-10" />
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-5 py-6">
        {/* Plan Summary */}
        <View className="p-4 mb-6 bg-blue-50 rounded-xl">
          <Text className="mb-2 text-lg font-semibold text-blue-800">Plan sélectionné</Text>
          <Text className="text-xl font-bold text-blue-900">{planName}</Text>
          <Text className="text-blue-700">${planPrice}/mois</Text>
        </View>

        <Text className="mb-4 text-lg font-semibold text-gray-800">
          Choisissez votre méthode de paiement
        </Text>
        <Text className="mb-6 text-gray-600">
          Tous les paiements sont sécurisés via CinetPay.
        </Text>

        {loading && (
          <View className="items-center justify-center mb-4">
            <ActivityIndicator size="large" color="#22B2DC" />
            <Text className="mt-2 text-gray-600">Initialisation du paiement...</Text>
          </View>
        )}

        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}

        {/* Security Info */}
        <View className="p-4 mt-8 rounded-lg bg-green-50">
          <Text className="mb-2 font-semibold text-green-800">Sécurité</Text>
          <Text className="text-sm text-green-700">
            • Paiements sécurisés par CinetPay{'\n'}
            • Vos données sont protégées{'\n'}
            • Conformité PCI DSS{'\n'}
            • Support 24/7 en cas de problème
          </Text>
        </View>
      </ScrollView>
    </View>
  )
} 