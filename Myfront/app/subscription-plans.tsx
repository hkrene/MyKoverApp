import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '@/services/api'

interface SubscriptionPlan {
  id: number
  name: string
  description: string
  price: number
  currency: string
  duration: number
  features: string[]
  isActive: boolean
}

export default function SubscriptionPlansScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)

  useEffect(() => {
    loadSubscriptionPlans()
  }, [])

  const loadSubscriptionPlans = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/subscriptions/plans')
      setPlans(response.data.plans)
    } catch (error) {
      console.error('Error loading subscription plans:', error)
      Alert.alert('Erreur', 'Impossible de charger les plans d\'abonnement')
    } finally {
      setLoading(false)
    }
  }

  const selectPlan = async (plan: SubscriptionPlan) => {
    setSelectedPlan(plan)
    
    Alert.alert(
      'Choisir un plan',
      `Voulez-vous souscrire au plan ${plan.name} pour ${plan.price} ${plan.currency} ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Continuer',
          onPress: () => initiatePlanPayment(plan)
        }
      ]
    )
  }

  const initiatePlanPayment = async (plan: SubscriptionPlan) => {
    try {
      setLoading(true)
      
      const response = await api.post('/api/subscriptions/select-plan', {
        planId: plan.id,
        paymentMethod: 'MOBILE_MONEY' // Default to mobile money
      })

      if (response.data.success && response.data.payment.payment_url) {
        Alert.alert(
          'Redirection vers le paiement',
          `Vous allez être redirigé vers la page de paiement pour le plan ${plan.name}.`,
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
      console.error('Plan payment error:', error)
      const message = error.response?.data?.message || 'Une erreur est survenue lors du paiement.'
      Alert.alert('Erreur', message)
    } finally {
      setLoading(false)
    }
  }

  const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => (
    <View className="mb-6 overflow-hidden bg-white shadow-sm rounded-xl">
      {/* Plan Header */}
      <View className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
        <Text className="mb-2 text-2xl font-bold text-white">{plan.name}</Text>
        <Text className="mb-4 text-white/90">{plan.description}</Text>
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-bold text-white">${plan.price}</Text>
          <Text className="ml-2 text-white/80">/mois</Text>
        </View>
      </View>

      {/* Plan Features */}
      <View className="p-6">
        <Text className="mb-4 text-lg font-semibold text-gray-800">Fonctionnalités incluses :</Text>
        {plan.features.map((feature, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <FontAwesome5 name="check-circle" size={16} color="#22B2DC" />
            <Text className="flex-1 ml-3 text-gray-700">{feature}</Text>
          </View>
        ))}

        {/* Select Plan Button */}
        <TouchableOpacity
          className={`mt-6 py-4 px-6 rounded-lg ${selectedPlan?.id === plan.id ? 'bg-blue-600' : 'bg-blue-500'}`}
          onPress={() => selectPlan(plan)}
          disabled={loading}
        >
          <Text className="text-lg font-semibold text-center text-white">
            {selectedPlan?.id === plan.id ? 'Plan sélectionné' : 'Choisir ce plan'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
        <Text className="text-xl font-semibold text-gray-800">Plans d'abonnement</Text>
        <View className="w-10" />
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-5 py-6">
        <Text className="mb-2 text-2xl font-bold text-gray-800">
          Choisissez votre plan
        </Text>
        <Text className="mb-8 text-gray-600">
          Sélectionnez le plan qui correspond le mieux à vos besoins de couverture santé.
        </Text>

        {loading && (
          <View className="items-center justify-center py-8">
            <ActivityIndicator size="large" color="#22B2DC" />
            <Text className="mt-4 text-gray-600">Chargement des plans...</Text>
          </View>
        )}

        {!loading && plans.length > 0 && (
          <View>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </View>
        )}

        {!loading && plans.length === 0 && (
          <View className="items-center justify-center py-8">
            <FontAwesome5 name="exclamation-circle" size={48} color="#999" />
            <Text className="mt-4 text-center text-gray-600">
              Aucun plan d'abonnement disponible pour le moment.
            </Text>
          </View>
        )}

        {/* Additional Info */}
        <View className="p-4 mt-8 rounded-lg bg-blue-50">
          <Text className="mb-2 font-semibold text-blue-800">💡 Information importante</Text>
          <Text className="text-sm text-blue-700">
            • Tous les paiements sont sécurisés via CinetPay{'\n'}
            • Vous pouvez annuler votre abonnement à tout moment{'\n'}
            • Support client disponible 24/7{'\n'}
            • Couverture valide dans toute la RDC
          </Text>
        </View>
      </ScrollView>
    </View>
  )
} 