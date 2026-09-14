// import {
//   StyleSheet,
//   View,
//   Text,
//   Pressable,
//   TextInput,
//   FlatList,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useMemo, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";

// import { Colors } from "@/constants/src/theme/colors";
// import { Icons } from "@/constants/src/theme/icons";
// import { Typography } from "@/constants/src/theme/typography";
// import { Radius } from "@/constants/src/theme/radius";

// // ==================================================
// // TYPES
// // ==================================================

// type Listing = {
//   id: string;

//   title: string;
//   description: string;

//   price: number;
//   currency: "ETB";

//   condition: "new" | "used";

//   category: {
//     id: string;
//     name: string;
//   };

//   location: {
//     city: string;
//     area: string;
//   };

//   seller: {
//     id: string;
//     username: string;
//     displayName: string;
//     avatar: any;
//     isVerified: boolean;
//   };

//   media: {
//     id: string;
//     type: "image" | "video";
//     uri: any;
//   }[];

//   stats: {
//     likes: number;
//     views: number;
//   };

//   createdAt: string;
// };

// // ==================================================
// // SORT OPTIONS
// // ==================================================

// const sortOptions = [
//   { id: "recent", name: "Recently Added" },
//   { id: "low", name: "Lowest Price" },
//   { id: "high", name: "Highest Price" },
// ];

// // ==================================================
// // CATEGORIES
// // ==================================================

// const categories = [
//   { id: "all", name: "All" },
//   { id: "electronics", name: "Electronics" },
//   { id: "phones", name: "Phones" },
//   { id: "laptops", name: "Laptops" },
//   { id: "clothing", name: "Clothing" },
//   { id: "shoes", name: "Shoes" },
//   { id: "furniture", name: "Furniture" },
//   { id: "vehicles", name: "Vehicles" },
//   { id: "books", name: "Books" },
//   { id: "accessories", name: "Accessories" },
//   { id: "beauty", name: "Beauty" },
//   { id: "sports", name: "Sports" },
//   { id: "kids", name: "Kids & Baby" },
// ];

// // ==================================================
// // MOCK LISTINGS
// // This structure should later match your DRF serializer.
// // ==================================================

// const listings: Listing[] = [
//   {
//     id: "listing_001",

//     title: "Ceramic Mug",
//     description: "Lightly used ceramic mug in good condition.",

//     price: 300,
//     currency: "ETB",

//     condition: "used",

//     category: {
//       id: "cat_home",
//       name: "Home & Kitchen",
//     },

//     location: {
//       city: "Addis Ababa",
//       area: "Bole",
//     },

//     seller: {
//       id: "user_001",
//       username: "eba_teshale",
//       displayName: "Eba Teshale",
//       avatar: require("@/assets/images/used-bag.jpg"),
//       isVerified: false,
//     },

//     media: [
//       {
//         id: "media_001",
//         type: "image",
//         uri: require("@/assets/images/used-bag.jpg"),
//       },
//     ],

//     stats: {
//       likes: 120,
//       views: 820,
//     },

//     createdAt: "2026-08-28T10:00:00Z",
//   },

//   {
//     id: "listing_002",

//     title: "iPhone 13 Pro Max",
//     description: "Used phone in good working condition.",

//     price: 5000,
//     currency: "ETB",

//     condition: "used",

//     category: {
//       id: "cat_phones",
//       name: "Phones",
//     },

//     location: {
//       city: "Addis Ababa",
//       area: "Arada",
//     },

//     seller: {
//       id: "user_002",
//       username: "abebe_biqil",
//       displayName: "Abebe Biqil",
//       avatar: require("@/assets/images/used-bag.jpg"),
//       isVerified: true,
//     },

//     media: [
//       {
//         id: "media_002",
//         type: "image",
//         uri: require("@/assets/images/used-bag.jpg"),
//       },
//       {
//         id: "media_003",
//         type: "image",
//         uri: require("@/assets/images/used-bag.jpg"),
//       },
//     ],

//     stats: {
//       likes: 842,
//       views: 4200,
//     },

