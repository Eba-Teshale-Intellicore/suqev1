import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "@/constants/src/auth/AuthContext";

export default function AuthGate() {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "authenticated") {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/signup" />;
}
