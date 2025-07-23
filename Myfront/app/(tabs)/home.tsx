// app/components/HomePublic.tsx
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'

export default function HomePublic() {
  return (
    <View className="bg-white px-4 pt-12 space-y-6 w-full h-full">
      {/* Logo */}
    
      <View className='flex items-center'>
        <Image
          source={require('@/assets/images/myKover+Logo.png')}
          style={{ width: 100, height: 100 }}
          className="mb-6"
          resizeMode="contain"
        />
      </View>

      {/* Accroche */}
      <Text className="text-xl font-semibold text-center text-primary mb-8">
        Votre santé, notre priorité.
      </Text>

      <View className="h-[70%] flex flex-col gap-y-8">

        {/* Avantages */}
        <View className="w-full h-auto flex felx-col gap-y-4">
          {/* Card 1 */}
          <View className="bg-blue-50/50 rounded-2xl shadow px-4 py-8 border border-zinc-200">
            <View className="flex-row items-center gap-x-2">
              <FontAwesome5 className='p-3 rounded-full bg-blue-300/50' name="hand-holding-medical" size={20} color="#22B2DC" />
              <Text className="text-neutral-700 font-semibold">
                Remboursement rapide
              </Text>
            </View>
            <Text className="text-neutral-700 mt-2">
              Recevez vos remboursements en 72h.
            </Text>
          </View>

          {/* Card 2 */}
          <View className="bg-blue-50/50 rounded-2xl shadow px-4 py-8 border border-zinc-200">
            <View className="flex-row items-center gap-x-2">
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
          <View className="bg-blue-50/50 rounded-2xl shadow px-4 py-8 border border-zinc-200">
            <View className="flex-row items-center gap-x-2">
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
        <View className="w-full h-auto space-y-4 flex flex-col justify-center gap-2">
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
    </View>
  )
}


