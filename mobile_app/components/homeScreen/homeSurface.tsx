// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   ListRenderItem,
//   useWindowDimensions,
// } from "react-native";
// import { VideoView, useVideoPlayer } from "expo-video";
// import { Ionicons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";

// import { Colors } from "@/constants/src/theme/colors";
// import { Typography } from "@/constants/src/theme/typography";
// import { Icons } from "@/constants/src/theme/icons";
// import { Radius } from "@/constants/src/theme/radius";

// // =====================================================
// // TYPES
// // =====================================================

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
//     comments: number;
//   };

//   createdAt: string;
// };

// // =====================================================
// // SHARED LISTINGS
// //
// // IMPORTANT:
// // These IDs/data should eventually come directly from
// // your Django REST Framework API.
// //
// // Home, Explore and Profile should use the same records.
// // =====================================================

// export const listings: Listing[] = [
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
//       comments: 24,
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
//         type: "video",
//         uri: require("@/assets/videos/iphone2.mp4"),
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
//       comments: 128,
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
//         type: "video",
//         uri: require("@/assets/videos/iphone2.mp4"),
//       },
//     ],

//     stats: {
//       likes: 542,
//       views: 2100,
//       comments: 102,
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
//       comments: 38,
//     },

//     createdAt: "2026-08-25T12:00:00Z",
//   },

//   {
//     id: "listing_005",

//     title: "Wireless Headphones",
//     description: "Lightly used wireless headphones with good battery life.",

//     price: 1800,
//     currency: "ETB",

//     condition: "used",

//     category: {
//       id: "cat_electronics",
//       name: "Electronics",
//     },

//     location: {
//       city: "Addis Ababa",
//       area: "Piassa",
//     },

//     seller: {
//       id: "user_004",
//       username: "dani_market",
//       displayName: "Dani Market",
//       avatar: require("@/assets/images/used-bag.jpg"),
//       isVerified: true,
//     },

//     media: [
//       {
//         id: "media_006",
//         type: "image",
//         uri: require("@/assets/images/used-bag.jpg"),
//       },
//     ],

//     stats: {
//       likes: 390,
//       views: 1800,
//       comments: 51,
//     },

//     createdAt: "2026-08-24T15:00:00Z",
//   },

//   {
//     id: "listing_006",

//     title: "Men's Running Shoes",
//     description: "New running shoes, never used.",

//     price: 2500,
//     currency: "ETB",

//     condition: "new",

//     category: {
//       id: "cat_shoes",
//       name: "Shoes",
//     },

//     location: {
//       city: "Addis Ababa",
//       area: "Megenagna",
//     },

//     seller: {
//       id: "user_005",
//       username: "samuel_store",
//       displayName: "Samuel Store",
//       avatar: require("@/assets/images/used-bag.jpg"),
//       isVerified: true,
//     },

//     media: [
//       {
//         id: "media_007",
//         type: "image",
//         uri: require("@/assets/images/used-bag.jpg"),
//       },
//     ],

//     stats: {
//       likes: 720,
//       views: 3500,
//       comments: 87,
//     },

//     createdAt: "2026-08-23T11:00:00Z",
//   },
// ];

// // =====================================================
// // FEED TYPE
// // =====================================================

// type FeedItem = Listing;

// // =====================================================
// // FEED MEDIA
// // =====================================================

// function FeedMedia({
//   item,
//   isActive,
//   isMuted,
//   isPaused,
// }: {
//   item: FeedItem;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
// }) {
//   const media = item.media[0];

//   if (!media) return null;

//   if (media.type === "image") {
//     return (
//       <Image source={media.uri} style={styles.image} resizeMode="contain" />
//     );
//   }

//   return (
//     <VideoMedia
//       source={media.uri}
//       isActive={isActive}
//       isMuted={isMuted}
//       isPaused={isPaused}
//     />
//   );
// }

// // =====================================================
// // VIDEO
// // =====================================================

// function VideoMedia({
//   source,
//   isActive,
//   isMuted,
//   isPaused,
// }: {
//   source: any;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
// }) {
//   const player = useVideoPlayer(source, (player) => {
//     player.loop = true;
//     player.muted = isMuted;
//   });

//   useEffect(() => {
//     player.muted = isMuted;

//     if (!isActive || isPaused) {
//       player.pause();
//       return;
//     }

//     player.play();
//   }, [isActive, isMuted, isPaused, player]);

//   return (
//     <VideoView
//       player={player}
//       style={styles.image}
//       contentFit="contain"
//       nativeControls={false}
//     />
//   );
// }

// // =====================================================
// // HOME SCREEN
// // =====================================================

// export default function HomeScreen() {
//   const { width, height } = useWindowDimensions();

//   const [activeIndex, setActiveIndex] = useState(0);

//   const [activeFilter, setActiveFilter] = useState<"all" | "new" | "used">(
//     "all",
//   );

//   const [isMuted, setIsMuted] = useState(true);
//   const [isPaused, setIsPaused] = useState(false);

//   // ===================================================
//   // FILTER HOME FEED
//   // ===================================================

//   const displayedListings =
//     activeFilter === "all"
//       ? listings
//       : listings.filter((listing) => listing.condition === activeFilter);

//   // ===================================================
//   // FEED ITEM
//   // ===================================================

//   const renderItem: ListRenderItem<FeedItem> = ({ item, index }) => {
//     const isActive = index === activeIndex;

//     return (
//       <View
//         style={[
//           styles.feedItem,
//           {
//             width,
//             height,
//           },
//         ]}
//       >
//         {/* =================================================
//             MEDIA
//         ================================================= */}

//         <FeedMedia
//           item={item}
//           isActive={isActive}
//           isMuted={isMuted}
//           isPaused={isPaused}
//         />

//         {/* =================================================
//             PLAY / PAUSE
//         ================================================= */}

//         {item.media[0]?.type === "video" && (
//           <Pressable
//             style={styles.mediaTapArea}
//             onPress={() => setIsPaused((previous) => !previous)}
//           >
//             {isPaused && (
//               <View style={styles.pauseIcon}>
//                 <Ionicons name="play" size={32} color={Colors.textOnDark} />
//               </View>
//             )}
//           </Pressable>
//         )}

//         {/* =================================================
//             SOUND
//         ================================================= */}

//         {item.media[0]?.type === "video" && (
//           <Pressable
//             style={styles.soundButton}
//             onPress={() => setIsMuted((previous) => !previous)}
//           >
//             <Ionicons
//               name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
//               size={22}
//               color={Colors.actionIcon}
//             />
//           </Pressable>
//         )}

//         {/* =================================================
//             CONDITION
//         ================================================= */}

//         <View style={styles.conditionBadge}>
//           <Text style={styles.conditionText}>
//             {item.condition === "new" ? "New" : "Used"}
//           </Text>
//         </View>

//         {/* =================================================
//             BOTTOM PRODUCT INFORMATION
//         ================================================= */}

//         <View style={styles.bottomOverlay}>
//           <View style={styles.productInfo}>
//             {/* SELLER */}

//             <Pressable style={styles.sellerRow}>
//               <Image source={item.seller.avatar} style={styles.avatar} />

//               <View style={styles.sellerIdentity}>
//                 <View style={styles.sellerNameRow}>
//                   <Text style={styles.username} numberOfLines={1}>
//                     {item.seller.displayName}
//                   </Text>

//                   {item.seller.isVerified && (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={15}
//                       color={Colors.verified}
//                     />
//                   )}
//                 </View>
//               </View>
//             </Pressable>

//             {/* PRODUCT TITLE */}

//             <Text style={styles.title} numberOfLines={2}>
//               {item.title}
//             </Text>

//             {/* DESCRIPTION */}

//             <Text style={styles.description} numberOfLines={2}>
//               {item.description}
//             </Text>

//             {/* PRICE + LOCATION + VIEW */}

//             <View style={styles.productRow}>
//               <View style={styles.priceContainer}>
//                 <Text style={styles.price}>
//                   {item.price.toLocaleString()} {item.currency}
//                 </Text>

//                 <Text style={styles.location}>
//                   📍 {item.location.area}, {item.location.city}
//                 </Text>
//               </View>

//               <Pressable style={styles.buyButton}>
//                 <Text style={styles.buyText}>View Item</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>

//         {/* =================================================
//             RIGHT ACTIONS
//         ================================================= */}

//         <View style={styles.actions}>
//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="heart-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.stats.likes}</Text>
//           </Pressable>

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="chatbubble-ellipses-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.stats.comments}</Text>
//           </Pressable>

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="bookmark-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>Save</Text>
//           </Pressable>

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="share-social-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>Share</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

//   // =====================================================
//   // SCREEN
//   // =====================================================

//   return (
//     <View style={styles.container}>
//       {/* =================================================
//           TOP GRADIENT-LIKE OVERLAY
//       ================================================= */}

//       <View style={styles.topOverlay} />

//       {/* =================================================
//           FIXED TOP BAR
//       ================================================= */}

//       <View style={styles.topBar}>
//         {/* LOGO */}

//         <Text style={styles.logo}>Suqe</Text>

//         {/* FILTER TABS */}

//         <View style={styles.topTabs}>
//           <Pressable onPress={() => setActiveFilter("all")}>
//             <Text
//               style={[styles.tab, activeFilter === "all" && styles.activeTab]}
//             >
//               All
//             </Text>
//           </Pressable>

//           <Pressable onPress={() => setActiveFilter("new")}>
//             <Text
//               style={[styles.tab, activeFilter === "new" && styles.activeTab]}
//             >
//               New
//             </Text>
//           </Pressable>

//           <Pressable onPress={() => setActiveFilter("used")}>
//             <Text
//               style={[styles.tab, activeFilter === "used" && styles.activeTab]}
//             >
//               Used
//             </Text>
//           </Pressable>
//         </View>

//         {/* SEARCH */}

//         <Pressable style={styles.topBarButton}>
//           <Ionicons
//             name="search-outline"
//             size={Icons.search.size}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       {/* =================================================
//           FEED
//       ================================================= */}

//       <FlatList
//         data={displayedListings}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={height}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         removeClippedSubviews
//         initialNumToRender={2}
//         maxToRenderPerBatch={2}
//         windowSize={3}
//         onMomentumScrollEnd={(event) => {
//           const index = Math.round(event.nativeEvent.contentOffset.y / height);

//           setActiveIndex(index);
//           setIsPaused(false);
//         }}
//       />
//     </View>
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

//   feedItem: {
//     backgroundColor: Colors.mediaBackground,
//   },

//   image: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//   },

//   // ===================================================
//   // TOP OVERLAY
//   // ===================================================

//   topOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 110,
//     backgroundColor: Colors.videoOverlay,
//     zIndex: 10,
//   },

//   // ===================================================
//   // TOP BAR
//   // ===================================================

//   topBar: {
//     position: "absolute",
//     top: 50,
//     left: 16,
//     right: 16,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     zIndex: 20,
//   },

//   logo: {
//     ...Typography.h2,
//     color: Colors.primary,
//   },

//   topTabs: {
//     flexDirection: "row",
//     alignItems: "center",

//     gap: 20,

//     paddingHorizontal: 14,

//     height: 36,

//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     borderRadius: Radius.circle,
//   },

//   tab: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDarkMuted,
//   },

//   activeTab: {
//     color: Colors.textOnDark,
//     fontWeight: "700",
//   },

//   topBarButton: {
//     width: 40,
//     height: 40,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   // ===================================================
//   // SOUND
//   // ===================================================

//   soundButton: {
//     position: "absolute",

//     top: 105,
//     right: 16,

//     width: 40,
//     height: 40,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.md,
//     backgroundColor: Colors.actionBackground,

//     zIndex: 15,
//   },

//   // ===================================================
//   // CONDITION
//   // ===================================================

//   conditionBadge: {
//     position: "absolute",

//     top: 105,
//     left: 16,

//     paddingHorizontal: 10,
//     paddingVertical: 6,

