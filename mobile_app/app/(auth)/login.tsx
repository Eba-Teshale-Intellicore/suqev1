// // // app/(auth)/login.tsx
// // import {
// //   View,
// //   Text,
// //   Pressable,
// //   TextInput,
// //   StyleSheet,
// //   ScrollView,
// //   Alert,
// //   ActivityIndicator,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { useState } from "react";
// // import { Ionicons } from "@expo/vector-icons";
// // import { router } from "expo-router";

// // import { Colors } from "@/constants/src/theme/colors";
// // import { Radius } from "@/constants/src/theme/radius";
// // import { Typography } from "@/constants/src/theme/typography";
// // import { useAuth } from "@/constants/src/auth/AuthContext";

// // export default function Login() {
// //   const { login } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [showPassword, setShowPassword] = useState(false);

// //   const [loading, setLoading] = useState(false);

// //   const handleLogin = async () => {
// //     if (!email.trim() || !password) {
// //       Alert.alert(
// //         "Missing information",
// //         "Please enter your email and password.",
// //       );
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       await login(email.trim().toLowerCase(), password);
// //       router.replace("/(tabs)");
// //     } catch (error) {
// //       Alert.alert(
// //         "Login failed",
// //         error instanceof Error
// //           ? error.message
// //           : "Something went wrong. Please try again.",
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <ScrollView
// //         style={styles.scroll}
// //         contentContainerStyle={styles.container}
// //         keyboardShouldPersistTaps="handled"
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {/* BACK BUTTON */}
// //         <Pressable
// //           style={({ pressed }) => [
// //             styles.backButton,
// //             pressed && styles.pressedButton,
// //           ]}
// //           onPress={() => router.back()}
// //         >
// //           <Ionicons name="arrow-back" size={21} color={Colors.textPrimary} />
// //         </Pressable>

// //         {/* HEADER */}
// //         <View style={styles.header}>
// //           <View style={styles.brandMark}>
// //             <Text style={styles.logo}>suqe</Text>
// //           </View>

// //           <Text style={styles.title}>Welcome back</Text>

// //           <Text style={styles.subtitle}>
// //             Login to continue buying and selling on Suqe.
// //           </Text>
// //         </View>

// //         {/* FORM */}
// //         <View style={styles.form}>
// //           {/* EMAIL */}
// //           <View style={styles.field}>
// //             <Text style={styles.label}>Email</Text>

// //             <View style={styles.inputContainer}>
// //               <Ionicons
// //                 name="mail-outline"
// //                 size={19}
// //                 color={Colors.textMuted}
// //                 style={styles.inputIcon}
// //               />

// //               <TextInput
// //                 style={styles.inputWithIcon}
// //                 value={email}
// //                 onChangeText={setEmail}
// //                 placeholder="you@example.com"
// //                 placeholderTextColor={Colors.textMuted}
// //                 keyboardType="email-address"
// //                 autoCapitalize="none"
// //                 autoCorrect={false}
// //               />
// //             </View>
// //           </View>

// //           {/* PASSWORD */}
// //           <View style={styles.field}>
// //             <Text style={styles.label}>Password</Text>

// //             <View style={styles.passwordContainer}>
// //               <Ionicons
// //                 name="lock-closed-outline"
// //                 size={19}
// //                 color={Colors.textMuted}
// //                 style={styles.passwordIcon}
// //               />

// //               <TextInput
// //                 style={styles.passwordInput}
// //                 value={password}
// //                 onChangeText={setPassword}
// //                 placeholder="Your password"
// //                 placeholderTextColor={Colors.textMuted}
// //                 secureTextEntry={!showPassword}
// //                 autoCapitalize="none"
// //                 autoCorrect={false}
// //               />

// //               <Pressable
// //                 style={styles.eyeButton}
// //                 onPress={() => setShowPassword((value) => !value)}
// //                 hitSlop={8}
// //               >
// //                 <Ionicons
// //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// //                   size={21}
// //                   color={Colors.textSecondary}
// //                 />
// //               </Pressable>
// //             </View>
// //           </View>

// //           {/* FORGOT PASSWORD */}
// //           <Pressable
// //             style={styles.forgotButton}
// //             onPress={() => router.push("/(auth)/forgot-password")}
// //             hitSlop={6}
// //           >
// //             <Text style={styles.link}>Forgot password?</Text>
// //           </Pressable>

