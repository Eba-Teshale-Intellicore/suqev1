// // // import {
// // //   StyleSheet,
// // //   View,
// // //   Text,
// // //   Pressable,
// // //   Image,
// // //   FlatList,
// // //   ActivityIndicator,
// // // } from "react-native";

// // // import { SafeAreaView } from "react-native-safe-area-context";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import { Colors } from "@/constants/src/theme/colors";
// // // import { Radius } from "@/constants/src/theme/radius";
// // // import { Typography } from "@/constants/src/theme/typography";

// // // import { useCallback, useEffect, useState } from "react";
// // // import { api } from "@/constants/src/api/client";
// // // import { getAccessToken } from "@/constants/src/auth/storage";
// // // import { useAuth } from "@/constants/src/auth/AuthContext";

// // // // ==================================================
// // // // TYPES
// // // // ==================================================

// // // type Profile = {
// // //   id: string;
// // //   user: string;
// // //   display_name: string;
// // //   bio: string;
// // //   avatar: string | null;
// // //   city: string;
// // //   preferred_language: string;
// // //   followers_count: number;
// // //   following_count: number;
// // //   listings_count: number;
// // // };

// // // type Listing = {
// // //   id: string;

// // //   title: string;
// // //   description: string;

// // //   price: number;
// // //   currency: "ETB" | string;

// // //   condition: "new" | "used" | string;

// // //   location: {
// // //     city: string;
// // //     area: string;
// // //   };

// // //   media: {
// // //     id: string;
// // //     type: "image" | "video" | string;
// // //     uri: string;
// // //   }[];

// // //   stats: {
// // //     likes: number;
// // //     views: number;
// // //   };

// // //   createdAt: string;
// // // };

// // // // ==================================================
// // // // HELPERS
// // // // ==================================================

// // // function getListingImage(listing: Listing): string | null {
// // //   return listing.media?.[0]?.uri ?? null;
// // // }

// // // function normalizeListings(data: any): Listing[] {
// // //   const rawListings = Array.isArray(data)
// // //     ? data
// // //     : Array.isArray(data?.results)
// // //       ? data.results
// // //       : [];

// // //   return rawListings.map((item: any) => ({
// // //     id: String(item.id),

// // //     title: item.title ?? "",
// // //     description: item.description ?? "",

// // //     price: Number(item.price ?? 0),
// // //     currency: item.currency ?? "ETB",

// // //     condition: item.condition ?? "used",

// // //     location: {
// // //       city: item.location?.city ?? item.city ?? "",
// // //       area: item.location?.area ?? item.area ?? "",
// // //     },

// // //     media: Array.isArray(item.media)
// // //       ? item.media.map((media: any) => ({
// // //           id: String(media.id),
// // //           type: media.type ?? "image",
// // //           uri: media.uri ?? media.url ?? media.file ?? media.image ?? "",
// // //         }))
// // //       : [],

// // //     stats: {
// // //       likes: Number(item.stats?.likes ?? item.likes_count ?? item.likes ?? 0),
// // //       views: Number(item.stats?.views ?? item.views_count ?? item.views ?? 0),
// // //     },

// // //     createdAt: item.created_at ?? item.createdAt ?? "",
// // //   }));
// // // }

// // // // ==================================================
// // // // SCREEN
// // // // ==================================================

// // // export default function ProfileScreen() {
// // //   const { user } = useAuth();

// // //   const [profile, setProfile] = useState<Profile | null>(null);

// // //   const [listings, setListings] = useState<Listing[]>([]);

// // //   const [loading, setLoading] = useState(true);

// // //   const [error, setError] = useState<string | null>(null);

// // //   // ==================================================
// // //   // LOAD PROFILE
// // //   // ==================================================

// // //   const loadProfile = useCallback(async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);

// // //       const accessToken = await getAccessToken();

// // //       if (!accessToken) {
// // //         throw new Error("Authentication token not found.");
// // //       }

// // //       const authHeaders = {
// // //         Authorization: `Bearer ${accessToken}`,
// // //       };

// // //       // ================================================
// // //       // PROFILE
// // //       // ================================================

// // //       const profileResponse = await api.get<Profile>("/api/profiles/me/", {
// // //         headers: authHeaders,
// // //       });

// // //       setProfile(profileResponse.data);

// // //       // ================================================
// // //       // USER'S LISTINGS
// // //       // ================================================

// // //       const listingsResponse = await api.get("/api/v1/listings/", {
// // //         headers: authHeaders,
// // //       });

// // //       const allListings = normalizeListings(listingsResponse.data);

// // //       // ================================================
// // //       // ONLY CURRENT USER'S LISTINGS
// // //       // ================================================

// // //       const currentUserId = profileResponse.data.user ?? user?.id;

// // //       const myListings = allListings.filter(
// // //         (listing: any) =>
// // //           String(
// // //             listing.seller?.id ??
// // //               listing.user?.id ??
// // //               listing.owner?.id ??
// // //               listing.seller_id ??
// // //               listing.user_id ??
// // //               listing.owner_id ??
// // //               "",
// // //           ) === String(currentUserId),
// // //       );

// // //       setListings(myListings);
// // //     } catch (err: any) {
// // //       console.log(
// // //         "PROFILE LOAD ERROR:",
// // //         err?.response?.data ?? err?.message ?? err,
// // //       );

// // //       setError("Unable to load your profile.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [user?.id]);

// // //   // ==================================================
// // //   // LOAD ON SCREEN
// // //   // ==================================================

// // //   useEffect(() => {
// // //     loadProfile();
// // //   }, [loadProfile]);

// // //   // ==================================================
// // //   // LOADING
// // //   // ==================================================

// // //   if (loading) {
// // //     return (
// // //       <SafeAreaView style={styles.container} edges={["top"]}>
// // //         <View style={styles.loadingContainer}>
// // //           <ActivityIndicator size="large" color={Colors.primary} />
// // //         </View>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   // ==================================================
// // //   // ERROR
// // //   // ==================================================

// // //   if (error || !profile) {
// // //     return (
// // //       <SafeAreaView style={styles.container} edges={["top"]}>
// // //         <View style={styles.errorContainer}>
// // //           <View style={styles.emptyIcon}>
// // //             <Ionicons name="person-outline" size={30} color={Colors.primary} />
// // //           </View>

// // //           <Text style={styles.emptyTitle}>Profile unavailable</Text>

// // //           <Text style={styles.emptyText}>
// // //             {error ?? "We couldn't load your profile."}
// // //           </Text>

// // //           <Pressable style={styles.emptyButton} onPress={loadProfile}>
// // //             <Ionicons name="refresh" size={18} color={Colors.white} />

// // //             <Text style={styles.emptyButtonText}>Try Again</Text>
// // //           </Pressable>
// // //         </View>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   // ==================================================
// // //   // PROFILE DATA
// // //   // ==================================================

// // //   const username = user?.username ?? "";

// // //   const displayName = profile.display_name || username;

// // //   const bio = profile.bio || "Buying & selling good things on Suqe.";

// // //   const avatar = profile.avatar
// // //     ? { uri: profile.avatar }
// // //     : require("@/assets/images/used-bag.jpg");

// // //   const location = profile.city || "Ethiopia";

// // //   const isVerified = user?.is_verified ?? false;

// // //   // ==================================================
// // //   // SCREEN
// // //   // ==================================================

// // //   return (
// // //     <SafeAreaView style={styles.container} edges={["top"]}>
// // //       {/* ==================================================
// // //           TOP BAR
// // //       ================================================== */}

// // //       <View style={styles.topBar}>
// // //         <Text style={styles.username}>@{username}</Text>

// // //         <Pressable style={styles.topBarButton}>
// // //           <Ionicons
// // //             name="settings-outline"
// // //             size={22}
// // //             color={Colors.actionIcon}
// // //           />
// // //         </Pressable>
// // //       </View>

// // //       {/* ==================================================
// // //           PROFILE + LISTINGS
// // //       ================================================== */}

// // //       <FlatList
// // //         data={listings}
// // //         numColumns={2}
// // //         keyExtractor={(item) => item.id}
// // //         showsVerticalScrollIndicator={false}
// // //         contentContainerStyle={styles.content}
// // //         columnWrapperStyle={styles.productRow}
// // //         ListHeaderComponent={
// // //           <>
// // //             {/* PROFILE */}

// // //             <View style={styles.profileHeader}>
// // //               <View style={styles.avatarContainer}>
// // //                 <Image source={avatar} style={styles.avatar} />

// // //                 {isVerified && (
// // //                   <View style={styles.verifiedBadge}>
// // //                     <Ionicons name="checkmark" size={12} color={Colors.white} />
// // //                   </View>
// // //                 )}
// // //               </View>

// // //               <View style={styles.profileMain}>
// // //                 <View style={styles.nameRow}>
// // //                   <Text style={styles.displayName}>{displayName}</Text>

// // //                   {isVerified && (
// // //                     <Ionicons
// // //                       name="checkmark-circle"
// // //                       size={18}
// // //                       color={Colors.verified}
// // //                     />
// // //                   )}
// // //                 </View>

// // //                 <Text style={styles.bio}>{bio}</Text>

// // //                 {profile.city && (
// // //                   <View style={styles.locationRow}>
// // //                     <Ionicons
// // //                       name="location-outline"
// // //                       size={15}
// // //                       color={Colors.locationIcon}
// // //                     />

// // //                     <Text style={styles.location}>{location}</Text>
// // //                   </View>
// // //                 )}
// // //               </View>
// // //             </View>

// // //             {/* STATS */}

// // //             <View style={styles.statsContainer}>
// // //               <View style={styles.stat}>
// // //                 <Text style={styles.statNumber}>{listings.length}</Text>

// // //                 <Text style={styles.statLabel}>Listings</Text>
// // //               </View>

// // //               <View style={styles.statDivider} />