//     borderRadius: Radius.md,
//     backgroundColor: "rgba(0,0,0,0.55)",

//     zIndex: 15,
//   },

//   conditionText: {
//     ...Typography.caption,
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // RIGHT ACTIONS
//   // ===================================================

//   actions: {
//     position: "absolute",

//     right: 12,
//     bottom: 50,

//     alignItems: "center",

//     gap: 14,

//     zIndex: 20,
//   },

//   action: {
//     alignItems: "center",
//     gap: 4,
//   },

//   actionButton: {
//     width: 44,
//     height: 44,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.md,
//     backgroundColor: Colors.actionBackground,
//   },

//   actionText: {
//     ...Typography.caption,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // BOTTOM OVERLAY
//   // ===================================================

//   bottomOverlay: {
//     position: "absolute",

//     left: 0,
//     right: 0,
//     bottom: 0,

//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 24,

//     borderTopRightRadius: Radius.circle,

//     backgroundColor: Colors.videoOverlayDark,

//     zIndex: 10,
//   },

//   productInfo: {
//     paddingRight: 70,
//     paddingBottom: 20,
//   },

//   // ===================================================
//   // SELLER
//   // ===================================================

//   sellerRow: {
//     flexDirection: "row",
//     alignItems: "center",

//     gap: 8,

//     marginBottom: 9,
//   },

//   avatar: {
//     width: 34,
//     height: 34,

//     borderRadius: Radius.circle,

//     borderWidth: 1,
//     borderColor: Colors.white,
//   },

//   sellerIdentity: {
//     flex: 1,
//   },

//   sellerNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   username: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // PRODUCT
//   // ===================================================

//   title: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     marginBottom: 4,
//   },

//   description: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     marginBottom: 12,
//   },

//   // ===================================================
//   // PRICE
//   // ===================================================

//   productRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//   },

//   priceContainer: {
//     flex: 1,
//   },

//   price: {
//     ...Typography.priceLarge,
//     color: Colors.primary,
//   },

//   location: {
//     ...Typography.caption,
//     color: Colors.textOnDarkSecondary,
//     marginTop: 2,
//   },

//   // ===================================================
//   // VIEW ITEM
//   // ===================================================

//   buyButton: {
//     minHeight: 42,

//     paddingHorizontal: 16,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.md,

//     backgroundColor: Colors.buttonPrimary,
//   },

//   buyText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // MEDIA TAP
//   // ===================================================

//   mediaTapArea: {
//     position: "absolute",

//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,

//     justifyContent: "center",
//     alignItems: "center",

//     zIndex: 2,
//   },

//   pauseIcon: {
//     width: 52,
//     height: 52,

//     justifyContent: "center",
//     alignItems: "center",

//     borderRadius: Radius.circle,

//     backgroundColor: "rgba(0,0,0,0.45)",
//   },
// });

// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   ListRenderItem,
//   useWindowDimensions,
//   ActivityIndicator,
// } from "react-native";

// import { VideoView, useVideoPlayer } from "expo-video";
// import { Ionicons } from "@expo/vector-icons";

// import { useEffect, useState } from "react";

// import { Colors } from "@/constants/src/theme/colors";
// import { Typography } from "@/constants/src/theme/typography";
// import { Icons } from "@/constants/src/theme/icons";
// import { Radius } from "@/constants/src/theme/radius";

// import { useListings } from "@/hooks/useListings";
// import { useRouter } from "expo-router";

// import type { Listing, ListingMedia } from "@/constants/src/types/listing";

// // =====================================================
// // FEED MEDIA
// // =====================================================

// function FeedMedia({
//   media,
//   isActive,
//   isMuted,
//   isPaused,
// }: {
//   media: ListingMedia | undefined;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
// }) {
//   if (!media) {
//     return (
//       <View style={styles.noMedia}>
//         <Ionicons
//           name="image-outline"
//           size={48}
//           color={Colors.textOnDarkMuted}
//         />

//         <Text style={styles.noMediaText}>No media</Text>
//       </View>
//     );
//   }

//   const mediaUri = media.url ?? media.thumbnail_url ?? null;

//   if (!mediaUri) {
//     return (
//       <View style={styles.noMedia}>
//         <Ionicons
//           name="image-outline"
//           size={48}
//           color={Colors.textOnDarkMuted}
//         />

//         <Text style={styles.noMediaText}>No media</Text>
//       </View>
//     );
//   }

//   // IMAGE
//   if (media.media_type === "image") {
//     return (
//       <Image
//         source={{ uri: mediaUri }}
//         style={styles.image}
//         resizeMode="contain"
//       />
//     );
//   }

//   // VIDEO
//   if (media.media_type === "video") {
//     return (
//       <VideoMedia
//         source={mediaUri}
//         isActive={isActive}
//         isMuted={isMuted}
//         isPaused={isPaused}
//       />
//     );
//   }

//   return (
//     <View style={styles.noMedia}>
//       <Ionicons
//         name="help-circle-outline"
//         size={48}
//         color={Colors.textOnDarkMuted}
//       />

//       <Text style={styles.noMediaText}>Unsupported media</Text>
//     </View>
//   );
// }

// // =====================================================
// // VIDEO MEDIA
// // =====================================================

// function VideoMedia({
//   source,
//   isActive,
//   isMuted,
//   isPaused,
// }: {
//   source: string;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
// }) {
//   const player = useVideoPlayer(source, (player) => {
//     player.loop = true;
//     player.muted = isMuted;
//   });

//   useEffect(() => {
//     player.muted = isMuted;

//     if (!isActive || isPaused) {
//       player.pause();
//       return;
//     }

//     player.play();
//   }, [isActive, isMuted, isPaused, player]);

//   return (
//     <VideoView
//       player={player}
//       style={styles.image}
//       contentFit="contain"
//       nativeControls={false}
//     />
//   );
// }

// // =====================================================
// // HOME SCREEN
// // =====================================================

// export default function HomeScreen() {
//   const { width, height } = useWindowDimensions();
//   const router = useRouter();
//   // ===================================================
//   // API
//   // ===================================================

//   const {
//     data: listings = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetching,
//   } = useListings();

//   // ===================================================
//   // LOCAL UI STATE
//   // ===================================================

//   const [activeFilter, setActiveFilter] = useState<"all" | "new" | "used">(
//     "all",
//   );

//   const [activeIndex, setActiveIndex] = useState(0);

//   const [isMuted, setIsMuted] = useState(true);

//   const [isPaused, setIsPaused] = useState(false);

//   // ===================================================
//   // FILTER
//   // ===================================================

//   const displayedListings =
//     activeFilter === "all"
//       ? listings
//       : listings.filter((listing) => listing.condition.slug === activeFilter);

//   // ===================================================
//   // RESET WHEN FILTER CHANGES
//   // ===================================================

//   useEffect(() => {
//     setActiveIndex(0);
//     setIsPaused(false);
//   }, [activeFilter]);

//   // ===================================================
//   // LOADING
//   // ===================================================

//   if (isLoading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color={Colors.primary} />

//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // ERROR
//   // ===================================================

//   if (isError) {
//     return (
//       <View style={styles.centerContainer}>
//         <Ionicons
//           name="cloud-offline-outline"
//           size={52}
//           color={Colors.textOnDarkMuted}
//         />

//         <Text style={styles.errorTitle}>Failed to load listings</Text>

//         <Text style={styles.errorText}>
//           {error instanceof Error ? error.message : "Something went wrong."}
//         </Text>

//         <Pressable style={styles.retryButton} onPress={() => refetch()}>
//           <Text style={styles.retryText}>Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // ===================================================
//   // EMPTY
//   // ===================================================

//   if (displayedListings.length === 0) {
//     return (
//       <View style={styles.centerContainer}>
//         <Ionicons
//           name="cube-outline"
//           size={52}
//           color={Colors.textOnDarkMuted}
//         />

//         <Text style={styles.errorTitle}>No listings found</Text>

//         <Text style={styles.errorText}>
//           There are no {activeFilter === "all" ? "" : activeFilter} listings
//           yet.
//         </Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // FEED ITEM
//   // ===================================================

//   const renderItem: ListRenderItem<Listing> = ({ item, index }) => {
//     const isActive = index === activeIndex;

//     const firstMedia = item.media?.[0];

//     return (
//       <View
//         style={[
//           styles.feedItem,
//           {
//             width,
//             height,
//           },
//         ]}
//       >
//         {/* =================================================
//             MEDIA
//         ================================================= */}

//         <FeedMedia
//           media={firstMedia}
//           isActive={isActive}
//           isMuted={isMuted}
//           isPaused={isPaused}
//         />

//         {/* =================================================
//             PLAY / PAUSE
//         ================================================= */}

//         {firstMedia?.media_type === "video" && (
//           <Pressable
//             style={styles.mediaTapArea}
//             onPress={() => setIsPaused((previous) => !previous)}
//           >
//             {isPaused && (
//               <View style={styles.pauseIcon}>
//                 <Ionicons name="play" size={32} color={Colors.textOnDark} />
//               </View>
//             )}
//           </Pressable>
//         )}

//         {/* =================================================
//             SOUND
//         ================================================= */}

//         {firstMedia?.media_type === "video" && (
//           <Pressable
//             style={styles.soundButton}
//             onPress={() => setIsMuted((previous) => !previous)}
//           >
//             <Ionicons
//               name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
//               size={22}
//               color={Colors.actionIcon}
//             />
//           </Pressable>
//         )}

//         {/* =================================================
//             CONDITION
//         ================================================= */}

//         <View style={styles.conditionBadge}>
//           <Text style={styles.conditionText}>{item.condition.name}</Text>
//         </View>

//         {/* =================================================
//             PROMOTED
//         ================================================= */}

//         {/* {item.is_promoted && (
//           <View style={styles.promotedBadge}>
//             <Ionicons name="flash" size={12} color={Colors.primary} />

//             <Text style={styles.promotedText}>Promoted</Text>
//           </View>
//         )} */}

//         {/* =================================================
//             BOTTOM INFORMATION
//         ================================================= */}

//         <View style={styles.bottomOverlay}>
//           <View style={styles.productInfo}>
//             {/* =================================================
//                 SELLER
//             ================================================= */}

//             <Pressable style={styles.sellerRow}>
//               {item.seller.avatar ? (
//                 <Image
//                   source={{
//                     uri: item.seller.avatar,
//                   }}
//                   style={styles.avatar}
//                 />
//               ) : (
//                 <View style={styles.avatarPlaceholder}>
//                   <Ionicons
//                     name="person"
//                     size={18}
//                     color={Colors.textOnDarkMuted}
//                   />
//                 </View>
//               )}

//               <View style={styles.sellerIdentity}>
//                 <View style={styles.sellerNameRow}>
//                   <Text style={styles.username} numberOfLines={1}>
//                     {item.seller.display_name}
//                   </Text>

//                   {item.seller.is_verified && (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={15}
//                       color={Colors.verified}
//                     />
//                   )}
//                 </View>

//                 {item.seller.username ? (
//                   <Text style={styles.sellerUsername} numberOfLines={1}>
//                     @{item.seller.username}
//                   </Text>
//                 ) : null}
//               </View>
//             </Pressable>

//             {/* =================================================
//                 TITLE
//             ================================================= */}

//             <Text style={styles.title} numberOfLines={2}>
//               {item.title}
//             </Text>

//             {/* =================================================
//                 DESCRIPTION
//             ================================================= */}

//             <Text style={styles.description} numberOfLines={2}>
//               {item.description}
//             </Text>

//             {/* =================================================
//                 PRICE + LOCATION
//             ================================================= */}

//             <View style={styles.productRow}>
//               <View style={styles.priceContainer}>
//                 <Text style={styles.price}>
//                   {Number(item.price).toLocaleString()} {item.currency.code}
//                 </Text>

//                 <Text style={styles.location}>
//                   {item.location.area}, {item.location.city}
//                 </Text>
//               </View>

