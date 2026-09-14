import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/src/theme/colors";
import { Radius } from "@/constants/src/theme/radius";
import { Typography } from "@/constants/src/theme/typography";

import { useCallback, useEffect, useState } from "react";
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

type Listing = {
  id: string;

  title: string;
  description: string;

  price: number;
  currency: "ETB" | string;

  condition: "new" | "used" | string;

  location: {
    city: string;
    area: string;
  };

  media: {
    id: string;
    type: "image" | "video" | string;
    uri: string;
  }[];

  stats: {
    likes: number;
    views: number;
  };

  createdAt: string;
};

// ==================================================
// HELPERS
// ==================================================

function getListingImage(listing: Listing): string | null {
  return listing.media?.[0]?.uri ?? null;
}

function normalizeListings(data: any): Listing[] {
  const rawListings = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
      ? data.results
      : [];

  return rawListings.map((item: any) => ({
    id: String(item.id),

    title: item.title ?? "",
    description: item.description ?? "",

    price: Number(item.price ?? 0),
    currency: item.currency ?? "ETB",

    condition: item.condition ?? "used",

    location: {
      city: item.location?.city ?? item.city ?? "",
      area: item.location?.area ?? item.area ?? "",
    },

    media: Array.isArray(item.media)
      ? item.media.map((media: any) => ({
          id: String(media.id),
          type: media.type ?? "image",
          uri: media.uri ?? media.url ?? media.file ?? media.image ?? "",
        }))
      : [],

    stats: {
      likes: Number(item.stats?.likes ?? item.likes_count ?? item.likes ?? 0),
      views: Number(item.stats?.views ?? item.views_count ?? item.views ?? 0),
    },

    createdAt: item.created_at ?? item.createdAt ?? "",
  }));
}

// ==================================================
// SCREEN
// ==================================================

