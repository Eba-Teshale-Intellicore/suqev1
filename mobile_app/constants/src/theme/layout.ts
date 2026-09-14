import { Colors } from "./colors";
import { Spacing } from "./spacing";

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

  absoluteFill: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
} as const;