//     createdAt: "2026-08-27T14:00:00Z",
//   },

//   {
//     id: "listing_003",

//     title: "Grade 10 Physics Book",
//     description: "Previously used school book, still in good condition.",

//     price: 500,
//     currency: "ETB",

//     condition: "used",

//     category: {
//       id: "cat_books",
//       name: "Books",
//     },

//     location: {
//       city: "Ambo",
//       area: "Ambo Town",
//     },

//     seller: {
//       id: "user_003",
//       username: "hana_student",
//       displayName: "Hana Student",
//       avatar: require("@/assets/images/used-bag.jpg"),
//       isVerified: false,
//     },

//     media: [
//       {
//         id: "media_004",
//         type: "image",
//         uri: require("@/assets/images/used-bag.jpg"),
//       },
//     ],

//     stats: {
//       likes: 542,
//       views: 2100,
//     },

//     createdAt: "2026-08-26T09:00:00Z",
//   },

//   {
//     id: "listing_004",

//     title: "School Backpack",
//     description: "Used backpack suitable for school or university.",

//     price: 1000,
//     currency: "ETB",

//     condition: "used",

//     category: {
//       id: "cat_accessories",
//       name: "Accessories",
//     },

//     location: {
//       city: "Addis Ababa",
//       area: "Kazanchis",
//     },

//     seller: {
//       id: "user_001",
//       username: "eba_teshale",
//       displayName: "Eba Teshale",
//       avatar: require("@/assets/images/used-bag.jpg"),
//       isVerified: false,
//     },

//     media: [
//       {
//         id: "media_005",
//         type: "image",
//         uri: require("@/assets/images/used-bag.jpg"),
//       },
//     ],

//     stats: {
//       likes: 210,
//       views: 1200,
//     },

//     createdAt: "2026-08-25T12:00:00Z",
//   },
// ];

// // ==================================================
// // SCREEN
// // ==================================================

// export default function ExploreScreen() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("recent");
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // ==================================================
//   // FILTER + SORT
//   // ==================================================

//   const displayedListings = useMemo(() => {
//     let result = [...listings];

//     // Category
//     if (activeCategory !== "all") {
//       result = result.filter(
//         (item) =>
//           item.category.id === activeCategory ||
//           item.category.name.toLowerCase() ===
//             categories
//               .find((category) => category.id === activeCategory)
//               ?.name.toLowerCase(),
//       );
//     }

//     // Search
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();

//       result = result.filter(
//         (item) =>
//           item.title.toLowerCase().includes(query) ||
//           item.description.toLowerCase().includes(query) ||
//           item.category.name.toLowerCase().includes(query) ||
//           item.seller.displayName.toLowerCase().includes(query),
//       );
//     }

//     // Sort
//     if (sortOption === "low") {
//       result.sort((a, b) => a.price - b.price);
//     }

//     if (sortOption === "high") {
//       result.sort((a, b) => b.price - a.price);
//     }

//     if (sortOption === "recent") {
//       result.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//       );
//     }

//     return result;
//   }, [activeCategory, searchQuery, sortOption]);

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       {/* ==================================================
//           TOP BAR
//       ================================================== */}

//       <View style={styles.topBar}>
//         <Pressable style={styles.topBarButton}>
//           <Ionicons
//             name="map-outline"
//             size={Icons.action.size}
//             color={Colors.actionIcon}
//           />
//         </Pressable>

//         <Text style={styles.logo}>Suqe</Text>

//         <Pressable style={styles.topBarButton}>
//           <Ionicons
//             name="notifications-outline"
//             size={Icons.search.size}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       {/* ==================================================
//           SEARCH
//       ================================================== */}

//       <View style={styles.topSearch}>
//         <View style={styles.search}>
//           <Ionicons
//             name="search-outline"
//             size={Icons.search.size}
//             color={Colors.searchIcon}
//           />

//           <TextInput
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             style={styles.searchInput}
//             placeholder="Search items..."
//             placeholderTextColor={Colors.searchPlaceholder}
//             returnKeyType="search"
//           />

