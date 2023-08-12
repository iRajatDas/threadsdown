const typography = require("@tailwindcss/typography");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "barcelona-primary-background": "rgb(16, 16, 16)",
        "barcelona-secondary-background": "rgb(10, 10, 10)",
        "barcelona-primary-text": "rgb(243, 245, 247)",
        "barcelona-secondary-text": "rgb(97, 97, 97)",
        "barcelona-tertiary-text": "rgb(30, 30, 30)",
        "barcelona-link-text": "rgb(24, 163, 254)",
        "barcelona-error-text": "rgb(255, 48, 64)",
        "barcelona-primary-outline": "rgba(243, 245, 247, 0.15)",
        "barcelona-media-outline": "rgba(243, 245, 247, 0.2)",
        "barcelona-elevated-background": "rgb(24, 24, 24)",
        "barcelona-elevated-border": "rgba(243,245,247,.15)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "header-size": "72px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      padding: {
        default: "0.75rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      fontSize: {
        "system-10": "10px",
        "system-11": "11px",
        "system-12": "12px",
        "system-13": "13px",
        "system-14": "14px",
        "system-15": "15px",
        "system-16": "16px",
        "system-18": "18px",
        "system-20": "20px",
        "system-22": "22px",
        "system-24": "24px",
        "system-26": "26px",
        "system-28": "28px",
        "system-30": "30px",
        "system-32": "32px",
      },
      lineHeight: {
        "system-10": "12px",
        "system-11": "13px",
        "system-12": "16px",
        "system-14": "18px",
        "system-16": "20px",
        "system-18": "24px",
        "system-20": "25px",
        "system-22": "26px",
        "system-24": "27px",
        "system-26": "28px",
        "system-28": "32px",
        "system-30": "36px",
        "system-32": "40px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), typography],
};