//               <Pressable
//                 style={styles.buyButton}
//                 onPress={() => {
//                   router.push({
//                     pathname: "/listing/[id]",
//                     params: {
//                       id: item.id,
//                     },
//                   });
//                 }}
//               >
//                 <Text style={styles.buyText}>View Item</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>

//         {/* =================================================
//             RIGHT ACTIONS
//         ================================================= */}

//         <View style={styles.actions}>
//           {/* LIKE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="heart-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.likes_count}</Text>
//           </Pressable>

//           {/* COMMENTS */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="chatbubble-ellipses-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.comments_count}</Text>
//           </Pressable>

//           {/* SAVE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="bookmark-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.saves_count}</Text>
//           </Pressable>

//           {/* SHARE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="share-social-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.shares_count}</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

//   // =====================================================
//   // SCREEN
//   // =====================================================

//   return (
//     <View style={styles.container}>
//       {/* =================================================
//           TOP OVERLAY
//       ================================================= */}

//       <View style={styles.topOverlay} />

//       {/* =================================================
//           TOP BAR
//       ================================================= */}

//       <View style={styles.topBar}>
//         {/* LOGO */}

//         <Text style={styles.logo}>Suqe</Text>

//         {/* FILTER TABS */}

//         <View style={styles.topTabs}>
//           <Pressable
//             onPress={() => {
//               setActiveFilter("all");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "all" && styles.activeTab]}
//             >
//               All
//             </Text>
//           </Pressable>

//           <Pressable
//             onPress={() => {
//               setActiveFilter("new");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "new" && styles.activeTab]}
//             >
//               New
//             </Text>
//           </Pressable>

//           <Pressable
//             onPress={() => {
//               setActiveFilter("used");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "used" && styles.activeTab]}
//             >
//               Used
//             </Text>
//           </Pressable>
//         </View>

//         {/* SEARCH */}

//         <Pressable style={styles.topBarButton}>
//           <Ionicons
//             name="search-outline"
//             size={Icons.search.size}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       {/* =================================================
//           REFRESH INDICATOR
//       ================================================= */}

//       {isFetching && (
//         <View style={styles.refreshIndicator}>
//           <ActivityIndicator size="small" color={Colors.primary} />
//         </View>
//       )}

//       {/* =================================================
//           FEED
//       ================================================= */}

//       <FlatList
//         data={displayedListings}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={height}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         removeClippedSubviews
//         initialNumToRender={2}
//         maxToRenderPerBatch={2}
//         windowSize={3}
//         onMomentumScrollEnd={(event) => {
//           const index = Math.round(event.nativeEvent.contentOffset.y / height);

//           setActiveIndex(index);
//           setIsPaused(false);
//         }}
//       />
//     </View>
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

//   feedItem: {
//     backgroundColor: Colors.mediaBackground,
//   },

//   image: {
//     position: "absolute",
//     width: "100%",
//     height: "90%",
//   },

//   // ===================================================
//   // CENTER
//   // ===================================================

//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//     backgroundColor: Colors.mediaBackground,
//   },

//   loadingText: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     marginTop: 12,
//   },

//   errorTitle: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     marginTop: 14,
//     textAlign: "center",
//   },

//   errorText: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     marginTop: 8,
//     textAlign: "center",
//   },

//   retryButton: {
//     marginTop: 20,
//     minHeight: 42,
//     paddingHorizontal: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.md,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   retryText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // TOP OVERLAY
//   // ===================================================

//   topOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 70,
//     backgroundColor: Colors.videoOverlay,
//     // backgroundColor: Colors.whiteTransparent,
//     zIndex: 10,
//   },

//   // ===================================================
//   // TOP BAR
//   // ===================================================

//   topBar: {
//     position: "absolute",
//     top: 20,
//     left: 16,
//     right: 16,
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     zIndex: 20,
//   },

//   logo: {
//     ...Typography.h2,
//     color: Colors.primary,
//   },

//   topTabs: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 20,
//     paddingHorizontal: 14,
//     height: 36,
//     borderWidth: 1,
//     borderColor: Colors.navigationBorder,
//     borderRadius: Radius.circle,
//   },

//   tab: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDarkMuted,
//   },

//   activeTab: {
//     color: Colors.textOnDark,
//     fontWeight: "700",
//   },

//   topBarButton: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   // ===================================================
//   // REFRESH
//   // ===================================================

//   refreshIndicator: {
//     position: "absolute",
//     top: 110,
//     right: 16,
//     zIndex: 30,
//   },

//   // ===================================================
//   // SOUND
//   // ===================================================

//   soundButton: {
//     position: "absolute",
//     top: 105,
//     right: 16,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.md,
//     backgroundColor: Colors.actionBackground,
//     zIndex: 15,
//   },

//   // ===================================================
//   // CONDITION
//   // ===================================================

//   conditionBadge: {
//     position: "absolute",
//     top: 80,
//     right: 0,
//     left: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: Radius.md,
//     zIndex: 15,
//   },

//   conditionText: {
//     ...Typography.caption,
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // PROMOTED
//   // ===================================================

//   promotedBadge: {
//     position: "absolute",
//     top: 105,
//     left: 85,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     paddingHorizontal: 9,
//     paddingVertical: 6,
//     borderRadius: Radius.md,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     zIndex: 15,
//   },

//   promotedText: {
//     ...Typography.caption,
//     color: Colors.primary,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // RIGHT ACTIONS
//   // ===================================================

//   actions: {
//     position: "absolute",
//     right: 12,
//     bottom: 100,
//     alignItems: "center",
//     gap: 14,
//     zIndex: 20,
//   },

//   action: {
//     alignItems: "center",
//     gap: 4,
//   },

//   actionButton: {
//     width: 44,
//     height: 44,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.md,
//     backgroundColor: Colors.actionBackground,
//   },

//   actionText: {
//     ...Typography.caption,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // BOTTOM OVERLAY
//   // ===================================================

//   bottomOverlay: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 50,
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 24,
//     borderTopRightRadius: Radius.circle,
//     backgroundColor: Colors.videoOverlayDark,
//     zIndex: 10,
//   },

//   productInfo: {
//     paddingRight: 70,
//     paddingBottom: 20,
//   },

//   // ===================================================
//   // SELLER
//   // ===================================================

//   sellerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 9,
//   },

//   avatar: {
//     width: 34,
//     height: 34,
//     borderRadius: Radius.md,
//     borderWidth: 1,
//     borderColor: Colors.white,
//   },

//   avatarPlaceholder: {
//     width: 34,
//     height: 34,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.md,
//     borderWidth: 1,
//     borderColor: Colors.white,
//     backgroundColor: Colors.actionBackground,
//   },

//   sellerIdentity: {
//     flex: 1,
//   },

//   sellerNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   username: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     flexShrink: 1,
//   },

//   sellerUsername: {
//     ...Typography.caption,
//     color: Colors.textOnDarkMuted,
//     marginTop: 1,
//   },

//   // ===================================================
//   // PRODUCT
//   // ===================================================

//   title: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     marginBottom: 4,
//   },

//   description: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     marginBottom: 12,
//   },

//   // ===================================================
//   // PRICE
//   // ===================================================

//   productRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//   },

//   priceContainer: {
//     flex: 1,
//   },

//   price: {
//     ...Typography.priceLarge,
//     color: Colors.primary,
//   },

//   location: {
//     ...Typography.caption,
//     color: Colors.textOnDarkSecondary,
//     marginTop: 2,
//   },

//   // ===================================================
//   // VIEW ITEM
//   // ===================================================

//   buyButton: {
//     minHeight: 42,
//     paddingHorizontal: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.md,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   buyText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//   },

//   // ===================================================
//   // MEDIA TAP
//   // ===================================================

//   mediaTapArea: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 2,
//   },

//   pauseIcon: {
//     width: 52,
//     height: 52,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },

//   // ===================================================
//   // NO MEDIA
//   // ===================================================

//   noMedia: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.mediaBackground,
//   },

//   noMediaText: {
//     ...Typography.body,
//     color: Colors.textOnDarkMuted,
//     marginTop: 10,
//   },
// });

// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   ListRenderItem,
//   useWindowDimensions,
//   ActivityIndicator,
// } from "react-native";

// import { VideoView, useVideoPlayer } from "expo-video";
// import { Ionicons } from "@expo/vector-icons";

// import { useEffect, useState } from "react";

// import { Colors } from "@/constants/src/theme/colors";
// import { Typography } from "@/constants/src/theme/typography";
// import { Icons } from "@/constants/src/theme/icons";
// import { Radius } from "@/constants/src/theme/radius";

// import { useListings } from "@/hooks/useListings";
// import { useRouter } from "expo-router";

// import type { Listing, ListingMedia } from "@/constants/src/types/listing";

// // =====================================================
// // FEED MEDIA
// // =====================================================

// function FeedMedia({
//   media,
//   isActive,
//   isMuted,
//   isPaused,
// }: {
//   media: ListingMedia | undefined;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
// }) {
//   if (!media) {
//     return (
//       <View style={styles.noMedia}>
//         <View style={styles.noMediaIcon}>
//           <Ionicons
//             name="image-outline"
//             size={30}
//             color={Colors.textOnDarkMuted}
//           />
//         </View>

//         <Text style={styles.noMediaText}>No media</Text>
//       </View>
//     );
//   }

//   const mediaUri = media.url ?? media.thumbnail_url ?? null;

//   if (!mediaUri) {
//     return (
//       <View style={styles.noMedia}>
//         <View style={styles.noMediaIcon}>
//           <Ionicons
//             name="image-outline"
//             size={30}
//             color={Colors.textOnDarkMuted}
//           />
//         </View>

//         <Text style={styles.noMediaText}>No media</Text>
//       </View>
//     );
//   }

//   // IMAGE
//   if (media.media_type === "image") {
//     return (
//       <Image
//         source={{ uri: mediaUri }}
//         style={styles.image}
//         resizeMode="contain"
//       />
//     );
//   }

//   // VIDEO
//   if (media.media_type === "video") {
//     return (
//       <VideoMedia
//         source={mediaUri}
//         isActive={isActive}
//         isMuted={isMuted}
//         isPaused={isPaused}
//       />
//     );
//   }

//   return (
//     <View style={styles.noMedia}>
//       <View style={styles.noMediaIcon}>
//         <Ionicons
//           name="help-circle-outline"
//           size={30}
//           color={Colors.textOnDarkMuted}
//         />
//       </View>

//       <Text style={styles.noMediaText}>Unsupported media</Text>
//     </View>
//   );
// }

// // =====================================================
// // VIDEO MEDIA
// // =====================================================

// function VideoMedia({
//   source,
//   isActive,
//   isMuted,
//   isPaused,
// }: {
//   source: string;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
// }) {
//   const player = useVideoPlayer(source, (player) => {
//     player.loop = true;
//     player.muted = isMuted;
//   });

//   useEffect(() => {
//     player.muted = isMuted;

//     if (!isActive || isPaused) {
//       player.pause();
//       return;
//     }

//     player.play();
//   }, [isActive, isMuted, isPaused, player]);

//   return (
//     <VideoView
//       player={player}
//       style={styles.image}
//       contentFit="contain"
//       nativeControls={false}
//     />
//   );
// }

// // =====================================================
// // HOME SCREEN
// // =====================================================

// export default function HomeScreen() {
//   const { width, height } = useWindowDimensions();
//   const router = useRouter();

//   // ===================================================
//   // API
//   // ===================================================

//   const {
//     data: listings = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetching,
//   } = useListings();

//   // ===================================================
//   // LOCAL UI STATE
//   // ===================================================

//   const [activeFilter, setActiveFilter] = useState<"all" | "new" | "used">(
//     "all",
//   );

//   const [activeIndex, setActiveIndex] = useState(0);

//   const [isMuted, setIsMuted] = useState(true);

//   const [isPaused, setIsPaused] = useState(false);

//   // ===================================================
//   // FILTER
//   // ===================================================

//   const displayedListings =
//     activeFilter === "all"
//       ? listings
//       : listings.filter((listing) => listing.condition.slug === activeFilter);

