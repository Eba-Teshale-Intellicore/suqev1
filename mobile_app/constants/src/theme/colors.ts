export const Colors = {
  // ==================================================
  // BACKGROUNDS
  // ==================================================

  background: "#F7F7F7",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  surfaceLight: "#DAE3E9",

  // TikTok-style dark media/feed background
  mediaBackground: "#000000",
  darkSurface: "#111111",
  darkSurfaceLight: "#1C1C1C",

  // ==================================================
  // SIRA BRAND
  // ==================================================

  primary: "#E80E0C",
  primaryDark: "#B90B09",
  primaryLight: "#FF4A47",

  secondary: "#DAE3E9",
  secondaryDark: "#AEBCC5",
  secondaryLight: "#EEF2F4",

  // ==================================================
  // TEXT
  // ==================================================

  white: "#FFFFFF",
  black: "#111111",

  textPrimary: "#111111",
  textSecondary: "#666666",
  textMuted: "#999999",

  // Text for dark/video screens
  textOnDark: "#FFFFFF",
  textOnDarkSecondary: "#D1D1D1",
  textOnDarkMuted: "#A0A0A0",

  // ==================================================
  // BORDERS & DIVIDERS
  // ==================================================

  border: "#D8DDE0",
  borderLight: "#E8ECEE",
  divider: "#E5E5E5",

  // ==================================================
  // STATUS
  // ==================================================

  success: "#16A34A",
  successLight: "#DCFCE7",

  warning: "#F59E0B",
  warningLight: "#FEF3C7",

  error: "#E80E0C",
  errorLight: "#FEE2E2",

  info: "#2563EB",
  infoLight: "#DBEAFE",

  // ==================================================
  // MARKETPLACE
  // ==================================================

  // Price / free / available
  free: "#16A34A",
  price: "#111111",
  unavailable: "#999999",

  // Verified provider / trusted seller
  verified: "#E80E0C",

  // Location
  location: "#E80E0C",

  // ==================================================
  // TIKTOK-STYLE MEDIA FEED
  // ==================================================

  videoBackground: "#000000",

  videoOverlay: "rgba(0,0,0,0.25)",
  videoOverlayDark: "rgba(0,0,0,0.65)",

  // Floating action buttons over videos
  actionBackground: "rgba(0,0,0,0.45)",
  actionBackgroundLight: "rgba(255,255,255,0.18)",

  actionIcon: "#FFFFFF",
  actionActive: "#E80E0C",

  // ==================================================
  // SNAG-STYLE DISCOVERY / MAP
  // ==================================================

  mapBackground: "#EEF2F4",

  mapMarker: "#E80E0C",
  mapMarkerActive: "#B90B09",

  locationBackground: "#FFFFFF",
  locationIcon: "#E80E0C",

  nearbyBackground: "#DAE3E9",

  // ==================================================
  // SEARCH
  // ==================================================

  searchBackground: "#FFFFFF",
  searchBorder: "#D8DDE0",
  searchIcon: "#666666",
  searchPlaceholder: "#999999",

  // ==================================================
  // CATEGORY CHIPS
  // ==================================================

  chipBackground: "#DAE3E9",
  chipActive: "#E80E0C",
  chipText: "#111111",
  chipActiveText: "#FFFFFF",

  // ==================================================
  // BUTTONS
  // ==================================================

  buttonPrimary: "#E80E0C",
  buttonPrimaryPressed: "#B90B09",

  buttonSecondary: "#DAE3E9",
  buttonSecondaryPressed: "#C7D2D9",

  buttonDark: "#111111",
  buttonDarkPressed: "#000000",

  buttonDisabled: "#D8DDE0",
  buttonDisabledText: "#999999",

  // ==================================================
  // NAVIGATION
  // ==================================================

  navigationBackground: "#ffffff",
  navigationBorder: "#E5E5E5",

  navigationActive: "#E80E0C",
  navigationInactive: "#777777",

  // ==================================================
  // OVERLAYS
  // ==================================================

  overlay: "rgba(0,0,0,0.20)",
  overlayMedium: "rgba(0,0,0,0.40)",
  overlayDark: "rgba(0,0,0,0.65)",

  overlayWhite: "rgba(255,255,255,0.70)",

  // ==================================================
  // TRANSPARENCY
  // ==================================================

  whiteTransparent: "rgba(255,255,255,0.80)",
  whiteTransparentMedium: "rgba(255,255,255,0.50)",
  whiteTransparentLight: "rgba(255,255,255,0.20)",

  blackTransparent: "rgba(0,0,0,0.10)",
  blackTransparentMedium: "rgba(0,0,0,0.30)",
  blackTransparentStrong: "rgba(0,0,0,0.60)",

  // ==================================================
  // GRADIENT ENDPOINTS
  // ==================================================

  gradientLight: "#FFFFFF",
  gradientSoft: "#F7F7F7",

  gradientBrandStart: "#FF4A47",
  gradientBrandEnd: "#E80E0C",

  gradientDarkStart: "rgba(0,0,0,0)",
  gradientDarkEnd: "rgba(0,0,0,0.75)",
} as const;
