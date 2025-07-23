import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

export default function PaymentScreen() {
  const insets = useSafeAreaInsets()
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState<'mpesa' | 'airtel' | 'orange' | 'card' | null>(null)
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    if (!amount || !method) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.')
      return
    }

    setLoading(true)

    try {
      // Fake API call – replace with actual Cerdipay integration
      const payload = {
        amount,
        phone,
        method,
        currency: 'CDF',
      }

      console.log('Sending payment:', payload)

      // Example: await axios.post('https://api.cerdipay.com/pay', payload)

      setTimeout(() => {
        setLoading(false)
        Alert.alert('Succès', 'Paiement initié avec succès.')
      }, 1500)
    } catch (error) {
      setLoading(false)
      Alert.alert('Erreur', 'Une erreur est survenue.')
      console.error(error)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 70, paddingBottom: 30 }}
      className="flex-1 px-5 bg-white"
    >
      <Text className="mb-6 text-4xl font-semibold text-neutral-800">Paiement</Text>

      <Text className="mb-1 text-sm font-semibold text-neutral-600">Montant (CDF)</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Entrez le montant"
        value={amount}
        onChangeText={setAmount}
        className="px-4 py-3 mb-4 text-base bg-gray-100 rounded-xl"
      />

      <Text className="mb-1 text-sm font-semibold text-neutral-600">Numéro de téléphone</Text>
      <TextInput
        keyboardType="phone-pad"
        placeholder="Ex: 0812345678"
        value={phone}
        onChangeText={setPhone}
        className="px-4 py-3 mb-6 text-base bg-gray-100 rounded-xl"
      />

      <Text className="mb-2 text-sm font-semibold text-neutral-600">Méthode de paiement</Text>

      <View className="flex-row flex-wrap gap-3 mb-6">
        {[
          { key: 'mpesa', icon: 'mobile-alt', label: 'M-Pesa' },
          { key: 'airtel', icon: 'mobile-alt', label: 'Airtel Money' },
          { key: 'orange', icon: 'mobile-alt', label: 'Orange Money' },
          { key: 'card', icon: 'credit-card', label: 'Carte bancaire' },
        ].map(({ key, icon, label }) => (
          <TouchableOpacity
            key={key}
            onPress={() => setMethod(key)}
            className={`flex-row items-center px-4 py-3 rounded-xl border ${
              method === key ? 'bg-primary/10 border-primary' : 'bg-gray-100 border-gray-200'
            }`}
          >
            <FontAwesome5 name={icon as any} size={16} color="#22B2DC" />
            <Text className="ml-2 font-medium text-neutral-800">{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={pay}
        disabled={loading}
        className="flex-row items-center justify-center py-4 bg-primary rounded-xl"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <MaterialCommunityIcons name="wallet" size={20} color="#fff" />
            <Text className="ml-2 text-base font-semibold text-white">Payer maintenant</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}
