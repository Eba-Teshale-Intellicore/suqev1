// app/(auth)/reset-password.tsx

import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/src/theme/colors";
import { Radius } from "@/constants/src/theme/radius";

export default function ResetPassword() {
  const { email } = useLocalSearchParams<{
    email?: string;
  }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
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

    /*
     * Connect this page to the backend reset-password
     * confirmation endpoint when the token/code flow
     * is implemented.
     */

    Alert.alert(
      "Ready to reset",
      `Password reset requested for ${email ?? "your account"}.`,
      [
        {
          text: "Back to login",
          onPress: () => router.replace("/(auth)/login"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
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

          <Pressable style={styles.primaryButton} onPress={handleResetPassword}>
            <Text style={styles.primaryButtonText}>Reset Password</Text>
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
    lineHeight: 23,
    marginTop: 10,
  },
  email: {
    color: Colors.SIRA,
    fontSize: 14,
    marginTop: 12,
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
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "800",
  },
  loginButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  link: {
    color: Colors.SIRA,
    fontSize: 14,
    fontWeight: "700",
  },
});