// // //               <View style={styles.stat}>
// // //                 <Text style={styles.statNumber}>{profile.followers_count}</Text>

// // //                 <Text style={styles.statLabel}>Followers</Text>
// // //               </View>

// // //               <View style={styles.statDivider} />

// // //               <View style={styles.stat}>
// // //                 <Text style={styles.statNumber}>{profile.following_count}</Text>

// // //                 <Text style={styles.statLabel}>Following</Text>
// // //               </View>
// // //             </View>

// // //             {/* ACTIONS */}

// // //             <View style={styles.actionsRow}>
// // //               <Pressable style={styles.editButton}>
// // //                 <Ionicons
// // //                   name="create-outline"
// // //                   size={18}
// // //                   color={Colors.textPrimary}
// // //                 />

// // //                 <Text style={styles.editButtonText}>Edit Profile</Text>
// // //               </Pressable>

// // //               <Pressable style={styles.shareButton}>
// // //                 <Ionicons name="share-outline" size={18} color={Colors.white} />

// // //                 <Text style={styles.shareButtonText}>Share Profile</Text>
// // //               </Pressable>
// // //             </View>

// // //             {/* LISTINGS HEADER */}

// // //             <View style={styles.postsHeader}>
// // //               <View>
// // //                 <Text style={styles.postsTitle}>Your items</Text>

// // //                 <Text style={styles.postsSubtitle}>
// // //                   Items you've listed on Suqe
// // //                 </Text>
// // //               </View>

// // //               <View style={styles.postCountBadge}>
// // //                 <Text style={styles.postCountText}>{listings.length}</Text>
// // //               </View>
// // //             </View>
// // //           </>
// // //         }
// // //         renderItem={({ item }) => {
// // //           const image = getListingImage(item);

// // //           return (
// // //             <Pressable style={styles.productCard}>
// // //               {/* MEDIA */}

// // //               <View style={styles.productImageContainer}>
// // //                 {image ? (
// // //                   <Image
// // //                     source={{ uri: image }}
// // //                     style={styles.productImage}
// // //                     resizeMode="cover"
// // //                   />
// // //                 ) : (
// // //                   <View style={styles.imagePlaceholder}>
// // //                     <Ionicons
// // //                       name="image-outline"
// // //                       size={30}
// // //                       color={Colors.textMuted}
// // //                     />
// // //                   </View>
// // //                 )}

// // //                 {item.media.length > 1 && (
// // //                   <View style={styles.mediaCount}>
// // //                     <Ionicons
// // //                       name="images-outline"
// // //                       size={12}
// // //                       color={Colors.white}
// // //                     />

// // //                     <Text style={styles.mediaCountText}>
// // //                       {item.media.length}
// // //                     </Text>
// // //                   </View>
// // //                 )}

// // //                 <View style={styles.priceBadge}>
// // //                   <Text style={styles.priceText}>
// // //                     {item.price.toLocaleString()} {item.currency}
// // //                   </Text>
// // //                 </View>
// // //               </View>

// // //               {/* INFO */}

// // //               <View style={styles.productInfo}>
// // //                 <Text style={styles.productName} numberOfLines={1}>
// // //                   {item.title}
// // //                 </Text>

// // //                 <Text style={styles.productLocation} numberOfLines={1}>
// // //                   📍 {item.location.area ? `${item.location.area}, ` : ""}
// // //                   {item.location.city}
// // //                 </Text>

// // //                 <View style={styles.productMeta}>
// // //                   <View style={styles.metaItem}>
// // //                     <Ionicons
// // //                       name="heart-outline"
// // //                       size={14}
// // //                       color={Colors.textMuted}
// // //                     />

// // //                     <Text style={styles.metaText}>{item.stats.likes}</Text>
// // //                   </View>

// // //                   <View style={styles.metaItem}>
// // //                     <Ionicons
// // //                       name="eye-outline"
// // //                       size={14}
// // //                       color={Colors.textMuted}
// // //                     />

// // //                     <Text style={styles.metaText}>{item.stats.views}</Text>
// // //                   </View>
// // //                 </View>
// // //               </View>
// // //             </Pressable>
// // //           );
// // //         }}
// // //         ListEmptyComponent={
// // //           <View style={styles.emptyState}>
// // //             <View style={styles.emptyIcon}>
// // //               <Ionicons name="cube-outline" size={30} color={Colors.primary} />
// // //             </View>

// // //             <Text style={styles.emptyTitle}>No items yet</Text>

// // //             <Text style={styles.emptyText}>
// // //               When you list something for sale, your items will appear here.
// // //             </Text>

// // //             <Pressable style={styles.emptyButton}>
// // //               <Ionicons name="add" size={18} color={Colors.white} />

// // //               <Text style={styles.emptyButtonText}>Sell an Item</Text>
// // //             </Pressable>
// // //           </View>
// // //         }
// // //       />
// // //     </SafeAreaView>
// // //   );
// // // }

// // // // ==================================================
// // // // STYLES
// // // // ==================================================

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: Colors.background,
// // //   },

// // //   content: {
// // //     paddingHorizontal: 16,
// // //     paddingBottom: 40,
// // //   },

// // //   topBar: {
// // //     height: 60,
// // //     paddingHorizontal: 16,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //   },

// // //   username: {
// // //     ...Typography.h2,
// // //     color: Colors.primary,
// // //   },

// // //   topBarButton: {
// // //     width: 40,
// // //     height: 40,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     borderRadius: Radius.md,
// // //     backgroundColor: Colors.actionBackground,
// // //   },

// // //   profileHeader: {
// // //     flexDirection: "row",
// // //     paddingTop: 10,
// // //     paddingBottom: 18,
// // //   },

// // //   avatarContainer: {
// // //     position: "relative",
// // //   },

// // //   avatar: {
// // //     width: 92,
// // //     height: 92,
// // //     borderRadius: 46,
// // //     backgroundColor: Colors.surfaceLight,
// // //   },

// // //   verifiedBadge: {
// // //     position: "absolute",
// // //     right: 2,
// // //     bottom: 2,
// // //     width: 22,
// // //     height: 22,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     borderRadius: 11,
// // //     backgroundColor: Colors.verified,
// // //     borderWidth: 2,
// // //     borderColor: Colors.background,
// // //   },

// // //   profileMain: {
// // //     flex: 1,
// // //     marginLeft: 16,
// // //     justifyContent: "center",
// // //   },

// // //   nameRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 6,
// // //   },

// // //   displayName: {
// // //     ...Typography.h2,
// // //     flexShrink: 1,
// // //     color: Colors.textPrimary,
// // //   },

// // //   bio: {
// // //     ...Typography.body,
// // //     marginTop: 4,
// // //     color: Colors.textSecondary,
// // //   },

// // //   locationRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 4,
// // //     marginTop: 6,
// // //   },

// // //   location: {
// // //     ...Typography.caption,
// // //     color: Colors.textMuted,
// // //   },

// // //   statsContainer: {
// // //     height: 72,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: Colors.surface,
// // //     borderWidth: 1,
// // //     borderColor: Colors.borderLight,
// // //     borderRadius: Radius.md,
// // //   },

// // //   stat: {
// // //     flex: 1,
// // //     alignItems: "center",
// // //   },

// // //   statNumber: {
// // //     ...Typography.h3,
// // //     color: Colors.textPrimary,
// // //   },

// // //   statLabel: {
// // //     ...Typography.caption,
// // //     marginTop: 2,
// // //     color: Colors.textMuted,
// // //   },

// // //   statDivider: {
// // //     width: 1,
// // //     height: 30,
// // //     backgroundColor: Colors.divider,
// // //   },

// // //   actionsRow: {
// // //     flexDirection: "row",
// // //     gap: 10,
// // //     marginTop: 14,
// // //     marginBottom: 20,
// // //   },

// // //   editButton: {
// // //     flex: 1,
// // //     height: 46,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     gap: 7,
// // //     backgroundColor: Colors.buttonSecondary,
// // //     borderRadius: Radius.md,
// // //   },

// // //   editButtonText: {
// // //     ...Typography.button,
// // //     color: Colors.textPrimary,
// // //   },

// // //   shareButton: {
// // //     flex: 1,
// // //     height: 46,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     gap: 7,
// // //     backgroundColor: Colors.buttonPrimary,
// // //     borderRadius: Radius.md,
// // //   },

// // //   shareButtonText: {
// // //     ...Typography.button,
// // //     color: Colors.white,
// // //   },

// // //   postsHeader: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     marginBottom: 14,
// // //   },

// // //   postsTitle: {
// // //     ...Typography.h3,
// // //     color: Colors.textPrimary,
// // //   },

// // //   postsSubtitle: {
// // //     ...Typography.caption,
// // //     marginTop: 3,
// // //     color: Colors.textMuted,
// // //   },

// // //   postCountBadge: {
// // //     minWidth: 32,
// // //     height: 28,
// // //     paddingHorizontal: 9,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: Colors.errorLight,
// // //     borderRadius: Radius.md,
// // //   },

// // //   postCountText: {
// // //     ...Typography.label,
// // //     color: Colors.primary,
// // //   },

// // //   productRow: {
// // //     justifyContent: "space-between",
// // //   },

// // //   productCard: {
// // //     width: "48.5%",
// // //     marginBottom: 16,
// // //     overflow: "hidden",
// // //     backgroundColor: Colors.surface,
// // //     borderWidth: 1,
// // //     borderColor: Colors.borderLight,
// // //     borderRadius: Radius.md,
// // //   },

// // //   productImageContainer: {
// // //     width: "100%",
// // //     aspectRatio: 1,
// // //     backgroundColor: Colors.surfaceLight,
// // //     position: "relative",
// // //   },

// // //   productImage: {
// // //     width: "100%",
// // //     height: "100%",
// // //   },