//   // ===================================================
//   // RESET WHEN FILTER CHANGES
//   // ===================================================

//   useEffect(() => {
//     setActiveIndex(0);
//     setIsPaused(false);
//   }, [activeFilter]);

//   // ===================================================
//   // LOADING
//   // ===================================================

//   if (isLoading) {
//     return (
//       <View style={styles.centerContainer}>
//         <View style={styles.stateIcon}>
//           <ActivityIndicator size="small" color={Colors.primary} />
//         </View>

//         <Text style={styles.loadingTitle}>Loading Suqe</Text>

//         <Text style={styles.loadingText}>Discovering items for you...</Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // ERROR
//   // ===================================================

//   if (isError) {
//     return (
//       <View style={styles.centerContainer}>
//         <View style={styles.stateIcon}>
//           <Ionicons
//             name="cloud-offline-outline"
//             size={28}
//             color={Colors.primary}
//           />
//         </View>

//         <Text style={styles.errorTitle}>Failed to load listings</Text>

//         <Text style={styles.errorText}>
//           {error instanceof Error ? error.message : "Something went wrong."}
//         </Text>

//         <Pressable
//           style={({ pressed }) => [
//             styles.retryButton,
//             pressed && styles.retryButtonPressed,
//           ]}
//           onPress={() => refetch()}
//         >
//           <Ionicons name="refresh-outline" size={18} color={Colors.white} />

//           <Text style={styles.retryText}>Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // ===================================================
//   // EMPTY
//   // ===================================================

//   if (displayedListings.length === 0) {
//     return (
//       <View style={styles.centerContainer}>
//         <View style={styles.stateIcon}>
//           <Ionicons name="cube-outline" size={28} color={Colors.primary} />
//         </View>

//         <Text style={styles.errorTitle}>No listings found</Text>

//         <Text style={styles.errorText}>
//           There are no {activeFilter === "all" ? "" : activeFilter} listings
//           yet.
//         </Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // FEED ITEM
//   // ===================================================

//   const renderItem: ListRenderItem<Listing> = ({ item, index }) => {
//     const isActive = index === activeIndex;

//     const firstMedia = item.media?.[0];

//     return (
//       <View
//         style={[
//           styles.feedItem,
//           {
//             width,
//             height,
//           },
//         ]}
//       >
//         {/* =================================================
//             MEDIA
//         ================================================= */}

//         <FeedMedia
//           media={firstMedia}
//           isActive={isActive}
//           isMuted={isMuted}
//           isPaused={isPaused}
//         />

//         {/* =================================================
//             MEDIA GRADIENT / OVERLAYS
//         ================================================= */}

//         <View style={styles.topGradient} />

//         <View style={styles.bottomGradient} />

//         {/* =================================================
//             PLAY / PAUSE
//         ================================================= */}

//         {firstMedia?.media_type === "video" && (
//           <Pressable
//             style={styles.mediaTapArea}
//             onPress={() => setIsPaused((previous) => !previous)}
//           >
//             {isPaused && (
//               <View style={styles.pauseIcon}>
//                 <Ionicons name="play" size={25} color={Colors.textOnDark} />
//               </View>
//             )}
//           </Pressable>
//         )}

//         {/* =================================================
//             SOUND
//         ================================================= */}

//         {firstMedia?.media_type === "video" && (
//           <Pressable
//             style={({ pressed }) => [
//               styles.soundButton,
//               pressed && styles.soundButtonPressed,
//             ]}
//             onPress={() => setIsMuted((previous) => !previous)}
//           >
//             <Ionicons
//               name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
//               size={21}
//               color={Colors.actionIcon}
//             />
//           </Pressable>
//         )}

//         {/* =================================================
//             CONDITION
//         ================================================= */}

//         <View style={styles.conditionBadge}>
//           <Text style={styles.conditionText}>{item.condition.name}</Text>
//         </View>

//         {/* =================================================
//             BOTTOM INFORMATION
//         ================================================= */}

//         <View style={styles.bottomOverlay}>
//           <View style={styles.productInfo}>
//             {/* =================================================
//                 SELLER
//             ================================================= */}

//             <Pressable style={styles.sellerRow}>
//               {item.seller.avatar ? (
//                 <Image
//                   source={{
//                     uri: item.seller.avatar,
//                   }}
//                   style={styles.avatar}
//                 />
//               ) : (
//                 <View style={styles.avatarPlaceholder}>
//                   <Ionicons
//                     name="person"
//                     size={17}
//                     color={Colors.textOnDarkMuted}
//                   />
//                 </View>
//               )}

//               <View style={styles.sellerIdentity}>
//                 <View style={styles.sellerNameRow}>
//                   <Text style={styles.username} numberOfLines={1}>
//                     {item.seller.display_name}
//                   </Text>

//                   {item.seller.is_verified && (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={15}
//                       color={Colors.verified}
//                     />
//                   )}
//                 </View>

//                 {item.seller.username ? (
//                   <Text style={styles.sellerUsername} numberOfLines={1}>
//                     @{item.seller.username}
//                   </Text>
//                 ) : null}
//               </View>
//             </Pressable>

//             {/* =================================================
//                 TITLE
//             ================================================= */}

//             <Text style={styles.title} numberOfLines={2}>
//               {item.title}
//             </Text>

//             {/* =================================================
//                 DESCRIPTION
//             ================================================= */}

//             <Text style={styles.description} numberOfLines={2}>
//               {item.description}
//             </Text>

//             {/* =================================================
//                 PRICE + LOCATION
//             ================================================= */}

//             <View style={styles.productRow}>
//               <View style={styles.priceContainer}>
//                 <Text style={styles.price}>
//                   {Number(item.price).toLocaleString()} {item.currency.code}
//                 </Text>

//                 <View style={styles.locationRow}>
//                   <Ionicons
//                     name="location-outline"
//                     size={13}
//                     color={Colors.textOnDarkSecondary}
//                   />

//                   <Text style={styles.location} numberOfLines={1}>
//                     {item.location.area}, {item.location.city}
//                   </Text>
//                 </View>
//               </View>

//               <Pressable
//                 style={({ pressed }) => [
//                   styles.buyButton,
//                   pressed && styles.buyButtonPressed,
//                 ]}
//                 onPress={() => {
//                   router.push({
//                     pathname: "/listing/[id]",
//                     params: {
//                       id: item.id,
//                     },
//                   });
//                 }}
//               >
//                 <Text style={styles.buyText}>View Item</Text>

//                 <Ionicons name="arrow-forward" size={16} color={Colors.white} />
//               </Pressable>
//             </View>
//           </View>
//         </View>

//         {/* =================================================
//             RIGHT ACTIONS
//         ================================================= */}

//         <View style={styles.actions}>
//           {/* LIKE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="heart-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.likes_count}</Text>
//           </Pressable>

//           {/* COMMENTS */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="chatbubble-ellipses-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.comments_count}</Text>
//           </Pressable>

//           {/* SAVE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="bookmark-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.saves_count}</Text>
//           </Pressable>

//           {/* SHARE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="share-social-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.shares_count}</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

//   // =====================================================
//   // SCREEN
//   // =====================================================

//   return (
//     <View style={styles.container}>
//       {/* =================================================
//           TOP OVERLAY
//       ================================================= */}

//       <View style={styles.topOverlay} />

//       {/* =================================================
//           TOP BAR
//       ================================================= */}

//       <View style={styles.topBar}>
//         {/* LOGO */}

//         <Text style={styles.logo}>suqe</Text>

//         {/* FILTER TABS */}

//         <View style={styles.topTabs}>
//           <Pressable
//             style={[
//               styles.tabButton,
//               activeFilter === "all" && styles.activeTabButton,
//             ]}
//             onPress={() => {
//               setActiveFilter("all");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "all" && styles.activeTab]}
//             >
//               All
//             </Text>
//           </Pressable>

//           <Pressable
//             style={[
//               styles.tabButton,
//               activeFilter === "new" && styles.activeTabButton,
//             ]}
//             onPress={() => {
//               setActiveFilter("new");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "new" && styles.activeTab]}
//             >
//               New
//             </Text>
//           </Pressable>

//           <Pressable
//             style={[
//               styles.tabButton,
//               activeFilter === "used" && styles.activeTabButton,
//             ]}
//             onPress={() => {
//               setActiveFilter("used");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "used" && styles.activeTab]}
//             >
//               Used
//             </Text>
//           </Pressable>
//         </View>

//         {/* SEARCH */}

//         <Pressable
//           style={({ pressed }) => [
//             styles.topBarButton,
//             pressed && styles.topBarButtonPressed,
//           ]}
//         >
//           <Ionicons
//             name="search-outline"
//             size={Icons.search.size}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       {/* =================================================
//           REFRESH INDICATOR
//       ================================================= */}

//       {isFetching && (
//         <View style={styles.refreshIndicator}>
//           <View style={styles.refreshContainer}>
//             <ActivityIndicator size="small" color={Colors.primary} />
//           </View>
//         </View>
//       )}

//       {/* =================================================
//           FEED
//       ================================================= */}

//       <FlatList
//         data={displayedListings}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={height}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         removeClippedSubviews
//         initialNumToRender={2}
//         maxToRenderPerBatch={2}
//         windowSize={3}
//         onMomentumScrollEnd={(event) => {
//           const index = Math.round(event.nativeEvent.contentOffset.y / height);

//           setActiveIndex(index);
//           setIsPaused(false);
//         }}
//       />
//     </View>
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

//   feedItem: {
//     backgroundColor: Colors.mediaBackground,
//   },

//   image: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//   },

//   // ===================================================
//   // CENTER STATES
//   // ===================================================

//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//     backgroundColor: Colors.background,
//   },

//   stateIcon: {
//     width: 58,
//     height: 58,
//     borderRadius: Radius.circle,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: Colors.secondaryLight,
//   },

//   loadingTitle: {
//     ...Typography.h3,
//     color: Colors.textPrimary,
//     marginTop: 18,
//   },

//   loadingText: {
//     ...Typography.body,
//     color: Colors.textSecondary,
//     marginTop: 6,
//     textAlign: "center",
//   },

//   errorTitle: {
//     ...Typography.h3,
//     color: Colors.textPrimary,
//     marginTop: 18,
//     textAlign: "center",
//   },

//   errorText: {
//     ...Typography.body,
//     color: Colors.textSecondary,
//     marginTop: 7,
//     textAlign: "center",
//     maxWidth: 320,
//   },

//   retryButton: {
//     height: 46,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     paddingHorizontal: 20,
//     marginTop: 20,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   retryButtonPressed: {
//     backgroundColor: Colors.buttonPrimaryPressed,
//     transform: [{ scale: 0.985 }],
//   },

//   retryText: {
//     ...Typography.button,
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // TOP OVERLAY
//   // ===================================================

//   topOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 105,
//     backgroundColor: Colors.videoOverlayDark,
//     zIndex: 10,
//   },

//   // ===================================================
//   // TOP BAR
//   // ===================================================

//   topBar: {
//     position: "absolute",
//     top: 20,
//     left: 16,
//     right: 16,
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     zIndex: 20,
//   },

//   logo: {
//     fontSize: 27,
//     lineHeight: 33,
//     fontWeight: "800",
//     color: Colors.white,
//     letterSpacing: -1,
//   },

//   topTabs: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 3,
//     padding: 3,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.18)",
//     borderRadius: Radius.pill,
//     backgroundColor: "rgba(0,0,0,0.28)",
//   },

//   tabButton: {
//     minWidth: 43,
//     height: 32,
//     paddingHorizontal: 9,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.pill,
//   },

//   activeTabButton: {
//     backgroundColor: Colors.primary,
//   },

//   tab: {
//     ...Typography.caption,
//     fontWeight: "600",
//     color: Colors.textOnDarkSecondary,
//   },

