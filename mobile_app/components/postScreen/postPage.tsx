// import {
//   StyleSheet,
//   View,
//   Text,
//   Pressable,
//   TextInput,
//   FlatList,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";

// import { Colors } from "@/constants/src/theme/colors";
// import { Icons } from "@/constants/src/theme/icons";
// import { Radius } from "@/constants/src/theme/radius";
// import { Typography } from "@/constants/src/theme/typography";

// const categories = [
//   { id: "1", name: "Electronics" },
//   { id: "2", name: "Phones" },
//   { id: "3", name: "Laptops" },
//   { id: "4", name: "Clothing" },
//   { id: "5", name: "Shoes" },
//   { id: "6", name: "Furniture" },
//   { id: "7", name: "Vehicles" },
//   { id: "8", name: "Books" },
//   { id: "9", name: "Accessories" },
//   { id: "10", name: "Beauty" },
//   { id: "11", name: "Sports" },
//   { id: "12", name: "Kids & Baby" },
// ];

// const conditions = [
//   { id: "1", name: "Like New" },
//   { id: "2", name: "Good" },
//   { id: "3", name: "Fair" },
//   { id: "4", name: "Needs Repair" },
// ];
// const ethiopianLocations = [
//   {
//     id: "addis",
//     city: "Addis Ababa",
//     areas: [
//       "Bole",
//       "Arada",
//       "Piyassa",
//       "Kaliti",
//       "Kirkos",
//       "Yeka",
//       "Lideta",
//       "Nifas Silk-Lafto",
//       "Kolfe Keranio",
//       "Gulele",
//       "Akaki Kality",
//       "Addis Ketema",
//     ],
//   },
//   {
//     id: "ambo",
//     city: "Ambo",
//     areas: ["01", "02", "03", "04"],
//   },
//   {
//     id: "guder",
//     city: "Guder",
//     areas: ["01", "02", "03"],
//   },
//   {
//     id: "woliso",
//     city: "Woliso",
//     areas: ["01", "02", "03", "04"],
//   },
//   {
//     id: "waliqite",
//     city: "Waliqite",
//     areas: ["01", "02", "03", "04"],
//   },
//   {
//     id: "jimma",
//     city: "Jimma",
//     areas: ["01", "02", "03", "04", "05"],
//   },
//   {
//     id: "nekemte",
//     city: "Nekemte",
//     areas: ["01", "02", "03", "04"],
//   },
//   {
//     id: "mekelle",
//     city: "Mekelle",
//     areas: ["01", "02", "03", "04", "05"],
//   },
//   {
//     id: "bahirdar",
//     city: "Bahir Dar",
//     areas: ["01", "02", "03", "04", "05"],
//   },
// ];

// export default function PostScreen() {
//   const [activeCategory, setActiveCategory] = useState("1");
//   const [activeCondition, setActiveCondition] = useState("1");
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [showLocationPicker, setShowLocationPicker] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [locationStep, setLocationStep] = useState<"city" | "area">("city");
//   const handlePriceChange = (value: string) => {
//     // Allow only numbers
//     const numericValue = value.replace(/[^0-9]/g, "");

//     if (numericValue === "") {
//       setPrice("");
//       return;
//     }

//     const amount = Number(numericValue);

//     // Maximum price = 5,000 Birr
//     if (amount <= 5000) {
//       setPrice(numericValue);
//     }
//   };
//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       {/* =========================
//           TOP OVERLAY
//       ========================= */}

//       <View style={styles.topOverlay} />

//       {/* =========================
//           TOP BAR
//       ========================= */}

//       <View style={styles.topBar}>
//         <Pressable style={styles.topBarButton}>
//           <Ionicons
//             name="close-outline"
//             size={Icons.action.size}
//             color={Colors.actionIcon}
//           />
//         </Pressable>

//         <Text style={styles.logo}>Suqe</Text>

//         <Pressable style={styles.helpButton}>
//           <Ionicons
//             name="help-circle-outline"
//             size={22}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       {/* =========================
//           FORM
//       ========================= */}

//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* HEADER */}

//         <View style={styles.header}>
//           <Text style={styles.heading}>Sell an Item</Text>

//           <Text style={styles.subheading}>
//             List your item in seconds and reach local buyers.
//           </Text>
//         </View>

//         {/* =========================
//             PHOTOS
//         ========================= */}

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Photos</Text>

//             <Text style={styles.counter}>0/8</Text>
//           </View>

//           <View style={styles.photoGrid}>
//             <Pressable style={styles.addPhoto}>
//               <View style={styles.cameraCircle}>
//                 <Ionicons
//                   name="camera-outline"
//                   size={25}
//                   color={Colors.primary}
//                 />
//               </View>

//               <Text style={styles.addPhotoText}>Add photos</Text>

//               <Text style={styles.photoHint}>Up to 8 photos</Text>
//             </Pressable>

//             <Pressable style={styles.addVideo}>
//               <View style={styles.videoIcon}>
//                 <Ionicons
//                   name="videocam-outline"
//                   size={24}
//                   color={Colors.textSecondary}
//                 />
//               </View>

//               <Text style={styles.videoText}>Add video</Text>

//               <Text style={styles.videoHint}>Optional</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* =========================
//             TITLE
//         ========================= */}

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>What are you selling?</Text>

//           <View style={styles.inputContainer}>
//             <TextInput
//               value={title}
//               onChangeText={setTitle}
//               style={styles.input}
//               placeholder="e.g. iPhone 13 Pro Max"
//               placeholderTextColor={Colors.searchPlaceholder}
//               maxLength={80}
//             />
//           </View>

//           <Text style={styles.inputHint}>
//             A clear title helps buyers find your item.
//           </Text>
//         </View>

//         {/* =========================
//             CATEGORY
//         ========================= */}

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Category</Text>

//           <FlatList
//             data={categories}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={styles.chipsList}
//             renderItem={({ item }) => {
//               const active = activeCategory === item.id;

