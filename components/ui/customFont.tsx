// components/ui/Typography.tsx
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

// Bikin wrapper untuk Text Regular
export function TextRegular(props: TextProps) {
  return (
    <Text {...props} style={[styles.regular, props.style]}>
      {props.children}
    </Text>
  );
}
export function TextRegularItalic(props: TextProps) {
  return (
    <Text {...props} style={[styles.regularitalic, props.style]}>
      {props.children}
    </Text>
  );
}

export function TextMedium(props: TextProps) {
  return (
    <Text {...props} style={[styles.medium, props.style]}>
      {props.children}
    </Text>
  );
}
export function TextMediumItalic(props: TextProps) {
  return (
    <Text {...props} style={[styles.mediumitalic, props.style]}>
      {props.children}
    </Text>
  );
}
export function TextSemiBold(props: TextProps) {
  return (
    <Text {...props} style={[styles.semibold, props.style]}>
      {props.children}
    </Text>
  );
}
export function TextSemiBoldItalic(props: TextProps) {
  return (
    <Text {...props} style={[styles.semibolditalic, props.style]}>
      {props.children}
    </Text>
  );
}

// Bikin wrapper untuk Text Bold
export function TextBold(props: TextProps) {
  return (
    <Text {...props} style={[styles.bold, props.style]}>
      {props.children}
    </Text>
  );
}
export function TextBoldItalic(props: TextProps) {
  return (
    <Text {...props} style={[styles.bolditalic, props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: "PlusJakartaSans_400Regular",
  },
  regularitalic: {
    fontFamily: "PlusJakartaSans_400Regular_Italic",
  },
  medium: {
    fontFamily: "PlusJakartaSans_500Medium",
  },
  mediumitalic: {
    fontFamily: "PlusJakartaSans_500Medium_Italic",
  },
  semibold: {
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  semibolditalic: {
    fontFamily: "PlusJakartaSans_600SemiBold_Italic",
  },
  bold: {
    fontFamily: "PlusJakartaSans_700Bold",
  },
  bolditalic: {
    fontFamily: "PlusJakartaSans_700Bold_Italic",
  },
});
