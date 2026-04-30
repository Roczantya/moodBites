// File: moodBites/app/auth/index.tsx
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const [showToast, setShowToast] = useState(false); // State untuk notif inline

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Proses Login...");
      router.push("/auth/firstsurvey");
    } else {
      // 1. Munculkan notifikasi
      setShowToast(true);

      // 2. Tunggu 2 detik, lalu pindah halaman
      setTimeout(() => {
        setShowToast(false);
        router.push("/auth/otp");
      }, 2500);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* NOTIFIKASI INLINE (TOAST) */}
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

          <AuthToggle isLogin={isLogin} onToggle={setIsLogin} />

          <View style={styles.formContainer}>
            {!isLogin && (
              <InputField
                label="NAMA"
                icon="person-outline"
                placeholder="Sarah"
                value={name}
                onChangeText={setName}
              />
            )}

            <InputField
              label="EMAIL ADDRESS"
              icon="mail-outline"
              placeholder="hello@moodbites.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <InputField
              label="PASSWORD"
              icon="lock-closed-outline"
              placeholder="••••••••"
              isPassword={true}
              value={password}
              onChangeText={setPassword}
            />
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
  // STYLING NOTIFIKASI (TOAST)
  toastContainer: {
    position: "absolute",
    bottom: 30, // Muncul di atas layar
    left: 20,
    right: 20,
    backgroundColor: "#A0D585", // Warna hijau sukses
    padding: 15,
    borderRadius: 5,
    zIndex: 100, // Supaya berada di paling depan
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
