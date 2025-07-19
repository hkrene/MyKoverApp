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
  };

  const validatePassword = (value:string) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!value) {
      setPasswordError("Le mot de passe est obligatoire");
    } else if (!passwordRegex.test(value)) {
      setPasswordError("Min. 8 caractères, 1 maj, 1 min, 1 chiffre");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = () => {
    validateFullName(fullName);
    validateEmail(email);
    validatePhone(phoneNumber);
    validatePassword(password);

    if (
      !fullName || fullNameError ||
      !email || emailError ||
      !phoneNumber || phoneError ||
      !password || passwordError
    ) {
      Alert.alert("Formulaire invalide", "Veuillez corriger les erreurs");
      return;
    }

    Alert.alert("Vous êtes inscrit, bienvenue chez myKover+");
    resetForm();
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
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Image source={require('@/assets/images/myKover+Logo.png')} style={{ width: 150, height: 150 }} />
            <Text style={{ color: 'gray', fontSize: 24, fontWeight: 'bold' }}>Sign up</Text>
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
            onPress={handleSubmit}
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
