// app/_layout.tsx
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold, // Kamu pakai "Medium" di linkText
} from "@expo-google-fonts/plus-jakarta-sans";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // NAMA DI SEBELAH KIRI INI ADALAH KUNCINYA
    "PlusJakartaSans-Regular": PlusJakartaSans_400Regular,
    "PlusJakartaSans-Bold": PlusJakartaSans_700Bold,
    "PlusJakartaSans-Medium": PlusJakartaSans_500Medium,
    "PlusJakartaSans-SemiBold": PlusJakartaSans_600SemiBold,
  });
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Menggunakan screenOptions di atas akan otomatis 
         menyembunyikan header untuk SEMUA halaman. 
         Ini cara paling aman.
      */}
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}
