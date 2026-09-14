// import {
//   ActivityIndicator,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { VideoView, useVideoPlayer } from "expo-video";

// import { api } from "@/constants/src/api/client";
// import { Colors } from "@/constants/src/theme/colors";
// import { Typography } from "@/constants/src/theme/typography";
// import { Radius } from "@/constants/src/theme/radius";

// const { width } = Dimensions.get("window");

// type ListingMedia = {
//   id: string;
//   listing: string;
//   media_type: "image" | "video";
//   url: string;
//   thumbnail_url: string;
//   position: number;
//   is_cover: boolean;
//   created_at: string;
//   updated_at: string;
// };

// type Listing = {
//   id: string;

//   seller: {
//     id: string;
//     username: string;
//     display_name: string;
//     avatar: string | null;
//     is_verified: boolean;
//   };

//   category: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   title: string;
//   description: string;
//   price: string;

//   currency: {
//     id: string;
//     name: string;
//     code: string;
//     symbol: string;
//   };

//   condition: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   listing_type: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   location: {
//     id: string;
//     country: string;
//     city: string;
//     area: string;
//     latitude: number | null;
//     longitude: number | null;
//   };

//   status: string;

//   view_count: number;
//   likes_count: number;
//   comments_count: number;
//   shares_count: number;
//   saves_count: number;

//   is_featured: boolean;
//   is_promoted: boolean;

//   media: ListingMedia[];

//   created_at: string;
//   updated_at: string;
// };

// // =====================================================
// // VIDEO
// // =====================================================

// function ListingVideo({ uri }: { uri: string }) {
//   const player = useVideoPlayer(uri, (player) => {
//     player.loop = true;
//     player.muted = true;
//     player.play();
//   });

//   return (
//     <VideoView
//       player={player}
//       style={styles.media}
//       contentFit="contain"
//       nativeControls
//     />
//   );
// }

// // =====================================================
// // SCREEN
// // =====================================================

// export default function ListingDetailScreen() {
//   const router = useRouter();

//   const { id } = useLocalSearchParams<{
//     id: string;
//   }>();

//   const [listing, setListing] = useState<Listing | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   // ===================================================
//   // FETCH LISTING
//   // ===================================================

//   useEffect(() => {
//     let mounted = true;

//     async function fetchListing() {
//       if (!id) {
//         setIsLoading(false);
//         setIsError(true);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setIsError(false);

//         const response = await api.get<Listing>(`/api/v1/listings/${id}/`);

//         if (mounted) {
//           setListing(response.data);
//         }
//       } catch (error) {
//         console.error("LISTING DETAIL ERROR:", error);

//         if (mounted) {
//           setIsError(true);
//         }
//       } finally {
//         if (mounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     fetchListing();

//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   // ===================================================
//   // LOADING
//   // ===================================================

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.centerContainer}>
//           <ActivityIndicator size="large" color={Colors.primary} />

//           <Text style={styles.loadingText}>Loading item...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ===================================================
//   // ERROR
//   // ===================================================

//   if (isError || !listing) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <Pressable style={styles.headerButton} onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color={Colors.actionIcon} />
//           </Pressable>

//           <Text style={styles.headerTitle}>Item</Text>

//           <View style={styles.headerButton} />
//         </View>

//         <View style={styles.centerContainer}>
//           <Ionicons
//             name="alert-circle-outline"
//             size={56}
//             color={Colors.textOnDarkMuted}
//           />

//           <Text style={styles.errorTitle}>Item not found</Text>

//           <Text style={styles.errorText}>
//             This listing may have been removed or is unavailable.
//           </Text>

//           <Pressable style={styles.backButton} onPress={() => router.back()}>
//             <Text style={styles.backButtonText}>Go Back</Text>
//           </Pressable>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ===================================================
//   // MEDIA
//   // ===================================================

//   const media = [...(listing.media ?? [])].sort(
//     (a, b) => a.position - b.position,
//   );

//   // ===================================================
//   // SCREEN
//   // ===================================================

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <View style={styles.header}>
//         <Pressable style={styles.headerButton} onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color={Colors.actionIcon} />
//         </Pressable>

//         <Text style={styles.headerTitle} numberOfLines={1}>
//           {listing.title}
//         </Text>

//         <Pressable style={styles.headerButton}>
//           <Ionicons
//             name="ellipsis-horizontal"
//             size={24}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//       >
//         {/* =================================================
//             MEDIA
//         ================================================= */}

//         {media.length > 0 ? (
//           <ScrollView
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             style={styles.mediaContainer}
//           >
//             {media.map((item) => {
//               if (item.media_type === "video") {
//                 return (
//                   <View key={item.id} style={styles.mediaPage}>
//                     <ListingVideo uri={item.url} />
//                   </View>
//                 );
//               }

//               return (
//                 <View key={item.id} style={styles.mediaPage}>
//                   <Image
//                     source={{ uri: item.url }}
//                     style={styles.media}
//                     resizeMode="contain"
//                   />
//                 </View>
//               );
//             })}
//           </ScrollView>
//         ) : (
//           <View style={styles.noMedia}>
//             <Ionicons
//               name="image-outline"
//               size={64}
//               color={Colors.textOnDarkMuted}
//             />

//             <Text style={styles.noMediaText}>No media available</Text>
//           </View>
//         )}

//         {/* =================================================
//             MAIN INFORMATION
//         ================================================= */}

//         <View style={styles.mainContent}>
//           {/* CONDITION */}

//           <View style={styles.badgesRow}>
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{listing.condition.name}</Text>
//             </View>