//   activeTab: {
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   topBarButton: {
//     width: 42,
//     height: 42,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.12)",
//   },

//   topBarButtonPressed: {
//     backgroundColor: "rgba(0,0,0,0.7)",
//     transform: [{ scale: 0.96 }],
//   },

//   // ===================================================
//   // REFRESH
//   // ===================================================

//   refreshIndicator: {
//     position: "absolute",
//     top: 105,
//     right: 16,
//     zIndex: 30,
//   },

//   refreshContainer: {
//     width: 36,
//     height: 36,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   // ===================================================
//   // SOUND
//   // ===================================================

//   soundButton: {
//     position: "absolute",
//     top: 104,
//     right: 16,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.12)",
//     zIndex: 15,
//   },

//   soundButtonPressed: {
//     backgroundColor: "rgba(0,0,0,0.7)",
//     transform: [{ scale: 0.96 }],
//   },

//   // ===================================================
//   // CONDITION
//   // ===================================================

//   conditionBadge: {
//     position: "absolute",
//     top: 104,
//     left: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: Radius.pill,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.12)",
//     zIndex: 15,
//   },

//   conditionText: {
//     ...Typography.caption,
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // RIGHT ACTIONS
//   // ===================================================

//   actions: {
//     position: "absolute",
//     right: 12,
//     bottom: 115,
//     alignItems: "center",
//     gap: 13,
//     zIndex: 20,
//   },

//   action: {
//     alignItems: "center",
//     gap: 4,
//   },

//   actionButton: {
//     width: 44,
//     height: 44,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.10)",
//   },

//   actionText: {
//     ...Typography.caption,
//     color: Colors.textOnDark,
//     fontWeight: "600",
//   },

//   // ===================================================
//   // OVERLAYS
//   // ===================================================

//   topGradient: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 190,
//     backgroundColor: Colors.videoOverlay,
//     zIndex: 1,
//   },

//   bottomGradient: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 370,
//     backgroundColor: Colors.videoOverlayDark,
//     zIndex: 1,
//   },

//   // ===================================================
//   // BOTTOM INFORMATION
//   // ===================================================

//   bottomOverlay: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 50,
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 22,
//     zIndex: 10,
//   },

//   productInfo: {
//     paddingRight: 70,
//     paddingBottom: 8,
//   },

//   // ===================================================
//   // SELLER
//   // ===================================================

//   sellerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 9,
//     marginBottom: 11,
//   },

//   avatar: {
//     width: 38,
//     height: 38,
//     borderRadius: Radius.circle,
//     borderWidth: 1.5,
//     borderColor: Colors.white,
//   },

//   avatarPlaceholder: {
//     width: 38,
//     height: 38,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.35)",
//     backgroundColor: Colors.actionBackground,
//   },

//   sellerIdentity: {
//     flex: 1,
//   },

//   sellerNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   username: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     fontWeight: "600",
//     flexShrink: 1,
//   },

//   sellerUsername: {
//     ...Typography.caption,
//     color: Colors.textOnDarkMuted,
//     marginTop: 1,
//   },

//   // ===================================================
//   // PRODUCT
//   // ===================================================

//   title: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     fontSize: 19,
//     lineHeight: 25,
//     marginBottom: 5,
//   },

//   description: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     lineHeight: 20,
//     marginBottom: 13,
//   },

//   // ===================================================
//   // PRICE
//   // ===================================================

//   productRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//   },

//   priceContainer: {
//     flex: 1,
//   },

//   price: {
//     ...Typography.priceLarge,
//     fontSize: 22,
//     lineHeight: 28,
//     color: Colors.primary,
//   },

//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 3,
//     marginTop: 3,
//   },

//   location: {
//     ...Typography.caption,
//     color: Colors.textOnDarkSecondary,
//     flexShrink: 1,
//   },

//   // ===================================================
//   // VIEW ITEM
//   // ===================================================

//   buyButton: {
//     minHeight: 44,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 7,
//     paddingHorizontal: 15,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   buyButtonPressed: {
//     backgroundColor: Colors.buttonPrimaryPressed,
//     transform: [{ scale: 0.97 }],
//   },

//   buyText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // MEDIA TAP
//   // ===================================================

//   mediaTapArea: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 2,
//   },

//   pauseIcon: {
//     width: 58,
//     height: 58,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.18)",
//   },

//   // ===================================================
//   // NO MEDIA
//   // ===================================================

//   noMedia: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.mediaBackground,
//   },

//   noMediaIcon: {
//     width: 58,
//     height: 58,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.darkSurfaceLight,
//   },

//   noMediaText: {
//     ...Typography.body,
//     color: Colors.textOnDarkMuted,
//     marginTop: 12,
//   },
// });

// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   ListRenderItem,
//   useWindowDimensions,
//   ActivityIndicator,
// } from "react-native";

// import { VideoView, useVideoPlayer } from "expo-video";
// import { Ionicons } from "@expo/vector-icons";

// import { useCallback, useEffect, useState } from "react";
// import { useFocusEffect, useRouter } from "expo-router";

// import { Colors } from "@/constants/src/theme/colors";
// import { Typography } from "@/constants/src/theme/typography";
// import { Icons } from "@/constants/src/theme/icons";
// import { Radius } from "@/constants/src/theme/radius";

// import { useListings } from "@/hooks/useListings";

// import type { Listing, ListingMedia } from "@/constants/src/types/listing";

// // =====================================================
// // FEED MEDIA
// // =====================================================

// function FeedMedia({
//   media,
//   isActive,
//   isMuted,
//   isPaused,
//   isScreenFocused,
// }: {
//   media: ListingMedia | undefined;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
//   isScreenFocused: boolean;
// }) {
//   // ===================================================
//   // NO MEDIA
//   // ===================================================

//   if (!media) {
//     return (
//       <View style={styles.noMedia}>
//         <View style={styles.noMediaIcon}>
//           <Ionicons
//             name="image-outline"
//             size={30}
//             color={Colors.textOnDarkMuted}
//           />
//         </View>

//         <Text style={styles.noMediaText}>No media</Text>
//       </View>
//     );
//   }

//   const mediaUri = media.url ?? media.thumbnail_url ?? null;

//   if (!mediaUri) {
//     return (
//       <View style={styles.noMedia}>
//         <View style={styles.noMediaIcon}>
//           <Ionicons
//             name="image-outline"
//             size={30}
//             color={Colors.textOnDarkMuted}
//           />
//         </View>

//         <Text style={styles.noMediaText}>No media</Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // IMAGE
//   // ===================================================

//   if (media.media_type === "image") {
//     return (
//       <Image
//         source={{ uri: mediaUri }}
//         style={styles.image}
//         resizeMode="contain"
//       />
//     );
//   }

//   // ===================================================
//   // VIDEO
//   // ===================================================

//   if (media.media_type === "video") {
//     return (
//       <VideoMedia
//         source={mediaUri}
//         isActive={isActive}
//         isMuted={isMuted}
//         isPaused={isPaused}
//         isScreenFocused={isScreenFocused}
//       />
//     );
//   }

//   // ===================================================
//   // UNSUPPORTED MEDIA
//   // ===================================================

//   return (
//     <View style={styles.noMedia}>
//       <View style={styles.noMediaIcon}>
//         <Ionicons
//           name="help-circle-outline"
//           size={30}
//           color={Colors.textOnDarkMuted}
//         />
//       </View>

//       <Text style={styles.noMediaText}>Unsupported media</Text>
//     </View>
//   );
// }

// // =====================================================
// // VIDEO MEDIA
// // =====================================================

// function VideoMedia({
//   source,
//   isActive,
//   isMuted,
//   isPaused,
//   isScreenFocused,
// }: {
//   source: string;
//   isActive: boolean;
//   isMuted: boolean;
//   isPaused: boolean;
//   isScreenFocused: boolean;
// }) {
//   const player = useVideoPlayer(source, (player) => {
//     player.loop = true;

//     // Start muted.
//     player.muted = true;
//   });

//   useEffect(() => {
//     // =================================================
//     // VIDEO SHOULD PLAY ONLY WHEN:
//     //
//     // 1. Home screen is focused
//     // 2. This item is active
//     // 3. User has not paused the video
//     // =================================================

//     const shouldPlay = isScreenFocused && isActive && !isPaused;

//     // =================================================
//     // MUTE WHEN HOME IS NOT FOCUSED
//     // =================================================

//     player.muted = isMuted || !isScreenFocused;

//     // =================================================
//     // PAUSE
//     // =================================================

//     if (!shouldPlay) {
//       player.pause();
//       return;
//     }

//     // =================================================
//     // PLAY
//     // =================================================

//     player.play();
//   }, [isScreenFocused, isActive, isMuted, isPaused, player]);

//   return (
//     <VideoView
//       player={player}
//       style={styles.image}
//       contentFit="contain"
//       nativeControls={false}
//     />
//   );
// }

// // =====================================================
// // HOME SCREEN
// // =====================================================

// export default function HomeScreen() {
//   const { width, height } = useWindowDimensions();

//   const router = useRouter();

//   // ===================================================
//   // HOME SCREEN FOCUS
//   // ===================================================

//   const [isScreenFocused, setIsScreenFocused] = useState(false);

//   useFocusEffect(
//     useCallback(() => {
//       // Home became visible
//       setIsScreenFocused(true);

//       // Home is leaving focus
//       return () => {
//         setIsScreenFocused(false);
//       };
//     }, []),
//   );

//   // ===================================================
//   // API
//   // ===================================================

//   const {
//     data: listings = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetching,
//   } = useListings();

//   // ===================================================
//   // LOCAL UI STATE
//   // ===================================================

//   const [activeFilter, setActiveFilter] = useState<"all" | "new" | "used">(
//     "all",
//   );

//   const [activeIndex, setActiveIndex] = useState(0);

//   const [isMuted, setIsMuted] = useState(true);

//   const [isPaused, setIsPaused] = useState(false);

//   // ===================================================
//   // FILTER
//   // ===================================================

//   const displayedListings =
//     activeFilter === "all"
//       ? listings
//       : listings.filter((listing) => listing.condition.slug === activeFilter);

//   // ===================================================
//   // RESET WHEN FILTER CHANGES
//   // ===================================================

//   useEffect(() => {
//     setActiveIndex(0);
//     setIsPaused(false);
//   }, [activeFilter]);

//   // ===================================================
//   // WHEN LEAVING HOME
//   // ===================================================

//   useEffect(() => {
//     if (!isScreenFocused) {
//       // Do not keep the Home video paused
//       // when returning to Home.
//       setIsPaused(false);
//     }
//   }, [isScreenFocused]);

//   // ===================================================
//   // LOADING
//   // ===================================================

//   if (isLoading) {
//     return (
//       <View style={styles.centerContainer}>
//         <View style={styles.stateIcon}>
//           <ActivityIndicator size="small" color={Colors.primary} />
//         </View>

//         <Text style={styles.loadingTitle}>Loading Suqe</Text>

//         <Text style={styles.loadingText}>Discovering items for you...</Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // ERROR
//   // ===================================================

//   if (isError) {
//     return (
//       <View style={styles.centerContainer}>
//         <View style={styles.stateIcon}>
//           <Ionicons
//             name="cloud-offline-outline"
//             size={28}
//             color={Colors.primary}
//           />
//         </View>

//         <Text style={styles.errorTitle}>Failed to load listings</Text>

//         <Text style={styles.errorText}>
//           {error instanceof Error ? error.message : "Something went wrong."}
//         </Text>

//         <Pressable
//           style={({ pressed }) => [
//             styles.retryButton,
//             pressed && styles.retryButtonPressed,
//           ]}
//           onPress={() => refetch()}
//         >
//           <Ionicons name="refresh-outline" size={18} color={Colors.white} />

//           <Text style={styles.retryText}>Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // ===================================================
//   // EMPTY
//   // ===================================================

//   if (displayedListings.length === 0) {
//     return (
//       <View style={styles.centerContainer}>
//         <View style={styles.stateIcon}>
//           <Ionicons name="cube-outline" size={28} color={Colors.primary} />
//         </View>

//         <Text style={styles.errorTitle}>No listings found</Text>

//         <Text style={styles.errorText}>
//           There are no {activeFilter === "all" ? "" : activeFilter} listings
//           yet.
//         </Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // FEED ITEM
//   // ===================================================

//   const renderItem: ListRenderItem<Listing> = ({ item, index }) => {
//     const isActive = index === activeIndex;

//     const firstMedia = item.media?.[0];

//     return (
//       <View
//         style={[
//           styles.feedItem,
//           {
//             width,
//             height,
//           },
//         ]}
//       >
//         {/* =================================================
//             MEDIA
//         ================================================= */}

//         <FeedMedia
//           media={firstMedia}
//           isActive={isActive}
//           isMuted={isMuted}
//           isPaused={isPaused}
//           isScreenFocused={isScreenFocused}
//         />

//         {/* =================================================
//             GRADIENT / OVERLAYS
//         ================================================= */}

//         <View style={styles.topGradient} />

//         <View style={styles.bottomGradient} />

//         {/* =================================================
//             PLAY / PAUSE
//         ================================================= */}

//         {firstMedia?.media_type === "video" && (
//           <Pressable
//             style={styles.mediaTapArea}
//             onPress={() => setIsPaused((previous) => !previous)}
//           >
//             {isPaused && (
//               <View style={styles.pauseIcon}>
//                 <Ionicons name="play" size={25} color={Colors.textOnDark} />
//               </View>
//             )}
//           </Pressable>
//         )}

//         {/* =================================================
//             SOUND
//         ================================================= */}

//         {firstMedia?.media_type === "video" && (
//           <Pressable
//             style={({ pressed }) => [
//               styles.soundButton,
//               pressed && styles.soundButtonPressed,
//             ]}
//             onPress={() => setIsMuted((previous) => !previous)}
//           >
//             <Ionicons
//               name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
//               size={21}
//               color={Colors.actionIcon}
//             />
//           </Pressable>
//         )}

//         {/* =================================================
//             CONDITION
//         ================================================= */}

//         <View style={styles.conditionBadge}>
//           <Text style={styles.conditionText}>{item.condition.name}</Text>
//         </View>

//         {/* =================================================
//             BOTTOM INFORMATION
//         ================================================= */}

//         <View style={styles.bottomOverlay}>
//           <View style={styles.productInfo}>
//             {/* =================================================
//                 SELLER
//             ================================================= */}

//             <Pressable style={styles.sellerRow}>
//               {item.seller.avatar ? (
//                 <Image
//                   source={{
//                     uri: item.seller.avatar,
//                   }}
//                   style={styles.avatar}
//                 />
//               ) : (
//                 <View style={styles.avatarPlaceholder}>
//                   <Ionicons
//                     name="person"
//                     size={17}
//                     color={Colors.textOnDarkMuted}
//                   />
//                 </View>
//               )}

//               <View style={styles.sellerIdentity}>
//                 <View style={styles.sellerNameRow}>
//                   <Text style={styles.username} numberOfLines={1}>
//                     {item.seller.display_name}
//                   </Text>

//                   {item.seller.is_verified && (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={15}
//                       color={Colors.verified}
//                     />
//                   )}
//                 </View>

//                 {item.seller.username ? (
//                   <Text style={styles.sellerUsername} numberOfLines={1}>
//                     @{item.seller.username}
//                   </Text>
//                 ) : null}
//               </View>
//             </Pressable>

//             {/* =================================================
//                 TITLE
//             ================================================= */}

//             <Text style={styles.title} numberOfLines={2}>
//               {item.title}
//             </Text>

//             {/* =================================================
//                 DESCRIPTION
//             ================================================= */}

//             <Text style={styles.description} numberOfLines={2}>
//               {item.description}
//             </Text>

//             {/* =================================================
//                 PRICE + LOCATION
//             ================================================= */}

//             <View style={styles.productRow}>
//               <View style={styles.priceContainer}>
//                 <Text style={styles.price}>
//                   {Number(item.price).toLocaleString()} {item.currency.code}
//                 </Text>

//                 <View style={styles.locationRow}>
//                   <Ionicons
//                     name="location-outline"
//                     size={13}
//                     color={Colors.textOnDarkSecondary}
//                   />

//                   <Text style={styles.location} numberOfLines={1}>
//                     {item.location.area}, {item.location.city}
//                   </Text>
//                 </View>
//               </View>

//               <Pressable
//                 style={({ pressed }) => [
//                   styles.buyButton,
//                   pressed && styles.buyButtonPressed,
//                 ]}
//                 onPress={() => {
//                   router.push({
//                     pathname: "/listing/[id]",
//                     params: {
//                       id: item.id,
//                     },
//                   });
//                 }}
//               >
//                 <Text style={styles.buyText}>View Item</Text>

//                 <Ionicons name="arrow-forward" size={16} color={Colors.white} />
//               </Pressable>
//             </View>
//           </View>
//         </View>

//         {/* =================================================
//             RIGHT ACTIONS
//         ================================================= */}

//         <View style={styles.actions}>
//           {/* LIKE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="heart-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.likes_count}</Text>
//           </Pressable>

//           {/* COMMENTS */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="chatbubble-ellipses-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.comments_count}</Text>
//           </Pressable>

//           {/* SAVE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="bookmark-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.saves_count}</Text>
//           </Pressable>

//           {/* SHARE */}

//           <Pressable style={styles.action}>
//             <View style={styles.actionButton}>
//               <Ionicons
//                 name="share-social-outline"
//                 size={Icons.action.size}
//                 color={Colors.actionIcon}
//               />
//             </View>

//             <Text style={styles.actionText}>{item.shares_count}</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

//   // =====================================================
//   // SCREEN
//   // =====================================================

//   return (
//     <View style={styles.container}>
//       {/* =================================================
//           TOP OVERLAY
//       ================================================= */}

//       <View style={styles.topOverlay} />

//       {/* =================================================
//           TOP BAR
//       ================================================= */}

//       <View style={styles.topBar}>
//         {/* LOGO */}

//         <Text style={styles.logo}>suqe</Text>

//         {/* FILTER TABS */}

//         <View style={styles.topTabs}>
//           <Pressable
//             style={[
//               styles.tabButton,
//               activeFilter === "all" && styles.activeTabButton,
//             ]}
//             onPress={() => {
//               setActiveFilter("all");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "all" && styles.activeTab]}
//             >
//               All
//             </Text>
//           </Pressable>

//           <Pressable
//             style={[
//               styles.tabButton,
//               activeFilter === "new" && styles.activeTabButton,
//             ]}
//             onPress={() => {
//               setActiveFilter("new");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "new" && styles.activeTab]}
//             >
//               New
//             </Text>
//           </Pressable>

//           <Pressable
//             style={[
//               styles.tabButton,
//               activeFilter === "used" && styles.activeTabButton,
//             ]}
//             onPress={() => {
//               setActiveFilter("used");
//               setActiveIndex(0);
//             }}
//           >
//             <Text
//               style={[styles.tab, activeFilter === "used" && styles.activeTab]}
//             >
//               Used
//             </Text>
//           </Pressable>
//         </View>

//         {/* SEARCH */}

//         <Pressable
//           style={({ pressed }) => [
//             styles.topBarButton,
//             pressed && styles.topBarButtonPressed,
//           ]}
//         >
//           <Ionicons
//             name="search-outline"
//             size={Icons.search.size}
//             color={Colors.actionIcon}
//           />
//         </Pressable>
//       </View>

//       {/* =================================================
//           REFRESH INDICATOR
//       ================================================= */}

//       {isFetching && (
//         <View style={styles.refreshIndicator}>
//           <View style={styles.refreshContainer}>
//             <ActivityIndicator size="small" color={Colors.primary} />
//           </View>
//         </View>
//       )}

//       {/* =================================================
//           FEED
//       ================================================= */}

//       <FlatList
//         data={displayedListings}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={height}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         removeClippedSubviews
//         initialNumToRender={2}
//         maxToRenderPerBatch={2}
//         windowSize={3}
//         onMomentumScrollEnd={(event) => {
//           const index = Math.round(event.nativeEvent.contentOffset.y / height);

//           setActiveIndex(index);
//           setIsPaused(false);
//         }}
//       />
//     </View>
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

//   feedItem: {
//     backgroundColor: Colors.mediaBackground,
//   },

//   image: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//   },

//   // ===================================================
//   // CENTER STATES
//   // ===================================================

//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//     backgroundColor: Colors.background,
//   },

//   stateIcon: {
//     width: 58,
//     height: 58,
//     borderRadius: Radius.circle,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: Colors.secondaryLight,
//   },

//   loadingTitle: {
//     ...Typography.h3,
//     color: Colors.textPrimary,
//     marginTop: 18,
//   },

//   loadingText: {
//     ...Typography.body,
//     color: Colors.textSecondary,
//     marginTop: 6,
//     textAlign: "center",
//   },

//   errorTitle: {
//     ...Typography.h3,
//     color: Colors.textPrimary,
//     marginTop: 18,
//     textAlign: "center",
//   },

//   errorText: {
//     ...Typography.body,
//     color: Colors.textSecondary,
//     marginTop: 7,
//     textAlign: "center",
//     maxWidth: 320,
//   },

//   retryButton: {
//     height: 46,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     paddingHorizontal: 20,
//     marginTop: 20,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   retryButtonPressed: {
//     backgroundColor: Colors.buttonPrimaryPressed,
//     transform: [{ scale: 0.985 }],
//   },

//   retryText: {
//     ...Typography.button,
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // TOP OVERLAY
//   // ===================================================

//   topOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 105,
//     backgroundColor: Colors.videoOverlayDark,
//     zIndex: 10,
//   },

//   // ===================================================
//   // TOP BAR
//   // ===================================================

//   topBar: {
//     position: "absolute",
//     top: 20,
//     left: 16,
//     right: 16,
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     zIndex: 20,
//   },

//   logo: {
//     fontSize: 27,
//     lineHeight: 33,
//     fontWeight: "800",
//     color: Colors.white,
//     letterSpacing: -1,
//   },

//   topTabs: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 3,
//     padding: 3,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.18)",
//     borderRadius: Radius.pill,
//     backgroundColor: "rgba(0,0,0,0.28)",
//   },

//   tabButton: {
//     minWidth: 43,
//     height: 32,
//     paddingHorizontal: 9,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.pill,
//   },

//   activeTabButton: {
//     backgroundColor: Colors.primary,
//   },

//   tab: {
//     ...Typography.caption,
//     fontWeight: "600",
//     color: Colors.textOnDarkSecondary,
//   },

//   activeTab: {
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   topBarButton: {
//     width: 42,
//     height: 42,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.12)",
//   },

//   topBarButtonPressed: {
//     backgroundColor: "rgba(0,0,0,0.7)",
//     transform: [{ scale: 0.96 }],
//   },

//   // ===================================================
//   // REFRESH
//   // ===================================================

//   refreshIndicator: {
//     position: "absolute",
//     top: 105,
//     right: 16,
//     zIndex: 30,
//   },

//   refreshContainer: {
//     width: 36,
//     height: 36,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//   },

//   // ===================================================
//   // SOUND
//   // ===================================================

//   soundButton: {
//     position: "absolute",
//     top: 104,
//     right: 16,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.12)",
//     zIndex: 15,
//   },

//   soundButtonPressed: {
//     backgroundColor: "rgba(0,0,0,0.7)",
//     transform: [{ scale: 0.96 }],
//   },

//   // ===================================================
//   // CONDITION
//   // ===================================================

//   conditionBadge: {
//     position: "absolute",
//     top: 104,
//     left: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: Radius.pill,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.12)",
//     zIndex: 15,
//   },

//   conditionText: {
//     ...Typography.caption,
//     color: Colors.white,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // RIGHT ACTIONS
//   // ===================================================

//   actions: {
//     position: "absolute",
//     right: 12,
//     bottom: 115,
//     alignItems: "center",
//     gap: 13,
//     zIndex: 20,
//   },

//   action: {
//     alignItems: "center",
//     gap: 4,
//   },

//   actionButton: {
//     width: 44,
//     height: 44,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.actionBackground,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.10)",
//   },

//   actionText: {
//     ...Typography.caption,
//     color: Colors.textOnDark,
//     fontWeight: "600",
//   },

//   // ===================================================
//   // OVERLAYS
//   // ===================================================

//   topGradient: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 190,
//     backgroundColor: Colors.videoOverlay,
//     zIndex: 1,
//   },

//   bottomGradient: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 370,
//     backgroundColor: Colors.videoOverlayDark,
//     zIndex: 1,
//   },

//   // ===================================================
//   // BOTTOM INFORMATION
//   // ===================================================

//   bottomOverlay: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 50,
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 22,
//     zIndex: 10,
//   },

//   productInfo: {
//     paddingRight: 70,
//     paddingBottom: 8,
//   },

//   // ===================================================
//   // SELLER
//   // ===================================================

//   sellerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 9,
//     marginBottom: 11,
//   },

//   avatar: {
//     width: 38,
//     height: 38,
//     borderRadius: Radius.circle,
//     borderWidth: 1.5,
//     borderColor: Colors.white,
//   },

//   avatarPlaceholder: {
//     width: 38,
//     height: 38,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.35)",
//     backgroundColor: Colors.actionBackground,
//   },

//   sellerIdentity: {
//     flex: 1,
//   },

//   sellerNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   username: {
//     ...Typography.bodyMedium,
//     color: Colors.textOnDark,
//     fontWeight: "600",
//     flexShrink: 1,
//   },

//   sellerUsername: {
//     ...Typography.caption,
//     color: Colors.textOnDarkMuted,
//     marginTop: 1,
//   },

//   // ===================================================
//   // PRODUCT
//   // ===================================================

//   title: {
//     ...Typography.h3,
//     color: Colors.textOnDark,
//     fontSize: 19,
//     lineHeight: 25,
//     marginBottom: 5,
//   },

//   description: {
//     ...Typography.body,
//     color: Colors.textOnDarkSecondary,
//     lineHeight: 20,
//     marginBottom: 13,
//   },

//   // ===================================================
//   // PRICE
//   // ===================================================

//   productRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//   },

//   priceContainer: {
//     flex: 1,
//   },

//   price: {
//     ...Typography.priceLarge,
//     fontSize: 22,
//     lineHeight: 28,
//     color: Colors.primary,
//   },

//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 3,
//     marginTop: 3,
//   },

//   location: {
//     ...Typography.caption,
//     color: Colors.textOnDarkSecondary,
//     flexShrink: 1,
//   },

//   // ===================================================
//   // VIEW ITEM
//   // ===================================================

//   buyButton: {
//     minHeight: 44,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 7,
//     paddingHorizontal: 15,
//     borderRadius: Radius.lg,
//     backgroundColor: Colors.buttonPrimary,
//   },

//   buyButtonPressed: {
//     backgroundColor: Colors.buttonPrimaryPressed,
//     transform: [{ scale: 0.97 }],
//   },

//   buyText: {
//     ...Typography.button,
//     color: Colors.textOnDark,
//     fontWeight: "700",
//   },

//   // ===================================================
//   // MEDIA TAP
//   // ===================================================

//   mediaTapArea: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 2,
//   },

//   pauseIcon: {
//     width: 58,
//     height: 58,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.18)",
//   },

//   // ===================================================
//   // NO MEDIA
//   // ===================================================

//   noMedia: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.mediaBackground,
//   },

//   noMediaIcon: {
//     width: 58,
//     height: 58,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: Radius.circle,
//     backgroundColor: Colors.darkSurfaceLight,
//   },

//   noMediaText: {
//     ...Typography.body,
//     color: Colors.textOnDarkMuted,
//     marginTop: 12,
//   },
// });

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

import { VideoView, useVideoPlayer } from "expo-video";
import { Ionicons } from "@expo/vector-icons";

import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";

import { Colors } from "@/constants/src/theme/colors";
import { Typography } from "@/constants/src/theme/typography";
import { Icons } from "@/constants/src/theme/icons";
import { Radius } from "@/constants/src/theme/radius";

import { useListings } from "@/hooks/useListings";

import type { Listing, ListingMedia } from "@/constants/src/types/listing";

// =====================================================
// FEED MEDIA
// =====================================================

function FeedMedia({
  media,
  isActive,
  isMuted,
  isPaused,
  isScreenFocused,
}: {
  media: ListingMedia | undefined;
  isActive: boolean;
  isMuted: boolean;
  isPaused: boolean;
  isScreenFocused: boolean;
}) {
  // ===================================================
  // NO MEDIA
  // ===================================================

  if (!media) {
    return (
      <View style={styles.noMedia}>
        <View style={styles.noMediaIcon}>
          <Ionicons
            name="image-outline"
            size={30}
            color={Colors.textOnDarkMuted}
          />
        </View>

        <Text style={styles.noMediaText}>No media</Text>
      </View>
    );
  }

  const mediaUri = media.url ?? media.thumbnail_url ?? null;

  if (!mediaUri) {
    return (
      <View style={styles.noMedia}>
        <View style={styles.noMediaIcon}>
          <Ionicons
            name="image-outline"
            size={30}
            color={Colors.textOnDarkMuted}
          />
        </View>

        <Text style={styles.noMediaText}>No media</Text>
      </View>
    );
  }

  // ===================================================
  // IMAGE
  // ===================================================

  if (media.media_type === "image") {
    return (
      <Image
        source={{ uri: mediaUri }}
        style={styles.image}
        resizeMode="contain"
      />
    );
  }

  // ===================================================
  // VIDEO
  // ===================================================

  if (media.media_type === "video") {
    return (
      <VideoMedia
        source={mediaUri}
        isActive={isActive}
        isMuted={isMuted}
        isPaused={isPaused}
        isScreenFocused={isScreenFocused}
      />
    );
  }

  // ===================================================
  // UNSUPPORTED MEDIA
  // ===================================================

  return (
    <View style={styles.noMedia}>
      <View style={styles.noMediaIcon}>
        <Ionicons
          name="help-circle-outline"
          size={30}
          color={Colors.textOnDarkMuted}
        />
      </View>

      <Text style={styles.noMediaText}>Unsupported media</Text>
    </View>
  );
}

// =====================================================
// VIDEO MEDIA
// =====================================================

function VideoMedia({
  source,
  isActive,
  isMuted,
  isPaused,
  isScreenFocused,
}: {
  source: string;
  isActive: boolean;
  isMuted: boolean;
  isPaused: boolean;
  isScreenFocused: boolean;
}) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.muted = true;
  });

  useEffect(() => {
    // Video should play only when:
    // 1. Home is focused
    // 2. This listing is active
    // 3. User has not paused the video

    const shouldPlay = isScreenFocused && isActive && !isPaused;

    // Mute when Home is not focused
    player.muted = isMuted || !isScreenFocused;

    // Pause
    if (!shouldPlay) {
      player.pause();
      return;
    }

    // Play
    player.play();
  }, [isScreenFocused, isActive, isMuted, isPaused, player]);

  return (
    <VideoView
      player={player}
      style={styles.image}
      contentFit="contain"
      nativeControls={false}
    />
  );
}
const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 70,
};

