// File: moodBites/app/auth/index.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/colors"; // Pastikan path ini sesuai

// Import Komponen Reusable
import AuthHeader from "../../components/ui/authheader";
import AuthToggle from "../../components/ui/authtoggle";
import InputField from "../../components/ui/inputfield";
import PrimaryButton from "../../components/ui/button";
import { TextBold, TextMedium } from "@/components/ui/customFont";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  // State untuk menyimpan input data (Persiapan untuk integrasi)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Proses Login dengan:", email, password);
    } else {
      console.log("Proses Register dengan:", name, email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
              autoCapitalize="none"
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

          <PrimaryButton label="Enter the Hearth" onPress={handleSubmit} />

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
  screenTitle: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "PlusJakartaSans-Bold",
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 50,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 10,
    top: 10,
    color: Colors.optionalAccent + "99",
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "PlusJakartaSans-Medium",
  },
  linkText: {
    fontSize: 10,
    color: Colors.optionalAccent,
    fontFamily: "PlusJakartaSans-Bold",
  },
});
