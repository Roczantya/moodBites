// moodBites/components/onboardingItem.tsx

import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { TextBold, TextRegular } from "./ui/customFont";
import Button from "./ui/button";
interface Props {
  image: any; // Adjust type as needed, e.g., ImageSourcePropType
  title: string;
  description: string;
  backgroundColor?: string;
  onNext: () => void;
  isLast: boolean;
}
export default function OnboardingItem({
  image,
  title,
  description,
  backgroundColor,
  onNext,
  isLast,
}: Props) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Container Konten: Menarik semua ke tengah vertikal */}
      <View style={styles.contentContainer}>
        <Image source={image} style={styles.image} />
        <TextBold style={styles.title}>{title}</TextBold>
        <TextRegular style={styles.desc}>{description}</TextRegular>
      </View>

      {/* Container Tombol: Berada di bawah konten */}
      <View style={styles.buttonContainer}>
        <Button label={isLast ? "Mulai" : "Next"} onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 100, // Beri ruang agar tidak menabrak pagination
  },
  contentContainer: {
    flex: 1, // Mengambil sisa ruang agar konten di tengah
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  desc: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 20,
  },
});
