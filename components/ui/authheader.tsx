import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { TextBoldItalic } from "./customFont";

export default function AuthHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoCircle}>
        <Ionicons name="restaurant-outline" size={32} color={Colors.white} />
      </View>
      <Text style={styles.brandName}>MoodBites</Text>
      <TextBoldItalic style={styles.tagline}>
        Feeding your mood, one bite at a time.
      </TextBoldItalic>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoCircle: {
    width: 70,
    height: 70,
    backgroundColor: Colors.accent,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  brandName: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.textAccent,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans-BoldItalic",
    color: Colors.optionalAccent + "CC",
    marginBottom: 3,
  },
});