//               return (
//                 <Pressable
//                   onPress={() => setActiveCategory(item.id)}
//                   style={[
//                     styles.categoryChip,
//                     active && styles.categoryChipActive,
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.categoryText,
//                       active && styles.categoryTextActive,
//                     ]}
//                   >
//                     {item.name}
//                   </Text>
//                 </Pressable>
//               );
//             }}
//           />
//         </View>

//         {/* =========================
//             PRICE
//         ========================= */}

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Price</Text>

//           <View style={styles.priceInputContainer}>
//             <Text style={styles.currency}>ETB</Text>

//             <TextInput
//               value={price}
//               onChangeText={handlePriceChange}
//               style={styles.priceInput}
//               placeholder="0"
//               placeholderTextColor={Colors.searchPlaceholder}
//               keyboardType="numeric"
//               maxLength={4}
//             />

//             <Text style={styles.birr}>Birr</Text>
//           </View>

//           <Text style={styles.priceHint}>
//             Price must be between Free and 5,000 Birr.
//           </Text>
//         </View>

//         {/* =========================
//             CONDITION
//         ========================= */}

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Condition</Text>

//           <View style={styles.conditionsContainer}>
//             {conditions.map((item) => {
//               const active = activeCondition === item.id;

//               return (
//                 <Pressable
//                   key={item.id}
//                   onPress={() => setActiveCondition(item.id)}
//                   style={[
//                     styles.conditionChip,
//                     active && styles.conditionChipActive,
//                   ]}
//                 >
//                   {active && (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={16}
//                       color={Colors.white}
//                     />
//                   )}

//                   <Text
//                     style={[
//                       styles.conditionText,
//                       active && styles.conditionTextActive,
//                     ]}
//                   >
//                     {item.name}
//                   </Text>
//                 </Pressable>
//               );
//             })}
//           </View>
//         </View>

//         {/* =========================
//             DESCRIPTION
//         ========================= */}

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Description</Text>

//             <Text style={styles.counter}>{description.length}/500</Text>
//           </View>

//           <View style={styles.descriptionContainer}>
//             <TextInput
//               value={description}
//               onChangeText={setDescription}
//               style={styles.descriptionInput}
//               placeholder="Tell buyers about your item..."
//               placeholderTextColor={Colors.searchPlaceholder}
//               multiline
//               textAlignVertical="top"
//               maxLength={500}
//             />
//           </View>
//         </View>

//         {/* =========================
//     LOCATION
// ========================= */}

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Location</Text>

//             {selectedCity && (
//               <Pressable onPress={() => setShowLocationPicker(true)}>
//                 <Text style={styles.changeText}>Change</Text>
//               </Pressable>
//             )}
//           </View>

//           <Pressable
//             style={styles.locationContainer}
//             onPress={() => setShowLocationPicker(true)}
//           >
//             <View style={styles.locationIconContainer}>
//               <Ionicons
//                 name="location-outline"
//                 size={21}
//                 color={Colors.locationIcon}
//               />
//             </View>

//             <View style={styles.locationInfo}>
//               <Text style={styles.locationTitle}>
//                 {selectedCity || "Choose location"}
//               </Text>

//               <Text style={styles.locationSubtitle}>
//                 {selectedArea || "Select your city and area"}
//               </Text>
//             </View>

//             <Ionicons
//               name="chevron-forward"
//               size={20}
//               color={Colors.textMuted}
//             />
//           </Pressable>
//         </View>

//         {/* =========================
//             SAFETY / TRUST
//         ========================= */}

//         <View style={styles.trustCard}>
//           <View style={styles.trustIcon}>
//             <Ionicons
//               name="shield-checkmark-outline"
//               size={22}
//               color={Colors.verified}
//             />
//           </View>

//           <View style={styles.trustContent}>
//             <Text style={styles.trustTitle}>Sell safely on Suqe</Text>

//             <Text style={styles.trustText}>
//               Meet buyers in a safe public place and never share sensitive
//               account information.
//             </Text>
//           </View>
//         </View>

//         {/* =========================
//             POST BUTTON
//         ========================= */}

//         <Pressable style={styles.postButton}>
//           <Ionicons name="add-circle-outline" size={21} color={Colors.white} />

//           <Text style={styles.postButtonText}>Post Item</Text>
//         </Pressable>

//         <Text style={styles.bottomText}>
//           By posting, you agree to Suqe's marketplace guidelines.
//         </Text>
//       </ScrollView>
//       {showLocationPicker && (
//         <View style={styles.locationOverlay}>
//           <View style={styles.locationModal}>
//             {/* HEADER */}

//             <View style={styles.locationModalHeader}>
//               <Pressable
//                 onPress={() => {
//                   if (locationStep === "area") {
//                     setLocationStep("city");
//                   } else {
//                     setShowLocationPicker(false);
//                   }
//                 }}
//                 style={styles.modalBackButton}
//               >
//                 <Ionicons
//                   name={
//                     locationStep === "area" ? "arrow-back" : "close-outline"
//                   }
//                   size={22}
//                   color={Colors.textPrimary}
//                 />
//               </Pressable>

//               <Text style={styles.locationModalTitle}>
//                 {locationStep === "city" ? "Choose City" : selectedCity}
//               </Text>

//               <View style={styles.modalHeaderSpace} />
//             </View>

//             {/* SEARCH */}

//             <View style={styles.locationSearch}>
//               <Ionicons
//                 name="search-outline"
//                 size={20}
//                 color={Colors.searchIcon}
//               />

//               <TextInput
//                 style={styles.locationSearchInput}
//                 placeholder={
//                   locationStep === "city" ? "Search city..." : "Search area..."
//                 }
//                 placeholderTextColor={Colors.searchPlaceholder}
//               />
//             </View>

//             {/* CITY LIST */}

