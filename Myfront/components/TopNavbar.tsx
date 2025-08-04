import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

interface TopNavbarProps {
  title?: string
  showBackButton?: boolean
  onBackPress?: () => void
  onNotificationPress?: () => void
  onProfilePress?: () => void
  user?: {
    fullName: string
    avatar?: string
  } | null
}

export default function TopNavbar({
  title,
  showBackButton = false,
  onBackPress,
  onNotificationPress,
  onProfilePress,
  user
}: TopNavbarProps) {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      router.back()
    }
  }

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress()
    } else {
      router.push('/notification' as any)
    }
  }

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress()
    } else {
      router.push('/profile')
    }
  }

  return (
    <View 
      className="flex-row items-center justify-between px-4 py-3 bg-white shadow-sm"
      style={{ 
        paddingTop: insets.top + 8,
        paddingBottom: 12
      }}
    >
      {/* Left Section */}
      <View className="flex-row items-center flex-1">
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            className="p-2 mr-3 rounded-full"
            activeOpacity={0.7}
          >
            <FontAwesome6 name="arrow-left" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
        
        {/* Logo */}
        <View className="flex-row items-center">
          <Image 
            source={require('@/assets/images/myKover+Logo.png')}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
          <Text 
            className="ml-2 text-lg font-bold"
            style={{ color: colors.primary }}
          >
            MyKover
          </Text>
        </View>
      </View>

      {/* Center Section - Optional Title */}
      {title && (
        <View className="items-center flex-1">
          <Text 
            className="text-base font-semibold"
            style={{ color: colors.text }}
          >
            {title}
          </Text>
        </View>
      )}

      {/* Right Section */}
      <View className="flex-row items-center">
        {/* Notification Icon */}
        <TouchableOpacity
          onPress={handleNotificationPress}
          className="p-2 mr-3 rounded-full"
          activeOpacity={0.7}
        >
          <View className="relative">
            <FontAwesome6 name="bell" size={20} color={colors.icon} />
            {/* Notification Badge */}
            <View 
              className="absolute w-2 h-2 rounded-full -top-1 -right-1"
              style={{ backgroundColor: colors.accent }}
            />
          </View>
        </TouchableOpacity>

        {/* Profile Avatar */}
        <TouchableOpacity
          onPress={handleProfilePress}
          className="p-1 rounded-full"
          activeOpacity={0.7}
        >
          <View 
            className="items-center justify-center w-8 h-8 rounded-full"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-sm font-bold text-white">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
} 