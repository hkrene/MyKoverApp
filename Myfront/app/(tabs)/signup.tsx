import React from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Image, Platform,
    TouchableWithoutFeedback,
    Keyboard, KeyboardAvoidingView,
 } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function NotificationsScreen() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = ()=>{
        if(!fullName){
            Alert.alert("le nom complet est Obligatoire")
            return
        }
        if(!email){
            Alert.alert("l'Email est Obligatoire")
            return
        }
        if(!phoneNumber){
            Alert.alert("le telephone est Obligatoire")
            return
        }
        if(!password){
            Alert.alert("le mot de passe est Obligatoire")
            return
        }
        return Alert.alert("Vous etes inscrit, bienvenue chez myKover+")
    }


  return (
   <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
   >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',}}>
                <View style={{alignItems:'center', justifyContent:'center', marginBottom:40}}>
                    <Image source={require('@/assets/images/myKover+Logo.png')} style={{width: 150, height: 150}} />
                    <Text style={{color:'gray', fontSize:24, fontWeight:'bold'}}>Sign up</Text>
                </View>
                <View>
                    <View style={{marginTop:10, marginBottom:10, alignItems:'start'}}>
                        <Text style={{fontSize:16, fontWeight:'semibold', color:'gray', opacity:0.8}}>
                            Nom et Prenom <Text style={{color:'orange'}}>*</Text>
                        </Text>
                        <TextInput style={{borderWidth: 1, borderColor:'gray', opacity:0.7, borderRadius:10, width:350, height:40, padding:10, marginTop:5}} onChangeText={setFullName}/>
                    </View>
                    <View style={{marginTop:10, marginBottom:10, alignItems:'start'}}>
                        <Text style={{fontSize:16, fontWeight:'semibold', color:'gray', opacity:0.8}}>
                            Email <Text style={{color:'orange'}}>*</Text>
                        </Text>
                        <TextInput style={{borderWidth: 1, borderColor:'gray', opacity:0.7, borderRadius:10, width:350, height:40, padding:10, marginTop:5}} onChangeText={setEmail}/>
                    </View>
                    <View style={{marginTop:10, marginBottom:10, alignItems:'start'}}>
                        <Text style={{fontSize:16, fontWeight:'semibold', color:'gray', opacity:0.8}}>
                            Telephone <Text style={{color:'orange'}}>*</Text>
                        </Text>
                        <TextInput style={{borderWidth: 1, borderColor:'gray', opacity:0.7, borderRadius:10, width:350, height:40, padding:10, marginTop:5}} onChangeText={setPhoneNumber}/>
                    </View>
                    <View style={{marginTop:10, marginBottom:10, alignItems:'start'}}>
                        <Text style={{fontSize:16, fontWeight:'semibold', color:'gray', opacity:0.8}}>
                            Mot de passe <Text style={{color:'orange'}}>*</Text>
                        </Text>
                        <TextInput style={{borderWidth: 1, borderColor:'gray', opacity:0.7, borderRadius:10, width:350, height:40, padding:10, marginTop:5}} onChangeText={setPassword}/>
                    </View>
                    <View>
                        <TouchableOpacity style={{backgroundColor:'#22B2DC', padding:10, borderRadius:10, width:350, height:40, alignItems:'center', marginTop:10}} onPress={handleSubmit}>
                            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>
                                S'inscrire
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={{width:350}}>
                    <View style={{marginTop:20, }}>
                        <Text style={{color:'gray', fontSize:16,}}>
                            Vous avez deja un compte ?   <Link href="/login" style={{color:'#22B2DC', fontWeight:'bold'}}>Se connecter</Link>
                        </Text>
                    </View>
                </View>
                
            </ScrollView>
       </TouchableWithoutFeedback> 
    </KeyboardAvoidingView>  
  );
}