//           {searchQuery.length > 0 && (
//             <Pressable onPress={() => setSearchQuery("")}>
//               <Ionicons
//                 name="close-circle"
//                 size={18}
//                 color={Colors.textMuted}
//               />
//             </Pressable>
//           )}
//         </View>

//         <Pressable
//           style={styles.filterButton}
//           onPress={() => setShowFilters((prev) => !prev)}
//         >
//           <Ionicons
//             name="filter-outline"
//             size={Icons.search.size}
//             color={Colors.searchIcon}
//           />
//         </Pressable>
//       </View>

//       {/* ==================================================
//           CATEGORIES
//       ================================================== */}

//       <View style={styles.categoriesContainer}>
//         <FlatList
//           data={categories}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.categoriesList}
//           renderItem={({ item }) => {
//             const isActive = activeCategory === item.id;

//             return (
//               <Pressable
//                 onPress={() => setActiveCategory(item.id)}
//                 style={[styles.category, isActive && styles.categoryActive]}
//               >
//                 <Text
//                   style={[
//                     styles.categoryText,
//                     isActive && styles.categoryTextActive,
//                   ]}
//                 >
//                   {item.name}
//                 </Text>
//               </Pressable>
//             );
//           }}
//         />
//       </View>

//       {/* ==================================================
//           PRODUCTS
//       ================================================== */}

//       <View style={styles.productsContainer}>
//         <FlatList
//           data={displayedListings}
//           keyExtractor={(item) => item.id}
//           numColumns={2}
//           columnWrapperStyle={styles.productRow}
//           contentContainerStyle={styles.productsList}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <Pressable style={styles.productCard}>
//               {/* IMAGE */}

//               <View style={styles.productImageContainer}>
//                 <Image
//                   source={item.media[0].uri}
//                   style={styles.productImage}
//                   resizeMode="cover"
//                 />

//                 {/* FAVORITE */}

//                 <Pressable
//                   style={styles.favoriteButton}
//                   onPress={(event) => event.stopPropagation()}
//                 >
//                   <Ionicons
//                     name="heart-outline"
//                     size={19}
//                     color={Colors.white}
//                   />
//                 </Pressable>

//                 {/* MEDIA COUNT */}

//                 {item.media.length > 1 && (
//                   <View style={styles.mediaCount}>
//                     <Ionicons
//                       name="images-outline"
//                       size={12}
//                       color={Colors.white}
//                     />

//                     <Text style={styles.mediaCountText}>
//                       {item.media.length}
//                     </Text>
//                   </View>
//                 )}

//                 {/* CONDITION */}

//                 {/* <View style={styles.conditionBadge}>
//                   <Text style={styles.conditionText}>
//                     {item.condition === "used" ? "Used" : "New"}
//                   </Text>
//                 </View> */}

//                 {/* PRICE */}

//                 {/* <View style={styles.priceBadge}>
//                   <Text style={styles.priceText}>
//                     {item.price.toLocaleString()} {item.currency}
//                   </Text>
//                 </View> */}
//               </View>

//               {/* INFO */}

//               <View style={styles.productInfo}>
//                 <View></View>
//                 <Text style={styles.priceText}>
//                   {item.price.toLocaleString()} {item.currency}
//                 </Text>
//                 <Text style={styles.productName} numberOfLines={1}>
//                   {item.title}
//                 </Text>

//                 <Text style={styles.productDescription} numberOfLines={2}>
//                   {item.description}
//                 </Text>

//                 {/* SELLER */}

//                 <View style={styles.sellerRow}>
//                   <Image
//                     source={item.seller.avatar}
//                     style={styles.sellerAvatar}
//                   />

//                   <View style={styles.sellerInfo}>
//                     <View style={styles.sellerNameRow}>
//                       <Text style={styles.seller} numberOfLines={1}>
//                         {item.seller.displayName}
//                       </Text>

//                       {item.seller.isVerified && (
//                         <Ionicons
//                           name="checkmark-circle"
//                           size={14}
//                           color={Colors.verified}
//                         />
//                       )}
//                     </View>

