import { Stack } from "expo-router";
import { AppSettingsProvider } from "../context/AppSettingsContext";

export default function RootLayout() {
  return (
    <AppSettingsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AppSettingsProvider>
  );
}
