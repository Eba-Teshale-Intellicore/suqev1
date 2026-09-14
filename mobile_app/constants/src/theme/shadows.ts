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
