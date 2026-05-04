import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import OnboardingScreen from "../app/index"; // Sesuaikan path ini dengan letak file OnboardingScreen kamu

jest.mock("@expo-google-fonts/plus-jakarta-sans", () => ({
  useFonts: () => [true, null], // [loaded, error]
}));

// Dalam test case kamu:
it("berpindah ke halaman berikutnya saat Next ditekan", async () => {
  const { findByText } = render(<OnboardingScreen />);

  // Gunakan findByText (pake await) supaya dia nunggu font/loading beres
  const nextButton = await findByText("Next");
  fireEvent.press(nextButton);

  // Gunakan waitFor untuk pengecekan berikutnya
  await waitFor(() => {
    expect(findByText(/Kenali mood/i)).toBeTruthy();
  });
});
