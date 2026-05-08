import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OnboardingScreen from "../app/index"; // Sesuaikan path ini dengan letak file OnboardingScreen kamu

jest.mock("@expo-google-fonts/plus-jakarta-sans", () => ({
  useFonts: () => [true, null], // [loaded, error]
}));

it("berpindah ke halaman berikutnya saat Next ditekan", async () => {
  // 1. Tambahkan findAllByText di sini
  const { findByText, findAllByText } = render(<OnboardingScreen />);

  // 2. Benar-benar gunakan findAllByText
  const nextButtons = await findAllByText("Next");
  fireEvent.press(nextButtons[0]); // Klik tombol Next di slide pertama

  // 3. Pengecekan slide berikutnya.
  // Catatan: findByText sudah otomatis menunggu elemen muncul,
  // jadi kita tidak perlu membungkusnya lagi dengan waitFor()
  const nextScreenText = await findByText(/Kenali mood/i);
  expect(nextScreenText).toBeTruthy();
});
