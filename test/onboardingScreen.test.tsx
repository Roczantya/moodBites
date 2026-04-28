import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardingScreen from '../app/onboarding/onboardingScreen';

describe('OnboardingScreen', () => {
  it('berpindah ke halaman berikutnya saat Next ditekan', () => {
    const { getByText } = render(<OnboardingScreen />);

    // klik next pertama
    fireEvent.press(getByText('Next'));

    // cek apakah pindah ke halaman berikutnya
    expect(getByText(/Kenali mood/i)).toBeTruthy();
  });
});