//             {locationStep === "city" ? (
//               <FlatList
//                 data={ethiopianLocations}
//                 keyExtractor={(item) => item.id}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.locationList}
//                 renderItem={({ item }) => (
//                   <Pressable
//                     style={styles.locationOption}
//                     onPress={() => {
//                       setSelectedCity(item.city);
//                       setSelectedArea("");
//                       setLocationStep("area");
//                     }}
//                   >
//                     <View style={styles.locationOptionIcon}>
//                       <Ionicons
//                         name="location-outline"
//                         size={20}
//                         color={Colors.locationIcon}
//                       />
//                     </View>

//                     <Text style={styles.locationOptionText}>{item.city}</Text>

//                     <Ionicons
//                       name="chevron-forward"
//                       size={19}
//                       color={Colors.textMuted}
//                     />
//                   </Pressable>
//                 )}
//               />
//             ) : (
//               <FlatList
//                 data={
//                   ethiopianLocations.find((item) => item.city === selectedCity)
//                     ?.areas || []
//                 }
//                 keyExtractor={(item) => item}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.locationList}
//                 renderItem={({ item }) => (
//                   <Pressable
//                     style={styles.locationOption}
//                     onPress={() => {
//                       setSelectedArea(item);
//                       setShowLocationPicker(false);
//                       setLocationStep("city");
//                     }}
//                   >
//                     <View style={styles.locationOptionIcon}>
//                       <Ionicons
//                         name="navigate-outline"
//                         size={20}
//                         color={Colors.locationIcon}
//                       />
//                     </View>

//                     <Text style={styles.locationOptionText}>{item}</Text>

//                     <Ionicons
//                       name="checkmark-circle-outline"
//                       size={20}
//                       color={Colors.textMuted}
//                     />
//                   </Pressable>
//                 )}
//               />
//             )}
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   // ==================================================
//   // CONTAINER
//   // ==================================================

//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },

//   scroll: {
//     flex: 1,
//   },

//   content: {
//     paddingHorizontal: 16,
//     paddingBottom: 40,
//   },

//   topOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 100,
//     backgroundColor: Colors.videoOverlay,
//   },

//   // ==================================================
//   // TOP BAR
//   // ==================================================

//   topBar: {
//     height: 60,

//     paddingHorizontal: 16,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   topBarButton: {
//     width: 40,
//     height: 40,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.md,

//     backgroundColor: Colors.actionBackground,
//   },

//   helpButton: {
//     width: 40,
//     height: 40,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.md,

//     backgroundColor: Colors.actionBackground,
//   },

//   logo: {
//     ...Typography.h2,
//     color: Colors.primary,
//   },

//   // ==================================================
//   // HEADER
//   // ==================================================

//   header: {
//     paddingTop: 12,
//     paddingBottom: 20,
//   },

//   heading: {
//     ...Typography.h1,
//     color: Colors.textPrimary,
//   },

//   subheading: {
//     ...Typography.body,
//     marginTop: 5,
//     color: Colors.textSecondary,
//   },

//   // ==================================================
//   // SECTION
//   // ==================================================

//   section: {
//     marginBottom: 22,
//   },

//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },

//   sectionTitle: {
//     ...Typography.h3,
//     color: Colors.textPrimary,
//     marginBottom: 10,
//   },

//   counter: {
//     ...Typography.caption,
//     color: Colors.textMuted,
//   },

//   // ==================================================
//   // PHOTOS
//   // ==================================================

//   photoGrid: {
//     flexDirection: "row",
//     gap: 10,
//   },

//   addPhoto: {
//     flex: 1,
//     height: 150,

//     justifyContent: "center",
//     alignItems: "center",

//     backgroundColor: Colors.surface,

//     borderWidth: 1.5,
//     borderColor: Colors.primary,

//     borderStyle: "dashed",

//     borderRadius: Radius.md,
//   },

//   addVideo: {
//     flex: 1,
//     height: 150,

//     justifyContent: "center",
//     alignItems: "center",

//     backgroundColor: Colors.surface,

//     borderWidth: 1,
//     borderColor: Colors.border,

//     borderRadius: Radius.md,
//   },

//   cameraCircle: {
//     width: 48,
//     height: 48,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: 24,

//     backgroundColor: Colors.errorLight,
//   },

//   videoIcon: {
//     width: 48,
//     height: 48,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: 24,

//     backgroundColor: Colors.secondaryLight,
//   },

//   addPhotoText: {
//     ...Typography.bodyMedium,
//     marginTop: 9,
//     color: Colors.textPrimary,
//   },

//   photoHint: {
//     ...Typography.caption,
//     marginTop: 3,
//     color: Colors.textMuted,
//   },

//   videoText: {
//     ...Typography.bodyMedium,
//     marginTop: 9,
//     color: Colors.textPrimary,
//   },

//   videoHint: {
//     ...Typography.caption,
//     marginTop: 3,
//     color: Colors.textMuted,
//   },

//   // ==================================================
//   // INPUT
//   // ==================================================

//   inputContainer: {
//     height: 52,

//     flexDirection: "row",
//     alignItems: "center",

//     paddingHorizontal: 14,

//     backgroundColor: Colors.searchBackground,

//     borderWidth: 1,
//     borderColor: Colors.searchBorder,

//     borderRadius: Radius.md,
//   },

//   input: {
//     ...Typography.bodyLarge,

//     flex: 1,

//     color: Colors.textPrimary,
//   },

//   inputHint: {
//     ...Typography.caption,

//     marginTop: 6,

//     color: Colors.textMuted,
//   },

//   // ==================================================
//   // CATEGORY
//   // ==================================================

//   chipsList: {
//     paddingRight: 16,
//   },

//   categoryChip: {
//     paddingHorizontal: 14,
//     paddingVertical: 9,

//     marginRight: 8,

//     backgroundColor: Colors.chipBackground,

//     borderRadius: Radius.md,
//   },

//   categoryChipActive: {
//     backgroundColor: Colors.primary,
//   },

//   categoryText: {
//     ...Typography.label,
//     color: Colors.chipText,
//   },

