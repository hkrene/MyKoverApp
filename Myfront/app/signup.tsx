import { router } from 'expo-router';
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
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);


  const validateFullName = (value:string) => {
    setFullName(value);
    if (!value.trim()) {
      setFullNameError("Le nom complet est obligatoire");
    } else {
      setFullNameError("");
    }
    console.log('FullName validation:', value, !value.trim() ? 'error' : 'valid');
  };

  const validateEmail = (value:string) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("L'email est obligatoire");
    } else if (!emailRegex.test(value)) {
      setEmailError("Format d'email invalide");
    } else {
      setEmailError("");
    }
    console.log('Email validation:', value, !value || !emailRegex.test(value) ? 'error' : 'valid');
  };

  const validatePhone = (value:string) => {
    setPhoneNumber(value);
    const phoneRegex = /^(?:\+?\d{1,4}|0)\d{8,14}$/;
    if (!value) {
      setPhoneError("Le téléphone est obligatoire");
    } else if (!phoneRegex.test(value)) {
      setPhoneError("Format invalide. Exemple : +24382XXXXXXX ou 082XXXXXXX");
    } else {
      setPhoneError("");
    }
    console.log('Phone validation:', value, !value || !phoneRegex.test(value) ? 'error' : 'valid');
  };

  const validatePassword = (value:string) => {
    setPassword(value);
    if (!value) {
      setPasswordError("Le mot de passe est obligatoire");
    } else if (value.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
    } else {
      setPasswordError("");
    }
    console.log('Password validation:', value, !value || value.length < 6 ? 'error' : 'valid');
  };

  const handleSubmit = () => {
    console.log('Form data:', { fullName, email, phoneNumber, password });
    console.log('Errors:', { fullNameError, emailError, phoneError, passwordError });
    
    if (fullName && email && phoneNumber && password && !fullNameError && !emailError && !phoneError && !passwordError) {
      console.log('Submitting form...');
      signupUser();
    } else {
      console.log('Form validation failed');
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement");
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
  
    setFullNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
  };

  const signupUser = async () => {
    try {
      console.log('Making API call to /auth/signup with data:', {
        fullName: fullName,
        email,
        phoneNumber: phoneNumber,
        password: password ? '***' : 'undefined'
      });
      
      const response = await api.post('/auth/signup', {
        fullName: fullName,
        email,
        phoneNumber: phoneNumber,
        password,
      });
  
      console.log('API response:', response.status, response.data);
      
      if (response.status === 201 || response.status === 200) {
        // Store the authentication token
        const token = response.data.token?.token;
        if (token) {
          await AsyncStorage.setItem('authToken', token);
          console.log('Token stored successfully');
        }
        
        Alert.alert("Succès", "Inscription réussie !");
        resetForm();
        router.push('./(tabs)/home');
      } else {
        Alert.alert("Erreur", "Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.response) {
        // Erreurs de validation côté serveur
        const message = error.response.data?.message || "Erreur lors de l'inscription.";
        Alert.alert("Erreur", message);
      } else {
        Alert.alert("Erreur", "Impossible de contacter le serveur.");
      }
    }
  };
  
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Image source={require('@/assets/images/myKover+Logo.png')} style={{ width: 150, height: 150 }} />
            <Text style={{ color: 'gray', fontSize: 24, fontWeight: 'bold' }}>Inscription</Text>
          </View>

          {/* Nom complet */}
          <View style={{ marginBottom: 10, width: 350 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Nom et prénom <Text style={{ color: 'orange' }}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: fullNameError ? 'red' : 'gray',
                borderRadius: 10,
                height: 40,
                padding: 10,
                marginTop: 5,
              }}
              onChangeText={validateFullName}
              value={fullName}
            />
            {fullNameError ? <Text style={{ color: 'red', marginTop: 5 }}>{fullNameError}</Text> : null}
          </View>

          {/* Email */}
          <View style={{ marginBottom: 10, width: 350 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Email <Text style={{ color: 'orange' }}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: emailError ? 'red' : 'gray',
                borderRadius: 10,
                height: 40,
                padding: 10,
                marginTop: 5,
              }}
              keyboardType="email-address"
              onChangeText={validateEmail}
              value={email}
              autoCapitalize="none"
            />
            {emailError ? <Text style={{ color: 'red', marginTop: 5 }}>{emailError}</Text> : null}
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
            {phoneError ? <Text style={{ color: 'red', marginTop: 5 }}>{phoneError}</Text> : null}
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


          {/* Test de connexion */}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}

          {/* Test de connexion avec IP directe */}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}

          {/* Bouton d'inscription */}
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
            onPress={() => {
              console.log('Submit button pressed');
              handleSubmit();
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              S'inscrire
            </Text>
          </TouchableOpacity>

          {/* Lien vers login */}
          <View style={{ width: 350, marginTop: 20 , marginBottom:10}}>
            <Text style={{ color: 'gray', fontSize: 16 }}>
              Vous avez déjà un compte ? <Link href="/login" style={{ color: '#22B2DC', fontWeight: 'bold' }}>Se connecter</Link>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