//             {listing.is_featured && (
//               <View style={styles.badge}>
//                 <Ionicons name="star" size={13} color={Colors.primary} />

//                 <Text style={styles.badgeText}>Featured</Text>
//               </View>
//             )}

//             {listing.is_promoted && (
//               <View style={styles.badge}>
//                 <Ionicons name="flash" size={13} color={Colors.primary} />

//                 <Text style={styles.badgeText}>Promoted</Text>
//               </View>
//             )}
//           </View>

//           {/* TITLE */}

//           <Text style={styles.title}>{listing.title}</Text>

//           {/* PRICE */}

//           <Text style={styles.price}>
//             {Number(listing.price).toLocaleString()} {listing.currency.code}
//           </Text>

//           {/* LOCATION */}

//           <View style={styles.locationRow}>
//             <Ionicons
//               name="location-outline"
//               size={18}
//               color={Colors.textOnDarkSecondary}
//             />

//             <Text style={styles.locationText}>
//               {listing.location.area}, {listing.location.city},{" "}
//               {listing.location.country}
//             </Text>
//           </View>

//           {/* =================================================
//               STATS
//           ================================================= */}

//           <View style={styles.statsRow}>
//             <View style={styles.stat}>
//               <Ionicons
//                 name="eye-outline"
//                 size={20}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.view_count}</Text>
//             </View>

//             <View style={styles.stat}>
//               <Ionicons
//                 name="heart-outline"
//                 size={20}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.likes_count}</Text>
//             </View>

//             <View style={styles.stat}>
//               <Ionicons
//                 name="chatbubble-outline"
//                 size={20}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.comments_count}</Text>
//             </View>

//             <View style={styles.stat}>
//               <Ionicons
//                 name="bookmark-outline"
//                 size={20}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.saves_count}</Text>
//             </View>
//           </View>

//           {/* =================================================
//               SELLER
//           ================================================= */}

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Seller</Text>

//             <Pressable style={styles.sellerCard}>
//               {listing.seller.avatar ? (
//                 <Image
//                   source={{
//                     uri: listing.seller.avatar,
//                   }}
//                   style={styles.sellerAvatar}
//                 />
//               ) : (
//                 <View style={styles.sellerAvatarPlaceholder}>
//                   <Ionicons
//                     name="person"
//                     size={22}
//                     color={Colors.textOnDarkMuted}
//                   />
//                 </View>
//               )}

//               <View style={styles.sellerInfo}>
//                 <View style={styles.sellerNameRow}>
//                   <Text style={styles.sellerName} numberOfLines={1}>
//                     {listing.seller.display_name}
//                   </Text>

//                   {listing.seller.is_verified && (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={17}
//                       color={Colors.verified}
//                     />
//                   )}
//                 </View>

//                 {listing.seller.username ? (
//                   <Text style={styles.sellerUsername}>
//                     @{listing.seller.username}
//                   </Text>
//                 ) : null}
//               </View>

//               <Ionicons
//                 name="chevron-forward"
//                 size={20}
//                 color={Colors.textOnDarkMuted}
//               />
//             </Pressable>
//           </View>

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Description</Text>

//             <Text style={styles.description}>{listing.description}</Text>
//           </View>

//           {/* =================================================
//               DETAILS
//           ================================================= */}

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Details</Text>

//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Category</Text>

//               <Text style={styles.detailValue}>{listing.category.name}</Text>
//             </View>

//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Condition</Text>

//               <Text style={styles.detailValue}>{listing.condition.name}</Text>
//             </View>

//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Listing type</Text>

//               <Text style={styles.detailValue}>
//                 {listing.listing_type.name}
//               </Text>
//             </View>

//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Location</Text>

//               <Text style={styles.detailValue}>
//                 {listing.location.area}, {listing.location.city}
//               </Text>
//             </View>
//           </View>

//           {/* =================================================
//               ACTIONS
//           ================================================= */}

//           <View style={styles.actionsRow}>
//             <Pressable style={styles.secondaryButton}>
//               <Ionicons
//                 name="chatbubble-outline"
//                 size={20}
//                 color={Colors.textOnDark}
//               />

//               <Text style={styles.secondaryButtonText}>Message</Text>
//             </Pressable>

//             <Pressable style={styles.primaryButton}>
//               <Text style={styles.primaryButtonText}>I'm Interested</Text>
//             </Pressable>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.mediaBackground,
//   },

//   content: {
//     paddingBottom: 40,
//   },

//   // ===================================================
//   // HEADER
//   // ===================================================

//   header: {
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     backgroundColor: Colors.darkSurface,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.navigationBorder,
//   },

//   headerButton: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   headerTitle: {
//     flex: 1,
//     marginHorizontal: 12,
//     textAlign: "center",
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // CENTER
//   // ===================================================

//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//   },

//   loadingText: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     marginTop: 12,
//   },

//   errorTitle: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     marginTop: 16,
//   },

//   errorText: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     textAlign: "center",
//     marginTop: 8,
//   },

//   backButton: {
//     marginTop: 22,
//     paddingHorizontal: 22,
//     minHeight: 44,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.md,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   backButtonText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // MEDIA
//   // ===================================================

//   mediaContainer: {
//     width: "100%",
//     backgroundColor: Colors.black,
//   },

//   mediaPage: {
//     width,
//     height: width,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.black,
//   },

//   media: {
//     width: "100%",
//     height: "100%",
//   },

//   noMedia: {
//     width: "100%",
//     height: width * 0.8,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.darkSurface,
//   },