// // //   imagePlaceholder: {
// // //     width: "100%",
// // //     height: "100%",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: Colors.surfaceLight,
// // //   },

// // //   mediaCount: {
// // //     position: "absolute",
// // //     top: 8,
// // //     right: 8,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 4,
// // //     paddingHorizontal: 7,
// // //     paddingVertical: 5,
// // //     backgroundColor: "rgba(0,0,0,0.65)",
// // //     borderRadius: Radius.md,
// // //   },

// // //   mediaCountText: {
// // //     ...Typography.caption,
// // //     color: Colors.white,
// // //   },

// // //   priceBadge: {
// // //     position: "absolute",
// // //     left: 8,
// // //     bottom: 8,
// // //     paddingHorizontal: 8,
// // //     paddingVertical: 5,
// // //     backgroundColor: Colors.white,
// // //     borderRadius: Radius.md,
// // //   },

// // //   priceText: {
// // //     ...Typography.label,
// // //     color: Colors.price,
// // //   },

// // //   productInfo: {
// // //     padding: 10,
// // //   },

// // //   productName: {
// // //     ...Typography.bodyMedium,
// // //     color: Colors.textPrimary,
// // //   },

// // //   productLocation: {
// // //     ...Typography.caption,
// // //     marginTop: 4,
// // //     color: Colors.location,
// // //   },

// // //   productMeta: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 12,
// // //     marginTop: 8,
// // //   },

// // //   metaItem: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 4,
// // //   },

// // //   metaText: {
// // //     ...Typography.caption,
// // //     color: Colors.textMuted,
// // //   },

// // //   emptyState: {
// // //     alignItems: "center",
// // //     paddingHorizontal: 30,
// // //     paddingVertical: 44,
// // //     backgroundColor: Colors.surface,
// // //     borderWidth: 1,
// // //     borderColor: Colors.borderLight,
// // //     borderRadius: Radius.md,
// // //   },

// // //   emptyIcon: {
// // //     width: 62,
// // //     height: 62,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginBottom: 14,
// // //     borderRadius: 31,
// // //     backgroundColor: Colors.errorLight,
// // //   },

// // //   emptyTitle: {
// // //     ...Typography.h3,
// // //     color: Colors.textPrimary,
// // //   },

// // //   emptyText: {
// // //     ...Typography.body,
// // //     marginTop: 6,
// // //     textAlign: "center",
// // //     color: Colors.textSecondary,
// // //   },

// // //   emptyButton: {
// // //     height: 44,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     gap: 6,
// // //     paddingHorizontal: 18,
// // //     marginTop: 18,
// // //     backgroundColor: Colors.buttonPrimary,
// // //     borderRadius: Radius.md,
// // //   },

// // //   emptyButtonText: {
// // //     ...Typography.button,
// // //     color: Colors.white,
// // //   },

// // //   loadingContainer: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },

// // //   errorContainer: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     paddingHorizontal: 30,
// // //   },
// // // });

// // import {
// //   StyleSheet,
// //   View,
// //   Text,
// //   Pressable,
// //   Image,
// //   FlatList,
// //   ActivityIndicator,
// // } from "react-native";

// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Ionicons } from "@expo/vector-icons";
// // import { Colors } from "@/constants/src/theme/colors";
// // import { Radius } from "@/constants/src/theme/radius";
// // import { Typography } from "@/constants/src/theme/typography";

// // import { useCallback, useEffect, useState } from "react";
// // import { api } from "@/constants/src/api/client";
// // import { getAccessToken } from "@/constants/src/auth/storage";
// // import { useAuth } from "@/constants/src/auth/AuthContext";

// // // ==================================================
// // // TYPES
// // // ==================================================

// // type Profile = {
// //   id: string;
// //   user: string;
// //   display_name: string;
// //   bio: string;
// //   avatar: string | null;
// //   city: string;
// //   preferred_language: string;
// //   followers_count: number;
// //   following_count: number;
// //   listings_count: number;
// // };

// // type Listing = {
// //   id: string;

// //   title: string;
// //   description: string;

// //   price: number;
// //   currency: "ETB" | string;

// //   condition: "new" | "used" | string;

// //   location: {
// //     city: string;
// //     area: string;
// //   };

// //   media: {
// //     id: string;
// //     type: "image" | "video" | string;
// //     uri: string;
// //   }[];

// //   stats: {
// //     likes: number;
// //     views: number;
// //   };

// //   createdAt: string;
// // };

// // // ==================================================
// // // HELPERS
// // // ==================================================

// // function getListingImage(listing: Listing): string | null {
// //   return listing.media?.[0]?.uri ?? null;
// // }

// // function normalizeListings(data: any): Listing[] {
// //   const rawListings = Array.isArray(data)
// //     ? data
// //     : Array.isArray(data?.results)
// //       ? data.results
// //       : [];

// //   return rawListings.map((item: any) => ({
// //     id: String(item.id),

// //     title: item.title ?? "",
// //     description: item.description ?? "",

// //     price: Number(item.price ?? 0),
// //     currency: item.currency ?? "ETB",

// //     condition: item.condition ?? "used",

// //     location: {
// //       city: item.location?.city ?? item.city ?? "",
// //       area: item.location?.area ?? item.area ?? "",
// //     },

// //     media: Array.isArray(item.media)
// //       ? item.media.map((media: any) => ({
// //           id: String(media.id),
// //           type: media.type ?? "image",
// //           uri: media.uri ?? media.url ?? media.file ?? media.image ?? "",
// //         }))
// //       : [],

// //     stats: {
// //       likes: Number(item.stats?.likes ?? item.likes_count ?? item.likes ?? 0),
// //       views: Number(item.stats?.views ?? item.views_count ?? item.views ?? 0),
// //     },

// //     createdAt: item.created_at ?? item.createdAt ?? "",
// //   }));
// // }

// // // ==================================================
// // // SCREEN
// // // ==================================================

// // export default function ProfileScreen() {
// //   const { user } = useAuth();

// //   const [profile, setProfile] = useState<Profile | null>(null);

// //   const [listings, setListings] = useState<Listing[]>([]);

// //   const [loading, setLoading] = useState(true);

// //   const [error, setError] = useState<string | null>(null);

// //   // ==================================================
// //   // LOAD PROFILE
// //   // ==================================================

// //   const loadProfile = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const accessToken = await getAccessToken();

// //       if (!accessToken) {
// //         throw new Error("Authentication token not found.");
// //       }

// //       const authHeaders = {
// //         Authorization: `Bearer ${accessToken}`,
// //       };

// //       // ================================================
// //       // PROFILE
// //       // ================================================

// //       const profileResponse = await api.get<Profile>("/api/profiles/me/", {
// //         headers: authHeaders,
// //       });

// //       setProfile(profileResponse.data);

// //       // ================================================
// //       // USER'S LISTINGS
// //       // ================================================

// //       const listingsResponse = await api.get("/api/v1/listings/", {
// //         headers: authHeaders,
// //       });

// //       const allListings = normalizeListings(listingsResponse.data);

// //       // ================================================
// //       // ONLY CURRENT USER'S LISTINGS
// //       // ================================================

// //       const currentUserId = profileResponse.data.user ?? user?.id;

// //       const myListings = allListings.filter(
// //         (listing: any) =>
// //           String(
// //             listing.seller?.id ??
// //               listing.user?.id ??
// //               listing.owner?.id ??
// //               listing.seller_id ??
// //               listing.user_id ??
// //               listing.owner_id ??
// //               "",
// //           ) === String(currentUserId),
// //       );

// //       setListings(myListings);
// //     } catch (err: any) {
// //       console.log(
// //         "PROFILE LOAD ERROR:",
// //         err?.response?.data ?? err?.message ?? err,
// //       );

// //       setError("Unable to load your profile.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [user?.id]);

// //   // ==================================================
// //   // LOAD ON SCREEN
// //   // ==================================================

// //   useEffect(() => {
// //     loadProfile();
// //   }, [loadProfile]);

// //   // ==================================================
// //   // LOADING
// //   // ==================================================

// //   if (loading) {
// //     return (
// //       <SafeAreaView style={styles.container} edges={["top"]}>
// //         <View style={styles.loadingContainer}>
// //           <ActivityIndicator size="large" color={Colors.primary} />
// //         </View>
// //       </SafeAreaView>
// //     );
// //   }

// //   // ==================================================
// //   // ERROR
// //   // ==================================================

// //   if (error || !profile) {
// //     return (
// //       <SafeAreaView style={styles.container} edges={["top"]}>
// //         <View style={styles.errorContainer}>
// //           <View style={styles.emptyIcon}>
// //             <Ionicons name="person-outline" size={30} color={Colors.primary} />
// //           </View>

// //           <Text style={styles.emptyTitle}>Profile unavailable</Text>

// //           <Text style={styles.emptyText}>
// //             {error ?? "We couldn't load your profile."}
// //           </Text>

// //           <Pressable style={styles.emptyButton} onPress={loadProfile}>
// //             <Ionicons name="refresh" size={18} color={Colors.white} />

// //             <Text style={styles.emptyButtonText}>Try Again</Text>
// //           </Pressable>
// //         </View>
// //       </SafeAreaView>
// //     );
// //   }

// //   // ==================================================
// //   // PROFILE DATA
// //   // ==================================================

// //   const username = user?.username ?? "";

// //   const displayName = profile.display_name || username;

// //   const bio = profile.bio || "Buying & selling good things on Suqe.";

// //   const avatar = profile.avatar
// //     ? { uri: profile.avatar }
// //     : require("@/assets/images/used-bag.jpg");

// //   const location = profile.city || "Ethiopia";

// //   const isVerified = user?.is_verified ?? false;

// //   // ==================================================
// //   // SCREEN
// //   // ==================================================

// //   return (
// //     <SafeAreaView style={styles.container} edges={["top"]}>
// //       {/* ==================================================
// //           FIXED TOP BAR
// //       ================================================== */}

