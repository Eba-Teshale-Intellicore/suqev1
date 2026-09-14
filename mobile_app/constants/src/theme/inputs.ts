import { Colors } from "./colors";
import { Radius } from "./radius";

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
    borderColor: Colors.primary,
  },

  search: {
    height: 46,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceLight,
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  multiline: {
    minHeight: 120,
    paddingTop: 14,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceLight,
    color: Colors.textPrimary,
    textAlignVertical: "top" as const,
  },
} as const;
