import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5",
        charcoal: {
          DEFAULT: "#1F1D1B",
          light: "#3A3633",
          muted: "#66625D",
        },
        oak: {
          DEFAULT: "#B08A5B",
          light: "#CBB18B",
          dark: "#8D6B42",
          subtle: "#F4EFEA",
        },
        olive: {
          DEFAULT: "#2F3A32",
          light: "#425046",
          dark: "#1E2620",
        },
        sand: {
          50: "#FCFBF9",
          100: "#FAF8F5",
          200: "#F2EDE4",
          300: "#E5DEC3",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slow-zoom": "slowZoom 20s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1.0)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