// //       <View style={styles.fixedHeader}>
// //         <View style={styles.topBar}>
// //           <Text style={styles.username}>@{username}</Text>

// //           <Pressable
// //             style={({ pressed }) => [
// //               styles.topBarButton,
// //               pressed && styles.buttonPressed,
// //             ]}
// //           >
// //             <Ionicons
// //               name="settings-outline"
// //               size={21}
// //               color={Colors.actionIcon}
// //             />
// //           </Pressable>
// //         </View>
// //       </View>

// //       {/* ==================================================
// //           PROFILE + LISTINGS
// //       ================================================== */}

// //       <FlatList
// //         data={listings}
// //         numColumns={2}
// //         keyExtractor={(item) => item.id}
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={styles.content}
// //         columnWrapperStyle={styles.productRow}
// //         ListHeaderComponent={
// //           <>
// //             {/* PROFILE */}

// //             <View style={styles.profileHeader}>
// //               <View style={styles.avatarContainer}>
// //                 <Image source={avatar} style={styles.avatar} />

// //                 {isVerified && (
// //                   <View style={styles.verifiedBadge}>
// //                     <Ionicons name="checkmark" size={12} color={Colors.white} />
// //                   </View>
// //                 )}
// //               </View>

// //               <View style={styles.profileMain}>
// //                 <View style={styles.nameRow}>
// //                   <Text style={styles.displayName}>{displayName}</Text>

// //                   {isVerified && (
// //                     <Ionicons
// //                       name="checkmark-circle"
// //                       size={18}
// //                       color={Colors.verified}
// //                     />
// //                   )}
// //                 </View>

// //                 <Text style={styles.bio}>{bio}</Text>

// //                 {profile.city && (
// //                   <View style={styles.locationRow}>
// //                     <Ionicons
// //                       name="location-outline"
// //                       size={15}
// //                       color={Colors.locationIcon}
// //                     />

// //                     <Text style={styles.location}>{location}</Text>
// //                   </View>
// //                 )}
// //               </View>
// //             </View>

// //             {/* STATS */}

// //             <View style={styles.statsContainer}>
// //               <View style={styles.stat}>
// //                 <Text style={styles.statNumber}>{listings.length}</Text>

// //                 <Text style={styles.statLabel}>Listings</Text>
// //               </View>

// //               <View style={styles.statDivider} />

// //               <View style={styles.stat}>
// //                 <Text style={styles.statNumber}>{profile.followers_count}</Text>

// //                 <Text style={styles.statLabel}>Followers</Text>
// //               </View>

// //               <View style={styles.statDivider} />

// //               <View style={styles.stat}>
// //                 <Text style={styles.statNumber}>{profile.following_count}</Text>

// //                 <Text style={styles.statLabel}>Following</Text>
// //               </View>
// //             </View>

// //             {/* ACTIONS */}

// //             <View style={styles.actionsRow}>
// //               <Pressable
// //                 style={({ pressed }) => [
// //                   styles.editButton,
// //                   pressed && styles.buttonPressed,
// //                 ]}
// //               >
// //                 <Ionicons
// //                   name="create-outline"
// //                   size={18}
// //                   color={Colors.textPrimary}
// //                 />

// //                 <Text style={styles.editButtonText}>Edit Profile</Text>
// //               </Pressable>

// //               <Pressable
// //                 style={({ pressed }) => [
// //                   styles.shareButton,
// //                   pressed && styles.primaryButtonPressed,
// //                 ]}
// //               >
// //                 <Ionicons name="share-outline" size={18} color={Colors.white} />

// //                 <Text style={styles.shareButtonText}>Share Profile</Text>
// //               </Pressable>
// //             </View>

// //             {/* LISTINGS HEADER */}

// //             <View style={styles.postsHeader}>
// //               <View style={styles.postsHeaderText}>
// //                 <Text style={styles.postsTitle}>Your items</Text>

// //                 <Text style={styles.postsSubtitle}>
// //                   Items you've listed on Suqe
// //                 </Text>
// //               </View>

// //               <View style={styles.postCountBadge}>
// //                 <Text style={styles.postCountText}>{listings.length}</Text>
// //               </View>
// //             </View>
// //           </>
// //         }
// //         renderItem={({ item }) => {
// //           const image = getListingImage(item);

// //           return (
// //             <Pressable
// //               style={({ pressed }) => [
// //                 styles.productCard,
// //                 pressed && styles.productCardPressed,
// //               ]}
// //             >
// //               {/* MEDIA */}

// //               <View style={styles.productImageContainer}>
// //                 {image ? (
// //                   <Image
// //                     source={{ uri: image }}
// //                     style={styles.productImage}
// //                     resizeMode="cover"
// //                   />
// //                 ) : (
// //                   <View style={styles.imagePlaceholder}>
// //                     <Ionicons
// //                       name="image-outline"
// //                       size={30}
// //                       color={Colors.textMuted}
// //                     />
// //                   </View>
// //                 )}

// //                 {item.media.length > 1 && (
// //                   <View style={styles.mediaCount}>
// //                     <Ionicons
// //                       name="images-outline"
// //                       size={12}
// //                       color={Colors.white}
// //                     />

// //                     <Text style={styles.mediaCountText}>
// //                       {item.media.length}
// //                     </Text>
// //                   </View>
// //                 )}

// //                 <View style={styles.priceBadge}>
// //                   <Text style={styles.priceText}>
// //                     {item.price.toLocaleString()} {item.currency}
// //                   </Text>
// //                 </View>
// //               </View>

// //               {/* INFO */}

// //               <View style={styles.productInfo}>
// //                 <Text style={styles.productName} numberOfLines={1}>
// //                   {item.title}
// //                 </Text>

// //                 <Text style={styles.productLocation} numberOfLines={1}>
// //                   📍 {item.location.area ? `${item.location.area}, ` : ""}
// //                   {item.location.city}
// //                 </Text>

// //                 <View style={styles.productMeta}>
// //                   <View style={styles.metaItem}>
// //                     <Ionicons
// //                       name="heart-outline"
// //                       size={14}
// //                       color={Colors.textMuted}
// //                     />

// //                     <Text style={styles.metaText}>{item.stats.likes}</Text>
// //                   </View>

// //                   <View style={styles.metaItem}>
// //                     <Ionicons
// //                       name="eye-outline"
// //                       size={14}
// //                       color={Colors.textMuted}
// //                     />

// //                     <Text style={styles.metaText}>{item.stats.views}</Text>
// //                   </View>
// //                 </View>
// //               </View>
// //             </Pressable>
// //           );
// //         }}
// //         ListEmptyComponent={
// //           <View style={styles.emptyState}>
// //             <View style={styles.emptyIcon}>
// //               <Ionicons name="cube-outline" size={30} color={Colors.primary} />
// //             </View>

// //             <Text style={styles.emptyTitle}>No items yet</Text>

// //             <Text style={styles.emptyText}>
// //               When you list something for sale, your items will appear here.
// //             </Text>

// //             <Pressable
// //               style={({ pressed }) => [
// //                 styles.emptyButton,
// //                 pressed && styles.primaryButtonPressed,
// //               ]}
// //             >
// //               <Ionicons name="add" size={18} color={Colors.white} />

// //               <Text style={styles.emptyButtonText}>Sell an Item</Text>
// //             </Pressable>
// //           </View>
// //         }
// //       />
// //     </SafeAreaView>
// //   );
// // }

// // // ==================================================
// // // STYLES
// // // ==================================================

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: Colors.background,
// //   },

// //   // ==================================================
// //   // FIXED HEADER
// //   // ==================================================

// //   fixedHeader: {
// //     paddingHorizontal: 20,
// //     paddingTop: 6,
// //     paddingBottom: 4,
// //     backgroundColor: Colors.background,
// //   },

// //   topBar: {
// //     height: 52,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //   },

// //   username: {
// //     ...Typography.h2,
// //     fontSize: 25,
// //     lineHeight: 31,
// //     fontWeight: "800",
// //     color: Colors.primary,
// //     letterSpacing: -0.5,
// //   },

// //   topBarButton: {
// //     width: 44,
// //     height: 44,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: Colors.surface,
// //     borderWidth: 1,
// //     borderColor: Colors.borderLight,
// //     borderRadius: Radius.circle,
// //   },

// //   buttonPressed: {
// //     opacity: 0.72,
// //     transform: [{ scale: 0.97 }],
// //   },

// //   primaryButtonPressed: {
// //     opacity: 0.82,
// //     transform: [{ scale: 0.985 }],
// //   },

// //   // ==================================================
// //   // CONTENT
// //   // ==================================================

// //   content: {
// //     paddingHorizontal: 20,
// //     paddingTop: 8,
// //     paddingBottom: 40,
// //   },

// //   // ==================================================
// //   // PROFILE
// //   // ==================================================

// //   profileHeader: {
// //     flexDirection: "row",
// //     paddingTop: 8,
// //     paddingBottom: 22,
// //   },

// //   avatarContainer: {
// //     position: "relative",
// //   },

// //   avatar: {
// //     width: 96,
// //     height: 96,
// //     borderRadius: 48,
// //     backgroundColor: Colors.surfaceLight,
// //   },

// //   verifiedBadge: {
// //     position: "absolute",
// //     right: 1,
// //     bottom: 1,
// //     width: 23,
// //     height: 23,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: Radius.circle,
// //     backgroundColor: Colors.verified,
// //     borderWidth: 2,
// //     borderColor: Colors.background,
// //   },

// //   profileMain: {
// //     flex: 1,
// //     marginLeft: 16,
// //     justifyContent: "center",
// //   },

// //   nameRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 6,
// //   },

// //   displayName: {
// //     ...Typography.h2,
// //     flexShrink: 1,
// //     color: Colors.textPrimary,
// //   },

