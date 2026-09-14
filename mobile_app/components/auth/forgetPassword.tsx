// app/(auth)/forgot-password.tsx

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
import { router } from "expo-router";

import { Colors } from "@/constants/src/theme/colors";
import { Radius } from "@/constants/src/theme/radius";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Please enter your email address.");
      return;
    }

    /*
     * Connect this to the backend password-reset
     * request endpoint when it is implemented.
     */

    router.push({
      pathname: "/(auth)/reset-password",
      params: {
        email: email.trim().toLowerCase(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.logo}>suqe</Text>

          <Text style={styles.title}>Forgot password?</Text>

          <Text style={styles.subtitle}>
            Enter the email address connected to your Suqe account. We will use
            it to start the password reset process.
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

          <Pressable style={styles.primaryButton} onPress={handleContinue}>
            <Text style={styles.primaryButtonText}>Continue</Text>
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
