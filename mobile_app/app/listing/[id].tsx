import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
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
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />

          <Text style={styles.loadingText}>Loading item...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (isError || !listing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.actionIcon} />
          </Pressable>

          <Text style={styles.headerTitle}>Item</Text>

          <View style={styles.headerButton} />
        </View>

        <View style={styles.centerContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={56}
            color={Colors.textOnDarkMuted}
          />

          <Text style={styles.errorTitle}>Item not found</Text>

          <Text style={styles.errorText}>
            This listing may have been removed or is unavailable.
          </Text>

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

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
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.actionIcon} />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {listing.title}
        </Text>

        <Pressable style={styles.headerButton}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={Colors.actionIcon}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =================================================
            MEDIA
        ================================================= */}

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
            <Ionicons
              name="image-outline"
              size={64}
              color={Colors.textOnDarkMuted}
            />

            <Text style={styles.noMediaText}>No media available</Text>
          </View>
        )}

        {/* =================================================
            MAIN INFORMATION
        ================================================= */}

        <View style={styles.mainContent}>
          {/* CONDITION */}

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
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

          {/* TITLE */}

          <Text style={styles.title}>{listing.title}</Text>

          {/* PRICE */}

          <Text style={styles.price}>
            {Number(listing.price).toLocaleString()} {listing.currency.code}
          </Text>

          {/* LOCATION */}

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.textOnDarkSecondary}
            />

            <Text style={styles.locationText}>
              {listing.location.area}, {listing.location.city},{" "}
              {listing.location.country}
            </Text>
          </View>

          {/* =================================================
              STATS
          ================================================= */}

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons
                name="eye-outline"
                size={20}
                color={Colors.textOnDarkSecondary}
              />

              <Text style={styles.statText}>{listing.view_count}</Text>
            </View>

            <View style={styles.stat}>
              <Ionicons
                name="heart-outline"
                size={20}
                color={Colors.textOnDarkSecondary}
              />

              <Text style={styles.statText}>{listing.likes_count}</Text>
            </View>

            <View style={styles.stat}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={Colors.textOnDarkSecondary}
              />

              <Text style={styles.statText}>{listing.comments_count}</Text>
            </View>

            <View style={styles.stat}>
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={Colors.textOnDarkSecondary}
              />

              <Text style={styles.statText}>{listing.saves_count}</Text>
            </View>
          </View>

          {/* =================================================
              SELLER
          ================================================= */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seller</Text>

            <Pressable style={styles.sellerCard}>
              {listing.seller.avatar ? (
                <Image
                  source={{
                    uri: listing.seller.avatar,
                  }}
                  style={styles.sellerAvatar}
                />
              ) : (
                <View style={styles.sellerAvatarPlaceholder}>
                  <Ionicons
                    name="person"
                    size={22}
                    color={Colors.textOnDarkMuted}
                  />
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

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textOnDarkMuted}
              />
            </Pressable>
          </View>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>

            <Text style={styles.description}>{listing.description}</Text>
          </View>

          {/* =================================================
              DETAILS
          ================================================= */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>

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

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location</Text>

              <Text style={styles.detailValue}>
                {listing.location.area}, {listing.location.city}
              </Text>
            </View>
          </View>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <View style={styles.actionsRow}>
            <Pressable style={styles.secondaryButton}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={Colors.textOnDark}
              />

              <Text style={styles.secondaryButtonText}>Message</Text>
            </Pressable>

            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>I'm Interested</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mediaBackground,
  },

  content: {
    paddingBottom: 40,
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: Colors.darkSurface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.navigationBorder,
  },

  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.actionBackground,
  },

  headerTitle: {
    flex: 1,
    marginHorizontal: 12,
    textAlign: "center",
    ...Typography.bodyMedium,
    color: Colors.textOnDark,
  },

  // ===================================================
  // CENTER
  // ===================================================

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    ...Typography.body,
    color: Colors.textOnDarkSecondary,
    marginTop: 12,
  },

  errorTitle: {
    ...Typography.h3,
    color: Colors.textOnDark,
    marginTop: 16,
  },

  errorText: {
    ...Typography.body,
    color: Colors.textOnDarkSecondary,
    textAlign: "center",
    marginTop: 8,
  },

  backButton: {
    marginTop: 22,
    paddingHorizontal: 22,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.buttonPrimary,
  },

  backButtonText: {
    ...Typography.button,
    color: Colors.textOnDark,
  },

  // ===================================================
  // MEDIA
  // ===================================================

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
    backgroundColor: Colors.darkSurface,
  },

  noMediaText: {
    ...Typography.body,
    color: Colors.textOnDarkMuted,
    marginTop: 12,
  },

  // ===================================================
  // MAIN CONTENT
  // ===================================================

  mainContent: {
    paddingHorizontal: 16,
  },

  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },

  badge: {
    minHeight: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: Radius.md,
    backgroundColor: Colors.actionBackground,
  },

  badgeText: {
    ...Typography.caption,
    color: Colors.textOnDark,
    fontWeight: "700",
  },

  title: {
    ...Typography.h1,
    color: Colors.textOnDark,
    marginTop: 14,
  },

  price: {
    ...Typography.priceLarge,
    color: Colors.primary,
    marginTop: 8,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },

  locationText: {
    flex: 1,
    ...Typography.body,
    color: Colors.textOnDarkSecondary,
  },

  // ===================================================
  // STATS
  // ===================================================

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 18,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.navigationBorder,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statText: {
    ...Typography.caption,
    color: Colors.textOnDarkSecondary,
  },

  // ===================================================
  // SECTIONS
  // ===================================================

  section: {
    marginTop: 24,
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.textOnDark,
    marginBottom: 12,
  },

  description: {
    ...Typography.body,
    color: Colors.textOnDarkSecondary,
    lineHeight: 24,
  },

  // ===================================================
  // SELLER
  // ===================================================

  sellerCard: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: Radius.lg,
    backgroundColor: Colors.darkSurface,
  },

  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: Radius.circle,
  },

  sellerAvatarPlaceholder: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.circle,
    backgroundColor: Colors.actionBackground,
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
    ...Typography.bodyMedium,
    color: Colors.textOnDark,
    flexShrink: 1,
  },

  sellerUsername: {
    ...Typography.caption,
    color: Colors.textOnDarkMuted,
    marginTop: 3,
  },

  // ===================================================
  // DETAILS
  // ===================================================

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.navigationBorder,
  },

  detailLabel: {
    ...Typography.body,
    color: Colors.textOnDarkMuted,
  },

  detailValue: {
    ...Typography.bodyMedium,
    color: Colors.textOnDark,
    maxWidth: "60%",
    textAlign: "right",
  },

  // ===================================================
  // ACTIONS
  // ===================================================

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 28,
  },

  secondaryButton: {
    flex: 1,
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.navigationBorder,
    backgroundColor: Colors.darkSurface,
  },

  secondaryButtonText: {
    ...Typography.button,
    color: Colors.textOnDark,
  },

  primaryButton: {
    flex: 1.4,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.buttonPrimary,
  },

  primaryButtonText: {
    ...Typography.button,
    color: Colors.textOnDark,
  },
});