// //   bio: {
// //     ...Typography.body,
// //     marginTop: 5,
// //     lineHeight: 20,
// //     color: Colors.textSecondary,
// //   },

// //   locationRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 4,
// //     marginTop: 7,
// //   },

// //   location: {
// //     ...Typography.caption,
// //     color: Colors.textMuted,
// //   },

// //   // ==================================================
// //   // STATS
// //   // ==================================================

// //   statsContainer: {
// //     minHeight: 76,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: Colors.surface,
// //     borderWidth: 1,
// //     borderColor: Colors.borderLight,
// //     borderRadius: Radius.lg,
// //   },

// //   stat: {
// //     flex: 1,
// //     alignItems: "center",
// //   },

// //   statNumber: {
// //     ...Typography.h3,
// //     color: Colors.textPrimary,
// //   },

// //   statLabel: {
// //     ...Typography.caption,
// //     marginTop: 3,
// //     color: Colors.textMuted,
// //   },

// //   statDivider: {
// //     width: 1,
// //     height: 32,
// //     backgroundColor: Colors.divider,
// //   },

// //   // ==================================================
// //   // ACTIONS
// //   // ==================================================

// //   actionsRow: {
// //     flexDirection: "row",
// //     gap: 10,
// //     marginTop: 14,
// //     marginBottom: 26,
// //   },

// //   editButton: {
// //     flex: 1,
// //     height: 50,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 7,
// //     backgroundColor: Colors.buttonSecondary,
// //     borderWidth: 1,
// //     borderColor: Colors.borderLight,
// //     borderRadius: Radius.lg,
// //   },

// //   editButtonText: {
// //     ...Typography.button,
// //     color: Colors.textPrimary,
// //   },

// //   shareButton: {
// //     flex: 1,
// //     height: 50,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 7,
// //     backgroundColor: Colors.buttonPrimary,
// //     borderRadius: Radius.lg,
// //   },

// //   shareButtonText: {
// //     ...Typography.button,
// //     color: Colors.white,
// //   },

// //   // ==================================================
// //   // LISTINGS HEADER
// //   // ==================================================

// //   postsHeader: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     marginBottom: 15,
// //   },

// //   postsHeaderText: {
// //     flex: 1,
// //   },

// //   postsTitle: {
// //     ...Typography.h3,
// //     color: Colors.textPrimary,
// //   },

// //   postsSubtitle: {
// //     ...Typography.caption,
// //     marginTop: 4,
// //     color: Colors.textMuted,
// //   },

// //   postCountBadge: {
// //     minWidth: 34,
// //     height: 30,
// //     paddingHorizontal: 9,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: Colors.errorLight,
// //     borderRadius: Radius.pill,
// //   },

// //   postCountText: {
// //     ...Typography.label,
// //     color: Colors.primary,
// //   },

// //   // ==================================================
// //   // PRODUCT GRID
// //   // ==================================================

// //   productRow: {
// //     justifyContent: "space-between",
// //   },

// //   productCard: {
// //     width: "48.5%",
// //     marginBottom: 16,
// //     overflow: "hidden",
// //     backgroundColor: Colors.surface,
// //     borderWidth: 1,
// //     borderColor: Colors.borderLight,
// //     borderRadius: Radius.lg,
// //   },

// //   productCardPressed: {
// //     opacity: 0.92,
// //     transform: [{ scale: 0.985 }],
// //   },

// //   productImageContainer: {
// //     width: "100%",
// //     aspectRatio: 1,
// //     position: "relative",
// //     backgroundColor: Colors.surfaceLight,
// //   },

// //   productImage: {
// //     width: "100%",
// //     height: "100%",
// //   },

// //   imagePlaceholder: {
// //     width: "100%",
// //     height: "100%",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: Colors.surfaceLight,
// //   },

// //   mediaCount: {
// //     position: "absolute",
// //     top: 8,
// //     right: 8,
// //     minHeight: 27,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 4,
// //     paddingHorizontal: 8,
// //     backgroundColor: "rgba(0,0,0,0.65)",
// //     borderRadius: Radius.pill,
// //   },

// //   mediaCountText: {
// //     ...Typography.caption,
// //     color: Colors.white,
// //   },

// //   priceBadge: {
// //     position: "absolute",
// //     left: 8,
// //     bottom: 8,
// //     maxWidth: "90%",
// //     paddingHorizontal: 9,
// //     paddingVertical: 6,
// //     backgroundColor: Colors.white,
// //     borderRadius: Radius.pill,
// //   },

// //   priceText: {
// //     ...Typography.label,
// //     color: Colors.price,
// //   },

// //   productInfo: {
// //     padding: 11,
// //   },

// //   productName: {
// //     ...Typography.bodyMedium,
// //     color: Colors.textPrimary,
// //   },

// //   productLocation: {
// //     ...Typography.caption,
// //     marginTop: 5,
// //     color: Colors.location,
// //   },

// //   productMeta: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 12,
// //     marginTop: 9,
// //   },

// //   metaItem: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 4,
// //   },

// //   metaText: {
// //     ...Typography.caption,
// //     color: Colors.textMuted,
// //   },

// //   // ==================================================
// //   // EMPTY STATE
// //   // ==================================================

// //   emptyState: {
// //     alignItems: "center",
// //     paddingHorizontal: 26,
// //     paddingVertical: 46,
// //     backgroundColor: Colors.surface,
// //     borderWidth: 1,
// //     borderColor: Colors.borderLight,
// //     borderRadius: Radius.lg,
// //   },

// //   emptyIcon: {
// //     width: 64,
// //     height: 64,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: 15,
// //     borderRadius: Radius.circle,
// //     backgroundColor: Colors.errorLight,
// //   },

// //   emptyTitle: {
// //     ...Typography.h3,
// //     color: Colors.textPrimary,
// //   },

// //   emptyText: {
// //     ...Typography.body,
// //     marginTop: 7,
// //     textAlign: "center",
// //     lineHeight: 21,
// //     color: Colors.textSecondary,
// //   },

// //   emptyButton: {
// //     height: 48,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 6,
// //     paddingHorizontal: 20,
// //     marginTop: 20,
// //     backgroundColor: Colors.buttonPrimary,
// //     borderRadius: Radius.lg,
// //   },

// //   emptyButtonText: {
// //     ...Typography.button,
// //     color: Colors.white,
// //   },

// //   // ==================================================
// //   // LOADING / ERROR
// //   // ==================================================

// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   errorContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingHorizontal: 30,
// //   },
// // });

// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useCallback, useEffect, useState } from "react";

// import { Colors } from "@/constants/src/theme/colors";
// import { Typography } from "@/constants/src/theme/typography";
// import { api } from "@/constants/src/api/client";
// import { getAccessToken } from "@/constants/src/auth/storage";
// import { useAuth } from "@/constants/src/auth/AuthContext";

// type Profile = {
//   id: string;
//   user: string;
//   display_name: string;
//   bio: string;
//   avatar: string | null;
//   city: string;
//   preferred_language: string;
//   followers_count: number;
//   following_count: number;
//   listings_count: number;
// };

// type Seller = {
//   id: string;
//   username: string;
//   display_name: string;
//   avatar: string | null;
//   is_verified: boolean;
// };

// type Listing = {
//   id: string;
//   seller: Seller;

//   title: string;
//   description: string;
//   price: number;

//   currency: {
//     id?: string;
//     code: string;
//     name: string;
//     symbol: string;
//   };

//   condition: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   location: {
//     city: string;
//     area: string;
//   };

//   media: {
//     id: string;
//     type: "image" | "video" | string;
//     uri: string;
//     thumbnailUri?: string;
//   }[];

//   stats: {
//     likes: number;
//     views: number;
//     comments: number;
//     shares: number;
//     saves: number;
//   };

//   createdAt: string;
// };

// function normalizeListings(data: any): Listing[] {
//   const rawListings = Array.isArray(data)
//     ? data
//     : Array.isArray(data?.results)
//       ? data.results
//       : [];

//   return rawListings.map((item: any) => ({
//     id: String(item.id),

//     // IMPORTANT:
//     // Keep seller information because we use seller.id
//     // to find the current user's listings.
//     seller: {
//       id: String(item.seller?.id ?? ""),
//       username: item.seller?.username ?? "",
//       display_name: item.seller?.display_name ?? "",
//       avatar: item.seller?.avatar ?? null,
//       is_verified: Boolean(item.seller?.is_verified),
//     },

//     title: item.title ?? "",
//     description: item.description ?? "",

//     price: Number(item.price ?? 0),

//     // Backend returns currency as an object.
//     currency: {
//       id: item.currency?.id,
//       code: item.currency?.code ?? "ETB",
//       name: item.currency?.name ?? "Birr",
//       symbol: item.currency?.symbol ?? "Br",
//     },

//     condition: {
//       id: String(item.condition?.id ?? ""),
//       name: item.condition?.name ?? "",
//       slug: item.condition?.slug ?? "",
//     },

//     location: {
//       city: item.location?.city ?? "",
//       area: item.location?.area ?? "",
//     },

//     // Backend uses media_type + url.
//     media: Array.isArray(item.media)
//       ? item.media.map((media: any) => ({
//           id: String(media.id),
//           type: media.media_type ?? media.type ?? "image",
//           uri: media.url ?? media.uri ?? media.file ?? media.image ?? "",
//           thumbnailUri: media.thumbnail_url ?? media.thumbnailUri ?? undefined,
//         }))
//       : [],

//     stats: {
//       likes: Number(item.likes_count ?? 0),
//       views: Number(item.view_count ?? 0),
//       comments: Number(item.comments_count ?? 0),
//       shares: Number(item.shares_count ?? 0),
//       saves: Number(item.saves_count ?? 0),
//     },

//     createdAt: item.created_at ?? item.createdAt ?? "",
//   }));
// }

