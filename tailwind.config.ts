import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        montreal: ["NeueMontreal", "sans-serif"],
        creato: ['"Creato Display"', "sans-serif"],
        sfDisplay: ["SF Pro Display", "sans-serif"],
        geist: ["Geist", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
        manrope: ["Manrope", "sans-serif"],

        inter: ["Inter", "serif"],
        montserrat: ["var(--font-montserrat)"],
        arial: ["Arial", "Helvetica", "sans-serif"], // custom utility class
      },
      colors: {
        primaryBlue: "#005294",
        hoverBlue: "#003f73", // darker, richer shade

        mutedPrimary: "#8996A9",
        accentBase: "#005294",
        accentLight: "#1D2290",
        accentYellow: "#FBA94B",
        accentPurple: "#B981DA",
        accentGreen: "#32AE60",
        primaryApp: "#2F4491CC",
        primaryDark: "#231D4F",
        rgbGray: "rgba(228, 229, 231, 0.40)",
        tabBg: "rgba(0, 82, 148, 0.20)",
        navy: "#000042",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },

      boxShadow: {
        "nav-shadow": "0px 1px 5px 0px rgba(5, 5, 5, 0.1)",
        "banner-shadow": "0 8px 40px rgba(0, 38, 3, 0.08)",
        dropshadow: "0 0 12px 0 rgba(0, 153, 179, 0.32)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "custom-height": "calc(100vh - 20.7vh)",
      },
    },
  },
  plugins: [],
};
export default config;
