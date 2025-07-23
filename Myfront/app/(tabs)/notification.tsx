import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

// Mock notifications — add `id` when adding real data
const notifications = []

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const renderItem = ({ item }) => (
    <View className="flex-row items-start p-4 space-x-4 bg-white border shadow-sm rounded-xl border-neutral-200">
      <View className="p-3 rounded-full bg-primary/10">
        <FontAwesome5 name={item.icon} size={18} color="#22B2DC" />
      </View>
      <View className="flex-1">
        <Text className="mb-1 text-base font-semibold text-neutral-800">{item.title}</Text>
        <Text className="text-sm text-neutral-600">{item.message}</Text>
        <Text className="mt-1 text-xs text-neutral-400">{item.time}</Text>
      </View>
    </View>
  )

  return (
    <View className="flex-1 px-5 bg-gray-50" style={{ paddingTop: insets.top + 90 }}>
      {/* Return button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute p-2 bg-white rounded-full shadow"
        activeOpacity={0.7}
        style={{ zIndex: 10, top: insets.top + 15, left: 15 }}
      >
        <MaterialIcons name="arrow-back" size={24} color="#22B2DC" />
      </TouchableOpacity>

      <Text className="mb-6 text-2xl font-semibold text-neutral-800">Notifications</Text>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="items-center justify-center flex-1">
          <FontAwesome5 name="bell-slash" size={48} color="#CBD5E1" />
          <Text className="mt-4 text-lg font-semibold text-neutral-500">
            Aucune notification pour le moment.
          </Text>
        </View>
      )}
    </View>
  )
}
