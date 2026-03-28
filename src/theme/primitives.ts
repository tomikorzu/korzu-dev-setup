export const primitives = {
    colors: {
        neutral: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#e5e5e5",
            300: "#d4d4d4",
            400: "#a3a3a3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
        },

        yellow: {
            50: "#fef9f0",
            100: "#fdf2db",
            200: "#fbe5b7",
            300: "#f9d893",
            400: "#f7cb6f",
            500: "#d4b96e",
            600: "#c9a84c",
            700: "#a88a3a",
            800: "#876c2e",
            900: "#664e22",
        },

        green: {
            50: "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
            800: "#166534",
            900: "#14532d",
        },

        red: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d",
        },

        blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
        },
    },

    spacing: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        8: 32,
        10: 40,
        12: 48,
        16: 64,
        20: 80,
        24: 96,
        32: 128,
    },

    fontFamily: {
        sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        mono: "'Fira Code', 'Courier New', monospace",
    },

    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
    },

    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },

    lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },

    letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
    },

    borderRadius: {
        none: 0,
        sm: 4,
        base: 6,
        md: 8,
        lg: 12,
        xl: 16,
        "2xl": 20,
        "3xl": 24,
        full: 9999,
    },

    borderWidth: {
        0: 0,
        1: 1,
        2: 2,
        4: 4,
        8: 8,
    },
    
    boxShadow: {
        none: "none",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },

    transition: {
        duration: {
            fast: "150ms",
            base: "300ms",
            slow: "500ms",
            slower: "800ms",
        },
        timing: {
            linear: "linear",
            ease: "ease",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out",
        },
    },

    zIndex: {
        hide: -1,
        base: 0,
        dropdown: 1000,
        sticky: 1100,
        fixed: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        toast: 1600,
        tooltip: 1700,
    },
} as const;

export type Primitives = typeof primitives;
