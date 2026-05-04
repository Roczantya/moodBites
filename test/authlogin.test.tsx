import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import AuthScreen from "../app/auth/index";
import { router } from "expo-router";

// 1. Mocking expo-router dengan struktur yang benar
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  useLocalSearchParams: jest.fn(() => ({})),
}));

// 2. Mocking icons agar tidak error saat render komponen
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  MaterialIcons: "MaterialIcons",
  Feather: "Feather",
}));

describe("AuthScreen Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("harus menampilkan form login secara default", () => {
    const { getByText, queryByPlaceholderText } = render(<AuthScreen />);

    // Cek apakah tombol bertuliskan Enter the Hearth (Mode Login)
    expect(getByText("Enter the Hearth")).toBeTruthy();

    // Pastikan input NAMA tidak muncul saat login
    expect(queryByPlaceholderText("Sarah")).toBeNull();
  });

  it("harus menampilkan kolom NAMA saat pindah ke mode Register", () => {
    const { getByText, getByPlaceholderText } = render(<AuthScreen />);

    // Cari toggle register dan klik
    const registerToggle = getByText("Register");
    fireEvent.press(registerToggle);

    // Sekarang kolom NAMA harusnya muncul
    expect(getByPlaceholderText("Sarah")).toBeTruthy();
    // Tombol harusnya berubah
    expect(getByText("Join the Hearth")).toBeTruthy();
  });

  it("harus menampilkan pesan error jika format email salah", () => {
    const { getByText, getByPlaceholderText } = render(<AuthScreen />);

    const emailInput = getByPlaceholderText("hello@moodbites.com");
    const loginButton = getByText("Enter the Hearth");

    // Masukkan email yang salah format
    fireEvent.changeText(emailInput, "emailngasal");
    fireEvent.press(loginButton);

    // Cek apakah pesan error muncul
    expect(getByText("Format email tidak valid")).toBeTruthy();
    // Pastikan router.push tidak dipanggil
    expect(router.push).not.toHaveBeenCalled();
  });

  it("harus menampilkan pesan error jika password kurang dari 6 karakter", () => {
    const { getByText, getByPlaceholderText } = render(<AuthScreen />);

    const passwordInput = getByPlaceholderText("••••••••");
    const loginButton = getByText("Enter the Hearth");

    // Masukkan password pendek
    fireEvent.changeText(passwordInput, "123");
    fireEvent.press(loginButton);

    expect(getByText("Password minimal 6 karakter")).toBeTruthy();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("harus navigasi ke /auth/firstsurvey saat login berhasil", async () => {
    const { getByText, getByPlaceholderText } = render(<AuthScreen />);

    // Isi email dan password yang valid
    fireEvent.changeText(
      getByPlaceholderText("hello@moodbites.com"),
      "valid@email.com",
    );
    fireEvent.changeText(getByPlaceholderText("••••••••"), "password123");

    const loginButton = getByText("Enter the Hearth");

    // Gunakan act untuk membungkus aksi yang memicu state atau navigasi
    await act(async () => {
      fireEvent.press(loginButton);
    });

    // Cek pada objek router yang sudah di-mock
    expect(router.push).toHaveBeenCalledWith("/auth/firstsurvey");
  });

  it("harus navigasi ke /auth/otp saat register berhasil", async () => {
    const { getByText, getByPlaceholderText } = render(<AuthScreen />);

    // Pindah ke mode register
    fireEvent.press(getByText("Register"));

    // Isi form register
    fireEvent.changeText(getByPlaceholderText("Sarah"), "Sarah");
    fireEvent.changeText(
      getByPlaceholderText("hello@moodbites.com"),
      "register@email.com",
    );
    fireEvent.changeText(getByPlaceholderText("••••••••"), "password123");

    const registerButton = getByText("Join the Hearth");

    await act(async () => {
      fireEvent.press(registerButton);
    });

    // Cek apakah router.push dipanggil ke rute OTP
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/auth/otp",
      params: { email: "register@email.com" },
    });
  });
});
