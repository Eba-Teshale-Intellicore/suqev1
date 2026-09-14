// app/(auth)/signup.tsx

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
import { Typography } from "@/constants/src/theme/typography";

const API_URL = "http://192.168.0.127:8000";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username.trim() || !displayName.trim() || !email.trim()) {
      Alert.alert("Missing information", "Please fill in all required fields.");
      return;
    }

    if (!password || password.length < 8) {
      Alert.alert(
        "Invalid password",
        "Password must be at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/accounts/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          display_name: displayName.trim(),
          email: email.trim().toLowerCase(),
          password,
          password_confirm: confirmPassword,
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
          "Unable to create your account.";

        throw new Error(String(message));
      }

      Alert.alert(
        "Account created",
        "Your Suqe account has been created successfully.",
        [
          {
            text: "Login",
            onPress: () => router.replace("/(auth)/login"),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "Signup failed",
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
          <Ionicons name="arrow-back" size={22} color={Colors.textMuted} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.logo}>suqe</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Create your account and start buying and selling on Suqe.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Choose a username"
            autoCapitalize="none"
          />

          <Input
            label="Display name"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Your display name"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View>
            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
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

          <View>
            <Text style={styles.label}>Confirm password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />

              <Pressable
                onPress={() => setShowConfirmPassword((value) => !value)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={21}
                  color={Colors.textMuted}
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={[styles.primaryButton, loading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.primaryButtonText}>Create Account</Text>
            )}
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.mutedText}>Already have an account?</Text>

            {/* <Pressable onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.link}> Login</Text>
            </Pressable> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = "sentences",
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences";
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
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
    marginTop: 32,
    marginBottom: 30,
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
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
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
