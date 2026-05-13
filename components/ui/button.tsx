import React from "react";
import { Pressable, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Colors } from "@/constants/colors"; // Sesuaikan path constants kamu
import { TextBold } from "../../constants/customFont";

type ButtonVariant = "primary" | "accent" | "outline";

type Props = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle; // Untuk override style container jika butuh mendadak
  textStyle?: TextStyle; // Untuk override style teks
};

export default function Button({
  label,
  onPress,
  variant = "accent", // Default-nya pakai style accent kamu yang lama
  style,
  textStyle,
}: Props) {
  // Gabungkan style berdasarkan variant
  const buttonStyles = [
    styles.baseButton,
    variant === "primary" && styles.primaryButton,
    variant === "accent" && styles.accentButton,
    style, // Custom style dari luar
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && { opacity: 0.7 }, // Efek feedback seperti TouchableOpacity
      ]}
      onPress={onPress}
    >
      <TextBold style={[styles.baseText, textStyle]}>{label}</TextBold>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  // Style Button lama kamu (Accent)
  accentButton: {
    padding: 14,
    borderRadius: 50,
    backgroundColor: Colors.accent,
  },
  // Style PrimaryButton (Figma style)
  primaryButton: {
    height: 55,
    borderRadius: 50,
    backgroundColor: Colors.primary || "#FF949A", // Pastikan Colors.primary ada
    bottom: 10,
    // Efek Shadow/Elevation
    shadowColor: Colors.primary || "#FF949A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  baseText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
  },
});