//   noMediaText: {
//     ...Typography.body,
//     color: Colors.textOnDarkMuted,
//     marginTop: 12,
//   },

//   // ===================================================
//   // MAIN CONTENT
//   // ===================================================

//   mainContent: {
//     paddingHorizontal: 16,
//   },

//   badgesRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     marginTop: 16,
//   },

//   badge: {
//     minHeight: 30,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     borderRadius: Radius.md,
//     backgroundColor: Colors.actionBackground,
//   },

//   badgeText: {
//     ...Typography.caption,
//     color: Colors.textOnDark,
//     fontWeight: "700",
//   },

//   title: {
//     ...Typography.h1,
//     color: Colors.textOnDark,
//     marginTop: 14,
//   },

//   price: {
//     ...Typography.priceLarge,
//     color: Colors.primary,
//     marginTop: 8,
//   },

//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     gap: 6,
//   },

//   locationText: {
//     flex: 1,
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//   },

//   // ===================================================
//   // STATS
//   // ===================================================

//   statsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 24,
//     marginTop: 18,
//     paddingVertical: 14,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: Colors.navigationBorder,
//   },

//   stat: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   statText: {
//     ...Typography.caption,
//     color: Colors.textOnDarkSecondary,
//   },

//   // ===================================================
//   // SECTIONS
//   // ===================================================

//   section: {
//     marginTop: 24,
//   },

//   sectionTitle: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     marginBottom: 12,
//   },

//   description: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     lineHeight: 24,
//   },

//   // ===================================================
//   // SELLER
//   // ===================================================

//   sellerCard: {
//     minHeight: 70,
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.darkSurface,
//   },

//   sellerAvatar: {
//     width: 48,
//     height: 48,
//     borderRadius: Radius.circle,
//   },

//   sellerAvatarPlaceholder: {
//     width: 48,
//     height: 48,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   sellerInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   sellerNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   sellerName: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     flexShrink: 1,
//   },

//   sellerUsername: {
//     ...Typography.caption,
//     color: Colors.textOnDarkMuted,
//     marginTop: 3,
//   },

//   // ===================================================
//   // DETAILS
//   // ===================================================

//   detailRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 11,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.navigationBorder,
//   },

//   detailLabel: {
//     ...Typography.body,
//     color: Colors.textOnDarkMuted,
//   },

//   detailValue: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     maxWidth: "60%",
//     textAlign: "right",
//   },

//   // ===================================================
//   // ACTIONS
//   // ===================================================

//   actionsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 28,
//   },

//   secondaryButton: {
//     flex: 1,
//     minHeight: 50,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     borderRadius: Radius.md,
//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     backgroundColor: Colors.darkSurface,
//   },

//   secondaryButtonText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   primaryButton: {
//     flex: 1.4,
//     minHeight: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.md,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   primaryButtonText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },
// });
// import {
//   ActivityIndicator,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { VideoView, useVideoPlayer } from "expo-video";

// import { api } from "@/constants/src/api/client";
// import { Colors } from "@/constants/src/theme/colors";
// import { Typography } from "@/constants/src/theme/typography";
// import { Radius } from "@/constants/src/theme/radius";

// const { width } = Dimensions.get("window");

// type ListingMedia = {
//   id: string;
//   listing: string;
//   media_type: "image" | "video";
//   url: string;
//   thumbnail_url: string;
//   position: number;
//   is_cover: boolean;
//   created_at: string;
//   updated_at: string;
// };

// type Listing = {
//   id: string;

//   seller: {
//     id: string;
//     username: string;
//     display_name: string;
//     avatar: string | null;
//     is_verified: boolean;
//   };

//   category: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   title: string;
//   description: string;
//   price: string;

//   currency: {
//     id: string;
//     name: string;
//     code: string;
//     symbol: string;
//   };

//   condition: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   listing_type: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   location: {
//     id: string;
//     country: string;
//     city: string;
//     area: string;
//     latitude: number | null;
//     longitude: number | null;
//   };

//   status: string;

//   view_count: number;
//   likes_count: number;
//   comments_count: number;
//   shares_count: number;
//   saves_count: number;

//   is_featured: boolean;
//   is_promoted: boolean;

//   media: ListingMedia[];

//   created_at: string;
//   updated_at: string;
// };

// // =====================================================
// // VIDEO
// // =====================================================

// function ListingVideo({ uri }: { uri: string }) {
//   const player = useVideoPlayer(uri, (player) => {
//     player.loop = true;
//     player.muted = true;
//     player.play();
//   });

//   return (
//     <VideoView
//       player={player}
//       style={styles.media}
//       contentFit="contain"
//       nativeControls
//     />
//   );
// }

// // =====================================================
// // SCREEN
// // =====================================================

// export default function ListingDetailScreen() {
//   const router = useRouter();

//   const { id } = useLocalSearchParams<{
//     id: string;
//   }>();

//   const [listing, setListing] = useState<Listing | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   // ===================================================
//   // FETCH LISTING
//   // ===================================================

//   useEffect(() => {
//     let mounted = true;

//     async function fetchListing() {
//       if (!id) {
//         setIsLoading(false);
//         setIsError(true);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setIsError(false);

//         const response = await api.get<Listing>(`/api/v1/listings/${id}/`);

//         if (mounted) {
//           setListing(response.data);
//         }
//       } catch (error) {
//         console.error("LISTING DETAIL ERROR:", error);

//         if (mounted) {
//           setIsError(true);
//         }
//       } finally {
//         if (mounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     fetchListing();

