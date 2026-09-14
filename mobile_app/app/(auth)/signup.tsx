// // app/(auth)/signup.tsx

// import {
//   View,
//   Text,
//   Pressable,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";

// import { Colors } from "@/constants/src/theme/colors";
// import { Radius } from "@/constants/src/theme/radius";
// import { Typography } from "@/constants/src/theme/typography";
// import { useAuth } from "@/constants/src/auth/AuthContext";

// export default function SignUp() {
//   const { register } = useAuth();

//   const [username, setUsername] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     if (!username.trim() || !displayName.trim() || !email.trim()) {
//       Alert.alert("Missing information", "Please fill in all required fields.");
//       return;
//     }

//     if (password.length < 8) {
//       Alert.alert(
//         "Invalid password",
//         "Password must be at least 8 characters.",
//       );
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Password mismatch", "Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await register({
//         username: username.trim(),
//         display_name: displayName.trim(),
//         email: email.trim().toLowerCase(),
//         password,
//         password_confirm: confirmPassword,
//       });

//       router.replace("/(tabs)");
//     } catch (error: any) {
//       console.log("========== REGISTER ERROR ==========");

//       if (error.response) {
//         console.log("STATUS:", error.response.status);
//         console.log("DATA:", JSON.stringify(error.response.data, null, 2));
//       } else {
//         console.log("ERROR:", error.message);
//       }

//       console.log("====================================");

//       Alert.alert(
//         "Signup failed",
//         error.response?.data?.detail ||
//           error.message ||
//           "Something went wrong. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       >
//         {/* BACK BUTTON */}
//         <Pressable
//           style={({ pressed }) => [
//             styles.backButton,
//             pressed && styles.pressedButton,
//           ]}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="arrow-back" size={21} color={Colors.textPrimary} />
//         </Pressable>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <View style={styles.brandMark}>
//             <Text style={styles.logo}>suqe</Text>
//           </View>

//           <Text style={styles.title}>Create Account</Text>

//           <Text style={styles.subtitle}>
//             Create your account and start buying and selling on Suqe.
//           </Text>
//         </View>

//         {/* FORM */}
//         <View style={styles.form}>
//           <Input
//             label="Username"
//             value={username}
//             onChangeText={setUsername}
//             placeholder="Choose a username"
//             autoCapitalize="none"
//           />

//           <Input
//             label="Display name"
//             value={displayName}
//             onChangeText={setDisplayName}
//             placeholder="Your display name"
//           />

//           <Input
//             label="Email"
//             value={email}
//             onChangeText={setEmail}
//             placeholder="you@example.com"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           {/* PASSWORD */}
//           <View style={styles.field}>
//             <Text style={styles.label}>Password</Text>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Create a password"
//                 placeholderTextColor={Colors.textMuted}
//                 secureTextEntry={!showPassword}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />

//               <Pressable
//                 style={styles.eyeButton}
//                 onPress={() => setShowPassword((value) => !value)}
//                 hitSlop={8}
//               >
//                 <Ionicons
//                   name={showPassword ? "eye-off-outline" : "eye-outline"}
//                   size={21}
//                   color={Colors.textSecondary}
//                 />
//               </Pressable>
//             </View>

//             <Text style={styles.fieldHint}>Use at least 8 characters.</Text>
//           </View>

//           {/* CONFIRM PASSWORD */}
//           <View style={styles.field}>
//             <Text style={styles.label}>Confirm password</Text>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 placeholder="Confirm your password"
//                 placeholderTextColor={Colors.textMuted}
//                 secureTextEntry={!showConfirmPassword}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />

//               <Pressable
//                 style={styles.eyeButton}
//                 onPress={() => setShowConfirmPassword((value) => !value)}
//                 hitSlop={8}
//               >
//                 <Ionicons
//                   name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
//                   size={21}
//                   color={Colors.textSecondary}
//                 />
//               </Pressable>
//             </View>
//           </View>

//           {/* CREATE ACCOUNT */}
//           <Pressable
//             style={({ pressed }) => [
//               styles.primaryButton,
//               loading && styles.disabledButton,
//               pressed && !loading && styles.primaryButtonPressed,
//             ]}
//             onPress={handleSignup}
//             disabled={loading}
//           >
//             {loading ? (
//               <View style={styles.loadingContent}>
//                 <ActivityIndicator color={Colors.white} size="small" />

//                 <Text style={styles.primaryButtonText}>
//                   Creating account...
//                 </Text>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="person-add-outline"
//                   size={20}
//                   color={Colors.white}
//                 />

//                 <Text style={styles.primaryButtonText}>Create Account</Text>
//               </>
//             )}
//           </Pressable>

//           {/* LOGIN */}
//           <View style={styles.loginRow}>
//             <Text style={styles.mutedText}>Already have an account?</Text>

//             <Pressable
//               onPress={() => router.replace("/(auth)/login")}
//               hitSlop={6}
//             >
//               <Text style={styles.link}> Login</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* FOOTER */}
//         <View style={styles.footer}>
//           <View style={styles.footerIcon}>
//             <Ionicons
//               name="shield-checkmark-outline"
//               size={16}
//               color={Colors.verified}
//             />
//           </View>

//           <Text style={styles.footerText}>
//             Your account information is kept secure.
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function Input({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   keyboardType,
//   autoCapitalize = "sentences",
// }: {
//   label: string;
//   value: string;
//   onChangeText: (value: string) => void;
//   placeholder: string;
//   keyboardType?: "default" | "email-address";
//   autoCapitalize?: "none" | "sentences";
// }) {
//   return (
//     <View style={styles.field}>
//       <Text style={styles.label}>{label}</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           placeholderTextColor={Colors.textMuted}
//           keyboardType={keyboardType}
//           autoCapitalize={autoCapitalize}
//           autoCorrect={false}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },

//   scroll: {
//     flex: 1,
//   },

//   container: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 32,
//   },

//   // ==================================================
//   // BACK
//   // ==================================================

//   backButton: {
//     width: 42,
//     height: 42,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.md,
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.borderLight,
//   },

//   pressedButton: {
//     backgroundColor: Colors.secondaryLight,
//   },

//   // ==================================================
//   // HEADER
//   // ==================================================

//   header: {
//     marginTop: 28,
//     marginBottom: 28,
//   },

//   brandMark: {
//     alignSelf: "flex-start",
//     marginBottom: 18,
//   },

//   logo: {
//     fontSize: 30,
//     lineHeight: 36,
//     fontWeight: "800",
//     color: Colors.primary,
//     letterSpacing: -1,
//   },

//   title: {
//     ...Typography.h1,
//     fontSize: 30,
//     lineHeight: 36,
//     color: Colors.textPrimary,
//   },

//   subtitle: {
//     ...Typography.body,
//     color: Colors.textSecondary,
//     marginTop: 8,
//     maxWidth: 340,
//   },

//   // ==================================================
//   // FORM
//   // ==================================================

//   form: {
//     gap: 17,
//   },

//   field: {
//     width: "100%",
//   },

//   label: {
//     ...Typography.label,
//     color: Colors.textPrimary,
//     marginBottom: 7,
//   },

//   inputContainer: {
//     height: 52,
//     justifyContent: "center",
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.searchBorder,
//     borderRadius: Radius.md,
//   },

//   input: {
//     ...Typography.bodyLarge,
//     flex: 1,
//     paddingHorizontal: 14,
//     color: Colors.textPrimary,
//   },

//   fieldHint: {
//     ...Typography.caption,
//     color: Colors.textMuted,
//     marginTop: 5,
//   },

//   // ==================================================
//   // PASSWORD
//   // ==================================================

//   passwordContainer: {
//     height: 52,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.searchBorder,
//     borderRadius: Radius.md,
//     paddingLeft: 14,
//     paddingRight: 6,
//   },

//   passwordInput: {
//     ...Typography.bodyLarge,
//     flex: 1,
//     color: Colors.textPrimary,
//   },

//   eyeButton: {
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.md,
//   },

//   // ==================================================
//   // PRIMARY BUTTON
//   // ==================================================

//   primaryButton: {
//     height: 54,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     marginTop: 5,
//     borderRadius: Radius.md,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   primaryButtonPressed: {
//     backgroundColor: Colors.buttonPrimaryPressed,
//   },

//   disabledButton: {
//     opacity: 0.65,
//   },

//   primaryButtonText: {
//     ...Typography.button,
//     fontSize: 15,
//     color: Colors.white,
//   },

//   loadingContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 9,
//   },

//   // ==================================================
//   // LOGIN
//   // ==================================================

//   loginRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 2,
//   },

//   mutedText: {
//     ...Typography.body,
//     color: Colors.textSecondary,
//   },

//   link: {
//     ...Typography.bodyMedium,
//     color: Colors.primary,
//   },

//   // ==================================================
//   // FOOTER
//   // ==================================================

//   footer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 28,
//     paddingHorizontal: 10,
//   },

//   footerIcon: {
//     width: 26,
//     height: 26,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 7,
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.errorLight,
//   },

//   footerText: {
//     ...Typography.caption,
//     color: Colors.textMuted,
//   },
// });
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
import { useAuth } from "@/constants/src/auth/AuthContext";

export default function SignUp() {
  const { register } = useAuth();

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

    try {
      setLoading(true);

      await register({
        username: username.trim(),
        display_name: displayName.trim(),
        email: email.trim().toLowerCase(),
        password,
        password_confirm: confirmPassword,
      });

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("========== REGISTER ERROR ==========");

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", JSON.stringify(error.response.data, null, 2));
      } else {
        console.log("ERROR:", error.message);
      }

      console.log("====================================");

      Alert.alert(
        "Signup failed",
        error.response?.data?.detail ||
          error.message ||
          "Something went wrong. Please try again.",
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

          <Text style={styles.title}>Create your account</Text>

          <Text style={styles.subtitle}>
            Join Suqe and discover a simpler way to buy and sell.
          </Text>
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
          {/* ================================================== */}
          {/* USERNAME */}
          {/* ================================================== */}

          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="at-outline"
                size={20}
                color={Colors.textMuted}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Choose a username"
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                textContentType="username"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* ================================================== */}
          {/* DISPLAY NAME */}
          {/* ================================================== */}

          <View style={styles.field}>
            <Text style={styles.label}>Display name</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={Colors.textMuted}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Your display name"
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* ================================================== */}
          {/* EMAIL */}
          {/* ================================================== */}

          <View style={styles.field}>
            <Text style={styles.label}>Email address</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.textMuted}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={Colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* ================================================== */}
          {/* PASSWORD */}
          {/* ================================================== */}

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>

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
                placeholder="Create a password"
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

          {/* ================================================== */}
          {/* CONFIRM PASSWORD */}
          {/* ================================================== */}

          <View style={styles.field}>
            <Text style={styles.label}>Confirm password</Text>

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
                placeholder="Confirm your password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="done"
                onSubmitEditing={handleSignup}
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

          {/* ================================================== */}
          {/* CREATE ACCOUNT */}
          {/* ================================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              loading && styles.disabledButton,
              pressed && !loading && styles.primaryButtonPressed,
            ]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContent}>
                <ActivityIndicator color={Colors.white} size="small" />

                <Text style={styles.primaryButtonText}>
                  Creating account...
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Create account</Text>

                <Ionicons name="arrow-forward" size={19} color={Colors.white} />
              </>
            )}
          </Pressable>

          {/* ================================================== */}
          {/* LOGIN */}
          {/* ================================================== */}

          <View style={styles.loginRow}>
            <Text style={styles.mutedText}>Already have an account?</Text>

            <Pressable
              onPress={() => router.replace("/(auth)/login")}
              hitSlop={8}
            >
              <Text style={styles.link}> Login</Text>
            </Pressable>
          </View>

          {/* ================================================== */}
          {/* TRUST FOOTER */}
          {/* ================================================== */}

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

  inputContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    ...Typography.bodyLarge,
    flex: 1,
    color: Colors.textPrimary,
    paddingVertical: 0,
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
  // LOGIN
  // ==================================================

  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  mutedText: {
    ...Typography.body,
    color: Colors.textSecondary,
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