//                     <Text style={styles.location} numberOfLines={1}>
//                       {item.location.area}, {item.location.city}
//                     </Text>
//                   </View>
//                 </View>

//                 {/* META */}

//                 {/* <View style={styles.productMeta}>
//                   <View style={styles.metaItem}>
//                     <Ionicons
//                       name="heart-outline"
//                       size={14}
//                       color={Colors.textMuted}
//                     />

//                     <Text style={styles.metaText}>{item.stats.likes}</Text>
//                   </View>

//                   <View style={styles.metaItem}>
//                     <Ionicons
//                       name="eye-outline"
//                       size={14}
//                       color={Colors.textMuted}
//                     />

//                     <Text style={styles.metaText}>{item.stats.views}</Text>
//                   </View>
//                 </View> */}
//               </View>
//             </Pressable>
//           )}
//           ListEmptyComponent={
//             <View style={styles.emptyState}>
//               <Ionicons
//                 name="search-outline"
//                 size={34}
//                 color={Colors.primary}
//               />

//               <Text style={styles.emptyTitle}>No items found</Text>

//               <Text style={styles.emptyText}>
//                 Try another search or category.
//               </Text>
//             </View>
//           }
//         />
//       </View>

//       {/* ==================================================
//           FILTER MENU
//       ================================================== */}

//       {showFilters && (
//         <View style={styles.filterMenu}>
//           <Text style={styles.filterTitle}>Sort by</Text>

//           {sortOptions.map((option) => {
//             const isActive = sortOption === option.id;

//             return (
//               <Pressable
//                 key={option.id}
//                 onPress={() => {
//                   setSortOption(option.id);
//                   setShowFilters(false);
//                 }}
//                 style={[styles.sortOption, isActive && styles.sortOptionActive]}
//               >
//                 <Text
//                   style={[
//                     styles.sortOptionText,
//                     isActive && styles.sortOptionTextActive,
//                   ]}
//                 >
//                   {option.name}
//                 </Text>

//                 {isActive && (
//                   <Ionicons name="checkmark" size={20} color={Colors.primary} />
//                 )}
//               </Pressable>
//             );
//           })}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// // ==================================================
// // STYLES
// // ==================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },

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

//   logo: {
//     ...Typography.h2,
//     color: Colors.primary,
//   },

//   topSearch: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//     paddingBottom: 12,
//     flexDirection: "row",
//     gap: 10,
//   },

//   search: {
//     flex: 1,
//     height: 48,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 14,
//     backgroundColor: Colors.searchBackground,
//     borderWidth: 1,
//     borderColor: Colors.searchBorder,
//     borderRadius: Radius.md,
//   },

//   searchInput: {
//     ...Typography.bodyLarge,
//     flex: 1,
//     marginLeft: 8,
//     color: Colors.textPrimary,
//   },

//   filterButton: {
//     width: 48,
//     height: 48,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.searchBackground,
//     borderWidth: 1,
//     borderColor: Colors.searchBorder,
//     borderRadius: Radius.md,
//   },

//   categoriesContainer: {
//     height: 52,
//   },

//   categoriesList: {
//     paddingHorizontal: 16,
//     alignItems: "center",
//   },

//   category: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     marginRight: 8,
//     backgroundColor: Colors.chipBackground,
//     borderRadius: Radius.md,
//   },

//   categoryActive: {
//     backgroundColor: Colors.primary,
//   },

//   categoryText: {
//     ...Typography.label,
//     color: Colors.chipText,
//   },

//   categoryTextActive: {
//     color: Colors.white,
//   },

//   productsContainer: {
//     flex: 1,
//   },

//   productsList: {
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 100,
//   },

//   productRow: {
//     justifyContent: "space-between",
//   },

//   productCard: {
//     width: "48.5%",
//     marginBottom: 16,
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.borderLight,
//     borderRadius: Radius.md,
//     overflow: "hidden",
//   },

