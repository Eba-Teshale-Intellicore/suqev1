import { Colors } from "./colors";
import { Radius } from "./radius";

export const Buttons = {
  primary: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  secondary: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  dark: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  outline: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "transparent",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  small: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  pill: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
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

  floating: {
    width: 56,
    height: 56,
    borderRadius: Radius.circle,
    backgroundColor: Colors.primary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
} as const;