export default function ProfileScreen() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [listings, setListings] = useState<Listing[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // ==================================================
  // LOAD PROFILE
  // ==================================================

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error("Authentication token not found.");
      }

      const authHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      // ================================================
      // PROFILE
      // ================================================

      const profileResponse = await api.get<Profile>("/api/profiles/me/", {
        headers: authHeaders,
      });

      setProfile(profileResponse.data);

      // ================================================
      // USER'S LISTINGS
      // ================================================

      const listingsResponse = await api.get("/api/v1/listings/", {
        headers: authHeaders,
      });

      const allListings = normalizeListings(listingsResponse.data);

      // ================================================
      // ONLY CURRENT USER'S LISTINGS
      // ================================================

      const currentUserId = profileResponse.data.user ?? user?.id;

      const myListings = allListings.filter(
        (listing: any) =>
          String(
            listing.seller?.id ??
              listing.user?.id ??
              listing.owner?.id ??
              listing.seller_id ??
              listing.user_id ??
              listing.owner_id ??
              "",
          ) === String(currentUserId),
      );

      setListings(myListings);
    } catch (err: any) {
      console.log(
        "PROFILE LOAD ERROR:",
        err?.response?.data ?? err?.message ?? err,
      );

      setError("Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // ==================================================
  // LOAD ON SCREEN
  // ==================================================

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // ==================================================
  // ERROR
  // ==================================================

  if (error || !profile) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="person-outline" size={30} color={Colors.primary} />
          </View>

          <Text style={styles.emptyTitle}>Profile unavailable</Text>

          <Text style={styles.emptyText}>
            {error ?? "We couldn't load your profile."}
          </Text>

          <Pressable style={styles.emptyButton} onPress={loadProfile}>
            <Ionicons name="refresh" size={18} color={Colors.white} />

            <Text style={styles.emptyButtonText}>Try Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ==================================================
  // PROFILE DATA
  // ==================================================

  const username = user?.username ?? "";

  const displayName = profile.display_name || username;

  const bio = profile.bio || "Buying & selling good things on Suqe.";

  const avatar = profile.avatar
    ? { uri: profile.avatar }
    : require("@/assets/images/used-bag.jpg");

  const location = profile.city || "Ethiopia";

  const isVerified = user?.is_verified ?? false;

  // ==================================================
  // SCREEN
  // ==================================================

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* ==================================================
          TOP BAR
      ================================================== */}

      <View style={styles.topBar}>
        <Text style={styles.username}>@{username}</Text>

        <Pressable style={styles.topBarButton}>
          <Ionicons
            name="settings-outline"
            size={22}
            color={Colors.actionIcon}
          />
        </Pressable>
      </View>

      {/* ==================================================
          PROFILE + LISTINGS
      ================================================== */}

      <FlatList
        data={listings}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={
          <>
            {/* PROFILE */}

            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image source={avatar} style={styles.avatar} />

                {isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={12} color={Colors.white} />
                  </View>
                )}
              </View>

              <View style={styles.profileMain}>
                <View style={styles.nameRow}>
                  <Text style={styles.displayName}>{displayName}</Text>

                  {isVerified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={Colors.verified}
                    />
                  )}
                </View>

                <Text style={styles.bio}>{bio}</Text>

                {profile.city && (
                  <View style={styles.locationRow}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color={Colors.locationIcon}
                    />

                    <Text style={styles.location}>{location}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* STATS */}

            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{listings.length}</Text>

                <Text style={styles.statLabel}>Listings</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.stat}>
                <Text style={styles.statNumber}>{profile.followers_count}</Text>

                <Text style={styles.statLabel}>Followers</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.stat}>
                <Text style={styles.statNumber}>{profile.following_count}</Text>

                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>

            {/* ACTIONS */}

            <View style={styles.actionsRow}>
              <Pressable style={styles.editButton}>
                <Ionicons
                  name="create-outline"
                  size={18}
                  color={Colors.textPrimary}
                />

                <Text style={styles.editButtonText}>Edit Profile</Text>
              </Pressable>

              <Pressable style={styles.shareButton}>
                <Ionicons name="share-outline" size={18} color={Colors.white} />

                <Text style={styles.shareButtonText}>Share Profile</Text>
              </Pressable>
            </View>

            {/* LISTINGS HEADER */}

            <View style={styles.postsHeader}>
              <View>
                <Text style={styles.postsTitle}>Your items</Text>

                <Text style={styles.postsSubtitle}>
                  Items you've listed on Suqe
                </Text>
              </View>

              <View style={styles.postCountBadge}>
                <Text style={styles.postCountText}>{listings.length}</Text>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const image = getListingImage(item);

          return (
            <Pressable style={styles.productCard}>
              {/* MEDIA */}

              <View style={styles.productImageContainer}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons
                      name="image-outline"
                      size={30}
                      color={Colors.textMuted}
                    />
                  </View>
                )}

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

                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>
                    {item.price.toLocaleString()} {item.currency}
                  </Text>
                </View>
              </View>

              {/* INFO */}

              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.title}
                </Text>

                <Text style={styles.productLocation} numberOfLines={1}>
                  📍 {item.location.area ? `${item.location.area}, ` : ""}
                  {item.location.city}
                </Text>

                <View style={styles.productMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="heart-outline"
                      size={14}
                      color={Colors.textMuted}
                    />

                    <Text style={styles.metaText}>{item.stats.likes}</Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Ionicons
                      name="eye-outline"
                      size={14}
                      color={Colors.textMuted}
                    />

                    <Text style={styles.metaText}>{item.stats.views}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="cube-outline" size={30} color={Colors.primary} />
            </View>

            <Text style={styles.emptyTitle}>No items yet</Text>

            <Text style={styles.emptyText}>
              When you list something for sale, your items will appear here.
            </Text>

            <Pressable style={styles.emptyButton}>
              <Ionicons name="add" size={18} color={Colors.white} />

              <Text style={styles.emptyButtonText}>Sell an Item</Text>
            </Pressable>
          </View>
        }
      />
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

  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  topBar: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  username: {
    ...Typography.h2,
    color: Colors.primary,
  },

  topBarButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.actionBackground,
  },

  profileHeader: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 18,
  },

  avatarContainer: {
    position: "relative",
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.surfaceLight,
  },

  verifiedBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    backgroundColor: Colors.verified,
    borderWidth: 2,
    borderColor: Colors.background,
  },

  profileMain: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  displayName: {
    ...Typography.h2,
    flexShrink: 1,
    color: Colors.textPrimary,
  },

  bio: {
    ...Typography.body,
    marginTop: 4,
    color: Colors.textSecondary,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  location: {
    ...Typography.caption,
    color: Colors.textMuted,
  },

  statsContainer: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  statLabel: {
    ...Typography.caption,
    marginTop: 2,
    color: Colors.textMuted,
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.divider,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    marginBottom: 20,
  },

  editButton: {
    flex: 1,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: Colors.buttonSecondary,
    borderRadius: Radius.md,
  },

  editButtonText: {
    ...Typography.button,
    color: Colors.textPrimary,
  },

  shareButton: {
    flex: 1,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: Radius.md,
  },

  shareButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  postsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  postsTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  postsSubtitle: {
    ...Typography.caption,
    marginTop: 3,
    color: Colors.textMuted,
  },

  postCountBadge: {
    minWidth: 32,
    height: 28,
    paddingHorizontal: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.errorLight,
    borderRadius: Radius.md,
  },

  postCountText: {
    ...Typography.label,
    color: Colors.primary,
  },

  productRow: {
    justifyContent: "space-between",
  },

  productCard: {
    width: "48.5%",
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
  },

  productImageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: Colors.surfaceLight,
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
  },

  mediaCount: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: Radius.md,
  },

  mediaCountText: {
    ...Typography.caption,
    color: Colors.white,
  },

  priceBadge: {
    position: "absolute",
    left: 8,
    bottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
  },

  priceText: {
    ...Typography.label,
    color: Colors.price,
  },

  productInfo: {
    padding: 10,
  },

  productName: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },

  productLocation: {
    ...Typography.caption,
    marginTop: 4,
    color: Colors.location,
  },

  productMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metaText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },

  emptyState: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 44,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
  },

  emptyIcon: {
    width: 62,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderRadius: 31,
    backgroundColor: Colors.errorLight,
  },

  emptyTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  emptyText: {
    ...Typography.body,
    marginTop: 6,
    textAlign: "center",
    color: Colors.textSecondary,
  },

  emptyButton: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 18,
    marginTop: 18,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: Radius.md,
  },

  emptyButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});
