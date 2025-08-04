import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
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
}

export default function MapScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'hospital' | 'health_center' | 'pharmacy' | 'lab'>('all')

  const facilities: HealthcareFacility[] = [
    {
      id: 1,
      name: 'Centre Hospitalier de Kinshasa',
      type: 'hospital',
      address: 'Avenue de la Justice, Kinshasa',
      phone: '+243 999 123 456',
      distance: '2.3 km',
      rating: 4.8,
      isOpen: true,
      coordinates: { latitude: -4.3224, longitude: 15.3075 }
    },
    {
      id: 2,
      name: 'Clinique Ngaliema',
      type: 'hospital',
      address: 'Boulevard du 30 Juin, Kinshasa',
      phone: '+243 999 234 567',
      distance: '1.8 km',
      rating: 4.6,
      isOpen: true,
      coordinates: { latitude: -4.3250, longitude: 15.3100 }
    },
    {
      id: 3,
      name: 'Centre de Santé de Limete',
      type: 'health_center',
      address: 'Avenue de Limete, Kinshasa',
      phone: '+243 999 345 678',
      distance: '3.1 km',
      rating: 4.2,
      isOpen: true,
      coordinates: { latitude: -4.3200, longitude: 15.3050 }
    },
    {
      id: 4,
      name: 'Pharmacie Centrale',
      type: 'pharmacy',
      address: 'Rue du Commerce, Kinshasa',
      phone: '+243 999 456 789',
      distance: '0.5 km',
      rating: 4.5,
      isOpen: true,
      coordinates: { latitude: -4.3180, longitude: 15.3080 }
    },
    {
      id: 5,
      name: 'Laboratoire Biologie Médicale',
      type: 'lab',
      address: 'Avenue de la Science, Kinshasa',
      phone: '+243 999 567 890',
      distance: '4.2 km',
      rating: 4.7,
      isOpen: false,
      coordinates: { latitude: -4.3150, longitude: 15.3120 }
    },
    {
      id: 6,
      name: 'Hôpital Général de Référence',
      type: 'hospital',
      address: 'Boulevard Lumumba, Kinshasa',
      phone: '+243 999 678 901',
      distance: '5.0 km',
      rating: 4.4,
      isOpen: true,
      coordinates: { latitude: -4.3300, longitude: 15.3000 }
    }
  ]

  const getFilteredFacilities = () => {
    if (selectedFilter === 'all') return facilities
    return facilities.filter(facility => facility.type === selectedFilter)
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

  const FilterButton = ({ type, label, icon }: { type: string; label: string; icon: string }) => (
    <TouchableOpacity
      onPress={() => setSelectedFilter(type as any)}
      className={`px-4 py-2 rounded-full mr-3 ${
        selectedFilter === type ? 'bg-[#22B2DC]' : 'bg-gray-200'
      }`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <FontAwesome6 
          name={icon as any} 
          size={14} 
          color={selectedFilter === type ? 'white' : '#6B7280'} 
        />
        <Text 
          className={`ml-2 text-sm font-medium ${
            selectedFilter === type ? 'text-white' : 'text-gray-600'
          }`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const FacilityCard = ({ facility }: { facility: HealthcareFacility }) => (
    <TouchableOpacity
      className="mb-4 overflow-hidden bg-white shadow-sm rounded-xl"
      activeOpacity={0.8}
      onPress={() => {
        router.push({
          pathname: '/facility-details',
          params: {
            id: facility.id.toString(),
            name: facility.name,
            type: facility.type,
            address: facility.address,
            phone: facility.phone,
            distance: facility.distance,
            rating: facility.rating.toString(),
            isOpen: facility.isOpen.toString(),
            latitude: facility.coordinates.latitude.toString(),
            longitude: facility.coordinates.longitude.toString()
          }
        })
      }}
    >
      <View className="p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View 
                className="items-center justify-center w-8 h-8 mr-3 rounded-full"
                style={{ backgroundColor: getTypeColor(facility.type) + '20' }}
              >
                <FontAwesome6 
                  name={getTypeIcon(facility.type) as any} 
                  size={16} 
                  color={getTypeColor(facility.type)} 
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">{facility.name}</Text>
                <Text className="text-sm text-gray-500">{getTypeLabel(facility.type)}</Text>
              </View>
              <View className="items-end">
                <View className={`px-2 py-1 rounded-full ${
                  facility.isOpen ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Text className={`text-xs font-medium ${
                    facility.isOpen ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {facility.isOpen ? 'Ouvert' : 'Fermé'}
                  </Text>
                </View>
              </View>
            </View>
            
            <View className="mb-3">
              <Text className="text-sm text-gray-600">{facility.address}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <FontAwesome6 name="phone" size={14} color="#22B2DC" />
                <Text className="ml-2 text-sm text-gray-600">{facility.phone}</Text>
              </View>
              <View className="flex-row items-center">
                <FontAwesome6 name="star" size={14} color="#F59E0B" />
                <Text className="ml-1 text-sm text-gray-600">{facility.rating}</Text>
                <Text className="ml-2 text-sm text-gray-500">• {facility.distance}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-gray-50">
      <TopNavbar title="Réseau Santé" />
      
      <ScrollView className="flex-1 px-5 py-6">
        <Text className="mb-4 text-2xl font-bold text-gray-800">
          Nos partenaires santé
        </Text>
        <Text className="mb-6 text-gray-600">
          Trouvez les hôpitaux, centres de santé, pharmacies et laboratoires partenaires près de chez vous.
        </Text>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          <FilterButton type="all" label="Tous" icon="list" />
          <FilterButton type="hospital" label="Hôpitaux" icon="hospital" />
          <FilterButton type="health_center" label="Centres" icon="clinic-medical" />
          <FilterButton type="pharmacy" label="Pharmacies" icon="pills" />
          <FilterButton type="lab" label="Laboratoires" icon="flask" />
        </ScrollView>

        {/* Facilities List */}
        {getFilteredFacilities().map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}

        {/* Empty State */}
        {getFilteredFacilities().length === 0 && (
          <View className="items-center justify-center py-12">
            <FontAwesome6 name="map-marker-alt" size={48} color="#CBD5E1" />
            <Text className="mt-4 text-lg font-semibold text-gray-500">
              Aucun établissement trouvé
            </Text>
            <Text className="mt-2 text-sm text-center text-gray-400">
              Aucun établissement de ce type n'est disponible dans votre zone.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
} 