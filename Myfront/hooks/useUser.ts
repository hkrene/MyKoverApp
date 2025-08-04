import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '@/services/api'

interface User {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  avatar?: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('authToken')
      
      if (token) {
        const response = await api.get('/api/profile')
        setUser(response.data.user)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, refetch: fetchUserData }
} 