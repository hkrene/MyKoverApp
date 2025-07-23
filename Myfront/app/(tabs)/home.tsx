import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'

export default function HomePublic() {
  return (
    <View className="flex-1 px-6 pt-16 pb-10 bg-white">
      
      {/* Logo and Header */}
      <View className="items-center mb-12">
        <Image
          source={require('@/assets/images/myKover+Logo.png')}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
          className="mb-4"
        />
        <Text className="mb-1 text-3xl font-extrabold text-center text-primary">
          Votre santé, notre priorité
        </Text>
        <Text className="text-base leading-relaxed text-center text-neutral-500">
          Une couverture santé simple, rapide et accessible
        </Text>
      </View>

      {/* Benefits Section */}
      <View className="mb-12">
        <Text className="mb-4 text-xl font-semibold text-neutral-800">
          Pourquoi choisir myKover+ ?
        </Text>

        <View className="space-y-4">
          {/* Card Component */}
          {[
            {
              icon: 'hand-holding-medical',
              title: 'Remboursement rapide',
              desc: 'Recevez vos remboursements en 72h chrono.',
            },
            {
              icon: 'shield-alt',
              title: 'Couverture étendue',
              desc: 'Soins, pharmacie, hospitalisation et plus.',
            },
            {
              icon: 'headset',
              title: 'Assistance 24/7',
              desc: 'Un accompagnement humain à tout moment.',
            },
          ].map((item, index) => (
            <View
              key={index}
              className="flex-row items-start p-5 space-x-4 border border-blue-100 shadow-sm bg-blue-50 rounded-2xl"
            >
              <View className="p-3 rounded-full bg-primary/10">
                <FontAwesome5 name={item.icon} size={18} color="#22B2DC" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-neutral-800">
                  {item.title}
                </Text>
                <Text className="text-sm text-neutral-600">
                  {item.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View className="mt-auto space-y-4">
        <Link href="/signup" asChild>
          <TouchableOpacity className="w-full py-4 rounded-full shadow-md bg-primary active:bg-primary/90">
            <Text className="text-lg font-bold text-center text-white">
              Je prends mon assurance santé
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/login" asChild>
          <TouchableOpacity className="w-full py-4 border rounded-full border-primary">
            <Text className="text-lg font-semibold text-center text-primary">
              Se connecter
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
