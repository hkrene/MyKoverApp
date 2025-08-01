// import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
// import { useState, useRef } from 'react';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { onboardingScreens } from '../lib/onboardingData';

// const { width } = Dimensions.get('window');

// export default function Onboarding() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef<FlatList>(null);
//   const router = useRouter();

//   const handleNext = async () => {
//     if (currentIndex < onboardingScreens.length - 1) {
//       flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
//       setCurrentIndex(prev => prev + 1);
//     } else {
//       await AsyncStorage.setItem('hasSeenOnboarding', 'true');
//       router.replace('/login'); // change this to your login screen route
//     }
//   };

//   return (
//     <View className="flex-1 bg-white">
//       <FlatList
//         ref={flatListRef}
//         data={onboardingScreens}
//         keyExtractor={(_, index) => index.toString()}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         scrollEnabled={false}
//         renderItem={({ item }) => (
//           <View className="items-center justify-center w-full px-6" style={{ width }}>
//             <Image source={item.image} className="mb-8 w-72 h-72" resizeMode="contain" />
//             <Text className="text-2xl font-bold text-center text-blue-600">{item.title}</Text>
//             <Text className="mt-4 text-base text-center text-gray-600">{item.description}</Text>
//           </View>
//         )}
//       />

//       {/* Navigation Button */}
//       <View className="absolute items-center w-full px-6 bottom-16">
//         <TouchableOpacity
//           onPress={handleNext}
//           className="w-full px-6 py-3 bg-blue-600 rounded-full"
//         >
//           <Text className="text-lg font-semibold text-center text-white">
//             {currentIndex === onboardingScreens.length - 1 ? 'Get Started' : 'Next'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
import {
      View,
      Text,
      Image,
      Dimensions,
      TouchableOpacity,
      Animated,
    } from 'react-native';
    import { useState, useRef } from 'react';
    import { useRouter } from 'expo-router';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { onboardingScreens } from '../lib/onboardingData';
    
    const { width } = Dimensions.get('window');
    
    export default function Onboarding() {
      const [currentIndex, setCurrentIndex] = useState(0);
      const router = useRouter();
      const scrollX = useRef(new Animated.Value(0)).current;
      const flatListRef = useRef<Animated.FlatList>(null);
    
      const handleNext = async () => {
        if (currentIndex < onboardingScreens.length - 1) {
          flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
          setCurrentIndex((prev) => prev + 1);
        } else {
          await AsyncStorage.setItem('hasSeenOnboarding', 'true');
          router.replace('/login');
        }
      };
    
      const handleSkip = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        router.replace('/login');
      };
    
      return (
        <View className="flex-1 bg-white">
          {/* Skip Button */}
          <TouchableOpacity
            onPress={handleSkip}
            className="absolute z-10 top-16 right-6"
          >
            <Text className="text-base font-semibold text-blue-600">Skip</Text>
          </TouchableOpacity>
    
          {/* Onboarding Slides */}
          <Animated.FlatList
            ref={flatListRef}
            data={onboardingScreens}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
              <View className="items-center justify-center px-6" style={{ width }}>
                <Animated.View
                  style={{
                    opacity: scrollX.interpolate({
                      inputRange: [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                      ],
                      outputRange: [0, 1, 0],
                      extrapolate: 'clamp',
                    }),
                    transform: [
                      {
                        scale: scrollX.interpolate({
                          inputRange: [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width,
                          ],
                          outputRange: [0.9, 1, 0.9],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  }}
                >
                  <Image
                    source={item.image}
                    className="w-64 h-64 mb-10"
                    resizeMode="contain"
                  />
                </Animated.View>
    
                <Text className="mb-4 text-3xl font-bold text-center text-blue-800">
                  {item.title}
                </Text>
                <Text className="text-base leading-relaxed text-center text-gray-600">
                  {item.description}
                </Text>
              </View>
            )}
          />
    
          {/* Progress Indicators */}
          <View className="flex-row justify-center mt-8 mb-4">
            {onboardingScreens.map((_, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
    
              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 24, 8],
                extrapolate: 'clamp',
              });
    
              const backgroundColor = scrollX.interpolate({
                inputRange,
                outputRange: ['#D1D5DB', '#2563EB', '#D1D5DB'],
                extrapolate: 'clamp',
              });
    
              return (
                <Animated.View
                  key={index}
                  style={{
                    width: dotWidth,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor,
                    marginHorizontal: 4,
                  }}
                />
              );
            })}
          </View>
    
          {/* CTA Section */}
          <View className="px-6 mb-10">
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.9}
              className="py-4 bg-blue-600 rounded-full shadow-md"
            >
              <Text className="text-lg font-bold text-center text-white">
                {currentIndex === onboardingScreens.length - 1
                  ? "Join MyKover Plus Now"
                  : 'Next'}
              </Text>
            </TouchableOpacity>
    
            {currentIndex === onboardingScreens.length - 1 && (
              <TouchableOpacity
                onPress={handleSkip}
                className="mt-4"
                activeOpacity={0.8}
              >
                <Text className="text-base font-medium text-center text-blue-500 underline">
                  Already protected? Log in to manage your health cover →
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
    