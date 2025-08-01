import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingScreens } from '../lib/onboardingData';

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = async () => {
    if (currentIndex < onboardingScreens.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(prev => prev + 1);
    } else {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/login'); // change this to your login screen route
    }
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        ref={flatListRef}
        data={onboardingScreens}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View className="items-center justify-center w-full px-6" style={{ width }}>
            <Image source={item.image} className="mb-8 w-72 h-72" resizeMode="contain" />
            <Text className="text-2xl font-bold text-center text-blue-600">{item.title}</Text>
            <Text className="mt-4 text-base text-center text-gray-600">{item.description}</Text>
          </View>
        )}
      />

      {/* Navigation Button */}
      <View className="absolute items-center w-full px-6 bottom-16">
        <TouchableOpacity
          onPress={handleNext}
          className="w-full px-6 py-3 bg-blue-600 rounded-full"
        >
          <Text className="text-lg font-semibold text-center text-white">
            {currentIndex === onboardingScreens.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
