import { primitives } from "./primitives";

const { colors } = primitives

const states = {
  positive: {
    primary: colors.green[400],
    secondary: colors.green[900],
    tertiary: colors.green[300],
  },
  negative: {
    primary: colors.red[400],
    secondary: colors.red[900],
    tertiary: colors.red[300],
  },
  info: {
    primary: colors.blue[400],
    secondary: colors.blue[900],
    tertiary: colors.blue[300],
  },
  caution: {
    primary: colors.yellow[400],
    secondary: colors.yellow[900],
    tertiary: colors.yellow[300],
  },
  neutral: {
    primary: colors.neutral[400],
    secondary: colors.neutral[800],
    tertiary: colors.neutral[300],
  },
} as const;

const brand = {
  primary: {
    enabled: colors.green[400],
    hovered: colors.green[300],
  },
  accent: {
    enabled: colors.yellow[400],
    hovered: colors.yellow[300],
  },
} as const;

export const tokens = {
  states,
  brand,

  surface: {
    container: {
      enabled: colors.neutral[900],
      light: colors.neutral[800],
      low: colors.neutral[700],
      lowest: colors.neutral[600],
      lowestNegative: colors.neutral[300],
      high: colors.neutral[200],
      highest: colors.neutral[50],
      highestNegative: colors.neutral[800],
      dim: colors.neutral[500],
    },
    info: {
      primary: colors.blue[900],
      secondary: colors.blue[800],
    },
    positive: {
      primary: colors.green[900],
      secondary: colors.green[800],
    },
    negative: {
      primary: colors.red[900],
      secondary: colors.red[800],
    },
    active: colors.yellow[900],
    caution: {
      primary: colors.yellow[900],
      secondary: colors.yellow[800],
    },
    neutral: {
      primary: colors.neutral[800],
      secondary: colors.neutral[700],
    },
    disabled: colors.neutral[700],
  },

  text: {
    primary: colors.neutral[50],
    primaryNegative: colors.neutral[900],
    secondary: colors.neutral[300],
    tertiary: colors.neutral[400],
    disabled: colors.neutral[500],
    positive: {
      primary: states.positive.primary,
      secondary: states.positive.secondary,
    },
    negative: {
      primary: states.negative.primary,
      secondary: states.negative.secondary,
    },
    info: {
      primary: states.info.primary,
      secondary: states.info.secondary,
    },
    caution: {
      primary: states.caution.primary,
      secondary: states.caution.secondary,
    },
    brand: {
      primary: brand.primary.enabled,
      accent: brand.accent.enabled,
    },
    neutral: {
      primary: states.neutral.primary,
    },
    staticWhite: colors.neutral[50],
  },

  icons: {
    primary: colors.neutral[50],
    secondary: colors.neutral[300],
    disabled: colors.neutral[500],
    inverse: colors.neutral[900],
    brand: colors.yellow[400],
    success: colors.green[400],
    error: colors.red[400],
    warning: colors.yellow[400],
    info: colors.blue[400],
  },

  buttons: {
    contained: {
      primary: {
        surface: {
          enabled: colors.neutral[50],
          hovered: colors.neutral[200],
          disabled: colors.neutral[700],
        },
        text: {
          enabled: colors.neutral[900],
          hovered: colors.neutral[900],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.neutral[50],
          hovered: colors.neutral[200],
          disabled: colors.neutral[700],
        },
      },
      secondary: {
        surface: {
          enabled: colors.yellow[400],
          hovered: colors.yellow[300],
          disabled: colors.neutral[700],
        },
        text: {
          enabled: colors.neutral[900],
          hovered: colors.neutral[900],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.yellow[400],
          hovered: colors.yellow[300],
          disabled: colors.neutral[700],
        },
      },
      success: {
        surface: {
          enabled: colors.green[500],
          hovered: colors.green[400],
          disabled: colors.neutral[700],
        },
        text: {
          enabled: colors.neutral[900],
          hovered: colors.neutral[900],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.green[500],
          hovered: colors.green[400],
          disabled: colors.neutral[700],
        },
      },
      error: {
        surface: {
          enabled: colors.red[500],
          hovered: colors.red[400],
          disabled: colors.neutral[700],
        },
        text: {
          enabled: colors.neutral[900],
          hovered: colors.neutral[900],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.red[500],
          hovered: colors.red[400],
          disabled: colors.neutral[700],
        },
      },
    },
    outlined: {
      primary: {
        surface: {
          enabled: "transparent",
          hovered: colors.neutral[800],
          disabled: "transparent",
        },
        text: {
          enabled: colors.neutral[50],
          hovered: colors.neutral[50],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.neutral[600],
          hovered: colors.neutral[500],
          disabled: colors.neutral[700],
        },
      },
      secondary: {
        surface: {
          enabled: "transparent",
          hovered: colors.yellow[900],
          disabled: "transparent",
        },
        text: {
          enabled: colors.yellow[300],
          hovered: colors.yellow[200],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.yellow[500],
          hovered: colors.yellow[400],
          disabled: colors.neutral[700],
        },
      },
      success: {
        surface: {
          enabled: "transparent",
          hovered: colors.green[900],
          disabled: "transparent",
        },
        text: {
          enabled: colors.green[300],
          hovered: colors.green[200],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.green[500],
          hovered: colors.green[400],
          disabled: colors.neutral[700],
        },
      },
      error: {
        surface: {
          enabled: "transparent",
          hovered: colors.red[900],
          disabled: "transparent",
        },
        text: {
          enabled: colors.red[300],
          hovered: colors.red[200],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: colors.red[500],
          hovered: colors.red[400],
          disabled: colors.neutral[700],
        },
      },
    },
    text: {
      primary: {
        surface: {
          enabled: "transparent",
          hovered: colors.neutral[800],
          disabled: "transparent",
        },
        text: {
          enabled: colors.neutral[50],
          hovered: colors.neutral[50],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: "transparent",
          hovered: "transparent",
          disabled: "transparent",
        },
      },
      secondary: {
        surface: {
          enabled: "transparent",
          hovered: colors.yellow[900],
          disabled: "transparent",
        },
        text: {
          enabled: colors.yellow[300],
          hovered: colors.yellow[200],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: "transparent",
          hovered: "transparent",
          disabled: "transparent",
        },
      },
      success: {
        surface: {
          enabled: "transparent",
          hovered: colors.green[900],
          disabled: "transparent",
        },
        text: {
          enabled: colors.green[300],
          hovered: colors.green[200],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: "transparent",
          hovered: "transparent",
          disabled: "transparent",
        },
      },
      error: {
        surface: {
          enabled: "transparent",
          hovered: colors.red[900],
          disabled: "transparent",
        },
        text: {
          enabled: colors.red[300],
          hovered: colors.red[200],
          disabled: colors.neutral[500],
        },
        border: {
          enabled: "transparent",
          hovered: "transparent",
          disabled: "transparent",
        },
      },
    },
  },

  navigation: {
    surface: {
      current: colors.yellow[900],
      hovered: colors.neutral[800],
    },
    text: {
      current: colors.yellow[300],
      default: colors.neutral[400],
    },
    icon: {
      current: colors.yellow[400],
      default: colors.neutral[400],
    },
  },

  textFields: {
    bg: colors.neutral[800],
    border: colors.neutral[600],
    borderHover: colors.neutral[500],
    borderFocus: colors.yellow[400],
    borderError: colors.red[400],
    placeholder: colors.neutral[500],
  },

  border: {
    default: colors.neutral[700],
    light: colors.neutral[800],
    strong: colors.neutral[600],
    focus: colors.yellow[400],
    error: colors.red[400],
    divider: colors.neutral[700],
    inverse: "rgba(0, 0, 0, 0.3)",
  },

  chips: {
    ventaBg: colors.neutral[50],
    ventaText: colors.neutral[900],
    alquilerBg: colors.yellow[400],
    alquilerText: colors.neutral[900],
    tagBg: "rgba(0, 0, 0, 0.6)",
    tagText: colors.neutral[50],
    defaultBg: colors.neutral[800],
    defaultText: colors.neutral[200],
  },

  toasts: {
    successBg: colors.green[900],
    successBorder: colors.green[700],
    successText: colors.green[200],

    errorBg: colors.red[900],
    errorBorder: colors.red[700],
    errorText: colors.red[200],

    warningBg: colors.yellow[900],
    warningBorder: colors.yellow[700],
    warningText: colors.yellow[200],

    infoBg: colors.blue[900],
    infoBorder: colors.blue[700],
    infoText: colors.blue[200],
  },

  spacing: {
    xs: primitives.spacing[1],
    sm: primitives.spacing[2],
    md: primitives.spacing[3],
    lg: primitives.spacing[4],
    xl: primitives.spacing[5],
    "2xl": primitives.spacing[6],
    "3xl": primitives.spacing[8],
    "4xl": primitives.spacing[10],
    "5xl": primitives.spacing[12],
    "6xl": primitives.spacing[16],
  },

  radius: {
    button: primitives.borderRadius.md,
    card: primitives.borderRadius.xl,
    input: primitives.borderRadius.base,
    dialog: primitives.borderRadius.lg,
    chip: primitives.borderRadius.base,
  },

  shadow: {
    card: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    cardHover:
      "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    dialog:
      "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    dropdown:
      "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    button: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
  },

  transition: {
    fast: `all ${primitives.transition.duration.fast} ${primitives.transition.timing.easeOut}`,
    base: `all ${primitives.transition.duration.base} ${primitives.transition.timing.easeInOut}`,
    slow: `all ${primitives.transition.duration.slow} ${primitives.transition.timing.easeInOut}`,
  },
} as const;
