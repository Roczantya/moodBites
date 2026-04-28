import { useState } from 'react';
import { router } from 'expo-router';
import OnboardingItem from '@/components/onboardingItem';
import { onboardingData } from '@/constants/onBoarding';

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < onboardingData.length - 1) {
      setIndex(index + 1);
    } else {
      // pindah ke home
      router.replace('/login');
    }
  };

  return (
    <OnboardingItem
      {...onboardingData[index]}
      onNext={handleNext}
      isLast={index === onboardingData.length - 1}
    />
  );
}