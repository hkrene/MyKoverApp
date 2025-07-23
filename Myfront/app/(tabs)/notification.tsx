import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Mock notifications (replace with API/Supabase call later)
const notifications = []

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets()

  const renderItem = ({ item }) => (
    <View className="flex-row items-start p-4 mb-4 space-x-4 bg-white border shadow-sm rounded-xl border-neutral-200">
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
    <View className="flex-1 px-5 bg-gray-50" style={{ paddingTop: insets.top + 70 }}>
      <Text className="mb-6 text-2xl font-semibold text-neutral-800">Notifications</Text>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
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