//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   // ===================================================
//   // LOADING
//   // ===================================================

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container} edges={["top"]}>
//         <View style={styles.loadingHeader}>
//           <View style={styles.headerButton} />
//           <View style={styles.loadingHeaderLine} />
//           <View style={styles.headerButton} />
//         </View>

//         <View style={styles.centerContainer}>
//           <ActivityIndicator size="large" color={Colors.primary} />

//           <Text style={styles.loadingText}>Loading item...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ===================================================
//   // ERROR
//   // ===================================================

//   if (isError || !listing) {
//     return (
//       <SafeAreaView style={styles.container} edges={["top"]}>
//         <View style={styles.header}>
//           <Pressable
//             style={({ pressed }) => [
//               styles.headerButton,
//               pressed && styles.headerButtonPressed,
//             ]}
//             onPress={() => router.back()}
//           >
//             <Ionicons name="arrow-back" size={22} color={Colors.actionIcon} />
//           </Pressable>

//           <Text style={styles.headerTitle}>Item</Text>

//           <View style={styles.headerButton} />
//         </View>

//         <View style={styles.centerContainer}>
//           <View style={styles.errorIcon}>
//             <Ionicons
//               name="alert-circle-outline"
//               size={32}
//               color={Colors.primary}
//             />
//           </View>

//           <Text style={styles.errorTitle}>Item not found</Text>

//           <Text style={styles.errorText}>
//             This listing may have been removed or is unavailable.
//           </Text>

//           <Pressable
//             style={({ pressed }) => [
//               styles.backButton,
//               pressed && styles.primaryButtonPressed,
//             ]}
//             onPress={() => router.back()}
//           >
//             <Text style={styles.backButtonText}>Go Back</Text>
//           </Pressable>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ===================================================
//   // MEDIA
//   // ===================================================

//   const media = [...(listing.media ?? [])].sort(
//     (a, b) => a.position - b.position,
//   );

//   // ===================================================
//   // SCREEN
//   // ===================================================

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       {/* =================================================
//           FIXED HEADER
//       ================================================= */}

//       <View style={styles.header}>
//         <Pressable
//           style={({ pressed }) => [
//             styles.headerButton,
//             pressed && styles.headerButtonPressed,
//           ]}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="arrow-back" size={22} color={Colors.actionIcon} />
//         </Pressable>

//         <Text style={styles.headerTitle} numberOfLines={1}>
//           {listing.title}
//         </Text>

//         <Pressable
//           style={({ pressed }) => [
//             styles.headerButton,
//             pressed && styles.headerButtonPressed,
//           ]}
//         >
//           <Ionicons
//             name="ellipsis-horizontal"
//             size={22}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       {/* =================================================
//           SCROLLABLE CONTENT
//       ================================================= */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//       >
//         {/* =================================================
//             MEDIA
//         ================================================= */}

//         {media.length > 0 ? (
//           <ScrollView
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             style={styles.mediaContainer}
//           >
//             {media.map((item) => {
//               if (item.media_type === "video") {
//                 return (
//                   <View key={item.id} style={styles.mediaPage}>
//                     <ListingVideo uri={item.url} />
//                   </View>
//                 );
//               }

//               return (
//                 <View key={item.id} style={styles.mediaPage}>
//                   <Image
//                     source={{ uri: item.url }}
//                     style={styles.media}
//                     resizeMode="contain"
//                   />
//                 </View>
//               );
//             })}
//           </ScrollView>
//         ) : (
//           <View style={styles.noMedia}>
//             <View style={styles.noMediaIcon}>
//               <Ionicons
//                 name="image-outline"
//                 size={34}
//                 color={Colors.textOnDarkMuted}
//               />
//             </View>

//             <Text style={styles.noMediaText}>No media available</Text>
//           </View>
//         )}

//         {/* =================================================
//             MAIN INFORMATION
//         ================================================= */}

//         <View style={styles.mainContent}>
//           {/* CONDITION / BADGES */}

//           <View style={styles.badgesRow}>
//             <View style={styles.conditionBadge}>
//               <Text style={styles.badgeText}>{listing.condition.name}</Text>
//             </View>

//             {listing.is_featured && (
//               <View style={styles.badge}>
//                 <Ionicons name="star" size={13} color={Colors.primary} />

//                 <Text style={styles.badgeText}>Featured</Text>
//               </View>
//             )}

//             {listing.is_promoted && (
//               <View style={styles.badge}>
//                 <Ionicons name="flash" size={13} color={Colors.primary} />

//                 <Text style={styles.badgeText}>Promoted</Text>
//               </View>
//             )}
//           </View>

//           {/* TITLE */}

//           <Text style={styles.title}>{listing.title}</Text>

//           {/* PRICE */}

//           <Text style={styles.price}>
//             {Number(listing.price).toLocaleString()} {listing.currency.code}
//           </Text>

//           {/* LOCATION */}

//           <View style={styles.locationRow}>
//             <Ionicons
//               name="location-outline"
//               size={18}
//               color={Colors.textOnDarkSecondary}
//             />

//             <Text style={styles.locationText}>
//               {listing.location.area}, {listing.location.city},{" "}
//               {listing.location.country}
//             </Text>
//           </View>

//           {/* =================================================
//               STATS
//           ================================================= */}

//           <View style={styles.statsCard}>
//             <View style={styles.stat}>
//               <Ionicons
//                 name="eye-outline"
//                 size={19}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.view_count}</Text>
//               <Text style={styles.statLabel}>Views</Text>
//             </View>

//             <View style={styles.statDivider} />

//             <View style={styles.stat}>
//               <Ionicons
//                 name="heart-outline"
//                 size={19}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.likes_count}</Text>
//               <Text style={styles.statLabel}>Likes</Text>
//             </View>

