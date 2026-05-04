import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import OnboardingScreen from "../app/index"; // Sesuaikan path ini dengan letak file OnboardingScreen kamu

// Mock font agar tidak menyebabkan asinkron yang lama
jest.mock("@expo-google-fonts/plus-jakarta-sans", () => ({
  useFonts: () => [true, null],
}));

describe("OnboardingScreen", () => {
  it("berpindah ke halaman berikutnya saat Next ditekan", async () => {
    const { findAllByText, getByText } = render(<OnboardingScreen />);

    // Mengambil semua elemen dengan teks "Next" dan pilih yang pertama
    const nextButtons = await findAllByText("Next");
    fireEvent.press(nextButtons[0]);

    // Tunggu perubahan UI terjadi
    await waitFor(() => {
      // Sesuaikan regex ini dengan teks di halaman kedua onboarding kamu
      expect(getByText(/Kenali mood/i)).toBeTruthy();
    });
  });
});