//   categoryTextActive: {
//     color: Colors.chipActiveText,
//   },

//   // ==================================================
//   // PRICE
//   // ==================================================

//   priceInputContainer: {
//     height: 54,

//     flexDirection: "row",
//     alignItems: "center",

//     paddingHorizontal: 14,

//     backgroundColor: Colors.surface,

//     borderWidth: 1,
//     borderColor: Colors.searchBorder,

//     borderRadius: Radius.md,
//   },

//   currency: {
//     ...Typography.bodyMedium,
//     color: Colors.textSecondary,

//     paddingRight: 10,

//     borderRightWidth: 1,
//     borderRightColor: Colors.border,
//   },

//   priceInput: {
//     ...Typography.priceLarge,

//     flex: 1,

//     marginLeft: 12,

//     color: Colors.textPrimary,
//   },

//   birr: {
//     ...Typography.bodyMedium,
//     color: Colors.textSecondary,
//   },
//   priceHint: {
//     ...Typography.caption,

//     marginTop: 6,

//     color: Colors.textMuted,
//   },

//   // ==================================================
//   // CONDITION
//   // ==================================================

//   conditionsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },

//   conditionChip: {
//     minHeight: 40,

//     paddingHorizontal: 13,

//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,

//     backgroundColor: Colors.chipBackground,

//     borderRadius: Radius.md,
//   },

//   conditionChipActive: {
//     backgroundColor: Colors.primary,
//   },

//   conditionText: {
//     ...Typography.label,
//     color: Colors.chipText,
//   },

//   conditionTextActive: {
//     color: Colors.white,
//   },

//   // ==================================================
//   // DESCRIPTION
//   // ==================================================

//   descriptionContainer: {
//     minHeight: 130,

//     paddingHorizontal: 14,
//     paddingVertical: 12,

//     backgroundColor: Colors.surface,

//     borderWidth: 1,
//     borderColor: Colors.searchBorder,

//     borderRadius: Radius.md,
//   },

//   descriptionInput: {
//     ...Typography.body,

//     minHeight: 105,

//     color: Colors.textPrimary,
//   },

//   // ==================================================
//   // LOCATION
//   // ==================================================

//   locationContainer: {
//     minHeight: 70,

//     paddingHorizontal: 12,

//     flexDirection: "row",
//     alignItems: "center",

//     backgroundColor: Colors.locationBackground,

//     borderWidth: 1,
//     borderColor: Colors.border,

//     borderRadius: Radius.md,
//   },

//   locationIconContainer: {
//     width: 42,
//     height: 42,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.md,

//     backgroundColor: Colors.errorLight,
//   },

//   locationInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   locationTitle: {
//     ...Typography.bodyMedium,
//     color: Colors.textPrimary,
//   },

//   locationSubtitle: {
//     ...Typography.caption,
//     marginTop: 2,
//     color: Colors.textSecondary,
//   },
//   // ==================================================
//   // LOCATION PICKER
//   // ==================================================

//   locationOverlay: {
//     position: "absolute",

//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,

//     justifyContent: "flex-end",

//     backgroundColor: Colors.overlayMedium,

//     zIndex: 1000,
//   },

//   locationModal: {
//     height: "78%",

//     backgroundColor: Colors.surface,

//     borderTopLeftRadius: Radius.lg,
//     borderTopRightRadius: Radius.lg,

//     paddingTop: 8,

//     overflow: "hidden",
//   },

//   locationModalHeader: {
//     height: 58,

//     paddingHorizontal: 16,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     borderBottomWidth: 1,
//     borderBottomColor: Colors.borderLight,
//   },

//   modalBackButton: {
//     width: 40,
//     height: 40,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.md,

//     backgroundColor: Colors.secondaryLight,
//   },

//   modalHeaderSpace: {
//     width: 40,
//   },

//   locationModalTitle: {
//     ...Typography.h3,

//     color: Colors.textPrimary,
//   },

//   locationSearch: {
//     height: 48,

//     marginHorizontal: 16,
//     marginVertical: 12,

//     paddingHorizontal: 14,

//     flexDirection: "row",
//     alignItems: "center",

//     backgroundColor: Colors.searchBackground,

//     borderWidth: 1,
//     borderColor: Colors.searchBorder,

//     borderRadius: Radius.md,
//   },

//   locationSearchInput: {
//     ...Typography.body,

//     flex: 1,

//     marginLeft: 8,

//     color: Colors.textPrimary,
//   },

//   locationList: {
//     paddingHorizontal: 16,
//     paddingBottom: 30,
//   },

//   locationOption: {
//     minHeight: 58,

//     paddingHorizontal: 10,

//     flexDirection: "row",
//     alignItems: "center",

//     borderBottomWidth: 1,
//     borderBottomColor: Colors.borderLight,
//   },

//   locationOptionIcon: {
//     width: 38,
//     height: 38,

//     justifyContent: "center",
//     alignItems: "center",

//     marginRight: 12,

//     borderRadius: 19,

//     backgroundColor: Colors.errorLight,
//   },

//   locationOptionText: {
//     ...Typography.bodyMedium,

//     flex: 1,

//     color: Colors.textPrimary,
//   },

//   changeText: {
//     ...Typography.label,

//     color: Colors.primary,
//   },

//   // ==================================================
//   // TRUST
//   // ==================================================

//   trustCard: {
//     flexDirection: "row",

//     padding: 14,

//     marginBottom: 20,

//     backgroundColor: Colors.infoLight,

//     borderRadius: Radius.md,
//   },

//   trustIcon: {
//     width: 38,
//     height: 38,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: 19,

//     backgroundColor: Colors.white,
//   },

//   trustContent: {
//     flex: 1,
//     marginLeft: 10,
//   },

//   trustTitle: {
//     ...Typography.bodyMedium,
//     color: Colors.textPrimary,
//   },

//   trustText: {
//     ...Typography.caption,

//     marginTop: 3,