//             <View style={styles.statDivider} />

//             <View style={styles.stat}>
//               <Ionicons
//                 name="chatbubble-outline"
//                 size={19}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.comments_count}</Text>
//               <Text style={styles.statLabel}>Comments</Text>
//             </View>

//             <View style={styles.statDivider} />

//             <View style={styles.stat}>
//               <Ionicons
//                 name="bookmark-outline"
//                 size={19}
//                 color={Colors.textOnDarkSecondary}
//               />

//               <Text style={styles.statText}>{listing.saves_count}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </View>

//           {/* =================================================
//               SELLER
//           ================================================= */}

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Seller</Text>

//             <Pressable
//               style={({ pressed }) => [
//                 styles.sellerCard,
//                 pressed && styles.cardPressed,
//               ]}
//             >
//               {listing.seller.avatar ? (
//                 <Image
//                   source={{
//                     uri: listing.seller.avatar,
//                   }}
//                   style={styles.sellerAvatar}
//                 />
//               ) : (
//                 <View style={styles.sellerAvatarPlaceholder}>
//                   <Ionicons
//                     name="person"
//                     size={22}
//                     color={Colors.textOnDarkMuted}
//                   />
//                 </View>
//               )}

//               <View style={styles.sellerInfo}>
//                 <View style={styles.sellerNameRow}>
//                   <Text style={styles.sellerName} numberOfLines={1}>
//                     {listing.seller.display_name}
//                   </Text>

//                   {listing.seller.is_verified && (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={17}
//                       color={Colors.verified}
//                     />
//                   )}
//                 </View>

//                 {listing.seller.username ? (
//                   <Text style={styles.sellerUsername}>
//                     @{listing.seller.username}
//                   </Text>
//                 ) : null}
//               </View>

//               <View style={styles.sellerArrow}>
//                 <Ionicons
//                   name="chevron-forward"
//                   size={18}
//                   color={Colors.textOnDarkMuted}
//                 />
//               </View>
//             </Pressable>
//           </View>

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Description</Text>

//             <View style={styles.descriptionCard}>
//               <Text style={styles.description}>
//                 {listing.description || "No description provided."}
//               </Text>
//             </View>
//           </View>

//           {/* =================================================
//               DETAILS
//           ================================================= */}

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Details</Text>

//             <View style={styles.detailsCard}>
//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Category</Text>

//                 <Text style={styles.detailValue}>{listing.category.name}</Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Condition</Text>

//                 <Text style={styles.detailValue}>{listing.condition.name}</Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Listing type</Text>

//                 <Text style={styles.detailValue}>
//                   {listing.listing_type.name}
//                 </Text>
//               </View>

//               <View style={[styles.detailRow, styles.detailRowLast]}>
//                 <Text style={styles.detailLabel}>Location</Text>

//                 <Text style={styles.detailValue}>
//                   {listing.location.area}, {listing.location.city}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* =================================================
//               ACTIONS
//           ================================================= */}

//           <View style={styles.actionsRow}>
//             <Pressable
//               style={({ pressed }) => [
//                 styles.secondaryButton,
//                 pressed && styles.buttonPressed,
//               ]}
//             >
//               <Ionicons
//                 name="chatbubble-outline"
//                 size={20}
//                 color={Colors.textOnDark}
//               />

//               <Text style={styles.secondaryButtonText}>Message</Text>
//             </Pressable>

//             <Pressable
//               style={({ pressed }) => [
//                 styles.primaryButton,
//                 pressed && styles.primaryButtonPressed,
//               ]}
//             >
//               <Text style={styles.primaryButtonText}>I'm Interested</Text>
//             </Pressable>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.mediaBackground,
//   },

//   content: {
//     paddingBottom: 40,
//   },

//   // ===================================================
//   // FIXED HEADER
//   // ===================================================

//   header: {
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     backgroundColor: Colors.darkSurface,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.navigationBorder,
//   },

//   headerButton: {
//     width: 44,
//     height: 44,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   headerButtonPressed: {
//     opacity: 0.72,
//     transform: [{ scale: 0.97 }],
//   },

//   headerTitle: {
//     flex: 1,
//     marginHorizontal: 12,
//     textAlign: "center",
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     fontWeight: "700",
//   },

//   loadingHeader: {
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     backgroundColor: Colors.darkSurface,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.navigationBorder,
//   },

//   loadingHeaderLine: {
//     width: 90,
//     height: 12,
//     borderRadius: Radius.pill,
//     backgroundColor: Colors.actionBackground,
//   },

//   // ===================================================
//   // CENTER
//   // ===================================================

//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//   },

//   loadingText: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     marginTop: 12,
//   },

//   errorIcon: {
//     width: 72,
//     height: 72,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   errorTitle: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     marginTop: 18,
//   },

//   errorText: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     textAlign: "center",
//     marginTop: 8,
//     lineHeight: 22,
//   },

//   backButton: {
//     minHeight: 48,
//     paddingHorizontal: 24,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   backButtonText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // MEDIA
//   // ===================================================

//   mediaContainer: {
//     width: "100%",
//     backgroundColor: Colors.black,
//   },

//   mediaPage: {
//     width,
//     height: width,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.black,
//   },

//   media: {
//     width: "100%",
//     height: "100%",
//   },

//   noMedia: {
//     width: "100%",
//     height: width * 0.8,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.darkSurface,
//   },

//   noMediaIcon: {
//     width: 68,
//     height: 68,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   noMediaText: {
//     ...Typography.body,
//     color: Colors.textOnDarkMuted,
//     marginTop: 12,
//   },