// function getListingImage(listing: Listing) {
//   const firstMedia = listing.media?.[0];

//   if (!firstMedia) {
//     return null;
//   }

//   // For videos, prefer thumbnail if backend provides one.
//   if (firstMedia.type === "video") {
//     return firstMedia.thumbnailUri || null;
//   }

//   return firstMedia.uri || null;
// }

// export default function ProfileScreen() {
//   const { user } = useAuth();

//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const loadProfile = useCallback(async () => {
//     try {
//       setError(null);

//       const accessToken = await getAccessToken();

//       if (!accessToken) {
//         throw new Error("Authentication token not found.");
//       }

//       const authHeaders = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       // ---------------------------------------------------------
//       // 1. Get current profile
//       // ---------------------------------------------------------
//       const profileResponse = await api.get<Profile>("/api/profiles/me/", {
//         headers: authHeaders,
//       });

//       const currentProfile = profileResponse.data;

//       setProfile(currentProfile);

//       // ---------------------------------------------------------
//       // 2. Get listings
//       // ---------------------------------------------------------
//       const listingsResponse = await api.get("/api/v1/listings/", {
//         headers: authHeaders,
//       });

//       const allListings = normalizeListings(listingsResponse.data);

//       // ---------------------------------------------------------
//       // 3. Current authenticated user's ID
//       // ---------------------------------------------------------
//       const currentUserId = currentProfile.user ?? user?.id ?? "";

//       // ---------------------------------------------------------
//       // 4. Only keep listings owned by current user
//       // ---------------------------------------------------------
//       const myListings = allListings.filter(
//         (listing) => String(listing.seller.id) === String(currentUserId),
//       );

//       console.log("CURRENT USER ID:", currentUserId);

//       console.log("ALL LISTINGS:", allListings.length);

//       console.log("MY LISTINGS:", myListings.length);

//       console.log(
//         "LISTING OWNERS:",
//         allListings.map((listing) => ({
//           title: listing.title,
//           sellerId: listing.seller.id,
//           sellerName: listing.seller.display_name,
//         })),
//       );

//       setListings(myListings);
//     } catch (err: any) {
//       console.error("PROFILE LOAD ERROR:", err?.response?.data ?? err);

//       setError(
//         err?.response?.data?.detail ??
//           err?.message ??
//           "Failed to load profile.",
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [user?.id]);

//   useEffect(() => {
//     loadProfile();
//   }, [loadProfile]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     loadProfile();
//   }, [loadProfile]);

//   const renderListing = ({ item }: { item: Listing }) => {
//     const imageUri = getListingImage(item);

//     return (
//       <Pressable
//         style={styles.card}
//         onPress={() => {
//           console.log("Open listing:", item.id);
//         }}
//       >
//         <View style={styles.imageContainer}>
//           {imageUri ? (
//             <Image
//               source={{ uri: imageUri }}
//               style={styles.productImage}
//               resizeMode="cover"
//             />
//           ) : (
//             <View style={styles.noImage}>
//               <Ionicons
//                 name="image-outline"
//                 size={32}
//                 color={Colors.textSecondary}
//               />
//             </View>
//           )}

//           {item.media?.[0]?.type === "video" && (
//             <View style={styles.videoBadge}>
//               <Ionicons name="play" size={12} color="#fff" />
//             </View>
//           )}

//           {item.seller.is_verified && (
//             <View style={styles.verifiedBadge}>
//               <Ionicons name="checkmark" size={12} color="#fff" />
//             </View>
//           )}
//         </View>

//         <View style={styles.cardContent}>
//           <Text style={styles.productTitle} numberOfLines={2}>
//             {item.title}
//           </Text>

//           <Text style={styles.price}>
//             {item.currency.symbol} {item.price.toLocaleString()}
//           </Text>

//           <Text style={styles.location}>
//             {item.location.city}
//             {item.location.area ? ` • ${item.location.area}` : ""}
//           </Text>

//           <View style={styles.statsRow}>
//             <View style={styles.stat}>
//               <Ionicons
//                 name="heart-outline"
//                 size={14}
//                 color={Colors.textSecondary}
//               />

//               <Text style={styles.statText}>{item.stats.likes}</Text>
//             </View>

//             <View style={styles.stat}>
//               <Ionicons
//                 name="eye-outline"
//                 size={14}
//                 color={Colors.textSecondary}
//               />

//               <Text style={styles.statText}>{item.stats.views}</Text>
//             </View>
//           </View>
//         </View>
//       </Pressable>
//     );
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color={Colors.primary} />

//           <Text style={styles.loadingText}>Loading profile...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error && !profile) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.center}>
//           <Ionicons
//             name="alert-circle-outline"
//             size={48}
//             color={Colors.textSecondary}
//           />

//           <Text style={styles.errorText}>{error}</Text>

//           <Pressable
//             style={styles.retryButton}
//             onPress={() => {
//               setLoading(true);
//               loadProfile();
//             }}
//           >
//             <Text style={styles.retryText}>Try Again</Text>
//           </Pressable>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top"]}>
//       <FlatList
//         data={listings}
//         keyExtractor={(item) => item.id}
//         renderItem={renderListing}
//         numColumns={2}
//         columnWrapperStyle={styles.columnWrapper}
//         contentContainerStyle={styles.listContent}
//         refreshing={refreshing}
//         onRefresh={onRefresh}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={
//           <View>
//             {/* ------------------------------------------------ */}
//             {/* HEADER */}
//             {/* ------------------------------------------------ */}

//             <View style={styles.header}>
//               <View style={styles.avatarContainer}>
//                 {profile?.avatar ? (
//                   <Image
//                     source={{
//                       uri: profile.avatar,
//                     }}
//                     style={styles.avatar}
//                   />
//                 ) : (
//                   <View style={styles.avatarPlaceholder}>
//                     <Text style={styles.avatarText}>
//                       {(profile?.display_name || user?.username || "U")
//                         .charAt(0)
//                         .toUpperCase()}
//                     </Text>
//                   </View>
//                 )}
//               </View>

//               <View style={styles.headerInfo}>
//                 <Text style={styles.displayName}>
//                   {profile?.display_name || user?.username || "User"}
//                 </Text>

//                 {user?.username && (
//                   <Text style={styles.username}>@{user.username}</Text>
//                 )}

//                 {!!profile?.city && (
//                   <View style={styles.locationRow}>
//                     <Ionicons
//                       name="location-outline"
//                       size={14}
//                       color={Colors.textSecondary}
//                     />

//                     <Text style={styles.city}>{profile.city}</Text>
//                   </View>
//                 )}
//               </View>

//               <Pressable
//                 style={styles.settingsButton}
//                 onPress={() => {
//                   console.log("Open settings");
//                 }}
//               >
//                 <Ionicons
//                   name="settings-outline"
//                   size={22}
//                   color={Colors.text}
//                 />
//               </Pressable>
//             </View>

//             {/* ------------------------------------------------ */}
//             {/* BIO */}
//             {/* ------------------------------------------------ */}

//             {!!profile?.bio && <Text style={styles.bio}>{profile.bio}</Text>}

//             {/* ------------------------------------------------ */}
//             {/* STATS */}
//             {/* ------------------------------------------------ */}

//             <View style={styles.statsContainer}>
//               <View style={styles.profileStat}>
//                 <Text style={styles.statNumber}>
//                   {profile?.listings_count ?? 0}
//                 </Text>

//                 <Text style={styles.statLabel}>Listings</Text>
//               </View>

//               <View style={styles.divider} />

//               <View style={styles.profileStat}>
//                 <Text style={styles.statNumber}>
//                   {profile?.followers_count ?? 0}
//                 </Text>

//                 <Text style={styles.statLabel}>Followers</Text>
//               </View>

//               <View style={styles.divider} />

//               <View style={styles.profileStat}>
//                 <Text style={styles.statNumber}>
//                   {profile?.following_count ?? 0}
//                 </Text>

//                 <Text style={styles.statLabel}>Following</Text>
//               </View>
//             </View>

//             {/* ------------------------------------------------ */}
//             {/* ACTIONS */}
//             {/* ------------------------------------------------ */}

//             <View style={styles.actions}>
//               <Pressable
//                 style={styles.editButton}
//                 onPress={() => {
//                   console.log("Edit profile");
//                 }}
//               >
//                 <Ionicons name="create-outline" size={18} color={Colors.text} />

//                 <Text style={styles.editButtonText}>Edit Profile</Text>
//               </Pressable>

//               <Pressable
//                 style={styles.shareButton}
//                 onPress={() => {
//                   console.log("Share profile");
//                 }}
//               >
//                 <Ionicons name="share-outline" size={18} color={Colors.text} />
//               </Pressable>
//             </View>

//             {/* ------------------------------------------------ */}
//             {/* YOUR ITEMS */}
//             {/* ------------------------------------------------ */}

//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Your Items</Text>

//               <Text style={styles.itemCount}>{listings.length}</Text>
//             </View>

//             {error && <Text style={styles.smallError}>{error}</Text>}
//           </View>
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons
//               name="cube-outline"
//               size={56}
//               color={Colors.textSecondary}
//             />

//             <Text style={styles.emptyTitle}>No items yet</Text>

//             <Text style={styles.emptyText}>
//               Items you post on Suqe will appear here.
//             </Text>

//             <Pressable
//               style={styles.sellButton}
//               onPress={() => {
//                 console.log("Create listing");
//               }}
//             >
//               <Ionicons name="add" size={20} color="#fff" />

//               <Text style={styles.sellButtonText}>Sell Something</Text>
//             </Pressable>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },

//   listContent: {
//     paddingBottom: 100,
//   },

//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//   },

//   loadingText: {
//     marginTop: 12,
//     color: Colors.textSecondary,
//     fontSize: 14,
//   },

//   errorText: {
//     marginTop: 12,
//     color: Colors.text,
//     textAlign: "center",
//     fontSize: 15,
//   },