//     color: Colors.textSecondary,
//   },

//   // ==================================================
//   // POST BUTTON
//   // ==================================================

//   postButton: {
//     height: 54,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",

//     gap: 8,

//     backgroundColor: Colors.buttonPrimary,

//     borderRadius: Radius.md,
//   },

//   postButtonText: {
//     ...Typography.button,
//     color: Colors.white,
//   },

//   bottomText: {
//     ...Typography.caption,

//     marginTop: 10,

//     textAlign: "center",

//     color: Colors.textMuted,
//   },
// });

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { Colors } from "@/constants/src/theme/colors";
import { Icons } from "@/constants/src/theme/icons";
import { Radius } from "@/constants/src/theme/radius";
import { Typography } from "@/constants/src/theme/typography";

import { useCategories } from "@/hooks/useCategories";
import { useConditions } from "@/hooks/useConditions";
import { useLocations } from "@/hooks/useLocations";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useListingTypes } from "@/hooks/useListingTypes";
import { useCreateListing } from "@/hooks/useCreateListing";
import { useCreateListingMedia } from "@/hooks/useCreateListingMedia";

type SelectedMedia = {
  uri: string;
  type: "image" | "video";
  name: string;
  mimeType: string;
};

export default function PostScreen() {
  // ==================================================
  // FORM STATE
  // ==================================================

  const [activeCategory, setActiveCategory] = useState("");
  const [activeCondition, setActiveCondition] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null,
  );

  const [locationStep, setLocationStep] = useState<"city" | "area">("city");

  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);

  // ==================================================
  // DJANGO API DATA
  // ==================================================

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const { data: conditions = [], isLoading: conditionsLoading } =
    useConditions();

  const { data: locations = [], isLoading: locationsLoading } = useLocations();

  const { data: currencies = [] } = useCurrencies();

  const {
    data: listingTypes = [],
    isLoading: listingTypesLoading,
    isError: listingTypesError,
  } = useListingTypes();

  // ==================================================
  // MUTATIONS
  // ==================================================

  const createListingMutation = useCreateListing();
  const createMediaMutation = useCreateListingMedia();

  // ==================================================
  // DEFAULT CATEGORY
  // ==================================================

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  // ==================================================
  // DEFAULT CONDITION
  // ==================================================

  useEffect(() => {
    if (!activeCondition && conditions.length > 0) {
      setActiveCondition(conditions[0].id);
    }
  }, [conditions, activeCondition]);

  // ==================================================
  // LOCATIONS FROM DJANGO
  // ==================================================

  const cities = useMemo(() => {
    const uniqueCities = new Map<string, (typeof locations)[number]>();

    locations.forEach((location) => {
      if (!uniqueCities.has(location.city)) {
        uniqueCities.set(location.city, location);
      }
    });

    return Array.from(uniqueCities.values());
  }, [locations]);

  const areas = useMemo(() => {
    if (!selectedCity) {
      return [];
    }

    return locations.filter((location) => location.city === selectedCity);
  }, [locations, selectedCity]);

  // ==================================================
  // PRICE
  // ==================================================

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setPrice("");
      return;
    }

    const amount = Number(numericValue);

    if (amount <= 5000) {
      setPrice(numericValue);
    }
  };

  // ==================================================
  // PICK IMAGES
  // ==================================================

  const pickImages = async () => {
    if (selectedMedia.length >= 8) {
      Alert.alert("Photo limit", "You can add up to 8 photos.");
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Suqe needs photo library permission to add photos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: 8 - selectedMedia.length,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const newMedia: SelectedMedia[] = result.assets.map((asset, index) => ({
      uri: asset.uri,
      type: "image",
      name:
        asset.fileName ??
        `suqe-${Date.now()}-${index}.${asset.mimeType?.split("/")[1] ?? "jpg"}`,
      mimeType: asset.mimeType ?? "image/jpeg",
    }));

    setSelectedMedia((current) => [...current, ...newMedia].slice(0, 8));
  };

  // ==================================================
  // PICK VIDEO
  // ==================================================

  const pickVideo = async () => {
    const existingVideo = selectedMedia.some((media) => media.type === "video");

    if (existingVideo) {
      Alert.alert("Video limit", "You can add one video to a listing.");
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Suqe needs photo library permission to add a video.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsMultipleSelection: false,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];

    if (!asset) {
      return;
    }

    const video: SelectedMedia = {
      uri: asset.uri,
      type: "video",
      name: asset.fileName ?? `suqe-${Date.now()}.mp4`,
      mimeType: asset.mimeType ?? "video/mp4",
    };

    setSelectedMedia((current) => [...current, video].slice(0, 8));
  };

  // ==================================================
  // REMOVE MEDIA
  // ==================================================

  const removeMedia = (index: number) => {
    setSelectedMedia((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  // ==================================================
  // CREATE LISTING
  // ==================================================

  const handlePost = async () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter an item title.");
      return;
    }

    if (!price.trim()) {
      Alert.alert("Missing price", "Please enter a price.");
      return;
    }

    if (!activeCategory) {
      Alert.alert("Missing category", "Please choose a category.");
      return;
    }

    if (!activeCondition) {
      Alert.alert("Missing condition", "Please choose a condition.");
      return;
    }

    if (!selectedLocationId) {
      Alert.alert("Missing location", "Please choose a location.");
      return;
    }

    if (selectedMedia.length === 0) {
      Alert.alert("Add photos", "Please add at least one photo.");
      return;
    }

    const currency =
      currencies.find((item) => item.code === "ETB") ?? currencies[0];

    const listingType =
      listingTypes.find((item) => item.slug === "sale") ?? listingTypes[0];

    if (!currency) {
      Alert.alert(
        "Currency unavailable",
        "No currency is available from the server.",
      );
      return;
    }

    if (!listingType) {
      Alert.alert(
        "Listing type unavailable",
        "No listing type is available from the server.",
      );
      return;
    }

    try {
      // ==================================================
      // STEP 1 — CREATE LISTING
      // ==================================================

      const listing = await createListingMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        price,
        currency_id: currency.id,
        category_id: activeCategory,
        condition_id: activeCondition,
        listing_type_id: listingType.id,
        location_id: selectedLocationId,
      });

      console.log("LISTING CREATED:", listing.id);

      // ==================================================
      // STEP 2 — UPLOAD MEDIA
      // POST /api/v1/media/
      // ==================================================

      for (let index = 0; index < selectedMedia.length; index++) {
        const media = selectedMedia[index];

        console.log("UPLOADING MEDIA:", {
          listing_id: listing.id,
          media_type: media.type,
          position: index,
          is_cover: index === 0,
        });

        await createMediaMutation.mutateAsync({
          listing_id: listing.id,
          media_type: media.type,
          file: {
            uri: media.uri,
            name: media.name,
            type: media.mimeType,
          },
          position: index,
          is_cover: index === 0,
        });
      }

      Alert.alert("Success", "Your item has been created successfully.");

      // RESET FORM

      setTitle("");
      setPrice("");
      setDescription("");
      setSelectedMedia([]);
      setSelectedCity("");
      setSelectedArea("");
      setSelectedLocationId(null);
    } catch (error: any) {
      console.error("CREATE LISTING ERROR:", error?.response?.data ?? error);

      Alert.alert(
        "Unable to post",
        error?.response?.data?.detail ??
          "Something went wrong while creating your listing.",
      );
    }
  };

  const isPosting =
    createListingMutation.isPending || createMediaMutation.isPending;

  // ==================================================
  // UI
  // ==================================================

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topOverlay} />

      {/* ==================================================
          TOP BAR
      ================================================== */}

      <View style={styles.topBar}>
        <Pressable style={styles.topBarButton}>
          <Ionicons
            name="close-outline"
            size={Icons.action.size}
            color={Colors.actionIcon}
          />
        </Pressable>

        <Text style={styles.logo}>Suqe</Text>

        <Pressable style={styles.helpButton}>
          <Ionicons
            name="help-circle-outline"
            size={22}
            color={Colors.actionIcon}
          />
        </Pressable>
      </View>

      {/* ==================================================
          FORM
      ================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <View style={styles.header}>
          <Text style={styles.heading}>Sell an Item</Text>

          <Text style={styles.subheading}>
            List your item in seconds and reach local buyers.
          </Text>
        </View>

        {/* ==================================================
            PHOTOS
        ================================================== */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos</Text>

            <Text style={styles.counter}>
              {selectedMedia.filter((item) => item.type === "image").length}/8
            </Text>
          </View>

          {selectedMedia.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.selectedMediaList}
            >
              {selectedMedia.map((media, index) => (
                <View
                  key={`${media.uri}-${index}`}
                  style={styles.selectedPhoto}
                >
                  {media.type === "image" ? (
                    <Image
                      source={{ uri: media.uri }}
                      style={styles.selectedPhotoImage}
                    />
                  ) : (
                    <View style={styles.videoPreview}>
                      <Ionicons
                        name="videocam"
                        size={34}
                        color={Colors.white}
                      />

                      <Text style={styles.videoPreviewText}>Video</Text>
                    </View>
                  )}

                  <Pressable
                    style={styles.removePhotoButton}
                    onPress={() => removeMedia(index)}
                  >
                    <Ionicons name="close" size={16} color={Colors.white} />
                  </Pressable>

                  {index === 0 && (
                    <View style={styles.coverBadge}>
                      <Text style={styles.coverBadgeText}>Cover</Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}

          <View style={styles.photoGrid}>
            <Pressable
              style={styles.addPhoto}
              onPress={pickImages}
              disabled={selectedMedia.length >= 8}
            >
              <View style={styles.cameraCircle}>
                <Ionicons
                  name="camera-outline"
                  size={25}
                  color={Colors.primary}
                />
              </View>

              <Text style={styles.addPhotoText}>Add photos</Text>

              <Text style={styles.photoHint}>Up to 8 photos</Text>
            </Pressable>

            <Pressable
              style={styles.addVideo}
              onPress={pickVideo}
              disabled={selectedMedia.length >= 8}
            >
              <View style={styles.videoIcon}>
                <Ionicons
                  name="videocam-outline"
                  size={24}
                  color={Colors.textSecondary}
                />
              </View>

              <Text style={styles.videoText}>Add video</Text>

              <Text style={styles.videoHint}>Optional</Text>
            </Pressable>
          </View>
        </View>

        {/* ==================================================
            TITLE
        ================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you selling?</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholder="e.g. iPhone 13 Pro Max"
              placeholderTextColor={Colors.searchPlaceholder}
              maxLength={80}
            />
          </View>

          <Text style={styles.inputHint}>
            A clear title helps buyers find your item.
          </Text>
        </View>

        {/* ==================================================
            CATEGORY
        ================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>

          {categoriesLoading ? (
            <Text style={styles.loadingText}>Loading categories...</Text>
          ) : (
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.chipsList}
              renderItem={({ item }) => {
                const active = activeCategory === item.id;

                return (
                  <Pressable
                    onPress={() => setActiveCategory(item.id)}
                    style={[
                      styles.categoryChip,
                      active && styles.categoryChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        active && styles.categoryTextActive,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                );
              }}
            />
          )}
        </View>

        {/* ==================================================
            PRICE
        ================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price</Text>

          <View style={styles.priceInputContainer}>
            <Text style={styles.currency}>ETB</Text>

            <TextInput
              value={price}
              onChangeText={handlePriceChange}
              style={styles.priceInput}
              placeholder="0"
              placeholderTextColor={Colors.searchPlaceholder}
              keyboardType="numeric"
              maxLength={4}
            />

            <Text style={styles.birr}>Birr</Text>
          </View>

          <Text style={styles.priceHint}>
            Price must be between Free and 5,000 Birr.
          </Text>
        </View>

        {/* ==================================================
            CONDITION
        ================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condition</Text>

          {conditionsLoading ? (
            <Text style={styles.loadingText}>Loading conditions...</Text>
          ) : (
            <View style={styles.conditionsContainer}>
              {conditions.map((item) => {
                const active = activeCondition === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setActiveCondition(item.id)}
                    style={[
                      styles.conditionChip,
                      active && styles.conditionChipActive,
                    ]}
                  >
                    {active && (
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color={Colors.white}
                      />
                    )}

                    <Text
                      style={[
                        styles.conditionText,
                        active && styles.conditionTextActive,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Description</Text>

            <Text style={styles.counter}>{description.length}/500</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.descriptionInput}
              placeholder="Tell buyers about your item..."
              placeholderTextColor={Colors.searchPlaceholder}
              multiline
              textAlignVertical="top"
              maxLength={500}
            />
          </View>
        </View>

        {/* ==================================================
            LOCATION
        ================================================== */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Location</Text>

            {selectedCity && (
              <Pressable onPress={() => setShowLocationPicker(true)}>
                <Text style={styles.changeText}>Change</Text>
              </Pressable>
            )}
          </View>

          <Pressable
            style={styles.locationContainer}
            onPress={() => {
              setLocationStep("city");
              setShowLocationPicker(true);
            }}
          >
            <View style={styles.locationIconContainer}>
              <Ionicons
                name="location-outline"
                size={21}
                color={Colors.locationIcon}
              />
            </View>

            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>
                {selectedCity || "Choose location"}
              </Text>

              <Text style={styles.locationSubtitle}>
                {selectedArea || "Select your city and area"}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textMuted}
            />
          </Pressable>

          {locationsLoading && (
            <Text style={styles.loadingText}>Loading locations...</Text>
          )}
        </View>

        {/* ==================================================
            SAFETY / TRUST
        ================================================== */}

        <View style={styles.trustCard}>
          <View style={styles.trustIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color={Colors.verified}
            />
          </View>

          <View style={styles.trustContent}>
            <Text style={styles.trustTitle}>Sell safely on Suqe</Text>

            <Text style={styles.trustText}>
              Meet buyers in a safe public place and never share sensitive
              account information.
            </Text>
          </View>
        </View>

        {/* ==================================================
            POST BUTTON
        ================================================== */}

        <Pressable
          style={[styles.postButton, isPosting && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={isPosting}
        >
          <Ionicons name="add-circle-outline" size={21} color={Colors.white} />

          <Text style={styles.postButtonText}>
            {createListingMutation.isPending
              ? "Creating listing..."
              : createMediaMutation.isPending
                ? "Uploading media..."
                : "Post Item"}
          </Text>
        </Pressable>

        <Text style={styles.bottomText}>
          By posting, you agree to Suqe's marketplace guidelines.
        </Text>
      </ScrollView>

      {/* ==================================================
          LOCATION PICKER
      ================================================== */}

      {showLocationPicker && (
        <View style={styles.locationOverlay}>
          <View style={styles.locationModal}>
            {/* HEADER */}

            <View style={styles.locationModalHeader}>
              <Pressable
                onPress={() => {
                  if (locationStep === "area") {
                    setLocationStep("city");
                  } else {
                    setShowLocationPicker(false);
                  }
                }}
                style={styles.modalBackButton}
              >
                <Ionicons
                  name={
                    locationStep === "area" ? "arrow-back" : "close-outline"
                  }
                  size={22}
                  color={Colors.textPrimary}
                />
              </Pressable>

              <Text style={styles.locationModalTitle}>
                {locationStep === "city" ? "Choose City" : selectedCity}
              </Text>

              <View style={styles.modalHeaderSpace} />
            </View>

            {/* SEARCH */}

            <View style={styles.locationSearch}>
              <Ionicons
                name="search-outline"
                size={20}
                color={Colors.searchIcon}
              />

              <TextInput
                style={styles.locationSearchInput}
                placeholder={
                  locationStep === "city" ? "Search city..." : "Search area..."
                }
                placeholderTextColor={Colors.searchPlaceholder}
              />
            </View>

            {/* CITY LIST */}

            {locationStep === "city" ? (
              <FlatList
                data={cities}
                keyExtractor={(item) => item.city}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.locationList}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.locationOption}
                    onPress={() => {
                      setSelectedCity(item.city);
                      setSelectedArea("");
                      setSelectedLocationId(null);
                      setLocationStep("area");
                    }}
                  >
                    <View style={styles.locationOptionIcon}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={Colors.locationIcon}
                      />
                    </View>

                    <Text style={styles.locationOptionText}>{item.city}</Text>

                    <Ionicons
                      name="chevron-forward"
                      size={19}
                      color={Colors.textMuted}
                    />
                  </Pressable>
                )}
              />
            ) : (
              <FlatList
                data={areas}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.locationList}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.locationOption}
                    onPress={() => {
                      setSelectedArea(item.area);
                      setSelectedLocationId(item.id);
                      setShowLocationPicker(false);
                      setLocationStep("city");
                    }}
                  >
                    <View style={styles.locationOptionIcon}>
                      <Ionicons
                        name="navigate-outline"
                        size={20}
                        color={Colors.locationIcon}
                      />
                    </View>

                    <Text style={styles.locationOptionText}>{item.area}</Text>

                    <Ionicons
                      name="checkmark-circle-outline"
                      size={20}
                      color={Colors.textMuted}
                    />
                  </Pressable>
                )}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ==================================================
  // CONTAINER
  // ==================================================

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.videoOverlay,
  },

  // ==================================================
  // TOP BAR
  // ==================================================

  topBar: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topBarButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.actionBackground,
  },

  helpButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.actionBackground,
  },

  logo: {
    ...Typography.h2,
    color: Colors.primary,
  },

  // ==================================================
  // HEADER
  // ==================================================

  header: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  heading: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },

  subheading: {
    ...Typography.body,
    marginTop: 5,
    color: Colors.textSecondary,
  },

  // ==================================================
  // SECTION
  // ==================================================

  section: {
    marginBottom: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: 10,
  },

  counter: {
    ...Typography.caption,
    color: Colors.textMuted,
  },

  loadingText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 4,
  },

  // ==================================================
  // MEDIA
  // ==================================================

  selectedMediaList: {
    paddingBottom: 10,
    gap: 10,
  },

  selectedPhoto: {
    width: 150,
    height: 150,
    borderRadius: Radius.md,
    overflow: "hidden",
    position: "relative",
    backgroundColor: Colors.surface,
  },

  selectedPhotoImage: {
    width: "100%",
    height: "100%",
  },

  videoPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkSurface,
  },

  videoPreviewText: {
    ...Typography.caption,
    marginTop: 6,
    color: Colors.white,
  },

  removePhotoButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.overlayMedium,
  },

  coverBadge: {
    position: "absolute",
    left: 8,
    bottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary,
  },

  coverBadgeText: {
    ...Typography.caption,
    color: Colors.white,
  },

  photoGrid: {
    flexDirection: "row",
    gap: 10,
  },

  addPhoto: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    borderRadius: Radius.md,
  },

  addVideo: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  cameraCircle: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: Colors.errorLight,
  },

  videoIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: Colors.secondaryLight,
  },

  addPhotoText: {
    ...Typography.bodyMedium,
    marginTop: 9,
    color: Colors.textPrimary,
  },

  photoHint: {
    ...Typography.caption,
    marginTop: 3,
    color: Colors.textMuted,
  },

  videoText: {
    ...Typography.bodyMedium,
    marginTop: 9,
    color: Colors.textPrimary,
  },

  videoHint: {
    ...Typography.caption,
    marginTop: 3,
    color: Colors.textMuted,
  },

  // ==================================================
  // INPUT
  // ==================================================

  inputContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: Colors.searchBackground,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: Radius.md,
  },

  input: {
    ...Typography.bodyLarge,
    flex: 1,
    color: Colors.textPrimary,
  },

  inputHint: {
    ...Typography.caption,
    marginTop: 6,
    color: Colors.textMuted,
  },

  // ==================================================
  // CATEGORY
  // ==================================================

  chipsList: {
    paddingRight: 16,
  },

  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
    backgroundColor: Colors.chipBackground,
    borderRadius: Radius.md,
  },

  categoryChipActive: {
    backgroundColor: Colors.primary,
  },

  categoryText: {
    ...Typography.label,
    color: Colors.chipText,
  },

  categoryTextActive: {
    color: Colors.chipActiveText,
  },

  // ==================================================
  // PRICE
  // ==================================================

  priceInputContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: Radius.md,
  },

  currency: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },

  priceInput: {
    ...Typography.priceLarge,
    flex: 1,
    marginLeft: 12,
    color: Colors.textPrimary,
  },

  birr: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },

  priceHint: {
    ...Typography.caption,
    marginTop: 6,
    color: Colors.textMuted,
  },

  // ==================================================
  // CONDITION
  // ==================================================

  conditionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  conditionChip: {
    minHeight: 40,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.chipBackground,
    borderRadius: Radius.md,
  },

  conditionChipActive: {
    backgroundColor: Colors.primary,
  },

  conditionText: {
    ...Typography.label,
    color: Colors.chipText,
  },

  conditionTextActive: {
    color: Colors.white,
  },

  // ==================================================
  // DESCRIPTION
  // ==================================================

  descriptionContainer: {
    minHeight: 130,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: Radius.md,
  },

  descriptionInput: {
    ...Typography.body,
    minHeight: 105,
    color: Colors.textPrimary,
  },

  // ==================================================
  // LOCATION
  // ==================================================

  locationContainer: {
    minHeight: 70,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.locationBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  locationIconContainer: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.errorLight,
  },

  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },

  locationTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },

  locationSubtitle: {
    ...Typography.caption,
    marginTop: 2,
    color: Colors.textSecondary,
  },

  // ==================================================
  // LOCATION PICKER
  // ==================================================

  locationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: Colors.overlayMedium,
    zIndex: 1000,
  },

  locationModal: {
    height: "78%",
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    paddingTop: 8,
    overflow: "hidden",
  },

  locationModalHeader: {
    height: 58,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },

  modalBackButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.secondaryLight,
  },

  modalHeaderSpace: {
    width: 40,
  },

  locationModalTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  locationSearch: {
    height: 48,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.searchBackground,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: Radius.md,
  },

  locationSearchInput: {
    ...Typography.body,
    flex: 1,
    marginLeft: 8,
    color: Colors.textPrimary,
  },

  locationList: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  locationOption: {
    minHeight: 58,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },

  locationOptionIcon: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 19,
    backgroundColor: Colors.errorLight,
  },

  locationOptionText: {
    ...Typography.bodyMedium,
    flex: 1,
    color: Colors.textPrimary,
  },

  changeText: {
    ...Typography.label,
    color: Colors.primary,
  },

  // ==================================================
  // TRUST
  // ==================================================

  trustCard: {
    flexDirection: "row",
    padding: 14,
    marginBottom: 20,
    backgroundColor: Colors.infoLight,
    borderRadius: Radius.md,
  },

  trustIcon: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    backgroundColor: Colors.white,
  },

  trustContent: {
    flex: 1,
    marginLeft: 10,
  },

  trustTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },

  trustText: {
    ...Typography.caption,
    marginTop: 3,
    color: Colors.textSecondary,
  },

  // ==================================================
  // POST BUTTON
  // ==================================================

  postButton: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: Radius.md,
  },

  postButtonDisabled: {
    opacity: 0.6,
  },

  postButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  bottomText: {
    ...Typography.caption,
    marginTop: 10,
    textAlign: "center",
    color: Colors.textMuted,
  },
});
