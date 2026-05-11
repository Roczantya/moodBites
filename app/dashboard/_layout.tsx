import { Stack } from "expo-router";

export default function Homelayout() {
  return (
    <Stack
      screenOptions={{
        // Ini kunci untuk menghilangkan bar putih di atas
        headerShown: false,
        contentStyle: { backgroundColor: "#FDF6ED" }, // Agar background krem merata
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="nfc" />
      <Stack.Screen name="profil" />
    </Stack>
  );
}
