import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter, useLocalSearchParams } from 'expo-router'
import TopNavbar from '@/components/TopNavbar'

interface HealthcareFacility {
  id: number
  name: string
  type: 'hospital' | 'health_center' | 'pharmacy' | 'lab'
  address: string
  phone: string
  distance: string
  rating: number
  isOpen: boolean
  coordinates: {
    latitude: number
    longitude: number
  }
  description?: string
  services?: string[]
  hours?: string
}

export default function FacilityDetailsScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const params = useLocalSearchParams()
  
  // In a real app, you'd fetch this data from an API
  const facility: HealthcareFacility = {
    id: parseInt(params.id as string),
    name: params.name as string,
    type: params.type as any,
    address: params.address as string,
    phone: params.phone as string,
    distance: params.distance as string,
    rating: parseFloat(params.rating as string),
    isOpen: params.isOpen === 'true',
    coordinates: {
      latitude: parseFloat(params.latitude as string),
      longitude: parseFloat(params.longitude as string)
    },
    description: "Établissement de santé partenaire MyKover offrant des services de qualité pour nos assurés.",
    services: [
      "Consultations médicales",
      "Analyses de laboratoire", 
      "Imagerie médicale",
      "Pharmacie",
      "Urgences 24h/24"
    ],
    hours: "Lundi - Vendredi: 8h00 - 18h00\nSamedi: 8h00 - 14h00\nDimanche: Urgences uniquement"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return 'hospital'
      case 'health_center':
        return 'clinic-medical'
      case 'pharmacy':
        return 'pills'
      case 'lab':
        return 'flask'
      default:
        return 'map-marker-alt'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hospital':
        return '#DC2626' // Red
      case 'health_center':
        return '#22B2DC' // Blue
      case 'pharmacy':
        return '#10B981' // Green
      case 'lab':
        return '#F59E0B' // Yellow
      default:
        return '#6B7280' // Gray
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'hospital':
        return 'Hôpital'
      case 'health_center':
        return 'Centre de Santé'
      case 'pharmacy':
        return 'Pharmacie'
      case 'lab':
        return 'Laboratoire'
      default:
        return 'Autre'
    }
  }

  const openGoogleMaps = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${facility.coordinates.latitude},${facility.coordinates.longitude}`
    try {
      await Linking.openURL(url)
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ouvrir Google Maps')
    }
  }

  const callFacility = async () => {
    try {
      await Linking.openURL(`tel:${facility.phone}`)
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'appeler ce numéro')
    }
  }

  const getDirections = async () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.latitude},${facility.coordinates.longitude}`
    try {
      await Linking.openURL(url)
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ouvrir Google Maps')
    }
  }

  const ActionButton = ({ icon, label, onPress, color = "#22B2DC" }: { 
    icon: string; 
    label: string; 
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 p-4 mx-2 bg-white shadow-sm rounded-xl"
      activeOpacity={0.8}
    >
      <View className="items-center">
        <View 
          className="items-center justify-center w-12 h-12 mb-3 rounded-full"
          style={{ backgroundColor: color + '20' }}
        >
          <FontAwesome6 name={icon as any} size={20} color={color} />
        </View>
        <Text className="text-sm font-medium text-center text-gray-800">{label}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-gray-50">
      <TopNavbar title="Détails" showBackButton />
      
      <ScrollView className="flex-1 px-5 py-6">
        {/* Header */}
        <View className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <View className="flex-row items-start mb-4">
            <View 
              className="items-center justify-center w-12 h-12 mr-4 rounded-full"
              style={{ backgroundColor: getTypeColor(facility.type) + '20' }}
            >
              <FontAwesome6 
                name={getTypeIcon(facility.type) as any} 
                size={24} 
                color={getTypeColor(facility.type)} 
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-2xl font-bold text-gray-800">{facility.name}</Text>
              <Text className="mb-2 text-lg text-gray-600">{getTypeLabel(facility.type)}</Text>
              <View className="flex-row items-center">
                <FontAwesome6 name="star" size={16} color="#F59E0B" />
                <Text className="ml-1 text-gray-600">{facility.rating}</Text>
                <Text className="ml-2 text-gray-500">• {facility.distance}</Text>
              </View>
            </View>
            <View className={`px-3 py-1 rounded-full ${
              facility.isOpen ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Text className={`text-sm font-medium ${
                facility.isOpen ? 'text-green-800' : 'text-red-800'
              }`}>
                {facility.isOpen ? 'Ouvert' : 'Fermé'}
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-600">{facility.address}</Text>
          </View>

          <View className="flex-row items-center">
            <FontAwesome6 name="phone" size={16} color="#22B2DC" />
            <Text className="ml-2 text-gray-600">{facility.phone}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-800">Actions rapides</Text>
          <View className="flex-row">
            <ActionButton 
              icon="map-location-dot" 
              label="Voir sur carte" 
              onPress={openGoogleMaps}
              color="#22B2DC"
            />
            <ActionButton 
              icon="route" 
              label="Itinéraire" 
              onPress={getDirections}
              color="#10B981"
            />
            <ActionButton 
              icon="phone" 
              label="Appeler" 
              onPress={callFacility}
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Description */}
        <View className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <Text className="mb-3 text-lg font-semibold text-gray-800">Description</Text>
          <Text className="leading-6 text-gray-600">{facility.description}</Text>
        </View>

        {/* Services */}
        <View className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <Text className="mb-4 text-lg font-semibold text-gray-800">Services offerts</Text>
          {facility.services?.map((service, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <FontAwesome6 name="check-circle" size={16} color="#10B981" />
              <Text className="ml-3 text-gray-700">{service}</Text>
            </View>
          ))}
        </View>

        {/* Hours */}
        <View className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <Text className="mb-4 text-lg font-semibold text-gray-800">Horaires d'ouverture</Text>
          <Text className="leading-6 text-gray-600">{facility.hours}</Text>
        </View>

        {/* MyKover Benefits */}
        <View className="p-6 bg-blue-50 rounded-xl">
          <Text className="mb-3 text-lg font-semibold text-blue-800">Avantages MyKover</Text>
          <View className="space-y-2">
            <View className="flex-row items-center">
              <FontAwesome6 name="check-circle" size={16} color="#22B2DC" />
              <Text className="ml-3 text-blue-700">Paiement direct des frais médicaux</Text>
            </View>
            <View className="flex-row items-center">
              <FontAwesome6 name="check-circle" size={16} color="#22B2DC" />
              <Text className="ml-3 text-blue-700">Pas de frais de dossier</Text>
            </View>
            <View className="flex-row items-center">
              <FontAwesome6 name="check-circle" size={16} color="#22B2DC" />
              <Text className="ml-3 text-blue-700">Service client prioritaire</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
} 