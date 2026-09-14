import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/constants/src/auth/AuthContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 2,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* Auth */}
            <Stack.Screen name="(auth)" />

            {/* Main App */}
            <Stack.Screen name="(tabs)" />

            {/* Auth Gate */}
            <Stack.Screen name="index" />

            {/* Listing Detail */}
            <Stack.Screen name="listing/[id]" />

            {/* Modal */}
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Modal",
              }}
            />
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
