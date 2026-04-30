import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AuthScreen from "../app/auth/index";

// 1. Mocking expo-router supaya tes tidak error saat panggil router.push
const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  router: {
    push: mockPush,
  },
}));

describe("AuthScreen Testing", () => {
  it("harus menampilkan form login secara default", () => {
    const { getByText, queryByPlaceholderText } = render(<AuthScreen />);

    // Cek apakah tombol bertuliskan Enter the Hearth (Mode Login)
    expect(getByText("Enter the Hearth")).toBeTruthy();

    // Pastikan input NAMA tidak muncul saat login
    expect(queryByPlaceholderText("Sarah")).toBeNull();
  });

  it("harus menampilkan kolom NAMA saat pindah ke mode Register", () => {
    const { getByText, getByPlaceholderText } = render(<AuthScreen />);

    // Cari toggle register dan klik (Sesuaikan teks ini dengan isi AuthToggle kamu)
    const registerToggle = getByText("Register");
    fireEvent.press(registerToggle);

    // Sekarang kolom NAMA harusnya muncul
    expect(getByPlaceholderText("Sarah")).toBeTruthy();
    // Tombol harusnya berubah
    expect(getByText("Join the Hearth")).toBeTruthy();
  });

  it("harus navigasi ke /auth/firstsurvey saat login berhasil", () => {
    const { getByText } = render(<AuthScreen />);

    const loginButton = getByText("Enter the Hearth");
    fireEvent.press(loginButton);

    // Cek apakah router.push dipanggil dengan rute survey
    expect(mockPush).toHaveBeenCalledWith("/auth/firstsurvey");
  });

  it("harus navigasi ke /auth/otp saat register berhasil", () => {
    const { getByText } = render(<AuthScreen />);

    // Pindah ke mode register dulu
    fireEvent.press(getByText("Register"));

    const registerButton = getByText("Join the Hearth");
    fireEvent.press(registerButton);

    // Cek apakah router.push dipanggil dengan rute OTP
    expect(mockPush).toHaveBeenCalledWith("/auth/otp");
  });
});