//   smallError: {
//     marginHorizontal: 16,
//     marginBottom: 10,
//     color: "#d9534f",
//     fontSize: 13,
//   },

//   retryButton: {
//     marginTop: 20,
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 10,
//     backgroundColor: Colors.primary,
//   },

//   retryText: {
//     color: "#fff",
//     fontWeight: "700",
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 12,
//   },

//   avatarContainer: {
//     width: 82,
//     height: 82,
//     borderRadius: 41,
//     overflow: "hidden",
//   },

//   avatar: {
//     width: "100%",
//     height: "100%",
//   },

//   avatarPlaceholder: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 41,
//     backgroundColor: Colors.surface,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   avatarText: {
//     color: Colors.text,
//     fontSize: 30,
//     fontWeight: "700",
//   },

//   headerInfo: {
//     flex: 1,
//     marginLeft: 14,
//   },

//   displayName: {
//     color: Colors.text,
//     fontSize: 20,
//     fontWeight: "700",
//   },

//   username: {
//     marginTop: 2,
//     color: Colors.textSecondary,
//     fontSize: 14,
//   },

//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 5,
//   },

//   city: {
//     marginLeft: 4,
//     color: Colors.textSecondary,
//     fontSize: 13,
//   },

//   settingsButton: {
//     padding: 8,
//   },

//   bio: {
//     marginTop: 14,
//     marginHorizontal: 16,
//     color: Colors.text,
//     fontSize: 14,
//     lineHeight: 20,
//   },

//   statsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     marginHorizontal: 16,
//     paddingVertical: 15,
//     borderRadius: 14,
//     backgroundColor: Colors.surface,
//   },

//   profileStat: {
//     flex: 1,
//     alignItems: "center",
//   },

//   statNumber: {
//     color: Colors.text,
//     fontSize: 17,
//     fontWeight: "700",
//   },

//   statLabel: {
//     marginTop: 4,
//     color: Colors.textSecondary,
//     fontSize: 12,
//   },

//   divider: {
//     width: 1,
//     height: 30,
//     backgroundColor: Colors.border,
//   },

//   actions: {
//     flexDirection: "row",
//     marginHorizontal: 16,
//     marginTop: 14,
//     gap: 10,
//   },

//   editButton: {
//     flex: 1,
//     height: 44,
//     borderRadius: 10,
//     backgroundColor: Colors.surface,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },

//   editButtonText: {
//     color: Colors.text,
//     fontSize: 14,
//     fontWeight: "600",
//   },

//   shareButton: {
//     width: 48,
//     height: 44,
//     borderRadius: 10,
//     backgroundColor: Colors.surface,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 16,
//     marginTop: 24,
//     marginBottom: 12,
//   },

