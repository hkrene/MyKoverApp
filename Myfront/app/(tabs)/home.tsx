

// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
// import { Link } from 'expo-router';
// import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

// export default function HomePublic() {
//   const handleEmergencyCall = () => {
//     Linking.openURL('tel:+243999999999');
//   };

//   return (
//     <ScrollView 
//       className="flex-1 bg-gray-50"
//       contentContainerStyle={{ paddingBottom: 30 }}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Hero Section with healthcare teal gradient */}
//       <View className="px-6 pt-12 pb-10 bg-gradient-to-b from-teal-600 to-teal-00 rounded-b-3xl">
//         <Animated.View entering={FadeIn.duration(600)} className="items-center mb-6">
//           <Image
//             source={require('@/assets/images/myKover+Logo.png')}
//             style={{ width: 100, height: 100 }}
//             resizeMode="contain"
//           />
//         </Animated.View>

//         <Animated.View entering={FadeInUp.duration(600).delay(200)}>
//           <Text className="mb-2 text-2xl font-bold text-center text-white">
//             Protection Santé pour Tous
//           </Text>
//           <Text className="text-lg text-center text-teal-100">
//             Couverture médicale accessible dès 5$/mois
//           </Text>
//         </Animated.View>
//       </View>

//       {/* Quick Actions - Healthcare focused */}
//       <Animated.View 
//         entering={FadeInDown.duration(600).delay(400)}
//         className="flex-row justify-between px-6 mb-8 -mt-8"
//       >
//         {[
//           { 
//             icon: 'hospital', 
//             label: 'Nos Cliniques', 
//             bg: 'bg-white',
//             iconColor: 'text-teal-600',
//             iconBg: 'bg-teal-100'
//           },
//           { 
//             icon: 'pills', 
//             label: 'Pharmacies', 
//             bg: 'bg-white',
//             iconColor: 'text-teal-600',
//             iconBg: 'bg-teal-100'
//           },
//           { 
//             icon: 'user-md', 
//             label: 'Médecins', 
//             bg: 'bg-white',
//             iconColor: 'text-teal-600',
//             iconBg: 'bg-teal-100'
//           },
//         ].map((action, index) => (
//           <TouchableOpacity 
//             key={index}
//             className={`items-center w-[30%] p-3 ${action.bg} rounded-lg shadow-sm border border-gray-100`}
//             activeOpacity={0.8}
//           >
//             <View className={`p-3 mb-2 rounded-full ${action.iconBg}`}>
//               <FontAwesome5 name={action.icon} size={16} className={action.iconColor} />
//             </View>
//             <Text className="text-xs font-medium text-center text-teal-800">{action.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>

//       {/* Healthcare Benefits Section */}
//       <View className="px-6 mb-8">
//         <Animated.View entering={FadeInUp.duration(600).delay(600)}>
//           <Text className="mb-5 text-xl font-bold text-teal-800">
//             Votre couverture myKover+
//           </Text>

//           <View className="flex flex-col space-y-4">
//             {[
//               {
//                 icon: 'heartbeat',
//                 title: 'Soins primaires',
//                 description: 'Consultations générales et soins de base'
//               },
//               {
//                 icon: 'procedures',
//                 title: 'Hospitalisation',
//                 description: 'Prise en charge jusqu\'à 30 jours'
//               },
//               {
//                 icon: 'pills',
//                 title: 'Médicaments',
//                 description: 'Liste des médicaments essentiels couverts'
//               },
//               {
//                 icon: 'ambulance',
//                 title: 'Urgences',
//                 description: 'Prise en charge des urgences 24h/24'
//               },
//             ].map((benefit, index) => (
//               <View 
//                 key={index} 
//                 className="flex-row items-start p-4 mb-3 bg-white border border-gray-100 shadow-sm rounded-xl"
//               >
//                 <View className="p-3 mr-4 bg-teal-100 rounded-full">
//                   <FontAwesome5 name={benefit.icon} size={16} color="#0D9488" />
//                 </View>
//                 <View className="flex-1">
//                   <Text className="font-bold text-teal-800">{benefit.title}</Text>
//                   <Text className="text-gray-600">{benefit.description}</Text>
//                 </View>
//                 <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
//               </View>
//             ))}
//           </View>
//         </Animated.View>
//       </View>

//       {/* Emergency Card - Red for urgency */}
//       <Animated.View 
//         entering={FadeInUp.duration(600).delay(800)}
//         className="px-6 mb-8"
//       >
//         <View className="p-5 border border-red-100 bg-red-50 rounded-xl">
//           <View className="flex-row items-center mb-3">
//             <MaterialIcons name="emergency" size={24} color="#DC2626" />
//             <Text className="ml-3 font-bold text-red-700">Urgence médicale</Text>
//           </View>
//           <Text className="mb-4 text-gray-700">
//             Contactez notre service d'urgence disponible 24h/24
//           </Text>
//           <TouchableOpacity 
//             onPress={handleEmergencyCall}
//             className="py-3 bg-white border border-red-200 rounded-lg"
//             activeOpacity={0.8}
//           >
//             <Text className="font-bold text-center text-red-600">Appeler le 999 999 999</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>

