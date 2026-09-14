// app/(auth)/reset-password.tsx
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/src/theme/colors";
import { Radius } from "@/constants/src/theme/radius";
import { Typography } from "@/constants/src/theme/typography";

export default function ResetPassword() {
  const { email, token } = useLocalSearchParams<{
    email?: string;
    token?: string;
  }>();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert(
        "Missing information",
        "Please enter and confirm your new password.",
      );
      return;
    }

    if (password.length < 8) {
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

    if (!token) {
      Alert.alert(
        "Verification required",
        "Please request a new password reset before creating a new password.",
      );
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * This should eventually call your
       * secure backend reset endpoint.
       *
       * Example:
       *
       * POST /api/accounts/password/reset/confirm/
       *
       * {
       *   "token": "...",
       *   "password": "...",
       *   "password_confirm": "..."
       * }
       *
       * The backend must verify the token
       * before changing the password.
       */

      Alert.alert(
        "Password reset",
        "Your password has been reset successfully.",
        [
          {
            text: "Back to login",
            onPress: () => router.replace("/(auth)/login"),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "Reset failed",
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
          <Ionicons name="arrow-back" size={21} color={Colors.textPrimary} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.logo}>suqe</Text>

          <Text style={styles.title}>Reset password</Text>

          <Text style={styles.subtitle}>
            Create a new password for your Suqe account.
          </Text>

          {email ? <Text style={styles.email}>{email}</Text> : null}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>New password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter new password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Pressable
                onPress={() => setShowPassword((value) => !value)}
                hitSlop={8}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={21}
                  color={Colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Confirm new password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Pressable
                onPress={() => setShowConfirmPassword((value) => !value)}
                hitSlop={8}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={21}
                  color={Colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={[styles.primaryButton, loading && styles.disabledButton]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Reset Password</Text>
            )}
          </Pressable>

          <Pressable
            style={styles.loginButton}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.link}>Back to login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    marginTop: 28,
    marginBottom: 28,
  },

  logo: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: 18,
  },

  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },

  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    marginTop: 10,
    maxWidth: 360,
  },

  email: {
    ...Typography.bodyMedium,
    color: Colors.primary,
    marginTop: 12,
  },

  form: {
    gap: 16,
  },

  label: {
    ...Typography.label,
    color: Colors.textPrimary,
    marginBottom: 7,
  },

  passwordContainer: {
    height: 52,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    color: Colors.textPrimary,
    ...Typography.bodyLarge,
    marginRight: 10,
  },

  primaryButton: {
    height: 54,
    borderRadius: Radius.md,
    backgroundColor: Colors.buttonPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  disabledButton: {
    opacity: 0.55,
  },

  primaryButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingVertical: 8,
  },

  link: {
    ...Typography.button,
    color: Colors.primary,
  },
});
