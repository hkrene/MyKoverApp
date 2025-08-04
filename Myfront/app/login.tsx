import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false)

  // Validation téléphone
  const validatePhone = (value:string) => {
    setPhoneNumber(value);
  
    // Format: commence par +[code] ou 0, suivi de chiffres
    const phoneRegex = /^(?:\+?\d{1,4}|0)\d{8,14}$/;
  
    if (!value) {
      setPhoneError('Le téléphone est obligatoire');
    } else if (!phoneRegex.test(value)) {
      setPhoneError('Format invalide. Exemple : +24382XXXXXXX ou 082XXXXXXX');
    } else {
      setPhoneError('');
    }
  };
  

  // Validation mot de passe
  const validatePassword = (value:string) => {
    setPassword(value);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!value) {
      setPasswordError('Le mot de passe est obligatoire');
    } else if (!passwordRegex.test(value)) {
      setPasswordError('Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = () => {
    validatePhone(phoneNumber);
    validatePassword(password);

    if (!phoneNumber || phoneError || !password || passwordError) {
      Alert.alert("Formulaire invalide", "Veuillez corriger les erreurs");
      return;
    }

    loginUser();
  };

  const loginUser = async () => {
    try {
      console.log('Attempting login with:', { phoneNumber, password: password ? '***' : 'undefined' })
      console.log('API base URL:', api.defaults.baseURL)
      
      const response = await api.post('/auth/login', {
        phoneNumber: phoneNumber,
        password: password,
      });

      console.log('Login response:', response.status, response.data)

      if (response.status === 200) {
        // Store the authentication token
        const token = response.data.token?.token;
        if (token) {
          await AsyncStorage.setItem('authToken', token);
          console.log('Token stored successfully');
        }
        
        Alert.alert("Succès", "Connexion réussie !");
        resetForm();
        router.replace('./(tabs)/home');
      } else {
        Alert.alert("Erreur", "Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error: any) {
      console.error('Login error details:', error)
      console.error('Error response:', error.response?.data)
      console.error('Error status:', error.response?.status)
      console.error('Error message:', error.message)
      
      if (error.response) {
        const message = error.response.data?.message || "Erreur lors de la connexion.";
        Alert.alert("Erreur", message);
      } else {
        Alert.alert("Erreur", "Impossible de contacter le serveur.");
      }
    }
  };
  const resetForm = () => {
    setPhoneNumber('');
    setPassword('');

    setPhoneError('');
    setPasswordError('');
  };
  

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Image source={require('@/assets/images/myKover+Logo.png')} style={{ width: 150, height: 150 }} />
            <Text style={{ color: 'gray', fontSize: 24, fontWeight: 'bold' }}>Connexion</Text>
          </View>

          {/* Téléphone */}
          <View style={{ marginBottom: 10, width: 350 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Téléphone <Text style={{ color: 'orange' }}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: phoneError ? 'red' : 'gray',
                borderRadius: 10,
                height: 40,
                padding: 10,
                marginTop: 5,
              }}
              keyboardType="phone-pad"
              onChangeText={validatePhone}
              value={phoneNumber}
              maxLength={15}
            />
            {phoneError ? (
              <Text style={{ color: 'red', marginTop: 5 }}>{phoneError}</Text>
            ) : null}
          </View>

          {/* Mot de passe */}
          <View style={{ marginBottom: 10, width: 350 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Mot de passe <Text style={{ color: 'orange' }}>*</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: passwordError ? 'red' : 'gray',
                borderRadius: 10,
                marginTop: 5,
                paddingHorizontal: 10,
                height: 40,
              }}
            >
              <TextInput
                style={{ flex: 1 }}
                secureTextEntry={!passwordVisible}
                onChangeText={validatePassword}
                value={password}
                placeholder="Mot de passe"
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <FontAwesome6
                  name={passwordVisible ? 'eye-slash' : 'eye'}
                  size={18}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={{ color: 'red', marginTop: 5 }}>{passwordError}</Text>
            ) : null}
          </View>

          {/* Test de connexion API */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF6B6B',
              padding: 10,
              borderRadius: 10,
              width: 350,
              height: 40,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={async () => {
              try {
                console.log('Testing API connection...');
                const response = await api.get('/');
                console.log('Test response:', response.data);
                Alert.alert("Test", "Connexion API réussie!");
              } catch (error) {
                console.error('Test error:', error);
                Alert.alert("Test", "Erreur de connexion API");
              }
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Test Connexion API
            </Text>
          </TouchableOpacity>

          {/* Test de connexion avec IP directe */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF8C00',
              padding: 10,
              borderRadius: 10,
              width: 350,
              height: 40,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={async () => {
              try {
                console.log('Testing direct IP connection...');
                const response = await fetch('http://172.24.157.111:3333/');
                const data = await response.json();
                console.log('Direct IP test response:', data);
                Alert.alert("Test IP Direct", "Connexion IP directe réussie!");
              } catch (error) {
                console.error('Direct IP test error:', error);
                Alert.alert("Test IP Direct", "Erreur de connexion IP directe");
              }
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Test IP Directe
            </Text>
          </TouchableOpacity>

          {/* Bouton */}
          <TouchableOpacity
            style={{
              backgroundColor: '#22B2DC',
              padding: 10,
              borderRadius: 10,
              width: 350,
              height: 40,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Se connecter</Text>
          </TouchableOpacity>

          {/* Lien d'inscription */}
          <View style={{ width: 350, marginTop: 20, marginBottom: 10 }}>
            <Text style={{ color: 'gray', fontSize: 16 }}>
              Vous n'avez pas un compte ? <Link href="/signup" style={{ color: '#22B2DC', fontWeight: 'bold' }}>S'inscrire</Link>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