//       {/* Primary CTA - Since user is already logged in */}
//       <Animated.View 
//         entering={FadeInUp.duration(600).delay(1000)}
//         className="px-6"
//       >
//         <View className="p-5 mb-4 bg-white border border-gray-100 shadow-sm rounded-xl">
//           <Text className="mb-3 text-lg font-bold text-center text-teal-800">
//             Votre carte d'assurance
//           </Text>
//           <TouchableOpacity 
//             className="items-center justify-center py-3 bg-teal-600 rounded-lg"
//             activeOpacity={0.8}
//           >
//             <Text className="text-lg font-bold text-white">Afficher ma carte</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Secondary Actions */}
//         <View className="flex-row justify-between">
//           <TouchableOpacity 
//             className="items-center justify-center w-[48%] py-3 border rounded-lg border-teal-600"
//             activeOpacity={0.8}
//           >
//             <Text className="font-bold text-teal-600">Mes remboursements</Text>
//           </TouchableOpacity>
//           <TouchableOpacity 
//             className="items-center justify-center w-[48%] py-3 border rounded-lg border-teal-600"
//             activeOpacity={0.8}
//           >
//             <Text className="font-bold text-teal-600">Mon réseau santé</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     </ScrollView>
//   );
// }

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function HomePublic() {
  const handleEmergencyCall = () => {
    Linking.openURL('tel:+243999999999');
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View className="px-6 pt-12 pb-10 bg-gradient-to-b from-[#22B2DC] to-[#CFF1F9] rounded-b-3xl">
        <Animated.View entering={FadeIn.duration(600)} className="items-center mb-6">
          <Image
            source={require('@/assets/images/myKover+Logo.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <Text className="mb-2 text-2xl font-bold text-center text-black">
            Protection Santé pour Tous
          </Text>
          <Text className="text-lg text-center text-[#22B2DC]">
            Couverture médicale accessible dès 5$/mois
          </Text>
        </Animated.View>
      </View>

      {/* Quick Actions */}
      <Animated.View 
        entering={FadeInDown.duration(600).delay(400)}
        className="flex-row justify-between px-6 mb-8 -mt-8"
      >
        {[
          { icon: 'hospital', label: 'Nos Cliniques' },
          { icon: 'pills', label: 'Pharmacies' },
          { icon: 'user-md', label: 'Médecins' },
        ].map((action, index) => (
          <TouchableOpacity 
            key={index}
            className="items-center w-[30%] p-3 bg-white rounded-lg shadow-sm border border-gray-100"
            activeOpacity={0.8}
          >
            <View className="p-3 mb-2 rounded-full bg-[#E1F6FB]">
              <FontAwesome5 name={action.icon} size={18} color="#22B2DC" />
            </View>
            <Text className="text-xs font-medium text-center text-neutral-800">
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Healthcare Benefits Section */}
      <View className="px-6 mb-8">
        <Animated.View entering={FadeInUp.duration(600).delay(600)}>
          <Text className="mb-5 text-xl font-bold text-neutral-800">
            Votre couverture myKover+
          </Text>

          <View className="flex flex-col space-y-4">
            {[
              {
                icon: 'heartbeat',
                title: 'Soins primaires',
                description: 'Consultations générales et soins de base'
              },
              {
                icon: 'procedures',
                title: 'Hospitalisation',
                description: 'Prise en charge jusqu\'à 30 jours'
              },
              {
                icon: 'pills',
                title: 'Médicaments',
                description: 'Liste des médicaments essentiels couverts'
              },
              {
                icon: 'ambulance',
                title: 'Urgences',
                description: 'Prise en charge des urgences 24h/24'
              },
            ].map((benefit, index) => (
              <View 
                key={index} 
                className="flex-row items-start p-4 mb-3 bg-white border border-gray-100 shadow-sm rounded-xl"
              >
                <View className="p-3 mr-4 rounded-full bg-[#E1F6FB]">
                  <FontAwesome5 name={benefit.icon} size={18} color="#22B2DC" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-neutral-800">{benefit.title}</Text>
                  <Text className="text-gray-600">{benefit.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            ))}
          </View>
        </Animated.View>
      </View>

      {/* Emergency Card */}
      <Animated.View 
        entering={FadeInUp.duration(600).delay(800)}
        className="px-6 mb-8"
      >
        <View className="p-5 border border-red-100 bg-red-50 rounded-xl">
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="emergency" size={24} color="#DC2626" />
            <Text className="ml-3 font-bold text-red-700">Urgence médicale</Text>
          </View>
          <Text className="mb-4 text-gray-700">
            Contactez notre service d'urgence disponible 24h/24
          </Text>
          <TouchableOpacity 
            onPress={handleEmergencyCall}
            className="py-3 bg-white border border-red-200 rounded-lg"
            activeOpacity={0.8}
          >
            <Text className="font-bold text-center text-red-600">
              Appeler le 999 999 999
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Primary CTA */}
      <Animated.View 
        entering={FadeInUp.duration(600).delay(1000)}
        className="px-6"
      >
        <View className="p-5 mb-4 bg-white border border-gray-100 shadow-sm rounded-xl">
          <Text className="mb-3 text-lg font-bold text-center text-neutral-800">
            Votre carte d'assurance
          </Text>
          <TouchableOpacity 
            className="items-center justify-center py-3 bg-[#22B2DC] rounded-lg"
            activeOpacity={0.8}
          >
            <Text className="text-lg font-bold text-white">Afficher ma carte</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Actions */}
        <View className="flex-row justify-between">
          <TouchableOpacity 
            className="items-center justify-center w-[48%] py-3 border rounded-lg border-[#22B2DC]"
            activeOpacity={0.8}
          >
            <Text className="font-bold text-[#22B2DC]">Mes remboursements</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="items-center justify-center w-[48%] py-3 border rounded-lg border-[#22B2DC]"
            activeOpacity={0.8}
          >
            <Text className="font-bold text-[#22B2DC]">Mon réseau santé</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