//   sectionTitle: {
//     flex: 1,
//     color: Colors.text,
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   itemCount: {
//     color: Colors.textSecondary,
//     fontSize: 14,
//   },

//   columnWrapper: {
//     paddingHorizontal: 12,
//     gap: 10,
//   },

//   card: {
//     flex: 1,
//     marginBottom: 10,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: Colors.surface,
//   },

//   imageContainer: {
//     width: "100%",
//     aspectRatio: 1,
//     position: "relative",
//     backgroundColor: Colors.background,
//   },

//   productImage: {
//     width: "100%",
//     height: "100%",
//   },

//   noImage: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: Colors.surface,
//   },

//   videoBadge: {
//     position: "absolute",
//     top: 8,
//     left: 8,
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     backgroundColor: "rgba(0,0,0,0.65)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   verifiedBadge: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     backgroundColor: Colors.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   cardContent: {
//     padding: 10,
//   },

//   productTitle: {
//     color: Colors.text,
//     fontSize: 14,
//     fontWeight: "600",
//     lineHeight: 18,
//   },

//   price: {
//     marginTop: 6,
//     color: Colors.primary,
//     fontSize: 15,
//     fontWeight: "700",
//   },

//   location: {
//     marginTop: 4,
//     color: Colors.textSecondary,
//     fontSize: 11,
//   },

//   statsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginTop: 8,
//   },

//   stat: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },

//   statText: {
//     color: Colors.textSecondary,
//     fontSize: 11,
//   },

//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     paddingTop: 60,
//     paddingBottom: 80,
//   },

//   emptyTitle: {
//     marginTop: 14,
//     color: Colors.text,
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   emptyText: {
//     marginTop: 6,
//     color: Colors.textSecondary,
//     textAlign: "center",
//     fontSize: 13,
//     lineHeight: 19,
//   },

//   sellButton: {
//     marginTop: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 10,
//     backgroundColor: Colors.primary,
//   },

//   sellButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "700",
//   },
// });

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";

import { Colors } from "@/constants/src/theme/colors";
import { Radius } from "@/constants/src/theme/radius";
import { Typography } from "@/constants/src/theme/typography";
import { api } from "@/constants/src/api/client";
import { getAccessToken } from "@/constants/src/auth/storage";
import { useAuth } from "@/constants/src/auth/AuthContext";

// ==================================================
// TYPES
// ==================================================

type Profile = {
  id: string;
  user: string;
  display_name: string;
  bio: string;
  avatar: string | null;
  city: string;
  preferred_language: string;
  followers_count: number;
  following_count: number;
  listings_count: number;
};

type Seller = {
  id: string;
  username: string;
  display_name: string;
  avatar: string | null;
  is_verified: boolean;
};

type Listing = {
  id: string;
  seller: Seller;
  title: string;
  description: string;
  price: number;

  currency: {
    id?: string;
    code: string;
    name: string;
    symbol: string;
  };

  condition: {
    id: string;
    name: string;
    slug: string;
  };

  location: {
    city: string;
    area: string;
  };

  media: {
    id: string;
    type: "image" | "video" | string;
    uri: string;
    thumbnailUri?: string;
  }[];

  stats: {
    likes: number;
    views: number;
    comments: number;
    shares: number;
    saves: number;
  };

  createdAt: string;
};

// ==================================================
// NORMALIZE LISTINGS
// ==================================================

function normalizeListings(data: any): Listing[] {
  const rawListings = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
      ? data.results
      : [];

  return rawListings.map((item: any) => ({
    id: String(item.id),

    seller: {
      id: String(item.seller?.id ?? ""),
      username: item.seller?.username ?? "",
      display_name: item.seller?.display_name ?? "",
      avatar: item.seller?.avatar ?? null,
      is_verified: Boolean(item.seller?.is_verified),
    },

    title: item.title ?? "",
    description: item.description ?? "",

    price: Number(item.price ?? 0),

    currency: {
      id: item.currency?.id,
      code: item.currency?.code ?? "ETB",
      name: item.currency?.name ?? "Birr",
      symbol: item.currency?.symbol ?? "Br",
    },

    condition: {
      id: String(item.condition?.id ?? ""),
      name: item.condition?.name ?? "",
      slug: item.condition?.slug ?? "",
    },

    location: {
      city: item.location?.city ?? "",
      area: item.location?.area ?? "",
    },

    media: Array.isArray(item.media)
      ? item.media.map((media: any) => ({
          id: String(media.id),
          type: media.media_type ?? media.type ?? "image",
          uri: media.url ?? media.uri ?? media.file ?? media.image ?? "",
          thumbnailUri: media.thumbnail_url ?? media.thumbnailUri ?? undefined,
        }))
      : [],

    stats: {
      likes: Number(item.likes_count ?? 0),
      views: Number(item.view_count ?? 0),
      comments: Number(item.comments_count ?? 0),
      shares: Number(item.shares_count ?? 0),
      saves: Number(item.saves_count ?? 0),
    },

    createdAt: item.created_at ?? item.createdAt ?? "",
  }));
}

// ==================================================
// MEDIA
// ==================================================

function getListingImage(listing: Listing) {
  const media = listing.media?.[0];

  if (!media) {
    return null;
  }

  if (media.type === "video") {
    return media.thumbnailUri || null;
  }

  return media.uri || null;
}

// ==================================================
// SCREEN
// ==================================================

export default function ProfileScreen() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // ==================================================
  // LOAD PROFILE + LISTINGS
  // ==================================================

  const loadProfile = useCallback(async () => {
    try {
      setError(null);

      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error("Authentication token not found.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      // ------------------------------------------------
      // PROFILE
      // ------------------------------------------------

      const profileResponse = await api.get<Profile>("/api/profiles/me/", {
        headers,
      });

      const currentProfile = profileResponse.data;

      setProfile(currentProfile);

      // ------------------------------------------------
      // LISTINGS
      // ------------------------------------------------

      const listingsResponse = await api.get("/api/v1/listings/", {
        headers,
      });

      const allListings = normalizeListings(listingsResponse.data);

      // ------------------------------------------------
      // CURRENT USER ID
      // ------------------------------------------------

      const currentUserId = String(
        typeof currentProfile.user === "string"
          ? currentProfile.user
          : (currentProfile.user?.id ?? user?.id ?? ""),
      ).trim();

      // ------------------------------------------------
      // ONLY MY LISTINGS
      // ------------------------------------------------

      const myListings = allListings.filter((listing) => {
        const sellerId = String(listing.seller?.id ?? "").trim();

        return sellerId === currentUserId;
      });

      console.log("PROFILE USER:", currentUserId);
      console.log("AUTH USER:", user?.id);
      console.log("TOTAL LISTINGS:", allListings.length);
      console.log("MY LISTINGS:", myListings.length);

      setListings(myListings);
    } catch (err: any) {
      console.error("PROFILE ERROR:", err?.response?.data ?? err);

      setError(
        err?.response?.data?.detail ??
          err?.message ??
          "Unable to load profile.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  // ==================================================
  // INITIAL LOAD
  // ==================================================

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ==================================================
  // REFRESH
  // ==================================================

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadProfile();
  }, [loadProfile]);

  // ==================================================
  // LISTING CARD
  // ==================================================

  const renderListing = ({ item }: { item: Listing }) => {
    const image = getListingImage(item);

    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/listing/[id]",
            params: {
              id: item.id,
            },
          })
        }
      >
        {/* MEDIA */}

        <View style={styles.cardImageWrapper}>
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.emptyImage}>
              <Ionicons
                name="image-outline"
                size={30}
                color={Colors.textMuted}
              />
            </View>
          )}

          {/* VIDEO */}

          {item.media?.[0]?.type === "video" && (
            <View style={styles.videoIcon}>
              <Ionicons name="play" size={12} color={Colors.white} />
            </View>
          )}

          {/* VERIFIED */}

          {item.seller.is_verified && (
            <View style={styles.verifiedIcon}>
              <Ionicons name="checkmark" size={12} color={Colors.white} />
            </View>
          )}
        </View>

        {/* CONTENT */}

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.cardPrice}>
            {item.currency.symbol} {item.price.toLocaleString()}
          </Text>

          <View style={styles.cardLocation}>
            <Ionicons
              name="location-outline"
              size={12}
              color={Colors.textMuted}
            />

            <Text style={styles.cardLocationText} numberOfLines={1}>
              {item.location.area || item.location.city || "Ethiopia"}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />

          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==================================================
  // ERROR
  // ==================================================

  if (error && !profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <View style={styles.errorIcon}>
            <Ionicons name="alert-outline" size={28} color={Colors.error} />
          </View>

          <Text style={styles.errorTitle}>Something went wrong</Text>

          <Text style={styles.errorText}>{error}</Text>

          <Pressable
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              loadProfile();
            }}
          >
            <Ionicons name="refresh-outline" size={18} color={Colors.white} />

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
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* ==================================================
          FIXED HEADER
      ================================================== */}

      <View style={styles.fixedHeader}>
        {/* TOP BAR */}

        <View style={styles.topBar}>
          <Text style={styles.logo}>Suqe</Text>

          <View style={styles.topActions}>
            <Pressable
              style={styles.topIcon}
              onPress={() => console.log("Share profile")}
            >
              <Ionicons
                name="share-outline"
                size={22}
                color={Colors.textPrimary}
              />
            </Pressable>

            <Pressable
              style={styles.topIcon}
              onPress={() => console.log("Settings")}
            >
              <Ionicons
                name="settings-outline"
                size={22}
                color={Colors.textPrimary}
              />
            </Pressable>
          </View>
        </View>

        {/* PROFILE HEADER */}

        <View style={styles.profileHeader}>
          {/* AVATAR */}

          <View style={styles.avatarWrapper}>
            {profile?.avatar ? (
              <Image
                source={{
                  uri: profile.avatar,
                }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarLetter}>
                  {(profile?.display_name || user?.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          {/* USER INFO */}

          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.displayName} numberOfLines={1}>
                {profile?.display_name || user?.username || "User"}
              </Text>

              {profile?.listings_count > 0 && (
                <Ionicons
                  name="checkmark-circle"
                  size={17}
                  color={Colors.primary}
                />
              )}
            </View>

            {user?.username && (
              <Text style={styles.username}>@{user.username}</Text>
            )}

            {profile?.city && (
              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={13}
                  color={Colors.location}
                />

                <Text style={styles.city}>{profile.city}</Text>
              </View>
            )}
          </View>
        </View>

        {/* BIO */}

        {profile?.bio ? (
          <Text style={styles.bio}>{profile.bio}</Text>
        ) : (
          <Text style={styles.emptyBio}>No bio yet.</Text>
        )}

        {/* STATS */}

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {/* {profile?.listings_count ?? 0} */}
              {listings.length}
            </Text>

            <Text style={styles.statLabel}>Listings</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profile?.followers_count ?? 0}
            </Text>

            <Text style={styles.statLabel}>Followers</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profile?.following_count ?? 0}
            </Text>

            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* ACTION BUTTONS */}

        <View style={styles.actionRow}>
          <Pressable
            style={styles.editButton}
            onPress={() => console.log("Edit profile")}
          >
            <Ionicons
              name="create-outline"
              size={17}
              color={Colors.textPrimary}
            />

            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>

          <Pressable
            style={styles.shareButton}
            onPress={() => console.log("Share profile")}
          >
            <Ionicons
              name="share-social-outline"
              size={18}
              color={Colors.textPrimary}
            />
          </Pressable>
        </View>

        {/* YOUR ITEMS HEADER */}

        <View style={styles.itemsHeader}>
          <View>
            <Text style={styles.itemsTitle}>Your Items</Text>

            <Text style={styles.itemsSubtitle}>
              Products you've posted on Suqe
            </Text>
          </View>

          <View style={styles.itemCountBadge}>
            <Text style={styles.itemCountText}>{listings.length}</Text>
          </View>
        </View>

        {error && <Text style={styles.smallError}>{error}</Text>}
      </View>

      {/* ==================================================
          SCROLLABLE LISTINGS ONLY
      ================================================== */}

      <View style={styles.listingsContainer}>
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={renderListing}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          removeClippedSubviews
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={7}
          ListEmptyComponent={
            <View style={styles.emptyListings}>
              <View style={styles.emptyListingIcon}>
                <Ionicons
                  name="bag-handle-outline"
                  size={32}
                  color={Colors.primary}
                />
              </View>

              <Text style={styles.emptyListingsTitle}>No items yet</Text>

              <Text style={styles.emptyListingsText}>
                Start selling on Suqe. Your products will appear here.
              </Text>

              <Pressable
                style={styles.sellButton}
                onPress={() => router.push("/(tabs)/add")}
              >
                <Ionicons name="add" size={20} color={Colors.white} />

                <Text style={styles.sellButtonText}>Sell Something</Text>
              </Pressable>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ==================================================
  // FIXED HEADER
  // ==================================================

  fixedHeader: {
    backgroundColor: Colors.background,
  },

  topBar: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -1.4,
    color: Colors.primary,
  },

  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  topIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.circle,
    backgroundColor: Colors.surface,
  },

  // ==================================================
  // PROFILE
  // ==================================================

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  avatarWrapper: {
    width: 88,
    height: 88,
    padding: 3,
    borderRadius: 44,
    backgroundColor: Colors.primary,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
    backgroundColor: Colors.surfaceLight,
  },

  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surfaceLight,
  },

  avatarLetter: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  displayName: {
    flexShrink: 1,
    ...Typography.h2,
    color: Colors.textPrimary,
  },

  username: {
    marginTop: 3,
    ...Typography.body,
    color: Colors.textSecondary,
  },

  locationRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  city: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  bio: {
    marginTop: 14,
    marginHorizontal: 16,
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 21,
  },

  emptyBio: {
    marginTop: 14,
    marginHorizontal: 16,
    ...Typography.caption,
    color: Colors.textMuted,
  },

  // ==================================================
  // STATS
  // ==================================================

  statsContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 70,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    flexDirection: "row",
    alignItems: "center",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  statNumber: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  statLabel: {
    marginTop: 2,
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.divider,
  },

  // ==================================================
  // ACTIONS
  // ==================================================

  actionRow: {
    marginTop: 10,
    marginHorizontal: 16,
    flexDirection: "row",
    gap: 8,
  },

  editButton: {
    flex: 1,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  editButtonText: {
    ...Typography.button,
    color: Colors.textPrimary,
  },

  shareButton: {
    width: 48,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // ==================================================
  // YOUR ITEMS
  // ==================================================

  itemsHeader: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemsTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  itemsSubtitle: {
    marginTop: 2,
    ...Typography.caption,
    color: Colors.textMuted,
  },

  itemCountBadge: {
    minWidth: 32,
    height: 28,
    paddingHorizontal: 9,
    borderRadius: Radius.pill,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  itemCountText: {
    ...Typography.label,
    color: Colors.textPrimary,
  },

  smallError: {
    marginHorizontal: 16,
    marginBottom: 8,
    ...Typography.caption,
    color: Colors.error,
  },

  // ==================================================
  // SCROLLABLE LISTINGS
  // ==================================================

  listingsContainer: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 110,
  },

  columnWrapper: {
    gap: 10,
  },

  // ==================================================
  // CARD
  // ==================================================

  card: {
    flex: 1,
    marginBottom: 10,
    overflow: "hidden",
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },

  cardImageWrapper: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
    backgroundColor: Colors.surfaceLight,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  emptyImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  videoIcon: {
    position: "absolute",
    left: 8,
    top: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.overlayDark,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.verified,
    alignItems: "center",
    justifyContent: "center",
  },

  cardContent: {
    padding: 10,
  },

  cardTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    lineHeight: 19,
  },

  cardPrice: {
    marginTop: 5,
    ...Typography.price,
    color: Colors.primary,
  },

  cardLocation: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  cardLocationText: {
    flex: 1,
    ...Typography.caption,
    color: Colors.textMuted,
  },

  // ==================================================
  // EMPTY LISTINGS
  // ==================================================

  emptyListings: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    paddingTop: 45,
    paddingBottom: 70,
  },

  emptyListingIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.errorLight,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyListingsTitle: {
    marginTop: 16,
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  emptyListingsText: {
    marginTop: 7,
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },

  sellButton: {
    marginTop: 20,
    height: 46,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  sellButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  // ==================================================
  // CENTER / LOADING
  // ==================================================

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,
    ...Typography.body,
    color: Colors.textSecondary,
  },

  // ==================================================
  // ERROR
  // ==================================================

  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.errorLight,
    alignItems: "center",
    justifyContent: "center",
  },

  errorTitle: {
    marginTop: 16,
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  errorText: {
    marginTop: 8,
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  retryButton: {
    marginTop: 20,
    minWidth: 130,
    height: 44,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  retryText: {
    ...Typography.button,
    color: Colors.white,
  },
});