// //           {/* LOGIN BUTTON */}
// //           <Pressable
// //             style={({ pressed }) => [
// //               styles.primaryButton,
// //               loading && styles.disabledButton,
// //               pressed && !loading && styles.primaryButtonPressed,
// //             ]}
// //             onPress={handleLogin}
// //             disabled={loading}
// //           >
// //             {loading ? (
// //               <View style={styles.loadingContent}>
// //                 <ActivityIndicator color={Colors.white} size="small" />

// //                 <Text style={styles.primaryButtonText}>Logging in...</Text>
// //               </View>
// //             ) : (
// //               <>
// //                 <Ionicons
// //                   name="log-in-outline"
// //                   size={20}
// //                   color={Colors.white}
// //                 />

// //                 <Text style={styles.primaryButtonText}>Login</Text>
// //               </>
// //             )}
// //           </Pressable>

// //           {/* SIGN UP */}
// //           <View style={styles.signupRow}>
// //             <Text style={styles.mutedText}>Don't have an account?</Text>

// //             <Pressable
// //               onPress={() => router.push("/(auth)/signup")}
// //               hitSlop={6}
// //             >
// //               <Text style={styles.link}> Sign up</Text>
// //             </Pressable>
// //           </View>
// //         </View>

// //         {/* TRUST FOOTER */}
// //         <View style={styles.footer}>
// //           <View style={styles.footerIcon}>
// //             <Ionicons
// //               name="shield-checkmark-outline"
// //               size={16}
// //               color={Colors.verified}
// //             />
// //           </View>

// //           <Text style={styles.footerText}>
// //             Securely sign in to your Suqe account.
// //           </Text>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: Colors.background,
// //   },

// //   scroll: {
// //     flex: 1,
// //   },

// //   container: {
// //     flexGrow: 1,
// //     paddingHorizontal: 20,
// //     paddingTop: 12,
// //     paddingBottom: 32,
// //   },

// //   // ==================================================
// //   // BACK
// //   // ==================================================

// //   backButton: {
// //     width: 42,
// //     height: 42,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderRadius: Radius.md,
// //     backgroundColor: Colors.surface,
// //     borderWidth: 1,
// //     borderColor: Colors.borderLight,
// //   },

// //   pressedButton: {
// //     backgroundColor: Colors.secondaryLight,
// //   },

// //   // ==================================================
// //   // HEADER
// //   // ==================================================

// //   header: {
// //     marginTop: 32,
// //     marginBottom: 30,
// //   },

// //   brandMark: {
// //     alignSelf: "flex-start",
// //     marginBottom: 18,
// //   },

// //   logo: {
// //     fontSize: 30,
// //     lineHeight: 36,
// //     fontWeight: "800",
// //     color: Colors.primary,
// //     letterSpacing: -1,
// //   },

// //   title: {
// //     ...Typography.h1,
// //     fontSize: 30,
// //     lineHeight: 36,
// //     color: Colors.textPrimary,
// //   },

// //   subtitle: {
// //     ...Typography.body,
// //     color: Colors.textSecondary,
// //     marginTop: 8,
// //     maxWidth: 340,
// //   },

// //   // ==================================================
// //   // FORM
// //   // ==================================================

// //   form: {
// //     gap: 18,
// //   },

// //   field: {
// //     width: "100%",
// //   },

// //   label: {
// //     ...Typography.label,
// //     color: Colors.textPrimary,
// //     marginBottom: 7,
// //   },

// //   // ==================================================
// //   // EMAIL
// //   // ==================================================

// //   inputContainer: {
// //     height: 52,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: Colors.surface,
// //     borderWidth: 1,
// //     borderColor: Colors.searchBorder,
// //     borderRadius: Radius.md,
// //     paddingHorizontal: 13,
// //   },

// //   inputIcon: {
// //     marginRight: 8,
// //   },

// //   inputWithIcon: {
// //     ...Typography.bodyLarge,
// //     flex: 1,
// //     color: Colors.textPrimary,
// //   },

// //   // ==================================================
// //   // PASSWORD
// //   // ==================================================

