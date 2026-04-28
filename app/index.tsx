import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import OnboardingItem from '@/components/onboardingItem';
import { onboardingData } from '@/constants/onBoarding';
import { useThemeFonts } from '@/hooks/useThemeFonts';

// Tahan splash screen agar tidak hilang otomatis
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [index, setIndex] = useState(0);
  const { fontsLoaded, fontError } = useThemeFonts();

  useEffect(() => {
    // Cek apakah font sudah selesai load atau ada error
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const handleNext = () => {
    if (index < onboardingData.length - 1) {
      setIndex(index + 1);
    } else {
      router.replace('/login');
    }
  };

  // SANGAT PENTING: Jika font belum siap, jangan render UI dulu
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <OnboardingItem
      {...onboardingData[index]}
      onNext={handleNext}
      isLast={index === onboardingData.length - 1}
    />
  );
}