//   // ===================================================
//   // MAIN CONTENT
//   // ===================================================

//   mainContent: {
//     paddingHorizontal: 20,
//   },

//   badgesRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     marginTop: 18,
//   },

//   badge: {
//     minHeight: 32,
//     paddingHorizontal: 11,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     borderRadius: Radius.pill,
//     backgroundColor: Colors.actionBackground,
//   },

//   conditionBadge: {
//     minHeight: 32,
//     paddingHorizontal: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.pill,
//     backgroundColor: Colors.errorLight,
//   },

//   badgeText: {
//     ...Typography.caption,
//     color: Colors.textOnDark,
//     fontWeight: "700",
//   },

//   title: {
//     ...Typography.h1,
//     color: Colors.textOnDark,
//     marginTop: 16,
//     lineHeight: 36,
//   },

//   price: {
//     ...Typography.priceLarge,
//     color: Colors.primary,
//     marginTop: 8,
//   },

//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: 11,
//   },

//   locationText: {
//     flex: 1,
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     lineHeight: 21,
//   },

//   // ===================================================
//   // STATS
//   // ===================================================

//   statsCard: {
//     minHeight: 78,
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     paddingHorizontal: 8,
//     backgroundColor: Colors.darkSurface,
//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     borderRadius: Radius.lg,
//   },

//   stat: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 3,
//   },

//   statText: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//   },

//   statLabel: {
//     ...Typography.caption,
//     color: Colors.textOnDarkMuted,
//   },

//   statDivider: {
//     width: 1,
//     height: 36,
//     backgroundColor: Colors.navigationBorder,
//   },

//   // ===================================================
//   // SECTIONS
//   // ===================================================

//   section: {
//     marginTop: 28,
//   },

//   sectionTitle: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     marginBottom: 12,
//   },

//   // ===================================================
//   // SELLER
//   // ===================================================

//   sellerCard: {
//     minHeight: 74,
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: Colors.darkSurface,
//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     borderRadius: Radius.lg,
//   },

//   cardPressed: {
//     opacity: 0.82,
//   },