// //   passwordContainer: {
// //     height: 52,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: Colors.surface,
// //     borderWidth: 1,
// //     borderColor: Colors.searchBorder,
// //     borderRadius: Radius.md,
// //     paddingLeft: 13,
// //     paddingRight: 6,
// //   },

// //   passwordIcon: {
// //     marginRight: 8,
// //   },

// //   passwordInput: {
// //     ...Typography.bodyLarge,
// //     flex: 1,
// //     color: Colors.textPrimary,
// //   },

// //   eyeButton: {
// //     width: 40,
// //     height: 40,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderRadius: Radius.md,
// //   },

// //   // ==================================================
// //   // FORGOT
// //   // ==================================================

// //   forgotButton: {
// //     alignSelf: "flex-end",
// //     marginTop: -7,
// //   },

// //   link: {
// //     ...Typography.bodyMedium,
// //     color: Colors.primary,
// //   },

// //   // ==================================================
// //   // PRIMARY BUTTON
// //   // ==================================================

// //   primaryButton: {
// //     height: 54,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 8,
// //     marginTop: 2,
// //     borderRadius: Radius.md,
// //     backgroundColor: Colors.buttonPrimary,
// //   },

// //   primaryButtonPressed: {
// //     backgroundColor: Colors.buttonPrimaryPressed,
// //   },

// //   disabledButton: {
// //     opacity: 0.65,
// //   },

// //   primaryButtonText: {
// //     ...Typography.button,
// //     fontSize: 15,
// //     color: Colors.white,
// //   },

// //   loadingContent: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 9,
// //   },

// //   // ==================================================
// //   // SIGN UP
// //   // ==================================================

// //   signupRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginTop: 2,
// //   },

// //   mutedText: {
// //     ...Typography.body,
// //     color: Colors.textSecondary,
// //   },

// //   // ==================================================
// //   // FOOTER
// //   // ==================================================

// //   footer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginTop: 30,
// //     paddingHorizontal: 10,
// //   },

// //   footerIcon: {
// //     width: 26,
// //     height: 26,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginRight: 7,
// //     borderRadius: Radius.circle,
// //     backgroundColor: Colors.errorLight,
// //   },

// //   footerText: {
// //     ...Typography.caption,
// //     color: Colors.textMuted,
// //   },
// // });
// // app/(auth)/login.tsx

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

