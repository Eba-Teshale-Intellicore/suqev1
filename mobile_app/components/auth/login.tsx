import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Colors } from "@/constants/src/theme/colors";
import { Radius } from "@/constants/src/theme/radius";

const API_URL = "http://192.168.0.127:8000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/accounts/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.detail ||
          data?.message ||
          Object.values(data || {})
            .flat()
            .join("\n") ||
          "Invalid email or password.";

        throw new Error(String(message));
      }

      /*
       * TODO:
       * Save data.access and data.refresh
       * to Expo SecureStore.
       *
       * Then connect the global auth store.
       */

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert(
        "Login failed",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.logo}>suqe</Text>

          <Text style={styles.title}>Welcome back</Text>

          <Text style={styles.subtitle}>
            Login to continue buying and selling on Suqe.
          </Text>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <Pressable onPress={() => setShowPassword((value) => !value)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={21}
                  color={Colors.textMuted}
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={styles.forgotButton}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Text style={styles.link}>Forgot password?</Text>
          </Pressable>

          <Pressable
            style={[styles.primaryButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.primaryButtonText}>Login</Text>
            )}
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.mutedText}>Don't have an account?</Text>

            <Pressable onPress={() => router.push("/(auth)/signup")}>
              <Text style={styles.link}> Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mediaBackground,
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.darkSurface,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 40,
    marginBottom: 34,
  },
  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.SIRA,
    marginBottom: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  form: {
    gap: 18,
  },
  label: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 54,
    backgroundColor: Colors.darkSurface,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    color: Colors.text,
    fontSize: 15,
  },
  passwordContainer: {
    height: 54,
    backgroundColor: Colors.darkSurface,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
    marginRight: 10,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -8,
  },
  primaryButton: {
    height: 54,
    borderRadius: Radius.md,
    backgroundColor: Colors.SIRA,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "800",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  mutedText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  link: {
    color: Colors.SIRA,
    fontSize: 14,
    fontWeight: "700",
  },
});
