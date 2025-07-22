// app/components/HomePublic.tsx
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'

export default function HomePublic() {
  return (
    <View className="flex-1 bg-white items-center px-4 pt-12">
      {/* Logo */}
      <Image
        source={require('@/assets/images/myKover+Logo.png')}
        style={{ width: 100, height: 100 }}
        className="mb-6"
        resizeMode="contain"
      />

      {/* Accroche */}
      <Text className="text-xl font-semibold text-center text-primary mb-8">
        Votre santé, notre priorité.
      </Text>

      {/* Avantages */}
      <View className="w-full space-y-4 mb-8">
        {/* Card 1 */}
        <View className="bg-neutral-100 rounded-2xl shadow p-4 border border-gray-200">
          <View className="flex-row items-center space-x-3">
            <FontAwesome5 name="hand-holding-medical" size={20} color="#22B2DC" />
            <Text className="text-neutral-700 font-semibold">
              Remboursement rapide
            </Text>
          </View>
          <Text className="text-neutral-700 mt-2">
            Recevez vos remboursements en 72h.
          </Text>
        </View>

        {/* Card 2 */}
        <View className="bg-neutral-100 rounded-2xl shadow p-4 border border-gray-200">
          <View className="flex-row items-center space-x-3">
            <FontAwesome5 name="shield-alt" size={20} color="#22B2DC" />
            <Text className="text-neutral-700 font-semibold">
              Couverture étendue
            </Text>
          </View>
          <Text className="text-neutral-700 mt-2">
            Soins, pharmacie, hospitalisation et plus.
          </Text>
        </View>

        {/* Card 3 */}
        <View className="bg-neutral-100 rounded-2xl shadow p-4 border border-gray-200">
          <View className="flex-row items-center space-x-3">
            <FontAwesome5 name="headset" size={20} color="#22B2DC" />
            <Text className="text-neutral-700 font-semibold">
              Assistance 24/7
            </Text>
          </View>
          <Text className="text-neutral-700 mt-2">
            Un accompagnement humain à tout moment.
          </Text>
        </View>
      </View>

      {/* CTA Buttons */}
      <View className="w-full space-y-4">
        <Link href="/login" asChild>
          <TouchableOpacity className="bg-white border border-primary rounded-full py-3 items-center">
            <Text className="text-primary font-semibold">Se connecter</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/signup" asChild>
          <TouchableOpacity className="bg-primary rounded-full py-3 items-center">
            <Text className="text-white font-semibold">
              Je prends mon assurance santé
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}


