// TikTok-style React Native Design System
// React Native + TypeScript
// This is a reusable visual system only — no Sira-specific branding.

export const Colors = {
  background: "#000000",
  surface: "#121212",
  surfaceElevated: "#1C1C1C",
  surfaceLight: "#252525",

  white: "#FFFFFF",
  black: "#000000",

  textPrimary: "#FFFFFF",
  textSecondary: "#A7A7A7",
  textMuted: "#6F6F6F",

  primary: "#FE2C55",
  secondary: "#25F4EE",

  border: "#2F2F2F",
  divider: "#2A2A2A",

  overlay: "rgba(0,0,0,0.35)",
  overlayDark: "rgba(0,0,0,0.60)",
  overlayLight: "rgba(255,255,255,0.12)",

  success: "#20D760",
  warning: "#FFB800",
  error: "#FF3B30",
} as const;

// --------------------------------------------------
// TYPOGRAPHY
// --------------------------------------------------

export const Typography = {
  display: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700" as const,
  },

  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700" as const,
  },

  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700" as const,
  },

  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600" as const,
  },

  bodyLarge: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400" as const,
  },

  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },

  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500" as const,
  },

  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400" as const,
  },

  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400" as const,
  },

  button: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600" as const,
  },

  tab: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "600" as const,
  },
} as const;

// --------------------------------------------------
// SPACING
// --------------------------------------------------

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
} as const;

// --------------------------------------------------
// RADIUS
// --------------------------------------------------

export const Radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  pill: 999,
  circle: 9999,
} as const;

// --------------------------------------------------
// SHADOWS
// --------------------------------------------------

export const Shadows = {
  none: {
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0,
  },

  small: {
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  medium: {
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  large: {
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },
} as const;

// --------------------------------------------------
// ICONS
// --------------------------------------------------

export const Icons = {
  navigation: {
    size: 24,
    activeSize: 25,
  },

  action: {
    size: 28,
  },

  largeAction: {
    size: 40,
  },

  avatar: {
    size: 48,
  },

  avatarSmall: {
    size: 36,
  },

  create: {
    size: 32,
  },

  search: {
    size: 24,
  },
} as const;

// --------------------------------------------------
// BUTTONS
// --------------------------------------------------

export const Buttons = {
  primary: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  secondary: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  dark: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  outline: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "transparent",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  follow: {
    height: 36,
    paddingHorizontal: 18,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: Radius.circle,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
} as const;

// --------------------------------------------------
// INPUTS
// --------------------------------------------------

export const Inputs = {
  container: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  text: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },

  placeholder: {
    color: Colors.textMuted,
  },

  focused: {
    borderWidth: 1,
    borderColor: Colors.white,
  },

  search: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
} as const;

// --------------------------------------------------
// CARDS
// --------------------------------------------------

export const Cards = {
  standard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },

  elevated: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
  },

  compact: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },

  media: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: "hidden" as const,
  },

  bottomSheet: {
    backgroundColor: Colors.surfaceElevated,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
  },
} as const;

// --------------------------------------------------
// FULL-SCREEN VIDEO FEED
// --------------------------------------------------

export const VideoFeed = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  video: {
    width: "100%" as const,
    height: "100%" as const,
  },

  overlay: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: 0,
    height: "45%" as const,
    backgroundColor: Colors.overlay,
  },

  content: {
    position: "absolute" as const,
    left: Spacing.lg,
    right: 80,
    bottom: 80,
  },

  username: {
    ...Typography.bodyMedium,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },

  caption: {
    ...Typography.body,
    color: Colors.white,
  },

  music: {
    ...Typography.small,
    color: Colors.white,
    marginTop: Spacing.sm,
  },

  actionRail: {
    position: "absolute" as const,
    right: Spacing.md,
    bottom: 90,
    alignItems: "center" as const,
    gap: Spacing.lg,
  },

  action: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  actionText: {
    ...Typography.small,
    color: Colors.white,
    marginTop: 4,
  },
} as const;

// --------------------------------------------------
// BOTTOM TAB BAR
// --------------------------------------------------

export const TabBar = {
  container: {
    height: 60,
    backgroundColor: Colors.background,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-around" as const,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },

  tab: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  label: {
    ...Typography.tab,
    color: Colors.textSecondary,
    marginTop: 3,
  },

  activeLabel: {
    color: Colors.white,
  },

  activeIcon: {
    color: Colors.white,
  },

  inactiveIcon: {
    color: Colors.textSecondary,
  },
} as const;

// --------------------------------------------------
// AVATAR
// --------------------------------------------------

export const Avatar = {
  small: {
    width: 36,
    height: 36,
    borderRadius: Radius.circle,
  },

  medium: {
    width: 48,
    height: 48,
    borderRadius: Radius.circle,
  },

  large: {
    width: 64,
    height: 64,
    borderRadius: Radius.circle,
  },

  border: {
    borderWidth: 2,
    borderColor: Colors.white,
  },
} as const;

// --------------------------------------------------
// MODAL / BOTTOM SHEET
// --------------------------------------------------

export const Modal = {
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end" as const,
  },

  sheet: {
    backgroundColor: Colors.surfaceElevated,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xl,
    minHeight: 200,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: Radius.pill,
    backgroundColor: Colors.textMuted,
    alignSelf: "center" as const,
    marginBottom: Spacing.xl,
  },
} as const;

// --------------------------------------------------
// COMMON LAYOUT
// --------------------------------------------------

export const Layout = {
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    paddingHorizontal: Spacing.lg,
  },

  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  rowBetween: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },

  center: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
};

// --------------------------------------------------
// EXPORT EVERYTHING
// --------------------------------------------------

export const TikTokTheme = {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
  Icons,
  Buttons,
  Inputs,
  Cards,
  VideoFeed,
  TabBar,
  Avatar,
  Modal,
  Layout,
};

export default TikTokTheme;
