import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
  const router = useRouter()

  const user = {
    name: 'Newton Renesto',
    email: 'newton@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  }

  const policy = {
    planName: 'Plan Santé Basique',
    policyNumber: 'ASS-123456789',
    expiryDate: '2026-03-01',
    status: 'Actif',
    coverage: 'Médical, Dentaire, Vision',
    deductible: '500 $',
  }

  const actions = [
    { label: 'Voir les réclamations', icon: 'receipt', onPress: () => alert('Naviguer vers les réclamations') },
    { label: 'Effectuer un paiement', icon: 'payment', onPress: () => router.push('/payments') },
    { label: 'Contacter le support', icon: 'support-agent', onPress: () => alert('Ouvrir le chat support') },
    { label: 'Documents de la police', icon: 'description', onPress: () => alert('Voir les documents') },
  ]

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 40, paddingTop: 80 }}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute z-10 p-2 bg-white rounded-full shadow top-12 left-5"
        activeOpacity={0.7}
      >
        <MaterialIcons name="arrow-back" size={28} color="#22B2DC" />
      </TouchableOpacity>

      {/* User info */}
      <View className="items-center pt-12 pb-8 bg-white shadow-sm">
        <View className="relative">
          <Image
            source={{ uri: user.avatar }}
            className="mb-5 bg-gray-200 border-4 border-white rounded-full shadow-md w-36 h-36"
          />
          <View className="absolute right-0 p-2 bg-[#22B2DC] border-2 border-white rounded-full bottom-5">
            <MaterialIcons name="edit" size={20} color="white" />
          </View>
        </View>
        <Text className="text-3xl font-bold text-[#222222]">{user.name}</Text>
        <Text className="mt-2 text-base text-[#555555]">{user.email}</Text>
      </View>

      {/* Policy summary */}
      <View className="p-6 mx-6 mt-8 bg-white shadow-sm rounded-xl">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-[#222222]">Plan actuel</Text>
          <View className={`px-3 py-1 rounded-full ${policy.status === 'Actif' ? 'bg-green-100' : 'bg-red-100'}`}>
            <Text className={`text-sm font-medium ${policy.status === 'Actif' ? 'text-green-800' : 'text-red-800'}`}>
              {policy.status}
            </Text>
          </View>
        </View>

        <View className="space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-[#555555]">Nom du plan</Text>
            <Text className="font-medium text-[#222222]">{policy.planName}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-[#555555]">Numéro de police</Text>
            <Text className="font-medium text-[#222222]">{policy.policyNumber}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-[#555555]">Date d'expiration</Text>
            <Text className="font-medium text-[#222222]">{policy.expiryDate}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-[#555555]">Couverture</Text>
            <Text className="font-medium text-right text-[#222222]">{policy.coverage}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-[#555555]">Franchise</Text>
            <Text className="font-medium text-[#222222]">{policy.deductible}</Text>
          </View>
        </View>
      </View>

      {/* Quick action buttons */}
      <View className="mx-6 mt-8 space-y-4">
        <Text className="mb-2 text-lg font-semibold text-[#222222]">Actions rapides</Text>

        {actions.map(({ label, icon, onPress }) => (
          <TouchableOpacity
            key={label}
            onPress={onPress}
            className="flex-row items-center p-4 bg-white border border-gray-100 shadow-sm rounded-xl active:bg-gray-50"
            activeOpacity={0.8}
          >
            <View className="p-2 mr-4 bg-[#22B2DC]/20 rounded-lg">
              <MaterialIcons name={icon} size={24} color="#22B2DC" />
            </View>
            <Text className="flex-1 text-base font-medium text-[#333333]">{label}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}
