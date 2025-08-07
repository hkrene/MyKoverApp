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
import googleAuth from '@/services/googleAuth';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Google Sign-In...');
      
      const user = await googleAuth.signIn();
      
      if (user) {
        Alert.alert("Succès", "Connexion Google réussie !");
        router.replace('./(tabs)/home');
      } else {
        Alert.alert("Erreur", "Échec de la connexion Google.");
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      Alert.alert("Erreur", "Erreur lors de la connexion Google.");
    } finally {
      setIsLoading(false);
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

          {/* Bouton de connexion */}
          <TouchableOpacity
            style={{
              backgroundColor: '#22B2DC',
              padding: 10,
              borderRadius: 10,
              width: 350,
              height: 40,
              alignItems: 'center',
              marginTop: 10,
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Text>
          </TouchableOpacity>

          {/* Séparateur */}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 350, marginTop: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
            <Text style={{ marginHorizontal: 10, color: 'gray' }}>ou</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
          </View>

          {/* Bouton Google Sign-In */}
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 10,
              borderRadius: 10,
              width: 350,
              height: 40,
              alignItems: 'center',
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            <FontAwesome5 name="google" size={18} color="#DB4437" style={{ marginRight: 10 }} />
            <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>
              {isLoading ? 'Connexion...' : 'Continuer avec Google'}
            </Text>
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
