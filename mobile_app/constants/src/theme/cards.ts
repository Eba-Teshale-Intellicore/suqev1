import { Colors } from "./colors";
import { Radius } from "./radius";
import { Spacing } from "./spacing";
import { Shadows } from "./shadows";

export const Cards = {
  service: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: "hidden" as const,
  },

  serviceElevated: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    overflow: "hidden" as const,
    ...Shadows.small,
  },

  category: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },

  provider: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },

  booking: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
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
    padding: Spacing.xl,
  },
} as const;