//   sellerAvatar: {
//     width: 50,
//     height: 50,
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   sellerAvatarPlaceholder: {
//     width: 50,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   sellerInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   sellerNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   sellerName: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     flexShrink: 1,
//   },

//   sellerUsername: {
//     ...Typography.caption,
//     color: Colors.textOnDarkMuted,
//     marginTop: 4,
//   },

//   sellerArrow: {
//     width: 34,
//     height: 34,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   // ===================================================
//   // DESCRIPTION
//   // ===================================================

//   descriptionCard: {
//     padding: 15,
//     backgroundColor: Colors.darkSurface,
//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     borderRadius: Radius.lg,
//   },

//   description: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     lineHeight: 24,
//   },

//   // ===================================================
//   // DETAILS
//   // ===================================================

//   detailsCard: {
//     overflow: "hidden",
//     backgroundColor: Colors.darkSurface,
//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     borderRadius: Radius.lg,
//   },

//   detailRow: {
//     minHeight: 50,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.navigationBorder,
//   },

//   detailRowLast: {
//     borderBottomWidth: 0,
//   },

//   detailLabel: {
//     ...Typography.body,
//     color: Colors.textOnDarkMuted,
//   },

//   detailValue: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     maxWidth: "60%",
//     textAlign: "right",
//   },

//   // ===================================================
//   // ACTIONS
//   // ===================================================

//   actionsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 30,
//   },

//   secondaryButton: {
//     flex: 1,
//     minHeight: 54,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.darkSurface,
//   },

//   secondaryButtonText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   primaryButton: {
//     flex: 1.4,
//     minHeight: 54,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   primaryButtonText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   buttonPressed: {
//     opacity: 0.78,
//     transform: [{ scale: 0.985 }],
//   },

//   primaryButtonPressed: {
//     opacity: 0.84,
//     transform: [{ scale: 0.985 }],
//   },
// });

import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { VideoView, useVideoPlayer } from "expo-video";

import { api } from "@/constants/src/api/client";
import { Colors } from "@/constants/src/theme/colors";
import { Typography } from "@/constants/src/theme/typography";
import { Radius } from "@/constants/src/theme/radius";

const { width } = Dimensions.get("window");

type ListingMedia = {
  id: string;
  listing: string;
  media_type: "image" | "video";
  url: string;
  thumbnail_url: string;
  position: number;
  is_cover: boolean;
  created_at: string;
  updated_at: string;
};

type Listing = {
  id: string;

  seller: {
    id: string;
    username: string;
    display_name: string;
    avatar: string | null;
    is_verified: boolean;
  };

  category: {
    id: string;
    name: string;
    slug: string;
  };

  title: string;
  description: string;
  price: string;
  phone_number: string;

  currency: {
    id: string;
    name: string;
    code: string;
    symbol: string;
  };

  condition: {
    id: string;
    name: string;
    slug: string;
  };

  listing_type: {
    id: string;
    name: string;
    slug: string;
  };

  location: {
    id: string;
    country: string;
    city: string;
    area: string;
    latitude: number | null;
    longitude: number | null;
  };

  status: string;

  view_count: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  saves_count: number;

  is_featured: boolean;
  is_promoted: boolean;

  media: ListingMedia[];

  created_at: string;
  updated_at: string;
};

// =====================================================
// VIDEO
// =====================================================

function ListingVideo({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <VideoView
      player={player}
      style={styles.media}
      contentFit="contain"
      nativeControls
    />
  );
}

// =====================================================
// SCREEN
// =====================================================

export default function ListingDetailScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // ===================================================
  // FETCH LISTING
  // ===================================================

  useEffect(() => {
    let mounted = true;

    async function fetchListing() {
      if (!id) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      try {
        setIsLoading(true);
        setIsError(false);

        const response = await api.get<Listing>(`/api/v1/listings/${id}/`);

        if (mounted) {
          setListing(response.data);
        }
      } catch (error) {
        console.error("LISTING DETAIL ERROR:", error);

        if (mounted) {
          setIsError(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchListing();

    return () => {
      mounted = false;
    };
  }, [id]);

  // ===================================================
  // LOADING
  // ===================================================

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.loadingHeader}>
          <View style={styles.headerButton} />

          <View style={styles.loadingHeaderLine} />

          <View style={styles.headerButton} />
        </View>

        <View style={styles.centerContainer}>
          <View style={styles.statusIconContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>

          <Text style={styles.loadingText}>Loading item...</Text>

          <Text style={styles.loadingSubtext}>
            Getting the item details for you
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (isError || !listing) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.headerButton,
              pressed && styles.headerButtonPressed,
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </Pressable>

          <Text style={styles.headerTitle}>Item</Text>

          <View style={styles.headerButton} />
        </View>

        <View style={styles.centerContainer}>
          <View style={styles.statusIconContainer}>
            <Ionicons
              name="cloud-offline-outline"
              size={30}
              color={Colors.primary}
            />
          </View>

          <Text style={styles.errorTitle}>Item not found</Text>

          <Text style={styles.errorText}>
            This listing may have been removed or is currently unavailable.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ===================================================
  // CALL SELLER
  // ===================================================

  const handleCallSeller = async () => {
    const phoneNumber = listing.phone_number?.trim();

    if (!phoneNumber) {
      Alert.alert(
        "Phone number unavailable",
        "The seller has not provided a phone number for this listing.",
      );
      return;
    }

    const phoneUrl = `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(phoneUrl);

      if (!supported) {
        Alert.alert(
          "Cannot make a call",
          "Your device cannot open the phone dialer.",
        );
        return;
      }

      await Linking.openURL(phoneUrl);
    } catch (error) {
      console.error("CALL SELLER ERROR:", error);

      Alert.alert(
        "Unable to call",
        "Something went wrong while opening the phone dialer.",
      );
    }
  };

  // ===================================================
  // MEDIA
  // ===================================================

  const media = [...(listing.media ?? [])].sort(
    (a, b) => a.position - b.position,
  );

  // ===================================================
  // SCREEN
  // ===================================================

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.headerButtonPressed,
          ]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {listing.title}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.headerButtonPressed,
          ]}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color={Colors.textPrimary}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {media.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.mediaContainer}
          >
            {media.map((item) => {
              if (item.media_type === "video") {
                return (
                  <View key={item.id} style={styles.mediaPage}>
                    <ListingVideo uri={item.url} />
                  </View>
                );
              }

              return (
                <View key={item.id} style={styles.mediaPage}>
                  <Image
                    source={{ uri: item.url }}
                    style={styles.media}
                    resizeMode="contain"
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.noMedia}>
            <View style={styles.noMediaIcon}>
              <Ionicons
                name="image-outline"
                size={34}
                color={Colors.textMuted}
              />
            </View>

            <Text style={styles.noMediaText}>No media available</Text>
          </View>
        )}

        <View style={styles.mainContent}>
          <View style={styles.badgesRow}>
            <View style={styles.conditionBadge}>
              <Text style={styles.badgeText}>{listing.condition.name}</Text>
            </View>

            {listing.is_featured && (
              <View style={styles.badge}>
                <Ionicons name="star" size={13} color={Colors.primary} />

                <Text style={styles.badgeText}>Featured</Text>
              </View>
            )}

            {listing.is_promoted && (
              <View style={styles.badge}>
                <Ionicons name="flash" size={13} color={Colors.primary} />

                <Text style={styles.badgeText}>Promoted</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{listing.title}</Text>

          <Text style={styles.price}>
            {Number(listing.price).toLocaleString()} {listing.currency.code}
          </Text>

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.location}
            />

            <Text style={styles.locationText}>
              {listing.location.area}, {listing.location.city},{" "}
              {listing.location.country}
            </Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.stat}>
              <Ionicons
                name="eye-outline"
                size={19}
                color={Colors.textSecondary}
              />

              <Text style={styles.statText}>{listing.view_count}</Text>

              <Text style={styles.statLabel}>Views</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.stat}>
              <Ionicons
                name="heart-outline"
                size={19}
                color={Colors.textSecondary}
              />

              <Text style={styles.statText}>{listing.likes_count}</Text>

              <Text style={styles.statLabel}>Likes</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.stat}>
              <Ionicons
                name="chatbubble-outline"
                size={19}
                color={Colors.textSecondary}
              />

              <Text style={styles.statText}>{listing.comments_count}</Text>

              <Text style={styles.statLabel}>Comments</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.stat}>
              <Ionicons
                name="bookmark-outline"
                size={19}
                color={Colors.textSecondary}
              />

              <Text style={styles.statText}>{listing.saves_count}</Text>

              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seller</Text>

            <Pressable
              style={({ pressed }) => [
                styles.sellerCard,
                pressed && styles.cardPressed,
              ]}
            >
              {listing.seller.avatar ? (
                <Image
                  source={{
                    uri: listing.seller.avatar,
                  }}
                  style={styles.sellerAvatar}
                />
              ) : (
                <View style={styles.sellerAvatarPlaceholder}>
                  <Ionicons name="person" size={22} color={Colors.textMuted} />
                </View>
              )}

              <View style={styles.sellerInfo}>
                <View style={styles.sellerNameRow}>
                  <Text style={styles.sellerName} numberOfLines={1}>
                    {listing.seller.display_name}
                  </Text>

                  {listing.seller.is_verified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color={Colors.verified}
                    />
                  )}
                </View>

                {listing.seller.username ? (
                  <Text style={styles.sellerUsername}>
                    @{listing.seller.username}
                  </Text>
                ) : null}
              </View>

              <View style={styles.sellerArrow}>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={Colors.textMuted}
                />
              </View>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>

            <View style={styles.descriptionCard}>
              <Text style={styles.description}>
                {listing.description || "No description provided."}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category</Text>

                <Text style={styles.detailValue}>{listing.category.name}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Condition</Text>

                <Text style={styles.detailValue}>{listing.condition.name}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Listing type</Text>

                <Text style={styles.detailValue}>
                  {listing.listing_type.name}
                </Text>
              </View>

              <View style={[styles.detailRow, styles.detailRowLast]}>
                <Text style={styles.detailLabel}>Location</Text>

                <Text style={styles.detailValue}>
                  {listing.location.area}, {listing.location.city}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomContentSpace} />
        </View>
      </ScrollView>

      <View style={styles.bottomActionBar}>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={Colors.textPrimary}
          />

          <Text style={styles.secondaryButtonText}>Message</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleCallSeller}
        >
          <Ionicons name="call-outline" size={19} color={Colors.white} />

          <Text style={styles.primaryButtonText}>Call Seller</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingBottom: 0,
  },

  header: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },

  headerButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.circle,
    backgroundColor: Colors.surface,
  },

  headerButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },

  headerTitle: {
    flex: 1,
    marginHorizontal: 12,
    textAlign: "center",
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: "700",
  },

  loadingHeader: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },

  loadingHeaderLine: {
    width: 90,
    height: 12,
    borderRadius: Radius.pill,
    backgroundColor: Colors.secondaryLight,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: Colors.background,
  },

  statusIconContainer: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.secondaryLight,
  },

  loadingText: {
    ...Typography.h3,
    marginTop: 18,
    color: Colors.textPrimary,
  },

  loadingSubtext: {
    ...Typography.body,
    marginTop: 5,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  errorTitle: {
    ...Typography.h3,
    marginTop: 18,
    color: Colors.textPrimary,
    textAlign: "center",
  },

  errorText: {
    ...Typography.body,
    maxWidth: 320,
    marginTop: 8,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  backButton: {
    minHeight: 48,
    marginTop: 22,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.lg,
    backgroundColor: Colors.buttonPrimary,
  },

  backButtonText: {
    ...Typography.button,
    color: Colors.textOnDark,
  },

  mediaContainer: {
    width: "100%",
    backgroundColor: Colors.black,
  },

  mediaPage: {
    width,
    height: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },

  media: {
    width: "100%",
    height: "100%",
  },

  noMedia: {
    width: "100%",
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
  },

  noMediaIcon: {
    width: 68,
    height: 68,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.secondaryLight,
  },

  noMediaText: {
    ...Typography.body,
    marginTop: 12,
    color: Colors.textSecondary,
  },

  mainContent: {
    paddingHorizontal: 16,
  },

  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 18,
  },

  badge: {
    minHeight: 32,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: Radius.pill,
    backgroundColor: Colors.secondaryLight,
  },

  conditionBadge: {
    minHeight: 32,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.pill,
    backgroundColor: Colors.errorLight,
  },

  badgeText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: "700",
  },

  title: {
    ...Typography.h1,
    marginTop: 16,
    color: Colors.textPrimary,
    lineHeight: 36,
  },

  price: {
    ...Typography.priceLarge,
    marginTop: 8,
    color: Colors.primary,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 11,
  },

  locationText: {
    flex: 1,
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 21,
  },

  statsCard: {
    minHeight: 78,
    marginTop: 20,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },

  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  statText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },

  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.divider,
  },

  section: {
    marginTop: 28,
  },

  sectionTitle: {
    ...Typography.h3,
    marginBottom: 12,
    color: Colors.textPrimary,
  },

  sellerCard: {
    minHeight: 74,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },

  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: Radius.circle,
    backgroundColor: Colors.surfaceLight,
  },

  sellerAvatarPlaceholder: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.surfaceLight,
  },

  sellerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  sellerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  sellerName: {
    flexShrink: 1,
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },

  sellerUsername: {
    ...Typography.caption,
    marginTop: 4,
    color: Colors.textSecondary,
  },

  sellerArrow: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.secondaryLight,
  },

  descriptionCard: {
    padding: 15,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },

  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  detailsCard: {
    overflow: "hidden",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },

  detailRow: {
    minHeight: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },

  detailRowLast: {
    borderBottomWidth: 0,
  },

  detailLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  detailValue: {
    maxWidth: "60%",
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    textAlign: "right",
  },

  bottomContentSpace: {
    height: 110,
  },

  bottomActionBar: {
    minHeight: 78,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },

  secondaryButton: {
    flex: 1,
    minHeight: 54,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },

  secondaryButtonText: {
    ...Typography.button,
    color: Colors.textPrimary,
  },

  primaryButton: {
    flex: 1.4,
    minHeight: 54,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: Radius.lg,
  },

  primaryButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.985 }],
  },

  primaryButtonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.985 }],
  },
});