// =====================================================
// HOME SCREEN
// =====================================================

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  const router = useRouter();

  // ===================================================
  // HOME SCREEN FOCUS
  // ===================================================

  const [isScreenFocused, setIsScreenFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsScreenFocused(true);

      return () => {
        setIsScreenFocused(false);
      };
    }, []),
  );

  // ===================================================
  // API
  // ===================================================

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useListings();

  const listings = data?.pages.flatMap((page) => page.results) ?? [];

  // ===================================================
  // LOCAL UI STATE
  // ===================================================

  const [activeFilter, setActiveFilter] = useState<"all" | "new" | "used">(
    "all",
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const [isMuted, setIsMuted] = useState(true);

  const [isPaused, setIsPaused] = useState(false);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      const currentItem = viewableItems?.[0];

      if (!currentItem) {
        return;
      }

      const index = currentItem.index ?? 0;

      setActiveIndex(index);
      setIsPaused(false);

      // ================================================
      // PREFETCH NEXT PAGE
      // ================================================

      const remainingItems = listings.length - index - 1;

      if (remainingItems <= 5 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [listings.length, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  // ===================================================
  // FILTER
  // ===================================================

  const displayedListings =
    activeFilter === "all"
      ? listings
      : listings.filter((listing) => listing.condition.slug === activeFilter);

  // ===================================================
  // RESET WHEN FILTER CHANGES
  // ===================================================

  useEffect(() => {
    setActiveIndex(0);
    setIsPaused(false);
  }, [activeFilter]);

  // ===================================================
  // WHEN LEAVING HOME
  // ===================================================

  useEffect(() => {
    if (!isScreenFocused) {
      setIsPaused(false);
    }
  }, [isScreenFocused]);

  // ===================================================
  // LOADING
  // ===================================================

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.stateIcon}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>

        <Text style={styles.loadingTitle}>Loading Suqe</Text>

        <Text style={styles.loadingText}>Discovering items for you...</Text>
      </View>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.stateIcon}>
          <Ionicons
            name="cloud-offline-outline"
            size={28}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.errorTitle}>Failed to load listings</Text>

        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : "Something went wrong."}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
          onPress={() => refetch()}
        >
          <Ionicons name="refresh-outline" size={18} color={Colors.white} />

          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  // ===================================================
  // FEED ITEM
  // ===================================================

  const renderItem: ListRenderItem<Listing> = ({ item, index }) => {
    const isActive = index === activeIndex;

    const firstMedia = item.media?.[0];

    return (
      <View
        style={[
          styles.feedItem,
          {
            width,
            height,
          },
        ]}
      >
        {/* =================================================
            MEDIA
        ================================================= */}

        <FeedMedia
          media={firstMedia}
          isActive={isActive}
          isMuted={isMuted}
          isPaused={isPaused}
          isScreenFocused={isScreenFocused}
        />

        {/* =================================================
            GRADIENT / OVERLAYS
        ================================================= */}

        <View style={styles.topGradient} />

        <View style={styles.bottomGradient} />

        {/* =================================================
            PLAY / PAUSE
        ================================================= */}

        {firstMedia?.media_type === "video" && (
          <Pressable
            style={styles.mediaTapArea}
            onPress={() => setIsPaused((previous) => !previous)}
          >
            {isPaused && (
              <View style={styles.pauseIcon}>
                <Ionicons name="play" size={25} color={Colors.textOnDark} />
              </View>
            )}
          </Pressable>
        )}

        {/* =================================================
            SOUND
        ================================================= */}

        {firstMedia?.media_type === "video" && (
          <Pressable
            style={({ pressed }) => [
              styles.soundButton,
              pressed && styles.soundButtonPressed,
            ]}
            onPress={() => setIsMuted((previous) => !previous)}
          >
            <Ionicons
              name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
              size={21}
              color={Colors.actionIcon}
            />
          </Pressable>
        )}

        {/* =================================================
            CONDITION
        ================================================= */}

        <View style={styles.conditionBadge}>
          <Text style={styles.conditionText}>{item.condition.name}</Text>
        </View>

        {/* =================================================
            BOTTOM INFORMATION
        ================================================= */}

        <View style={styles.bottomOverlay}>
          <View style={styles.productInfo}>
            {/* =================================================
                SELLER
            ================================================= */}

            <Pressable
              style={styles.sellerRow}
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/profile",
                  params: {
                    username: item.seller.username,
                  },
                });
              }}
            >
              {item.seller.avatar ? (
                <Image
                  source={{
                    uri: item.seller.avatar,
                  }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons
                    name="person"
                    size={17}
                    color={Colors.textOnDarkMuted}
                  />
                </View>
              )}

              <View style={styles.sellerIdentity}>
                <View style={styles.sellerNameRow}>
                  <Text style={styles.username} numberOfLines={1}>
                    {item.seller.display_name}
                  </Text>

                  {item.seller.is_verified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={15}
                      color={Colors.verified}
                    />
                  )}
                </View>

                {item.seller.username ? (
                  <Text style={styles.sellerUsername} numberOfLines={1}>
                    @{item.seller.username}
                  </Text>
                ) : null}
              </View>
            </Pressable>

            {/* =================================================
                TITLE
            ================================================= */}

            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>

            {/* =================================================
                PRICE + LOCATION
            ================================================= */}

            <View style={styles.productRow}>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {Number(item.price).toLocaleString()} {item.currency.code}
                </Text>

                <View style={styles.locationRow}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={Colors.textOnDarkSecondary}
                  />

                  <Text style={styles.location} numberOfLines={1}>
                    {item.location.area}, {item.location.city}
                  </Text>
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.buyButton,
                  pressed && styles.buyButtonPressed,
                ]}
                onPress={() => {
                  router.push({
                    pathname: "/listing/[id]",
                    params: {
                      id: item.id,
                    },
                  });
                }}
              >
                <Text style={styles.buyText}>View Item</Text>

                <Ionicons name="arrow-forward" size={16} color={Colors.white} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* =================================================
            RIGHT ACTIONS
        ================================================= */}

        <View style={styles.actions}>
          {/* LIKE */}

          <Pressable style={styles.action}>
            <View style={styles.actionButton}>
              <Ionicons
                name="heart-outline"
                size={Icons.action.size}
                color={Colors.actionIcon}
              />
            </View>

            <Text style={styles.actionText}>{item.likes_count}</Text>
          </Pressable>

          {/* COMMENTS */}

          <Pressable style={styles.action}>
            <View style={styles.actionButton}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={Icons.action.size}
                color={Colors.actionIcon}
              />
            </View>

            <Text style={styles.actionText}>{item.comments_count}</Text>
          </Pressable>

          {/* SAVE */}

          <Pressable style={styles.action}>
            <View style={styles.actionButton}>
              <Ionicons
                name="bookmark-outline"
                size={Icons.action.size}
                color={Colors.actionIcon}
              />
            </View>

            <Text style={styles.actionText}>{item.saves_count}</Text>
          </Pressable>

          {/* SHARE */}

          <Pressable style={styles.action}>
            <View style={styles.actionButton}>
              <Ionicons
                name="share-social-outline"
                size={Icons.action.size}
                color={Colors.actionIcon}
              />
            </View>

            <Text style={styles.actionText}>{item.shares_count}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <View style={styles.container}>
      {/* =================================================
          TOP OVERLAY
      ================================================= */}

      <View style={styles.topOverlay} />

      {/* =================================================
          TOP BAR
      ================================================= */}

      <View style={styles.topBar}>
        {/* LOGO */}

        <Text style={styles.logo}>suqe</Text>

        {/* FILTER TABS */}

        <View style={styles.topTabs}>
          {/* ALL */}

          <Pressable
            style={[
              styles.tabButton,
              activeFilter === "all" && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveFilter("all");
              setActiveIndex(0);
            }}
          >
            <Text
              style={[styles.tab, activeFilter === "all" && styles.activeTab]}
            >
              All
            </Text>
          </Pressable>

          {/* NEW */}

          <Pressable
            style={[
              styles.tabButton,
              activeFilter === "new" && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveFilter("new");
              setActiveIndex(0);
            }}
          >
            <Text
              style={[styles.tab, activeFilter === "new" && styles.activeTab]}
            >
              New
            </Text>
          </Pressable>

          {/* USED */}

          <Pressable
            style={[
              styles.tabButton,
              activeFilter === "used" && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveFilter("used");
              setActiveIndex(0);
            }}
          >
            <Text
              style={[styles.tab, activeFilter === "used" && styles.activeTab]}
            >
              Used
            </Text>
          </Pressable>
        </View>

        {/* SEARCH */}

        <Pressable
          style={({ pressed }) => [
            styles.topBarButton,
            pressed && styles.topBarButtonPressed,
          ]}
        >
          <Ionicons
            name="search-outline"
            size={Icons.search.size}
            color={Colors.actionIcon}
          />
        </Pressable>
      </View>

      {/* =================================================
          REFRESH INDICATOR
      ================================================= */}

      {isFetching && (
        <View style={styles.refreshIndicator}>
          <View style={styles.refreshContainer}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        </View>
      )}

      {/* =================================================
          FEED / EMPTY FILTER STATE
      ================================================= */}

      {displayedListings.length === 0 ? (
        <View style={styles.emptyFeed}>
          <View style={styles.emptyFeedContent}>
            <View style={styles.stateIcon}>
              <Ionicons name="cube-outline" size={28} color={Colors.primary} />
            </View>

            <Text style={styles.emptyFeedTitle}>
              {activeFilter === "all"
                ? "No listings found"
                : `No ${activeFilter} listings`}
            </Text>

            <Text style={styles.emptyFeedText}>
              {activeFilter === "all"
                ? "There are no listings available yet."
                : `There are no ${activeFilter} listings available yet.`}
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={displayedListings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          snapToInterval={height}
          snapToAlignment="start"
          decelerationRate="fast"
          removeClippedSubviews
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
          viewabilityConfig={VIEWABILITY_CONFIG}
          onViewableItemsChanged={handleViewableItemsChanged}
          onEndReachedThreshold={0.5}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.y / height,
            );

            setActiveIndex(index);
            setIsPaused(false);
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View
                style={{
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  // ===================================================
  // SCREEN
  // ===================================================

  container: {
    flex: 1,
    backgroundColor: Colors.mediaBackground,
  },

  feedItem: {
    backgroundColor: Colors.mediaBackground,
  },

  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  // ===================================================
  // CENTER STATES
  // ===================================================

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: Colors.background,
  },

  stateIcon: {
    width: 58,
    height: 58,
    borderRadius: Radius.circle,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryLight,
  },

  loadingTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginTop: 18,
  },

  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 6,
    textAlign: "center",
  },

  errorTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginTop: 18,
    textAlign: "center",
  },

  errorText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 7,
    textAlign: "center",
    maxWidth: 320,
  },

  retryButton: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: Radius.lg,
    backgroundColor: Colors.buttonPrimary,
  },

  retryButtonPressed: {
    backgroundColor: Colors.buttonPrimaryPressed,
    transform: [{ scale: 0.985 }],
  },

  retryText: {
    ...Typography.button,
    color: Colors.white,
    fontWeight: "700",
  },

  // ===================================================
  // EMPTY FEED
  // ===================================================

  emptyFeed: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: Colors.mediaBackground,
  },

  emptyFeedContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
  },

  emptyFeedTitle: {
    ...Typography.h3,
    marginTop: 18,
    color: Colors.white,
    textAlign: "center",
  },

  emptyFeedText: {
    ...Typography.body,
    maxWidth: 300,
    marginTop: 7,
    color: Colors.textOnDarkSecondary,
    textAlign: "center",
  },

  // ===================================================
  // TOP OVERLAY
  // ===================================================

  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 105,
    backgroundColor: Colors.videoOverlayDark,
    zIndex: 10,
  },

  // ===================================================
  // TOP BAR
  // ===================================================

  topBar: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
  },

  logo: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "800",
    color: Colors.white,
    letterSpacing: -1,
  },

  topTabs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    padding: 3,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: Radius.pill,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  tabButton: {
    minWidth: 43,
    height: 32,
    paddingHorizontal: 9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.pill,
  },

  activeTabButton: {
    backgroundColor: Colors.primary,
  },

  tab: {
    ...Typography.caption,
    fontWeight: "600",
    color: Colors.textOnDarkSecondary,
  },

  activeTab: {
    color: Colors.white,
    fontWeight: "700",
  },

  topBarButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.actionBackground,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  topBarButtonPressed: {
    backgroundColor: "rgba(0,0,0,0.7)",
    transform: [{ scale: 0.96 }],
  },

  // ===================================================
  // REFRESH
  // ===================================================

  refreshIndicator: {
    position: "absolute",
    top: 105,
    right: 16,
    zIndex: 30,
  },

  refreshContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.actionBackground,
  },

  // ===================================================
  // SOUND
  // ===================================================

  soundButton: {
    position: "absolute",
    top: 104,
    right: 16,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.actionBackground,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    zIndex: 15,
  },

  soundButtonPressed: {
    backgroundColor: "rgba(0,0,0,0.7)",
    transform: [{ scale: 0.96 }],
  },

  // ===================================================
  // CONDITION
  // ===================================================

  conditionBadge: {
    position: "absolute",
    top: 104,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.actionBackground,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    zIndex: 15,
  },

  conditionText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: "700",
  },

  // ===================================================
  // RIGHT ACTIONS
  // ===================================================

  actions: {
    position: "absolute",
    right: 12,
    bottom: 115,
    alignItems: "center",
    gap: 13,
    zIndex: 20,
  },

  action: {
    alignItems: "center",
    gap: 4,
  },

  actionButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.actionBackground,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },

  actionText: {
    ...Typography.caption,
    color: Colors.textOnDark,
    fontWeight: "600",
  },

  // ===================================================
  // OVERLAYS
  // ===================================================

  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 190,
    backgroundColor: Colors.videoOverlay,
    zIndex: 1,
  },

  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 370,
    backgroundColor: Colors.videoOverlayDark,
    zIndex: 1,
  },

  // ===================================================
  // BOTTOM INFORMATION
  // ===================================================

  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 22,
    zIndex: 10,
  },

  productInfo: {
    paddingRight: 70,
    paddingBottom: 8,
  },

  // ===================================================
  // SELLER
  // ===================================================

  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 11,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: Radius.circle,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },

  avatarPlaceholder: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: Colors.actionBackground,
  },

  sellerIdentity: {
    flex: 1,
  },

  sellerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  username: {
    ...Typography.bodyMedium,
    color: Colors.textOnDark,
    fontWeight: "600",
    flexShrink: 1,
  },

  sellerUsername: {
    ...Typography.caption,
    color: Colors.textOnDarkMuted,
    marginTop: 1,
  },

  // ===================================================
  // PRODUCT
  // ===================================================

  title: {
    ...Typography.h3,
    color: Colors.textOnDark,
    fontSize: 19,
    lineHeight: 25,
    marginBottom: 5,
  },

  description: {
    ...Typography.body,
    color: Colors.textOnDarkSecondary,
    lineHeight: 20,
    marginBottom: 13,
  },

  // ===================================================
  // PRICE
  // ===================================================

  productRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  priceContainer: {
    flex: 1,
  },

  price: {
    ...Typography.priceLarge,
    fontSize: 22,
    lineHeight: 28,
    color: Colors.primary,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 3,
  },

  location: {
    ...Typography.caption,
    color: Colors.textOnDarkSecondary,
    flexShrink: 1,
  },

  // ===================================================
  // VIEW ITEM
  // ===================================================

  buyButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 15,
    borderRadius: Radius.lg,
    backgroundColor: Colors.buttonPrimary,
  },

  buyButtonPressed: {
    backgroundColor: Colors.buttonPrimaryPressed,
    transform: [{ scale: 0.97 }],
  },

  buyText: {
    ...Typography.button,
    color: Colors.textOnDark,
    fontWeight: "700",
  },

  // ===================================================
  // MEDIA TAP
  // ===================================================

  mediaTapArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  pauseIcon: {
    width: 58,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  // ===================================================
  // NO MEDIA
  // ===================================================

  noMedia: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mediaBackground,
  },

  noMediaIcon: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.darkSurfaceLight,
  },

  noMediaText: {
    ...Typography.body,
    color: Colors.textOnDarkMuted,
    marginTop: 12,
  },
});

// ### One change I made beyond the empty-state fix

// I made the seller row navigate to:

// ```tsx
// /profile/[username]
// ```

// when tapped:

// onPress={() => {
//   router.push({
//     pathname: "/profile/[username]",
//     params: {
//       username: item.seller.username,
//     },
//   });
// }}
