// app/(auth)/forgot-password.tsx
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
import { router } from "expo-router";

import { Colors } from "@/constants/src/theme/colors";
import { Radius } from "@/constants/src/theme/radius";
import { Typography } from "@/constants/src/theme/typography";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * Do not reset a password using only
       * an email address.
       *
       * This screen will eventually call
       * your backend password-reset request
       * endpoint.
       *
       * Backend should generate a secure
       * verification code/token and send it
       * through your chosen verification channel.
       *
       * Example future endpoint:
       *
       * POST /api/accounts/password/reset/request/
       *
       * {
       *   "email": "user@example.com"
       * }
       */

      router.push({
        pathname: "/(auth)/reset-password",
        params: {
          email: email.trim().toLowerCase(),
        },
      });
    } catch (error) {
      Alert.alert(
        "Request failed",
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

          <Text style={styles.title}>Forgot password?</Text>

          <Text style={styles.subtitle}>
            Enter the email address connected to your Suqe account.
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
              autoCorrect={false}
            />
          </View>

          <Pressable
            style={[styles.primaryButton, loading && styles.disabledButton]}
            onPress={handleContinue}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Continue</Text>
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

  form: {
    gap: 16,
  },

  label: {
    ...Typography.label,
    color: Colors.textPrimary,
    marginBottom: 7,
  },

  input: {
    height: 52,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    color: Colors.textPrimary,
    ...Typography.bodyLarge,
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