// export default function Login() {
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email.trim() || !password) {
//       Alert.alert(
//         "Missing information",
//         "Please enter your email and password.",
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       await login(email.trim().toLowerCase(), password);
//       router.replace("/(tabs)");
//     } catch (error) {
//       Alert.alert(
//         "Login failed",
//         error instanceof Error
//           ? error.message
//           : "Something went wrong. Please try again.",
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
//         keyboardDismissMode="on-drag"
//       >
//         {/* BACK BUTTON */}
//         <Pressable
//           style={({ pressed }) => [
//             styles.backButton,
//             pressed && styles.backButtonPressed,
//           ]}
//           onPress={() => router.back()}
//           hitSlop={8}
//         >
//           <Ionicons name="arrow-back" size={21} color={Colors.textPrimary} />
//         </Pressable>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <View style={styles.logoContainer}>
//             <Text style={styles.logo}>suqe</Text>
//           </View>

//           <Text style={styles.title}>Welcome back</Text>

//           <Text style={styles.subtitle}>
//             Sign in to continue buying and selling on Suqe.
//           </Text>
//         </View>

//         {/* FORM */}
//         <View style={styles.form}>
//           {/* EMAIL */}
//           <View style={styles.field}>
//             <Text style={styles.label}>Email address</Text>

//             <View style={styles.inputContainer}>
//               <Ionicons
//                 name="mail-outline"
//                 size={20}
//                 color={Colors.textMuted}
//                 style={styles.inputIcon}
//               />

//               <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="you@example.com"
//                 placeholderTextColor={Colors.textMuted}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 autoComplete="email"
//                 textContentType="emailAddress"
//                 returnKeyType="next"
//               />
//             </View>
//           </View>

//           {/* PASSWORD */}
//           <View style={styles.field}>
//             <View style={styles.labelRow}>
//               <Text style={styles.label}>Password</Text>

//               <Pressable
//                 onPress={() => router.push("/(auth)/forgot-password")}
//                 hitSlop={8}
//               >
//                 <Text style={styles.forgotText}>Forgot password?</Text>
//               </Pressable>
//             </View>

//             <View style={styles.passwordContainer}>
//               <Ionicons
//                 name="lock-closed-outline"
//                 size={20}
//                 color={Colors.textMuted}
//                 style={styles.passwordIcon}
//               />

//               <TextInput
//                 style={styles.passwordInput}
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter your password"
//                 placeholderTextColor={Colors.textMuted}
//                 secureTextEntry={!showPassword}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 autoComplete="password"
//                 textContentType="password"
//                 returnKeyType="done"
//                 onSubmitEditing={handleLogin}
//               />

//               <Pressable
//                 style={({ pressed }) => [
//                   styles.eyeButton,
//                   pressed && styles.eyeButtonPressed,
//                 ]}
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
//           </View>

//           {/* LOGIN BUTTON */}
//           <Pressable
//             style={({ pressed }) => [
//               styles.primaryButton,
//               loading && styles.disabledButton,
//               pressed && !loading && styles.primaryButtonPressed,
//             ]}
//             onPress={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <View style={styles.loadingContent}>
//                 <ActivityIndicator color={Colors.white} size="small" />

//                 <Text style={styles.primaryButtonText}>Logging in...</Text>
//               </View>
//             ) : (
//               <>
//                 <Text style={styles.primaryButtonText}>Login</Text>

//                 <Ionicons name="arrow-forward" size={19} color={Colors.white} />
//               </>
//             )}
//           </Pressable>

//           {/* SIGN UP */}
//           <View style={styles.signupRow}>
//             <Text style={styles.mutedText}>Don't have an account?</Text>

//             <Pressable
//               onPress={() => router.push("/(auth)/signup")}
//               hitSlop={8}
//             >
//               <Text style={styles.signupLink}> Sign up</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* TRUST FOOTER */}
//         <View style={styles.footer}>
//           <Ionicons
//             name="shield-checkmark-outline"
//             size={17}
//             color={Colors.verified}
//           />

//           <Text style={styles.footerText}>
//             Your account is protected and secure.
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
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
//     paddingBottom: 36,
//   },

//   // ==================================================
//   // BACK
//   // ==================================================

//   backButton: {
//     width: 44,
//     height: 44,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.borderLight,
//   },

//   backButtonPressed: {
//     backgroundColor: Colors.secondaryLight,
//     transform: [{ scale: 0.97 }],
//   },

//   // ==================================================
//   // HEADER
//   // ==================================================

//   header: {
//     marginTop: 34,
//     marginBottom: 34,
//   },

//   logoContainer: {
//     marginBottom: 22,
//   },

//   logo: {
//     fontSize: 32,
//     lineHeight: 38,
//     fontWeight: "800",
//     color: Colors.primary,
//     letterSpacing: -1.4,
//   },

//   title: {
//     ...Typography.h1,
//     fontSize: 30,
//     lineHeight: 37,
//     color: Colors.textPrimary,
//     letterSpacing: -0.5,
//   },

//   subtitle: {
//     ...Typography.bodyLarge,
//     color: Colors.textSecondary,
//     marginTop: 9,
//     lineHeight: 23,
//     maxWidth: 350,
//   },

//   // ==================================================
//   // FORM
//   // ==================================================

//   form: {
//     gap: 20,
//   },

//   field: {
//     width: "100%",
//   },

//   labelRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },

//   label: {
//     ...Typography.label,
//     color: Colors.textPrimary,
//     marginBottom: 8,
//   },

//   inputContainer: {
//     height: 54,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     borderRadius: Radius.lg,
//     paddingHorizontal: 14,
//   },

//   inputIcon: {
//     marginRight: 10,
//   },

//   input: {
//     ...Typography.bodyLarge,
//     flex: 1,
//     color: Colors.textPrimary,
//     paddingVertical: 0,
//   },

//   // ==================================================
//   // PASSWORD
//   // ==================================================

//   passwordContainer: {
//     height: 54,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     borderRadius: Radius.lg,
//     paddingLeft: 14,
//     paddingRight: 5,
//   },

//   passwordIcon: {
//     marginRight: 10,
//   },

//   passwordInput: {
//     ...Typography.bodyLarge,
//     flex: 1,
//     color: Colors.textPrimary,
//     paddingVertical: 0,
//   },

//   eyeButton: {
//     width: 42,
//     height: 42,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.md,
//   },

//   eyeButtonPressed: {
//     backgroundColor: Colors.secondaryLight,
//   },

//   // ==================================================
//   // FORGOT
//   // ==================================================

//   forgotText: {
//     ...Typography.bodyMedium,
//     color: Colors.primary,
//   },

//   // ==================================================
//   // PRIMARY BUTTON
//   // ==================================================

//   primaryButton: {
//     height: 56,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 9,
//     marginTop: 4,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   primaryButtonPressed: {
//     backgroundColor: Colors.buttonPrimaryPressed,
//     transform: [{ scale: 0.985 }],
//   },

//   disabledButton: {
//     opacity: 0.65,
//   },

//   primaryButtonText: {
//     ...Typography.button,
//     fontSize: 15,
//     fontWeight: "700",
//     color: Colors.white,
//   },

//   loadingContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 9,
//   },

//   // ==================================================
//   // SIGN UP
//   // ==================================================

//   signupRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 1,
//   },

//   mutedText: {
//     ...Typography.body,
//     color: Colors.textSecondary,
//   },

//   signupLink: {
//     ...Typography.bodyMedium,
//     color: Colors.primary,
//     fontWeight: "700",
//   },

//   // ==================================================
//   // FOOTER
//   // ==================================================

//   footer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 34,
//     paddingHorizontal: 10,
//   },

//   footerText: {
//     ...Typography.caption,
//     color: Colors.textMuted,
//     marginLeft: 7,
//   },
// });
// app/(auth)/login.tsx

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

export default function Login() {
  const { login } = useAuth();

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

      await login(email.trim().toLowerCase(), password);
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
      {/* ==================================================
          FIXED HEADER
          ================================================== */}

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

        {/* HEADER CONTENT */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>suqe</Text>
          </View>

          <Text style={styles.title}>Welcome back</Text>

          <Text style={styles.subtitle}>
            Sign in to continue buying and selling on Suqe.
          </Text>
        </View>
      </View>

      {/* ==================================================
          SCROLLABLE CONTENT
          ================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {/* FORM */}

        <View style={styles.form}>
          {/* EMAIL */}
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

          {/* PASSWORD */}
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>

              <Pressable
                onPress={() => router.push("/(auth)/forgot-password")}
                hitSlop={8}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            </View>

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
                placeholder="Enter your password"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
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
          </View>

          {/* LOGIN BUTTON */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              loading && styles.disabledButton,
              pressed && !loading && styles.primaryButtonPressed,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContent}>
                <ActivityIndicator color={Colors.white} size="small" />

                <Text style={styles.primaryButtonText}>Logging in...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Login</Text>

                <Ionicons name="arrow-forward" size={19} color={Colors.white} />
              </>
            )}
          </Pressable>

          {/* SIGN UP */}
          <View style={styles.signupRow}>
            <Text style={styles.mutedText}>Don't have an account?</Text>

            <Pressable
              onPress={() => router.push("/(auth)/signup")}
              hitSlop={8}
            >
              <Text style={styles.signupLink}> Sign up</Text>
            </Pressable>
          </View>
        </View>

        {/* TRUST FOOTER */}

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={17}
            color={Colors.verified}
          />

          <Text style={styles.footerText}>
            Your account is protected and secure.
          </Text>
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

  // ==================================================
  // BACK BUTTON
  // ==================================================

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

  // ==================================================
  // HEADER
  // ==================================================

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
    gap: 20,
  },

  field: {
    width: "100%",
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    ...Typography.label,
    color: Colors.textPrimary,
    marginBottom: 8,
  },

  // ==================================================
  // EMAIL
  // ==================================================

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
  // FORGOT PASSWORD
  // ==================================================

  forgotText: {
    ...Typography.bodyMedium,
    color: Colors.primary,
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
  // SIGN UP
  // ==================================================

  signupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  mutedText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  signupLink: {
    ...Typography.bodyMedium,
    color: Colors.primary,
    fontWeight: "700",
  },

  // ==================================================
  // TRUST FOOTER
  // ==================================================

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 34,
    paddingHorizontal: 10,
  },

  footerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginLeft: 7,
  },
});
