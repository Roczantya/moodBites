// File: moodBites/app/auth/index.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text, // Pastikan Text di-import
} from "react-native";
import { Colors } from "../../constants/colors";
import AuthHeader from "../../components/ui/authheader";
import AuthToggle from "../../components/ui/authtoggle";
import InputField from "../../components/ui/inputfield";
import PrimaryButton from "../../components/ui/button";
import { TextBold, TextMedium, TextSemiBold } from "@/components/ui/customFont";
import { router } from "expo-router";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // --- PEMPERBAIKAN 1: Bungkus logika dalam fungsi validate ---
  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" }; // Deklarasikan variabel

    if (!isLogin && name.trim().length < 2) {
      newErrors.name = "Nama minimal terdiri dari 2 karakter";
      valid = false;
    }

    // Validasi Email (Regex sederhana)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Format email tidak valid";
      valid = false;
    }

    // Validasi Password (minimal 6 karakter)
    if (password.length < 6) {
      newErrors.password = "Password minimal harus 6 karakter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // --- PEMPERBAIKAN 2: Masukkan handleSubmit ke dalam komponen ---
  const handleSubmit = () => {
    if (!validate()) return; // Jalankan validator

    if (isLogin) {
      console.log("Proses Login...");
      router.push("/auth/firstsurvey");
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/auth/otp");
      }, 2500);
    }
  };

  // --- PEMPERBAIKAN 3: Return JSX harus di dalam fungsi AuthScreen ---
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {showToast && (
        <View style={styles.toastContainer}>
          <TextSemiBold style={styles.toastText}>
            ✓ Registrasi Berhasil! Kode OTP sedang dikirim...
          </TextSemiBold>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <AuthHeader />

          <AuthToggle
            isLogin={isLogin}
            onToggle={(val) => {
              setIsLogin(val);
              setErrors({ name: "", email: "", password: "" });
            }}
          />

          <View style={styles.formContainer}>
            {!isLogin && (
              <View style={styles.inputWrapper}>
                <InputField
                  label="NAMA"
                  icon="person-outline"
                  placeholder="Sarah"
                  value={name}
                  onChangeText={setName}
                />
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>
            )}

            <View style={styles.inputWrapper}>
              <InputField
                label="EMAIL ADDRESS"
                icon="mail-outline"
                placeholder="hello@moodbites.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputWrapper}>
              <InputField
                label="PASSWORD"
                icon="lock-closed-outline"
                placeholder="••••••••"
                isPassword={true}
                value={password}
                onChangeText={setPassword}
              />
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>
          </View>

          <PrimaryButton
            label={isLogin ? "Enter the Hearth" : "Join the Hearth"}
            onPress={handleSubmit}
          />

          <TextMedium style={styles.footerText}>
            By signing in, you agree to our{" "}
            <TextBold style={styles.linkText}>Terms</TextBold> and{" "}
            <TextBold style={styles.linkText}>Privacy Policy</TextBold>
          </TextMedium>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 50,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },
  formContainer: {
    width: "100%",
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  errorText: {
    color: "#FF9494", // Warna aksen Moodbites kamu
    fontSize: 11,
    marginTop: 5,
    marginLeft: 15,
    fontFamily: "PlusJakartaSans-Medium",
  },
  footerText: {
    fontSize: 12,
    top: 15,
    color: Colors.optionalAccent + "99",
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "PlusJakartaSans-Medium",
  },
  linkText: {
    fontSize: 12,
    color: Colors.optionalAccent,
    fontFamily: "PlusJakartaSans-Bold",
  },
  toastContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#A0D585",
    padding: 15,
    borderRadius: 5,
    zIndex: 100,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  toastText: {
    color: Colors.textAccent + "CC",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "PlusJakartaSans-SemiBold",
  },
});
