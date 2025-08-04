import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import TopNavbar from '@/components/TopNavbar'

interface SubscriptionPlan {
  id: number
  name: string
  price: number
  description: string
  features: string[]
  image: any
  color: string
}

export default function PaymentScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 1,
      name: 'Starter',
      price: 5,
      description: 'Plan de base pour les besoins essentiels',
      features: [
        'Couverture médicale de base',
        'Consultations générales',
        'Médicaments essentiels',
        'Support client par email'
      ],
      image: require('@/assets/images/myKover+Logo.png'),
      color: '#22B2DC'
    },
    {
      id: 2,
      name: 'Libota Plus',
      price: 18,
      description: 'Plan intermédiaire avec plus de couverture',
      features: [
        'Toutes les fonctionnalités Starter',
        'Couverture médicale étendue',
        'Consultations spécialisées',
        'Médicaments complets',
        'Support client prioritaire',
        'Couverture dentaire de base',
        'Couverture optique de base'
      ],
      image: require('@/assets/images/myKover+Logo.png'),
      color: '#FF6B6B'
    },
    {
      id: 3,
      name: 'Premium',
      price: 50,
      description: 'Plan premium avec couverture complète',
      features: [
        'Toutes les fonctionnalités Libota Plus',
        'Couverture médicale complète',
        'Consultations illimitées',
        'Médicaments premium',
        'Support client 24/7',
        'Couverture dentaire complète',
        'Couverture optique complète',
        'Couverture internationale',
        'Assistance d\'urgence',
        'Couverture famille'
      ],
      image: require('@/assets/images/myKover+Logo.png'),
      color: '#4CAF50'
    }
  ]

  const selectPlan = (plan: SubscriptionPlan) => {
    router.push({
      pathname: '/payment-method' as any,
      params: { 
        planId: plan.id.toString(),
        planName: plan.name,
        planPrice: plan.price.toString()
      }
    })
  }

  const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => (
    <TouchableOpacity
      className="mb-6 overflow-hidden bg-white shadow-sm rounded-xl"
      activeOpacity={0.8}
      onPress={() => selectPlan(plan)}
    >
      {/* Plan Header */}
      <View className="p-6" style={{ backgroundColor: plan.color }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="mb-2 text-2xl font-bold text-white">{plan.name}</Text>
            <Text className="mb-4 text-white/90">{plan.description}</Text>
            <View className="flex-row items-baseline">
              <Text className="text-3xl font-bold text-white">${plan.price}</Text>
              <Text className="ml-2 text-white/80">/mois</Text>
            </View>
          </View>
          <Image source={plan.image} style={{ width: 60, height: 60 }} />
        </View>
      </View>

      {/* Plan Features */}
      <View className="p-6">
        <Text className="mb-4 text-lg font-semibold text-gray-800">Fonctionnalités incluses :</Text>
        {plan.features.map((feature, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <FontAwesome5 name="check-circle" size={16} color={plan.color} />
            <Text className="flex-1 ml-3 text-gray-700">{feature}</Text>
          </View>
        ))}

        {/* Select Plan Button */}
        <TouchableOpacity
          className="px-6 py-4 mt-6 rounded-lg"
          style={{ backgroundColor: plan.color }}
          onPress={() => selectPlan(plan)}
        >
          <Text className="text-lg font-semibold text-center text-white">
            Choisir ce plan
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-gray-50">
      <TopNavbar title="Plans d'abonnement" />

      {/* Content */}
      <ScrollView className="flex-1 px-5 py-6">
        <Text className="mb-2 text-2xl font-bold text-gray-800">
          Choisissez votre plan
        </Text>
        <Text className="mb-8 text-gray-600">
          Sélectionnez le plan qui correspond le mieux à vos besoins de couverture santé.
        </Text>

        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}

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