//   productImageContainer: {
//     width: "100%",
//     aspectRatio: 1,
//     position: "relative",
//     backgroundColor: Colors.surfaceLight,
//   },

//   productImage: {
//     width: "100%",
//     height: "100%",
//   },

//   favoriteButton: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     width: 34,
//     height: 34,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 17,
//     backgroundColor: "rgba(0,0,0,0.55)",
//   },

//   mediaCount: {
//     position: "absolute",
//     top: 8,
//     left: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     paddingHorizontal: 7,
//     paddingVertical: 5,
//     borderRadius: Radius.md,
//     backgroundColor: "rgba(0,0,0,0.6)",
//   },

//   mediaCountText: {
//     ...Typography.caption,
//     color: Colors.white,
//   },

//   conditionBadge: {
//     position: "absolute",
//     left: 8,
//     top: 50,
//     paddingHorizontal: 7,
//     paddingVertical: 4,
//     borderRadius: Radius.md,
//     backgroundColor: "rgba(0,0,0,0.55)",
//   },

//   conditionText: {
//     ...Typography.caption,
//     color: Colors.white,
//   },

//   priceBadge: {
//     position: "absolute",
//     left: 8,
//     bottom: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     borderRadius: Radius.md,
//     backgroundColor: Colors.white,
//   },

//   priceText: {
//     ...Typography.priceLarge,
//     color: Colors.primary,
//   },

//   productInfo: {
//     padding: 10,
//   },

//   productName: {
//     ...Typography.bodyMedium,
//     color: Colors.textPrimary,
//   },

//   productDescription: {
//     ...Typography.caption,
//     marginTop: 4,
//     color: Colors.textSecondary,
//   },

//   sellerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },

//   sellerAvatar: {
//     width: 20,
//     height: 20,
//     borderRadius: Radius.md,
//     backgroundColor: Colors.surfaceLight,
//   },

//   sellerInfo: {
//     flex: 1,
//     marginLeft: 8,
//   },

//   sellerNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },

//   seller: {
//     flex: 1,
//     ...Typography.tab,
//     color: Colors.textPrimary,
//   },

//   location: {
//     ...Typography.caption,
//     marginTop: 2,
//     fontWeight: "900",
//     color: Colors.location,
//   },

//   productMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginTop: 9,
//   },

//   metaItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },

//   metaText: {
//     ...Typography.caption,
//     color: Colors.textMuted,
//   },

//   emptyState: {
//     alignItems: "center",
//     paddingVertical: 70,
//   },

//   emptyTitle: {
//     ...Typography.h3,
//     marginTop: 12,
//     color: Colors.textPrimary,
//   },

//   emptyText: {
//     ...Typography.body,
//     marginTop: 5,
//     color: Colors.textSecondary,
//   },

//   filterMenu: {
//     position: "absolute",
//     top: 116,
//     right: 16,
//     zIndex: 100,
//     width: 220,
//     padding: 12,
//     backgroundColor: Colors.surface,
//     borderWidth: 1,
//     borderColor: Colors.borderLight,
//     borderRadius: Radius.md,
//     elevation: 5,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//   },

//   filterTitle: {
//     ...Typography.label,
//     marginBottom: 8,
//     color: Colors.textSecondary,
//   },

//   sortOption: {
//     minHeight: 44,
//     paddingHorizontal: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: Radius.md,
//   },

//   sortOptionActive: {
//     backgroundColor: Colors.secondaryLight,
//   },

//   sortOptionText: {
//     ...Typography.body,
//     color: Colors.textPrimary,
//   },

//   sortOptionTextActive: {
//     color: Colors.primary,
//     fontWeight: "600",
//   },
// });

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useMemo, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/src/theme/colors";
import { Icons } from "@/constants/src/theme/icons";
import { Typography } from "@/constants/src/theme/typography";
import { Radius } from "@/constants/src/theme/radius";

import { useListings } from "@/hooks/useListings";
import { useCategories } from "@/hooks/useCategories";

import type { Listing } from "@/constants/src/types/listing";
import type { Category } from "@/constants/src/types/category";
import { useRouter } from "expo-router";

