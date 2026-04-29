import { Colors } from "@/constants/colors";
import { Pressable, StyleSheet } from "react-native";
import { TextBold } from "./customFont";

type Props = {
  label: string;
  onPress: () => void;
  color?: string;
};

export default function Button({
  label,
  onPress,
  color = Colors.accent,
}: Props) {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <TextBold style={styles.text}>{label}</TextBold>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
