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
      {/* ================================================== */}
      {/* FIXED HEADER */}
      {/* ================================================== */}

      <View style={styles.fixedHeader}>
        {/* BACK BUTTON */}

        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={() => router.back()}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={21} color={Colors.textPrimary} />
        </Pressable>

        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>suqe</Text>
          </View>

          <Text style={styles.title}>Reset password</Text>

          <Text style={styles.subtitle}>
            Create a new password for your Suqe account.
          </Text>

          {email ? (
            <View style={styles.emailContainer}>
              <Ionicons name="mail-outline" size={16} color={Colors.primary} />

              <Text style={styles.email}>{email}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* ================================================== */}
      {/* SCROLLABLE FORM */}
      {/* ================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        <View style={styles.form}>
          {/* NEW PASSWORD */}

          <View style={styles.field}>
            <Text style={styles.label}>New password</Text>

            <View style={styles.passwordContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textMuted}
                style={styles.passwordIcon}
              />

              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter new password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="next"
              />

              <Pressable
                style={({ pressed }) => [
                  styles.eyeButton,
                  pressed && styles.eyeButtonPressed,
                ]}
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

            <Text style={styles.fieldHint}>Use at least 8 characters.</Text>
          </View>

          {/* CONFIRM PASSWORD */}

          <View style={styles.field}>
            <Text style={styles.label}>Confirm new password</Text>

            <View style={styles.passwordContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textMuted}
                style={styles.passwordIcon}
              />

              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="done"
                onSubmitEditing={handleResetPassword}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.eyeButton,
                  pressed && styles.eyeButtonPressed,
                ]}
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

          {/* RESET PASSWORD */}

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              loading && styles.disabledButton,
              pressed && !loading && styles.primaryButtonPressed,
            ]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContent}>
                <ActivityIndicator color={Colors.white} size="small" />

                <Text style={styles.primaryButtonText}>
                  Resetting password...
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Reset password</Text>

                <Ionicons name="arrow-forward" size={19} color={Colors.white} />
              </>
            )}
          </Pressable>

          {/* BACK TO LOGIN */}

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed,
            ]}
            onPress={() => router.replace("/(auth)/login")}
            hitSlop={8}
          >
            <Ionicons
              name="arrow-back-outline"
              size={17}
              color={Colors.primary}
            />

            <Text style={styles.link}>Back to login</Text>
          </Pressable>

          {/* SECURITY FOOTER */}

          <View style={styles.footer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={17}
              color={Colors.verified}
            />

            <Text style={styles.footerText}>
              Your information is kept secure.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ==================================================
  // SCREEN
  // ==================================================

  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ==================================================
  // FIXED HEADER
  // ==================================================

  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.background,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },

  backButtonPressed: {
    backgroundColor: Colors.secondaryLight,
    transform: [{ scale: 0.97 }],
  },

  header: {
    marginTop: 30,
    paddingBottom: 26,
  },

  logoContainer: {
    marginBottom: 18,
  },

  logo: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: -1.4,
  },

  title: {
    ...Typography.h1,
    fontSize: 30,
    lineHeight: 37,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },

  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    marginTop: 9,
    lineHeight: 23,
    maxWidth: 350,
  },

  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 7,
    marginTop: 12,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.secondaryLight,
  },

  email: {
    ...Typography.bodyMedium,
    color: Colors.primary,
  },

  // ==================================================
  // SCROLL
  // ==================================================

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 40,
  },

  // ==================================================
  // FORM
  // ==================================================

  form: {
    gap: 18,
  },

  field: {
    width: "100%",
  },

  label: {
    ...Typography.label,
    color: Colors.textPrimary,
    marginBottom: 8,
  },

  fieldHint: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 6,
  },

  // ==================================================
  // PASSWORD
  // ==================================================

  passwordContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingLeft: 14,
    paddingRight: 5,
  },

  passwordIcon: {
    marginRight: 10,
  },

  passwordInput: {
    ...Typography.bodyLarge,
    flex: 1,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },

  eyeButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.md,
  },

  eyeButtonPressed: {
    backgroundColor: Colors.secondaryLight,
  },

  // ==================================================
  // PRIMARY BUTTON
  // ==================================================

  primaryButton: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 4,
    borderRadius: Radius.lg,
    backgroundColor: Colors.buttonPrimary,
  },

  primaryButtonPressed: {
    backgroundColor: Colors.buttonPrimaryPressed,
    transform: [{ scale: 0.985 }],
  },

  disabledButton: {
    opacity: 0.65,
  },

  primaryButtonText: {
    ...Typography.button,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.white,
  },

  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  // ==================================================
  // BACK TO LOGIN
  // ==================================================

  loginButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },

  loginButtonPressed: {
    opacity: 0.7,
  },

  link: {
    ...Typography.bodyMedium,
    color: Colors.primary,
    fontWeight: "700",
  },

  // ==================================================
  // FOOTER
  // ==================================================

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    paddingHorizontal: 10,
  },

  footerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginLeft: 7,
  },
});