// ==================================================
// SORT OPTIONS
// ==================================================

const sortOptions = [
  { id: "recent", name: "Recently Added" },
  { id: "low", name: "Lowest Price" },
  { id: "high", name: "Highest Price" },
];

// ==================================================
// SCREEN
// ==================================================

export default function ExploreScreen() {
  const router = useRouter();
  // ==================================================
  // API
  // ==================================================

  const {
    data: listings = [],
    isLoading: listingsLoading,
    isError: listingsError,
    error: listingsErrorObject,
    refetch: refetchListings,
  } = useListings();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorObject,
    refetch: refetchCategories,
  } = useCategories();

  // ==================================================
  // LOCAL STATE
  // ==================================================

  const [activeCategory, setActiveCategory] = useState("all");

  const [sortOption, setSortOption] = useState("recent");

  const [showFilters, setShowFilters] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // ==================================================
  // LOADING
  // ==================================================

  const isLoading = listingsLoading || categoriesLoading;

  // ==================================================
  // ERROR
  // ==================================================

  const isError = listingsError || categoriesError;

  // ==================================================
  // FILTER + SORT
  // ==================================================

  const displayedListings = useMemo(() => {
    let result = [...listings];

    // ==================================================
    // CATEGORY
    // ==================================================

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category.id === activeCategory);
    }

    // ==================================================
    // SEARCH
    // ==================================================

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.name.toLowerCase().includes(query) ||
          item.seller.display_name.toLowerCase().includes(query) ||
          item.location.city.toLowerCase().includes(query) ||
          item.location.area.toLowerCase().includes(query)
        );
      });
    }

    // ==================================================
    // SORT
    // ==================================================

    if (sortOption === "low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortOption === "high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortOption === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    return result;
  }, [listings, activeCategory, searchQuery, sortOption]);

  // ==================================================
  // LOADING UI
  // ==================================================

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />

          <Text style={styles.loadingText}>Loading Explore...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==================================================
  // ERROR UI
  // ==================================================

  if (isError) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.centerContainer}>
          <Ionicons
            name="cloud-offline-outline"
            size={48}
            color={Colors.textMuted}
          />

          <Text style={styles.errorTitle}>Failed to load Explore</Text>

          <Text style={styles.errorText}>
            {listingsError
              ? listingsErrorObject instanceof Error
                ? listingsErrorObject.message
                : "Failed to load listings."
              : categoriesError
                ? categoriesErrorObject instanceof Error
                  ? categoriesErrorObject.message
                  : "Failed to load categories."
                : "Something went wrong."}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={() => {
              refetchListings();
              refetchCategories();
            }}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ==================================================
  // SCREEN
  // ==================================================

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* ==================================================
          TOP BAR
      ================================================== */}

      <View style={styles.topBar}>
        <Pressable style={styles.topBarButton}>
          <Ionicons
            name="map-outline"
            size={Icons.action.size}
            color={Colors.actionIcon}
          />
        </Pressable>

        <Text style={styles.logo}>Suqe</Text>

        <Pressable style={styles.topBarButton}>
          <Ionicons
            name="notifications-outline"
            size={Icons.search.size}
            color={Colors.actionIcon}
          />
        </Pressable>
      </View>

      {/* ==================================================
          SEARCH
      ================================================== */}

      <View style={styles.topSearch}>
        <View style={styles.search}>
          <Ionicons
            name="search-outline"
            size={Icons.search.size}
            color={Colors.searchIcon}
          />

          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholder="Search items..."
            placeholderTextColor={Colors.searchPlaceholder}
            returnKeyType="search"
          />

          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={18}
                color={Colors.textMuted}
              />
            </Pressable>
          )}
        </View>

        <Pressable
          style={styles.filterButton}
          onPress={() => setShowFilters((prev) => !prev)}
        >
          <Ionicons
            name="filter-outline"
            size={Icons.search.size}
            color={Colors.searchIcon}
          />
        </Pressable>
      </View>

      {/* ==================================================
          CATEGORIES
      ================================================== */}

      <View style={styles.categoriesContainer}>
        <FlatList
          data={[
            {
              id: "all",
              name: "All",
            } as Pick<Category, "id" | "name">,
            ...categories,
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => {
            const isActive = activeCategory === item.id;

            return (
              <Pressable
                onPress={() => setActiveCategory(item.id)}
                style={[styles.category, isActive && styles.categoryActive]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* ==================================================
          PRODUCTS
      ================================================== */}

      <View style={styles.productsContainer}>
        <FlatList
          data={displayedListings}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const firstMedia = item.media?.[0];

            return (
              <Pressable
                style={styles.productCard}
                onPress={() => {
                  router.push({
                    pathname: "/listing/[id]",
                    params: {
                      id: item.id,
                    },
                  });
                }}
              >
                {/* ==================================================
          IMAGE
      ================================================== */}

                <View style={styles.productImageContainer}>
                  {firstMedia?.url || firstMedia?.thumbnail_url ? (
                    <Image
                      source={{
                        uri:
                          firstMedia.url ??
                          firstMedia.thumbnail_url ??
                          undefined,
                      }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.noImage}>
                      <Ionicons
                        name="image-outline"
                        size={34}
                        color={Colors.textMuted}
                      />
                    </View>
                  )}

                  {/* ==================================================
            FAVORITE
        ================================================== */}

                  <Pressable
                    style={styles.favoriteButton}
                    onPress={(event) => {
                      event.stopPropagation();

                      // TODO:
                      // Add favorite/save mutation here
                    }}
                  >
                    <Ionicons
                      name="heart-outline"
                      size={19}
                      color={Colors.white}
                    />
                  </Pressable>

                  {/* ==================================================
            MEDIA COUNT
        ================================================== */}

                  {item.media.length > 1 && (
                    <View style={styles.mediaCount}>
                      <Ionicons
                        name="images-outline"
                        size={12}
                        color={Colors.white}
                      />

                      <Text style={styles.mediaCountText}>
                        {item.media.length}
                      </Text>
                    </View>
                  )}
                </View>

                {/* ==================================================
          INFO
      ================================================== */}

                <View style={styles.productInfo}>
                  <Text style={styles.priceText}>
                    {Number(item.price).toLocaleString()} {item.currency.code}
                  </Text>

                  <Text style={styles.productName} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <Text style={styles.productDescription} numberOfLines={2}>
                    {item.description}
                  </Text>

                  {/* ==================================================
            SELLER
        ================================================== */}

                  <View style={styles.sellerRow}>
                    {item.seller.avatar ? (
                      <Image
                        source={{
                          uri: item.seller.avatar,
                        }}
                        style={styles.sellerAvatar}
                      />
                    ) : (
                      <View style={styles.sellerAvatarPlaceholder}>
                        <Ionicons
                          name="person"
                          size={11}
                          color={Colors.textMuted}
                        />
                      </View>
                    )}

                    <View style={styles.sellerInfo}>
                      <View style={styles.sellerNameRow}>
                        <Text style={styles.seller} numberOfLines={1}>
                          {item.seller.display_name}
                        </Text>

                        {item.seller.is_verified && (
                          <Ionicons
                            name="checkmark-circle"
                            size={14}
                            color={Colors.verified}
                          />
                        )}
                      </View>

                      <Text style={styles.location} numberOfLines={1}>
                        {item.location.area}, {item.location.city}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name="search-outline"
                size={34}
                color={Colors.primary}
              />

              <Text style={styles.emptyTitle}>No items found</Text>

              <Text style={styles.emptyText}>
                Try another search or category.
              </Text>
            </View>
          }
        />
      </View>

      {/* ==================================================
          FILTER MENU
      ================================================== */}

      {showFilters && (
        <View style={styles.filterMenu}>
          <Text style={styles.filterTitle}>Sort by</Text>

          {sortOptions.map((option) => {
            const isActive = sortOption === option.id;

            return (
              <Pressable
                key={option.id}
                onPress={() => {
                  setSortOption(option.id);
                  setShowFilters(false);
                }}
                style={[styles.sortOption, isActive && styles.sortOptionActive]}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    isActive && styles.sortOptionTextActive,
                  ]}
                >
                  {option.name}
                </Text>

                {isActive && (
                  <Ionicons name="checkmark" size={20} color={Colors.primary} />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ==================================================
  // CENTER
  // ==================================================

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: Colors.background,
  },

  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 12,
  },

  errorTitle: {
    ...Typography.h3,
    marginTop: 14,
    color: Colors.textPrimary,
    textAlign: "center",
  },

  errorText: {
    ...Typography.body,
    marginTop: 8,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  retryButton: {
    marginTop: 20,
    minHeight: 42,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.buttonPrimary,
  },

  retryText: {
    ...Typography.button,
    color: Colors.textOnDark,
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

  logo: {
    ...Typography.h2,
    color: Colors.primary,
  },

  // ==================================================
  // SEARCH
  // ==================================================

  topSearch: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: "row",
    gap: 10,
  },

  search: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: Colors.searchBackground,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: Radius.md,
  },

  searchInput: {
    ...Typography.bodyLarge,
    flex: 1,
    marginLeft: 8,
    color: Colors.textPrimary,
  },

  filterButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.searchBackground,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: Radius.md,
  },

  // ==================================================
  // CATEGORIES
  // ==================================================

  categoriesContainer: {
    height: 52,
  },

  categoriesList: {
    paddingHorizontal: 16,
    alignItems: "center",
  },

  category: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: Colors.chipBackground,
    borderRadius: Radius.md,
  },

  categoryActive: {
    backgroundColor: Colors.primary,
  },

  categoryText: {
    ...Typography.label,
    color: Colors.chipText,
  },

  categoryTextActive: {
    color: Colors.white,
  },

  // ==================================================
  // PRODUCTS
  // ==================================================

  productsContainer: {
    flex: 1,
  },

  productsList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },

  productRow: {
    justifyContent: "space-between",
  },

  productCard: {
    width: "48.5%",
    marginBottom: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    overflow: "hidden",
  },

  productImageContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
    backgroundColor: Colors.surfaceLight,
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  noImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
  },

  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  mediaCount: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: Radius.md,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  mediaCountText: {
    ...Typography.caption,
    color: Colors.white,
  },

  // ==================================================
  // INFO
  // ==================================================

  productInfo: {
    padding: 10,
  },

  priceText: {
    ...Typography.priceLarge,
    color: Colors.primary,
  },

  productName: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },

  productDescription: {
    ...Typography.caption,
    marginTop: 4,
    color: Colors.textSecondary,
  },

  // ==================================================
  // SELLER
  // ==================================================

  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
  },

  sellerAvatarPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
  },

  sellerInfo: {
    flex: 1,
    marginLeft: 8,
  },

  sellerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  seller: {
    flex: 1,
    ...Typography.tab,
    color: Colors.textPrimary,
  },

  location: {
    ...Typography.caption,
    marginTop: 2,
    fontWeight: "900",
    color: Colors.location,
  },

  // ==================================================
  // EMPTY
  // ==================================================

  emptyState: {
    alignItems: "center",
    paddingVertical: 70,
  },

  emptyTitle: {
    ...Typography.h3,
    marginTop: 12,
    color: Colors.textPrimary,
  },

  emptyText: {
    ...Typography.body,
    marginTop: 5,
    color: Colors.textSecondary,
  },

  // ==================================================
  // FILTER MENU
  // ==================================================

  filterMenu: {
    position: "absolute",
    top: 116,
    right: 16,
    zIndex: 100,
    width: 220,
    padding: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  filterTitle: {
    ...Typography.label,
    marginBottom: 8,
    color: Colors.textSecondary,
  },

  sortOption: {
    minHeight: 44,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: Radius.md,
  },

  sortOptionActive: {
    backgroundColor: Colors.secondaryLight,
  },

  sortOptionText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },

  sortOptionTextActive: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
