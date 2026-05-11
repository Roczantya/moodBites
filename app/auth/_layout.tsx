import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        // Ini kunci untuk menghilangkan bar putih di atas
        headerShown: false,
        contentStyle: { backgroundColor: "#FDF6ED" }, // Agar background krem merata
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="firstsurvey" />
    </Stack>
  );
}
