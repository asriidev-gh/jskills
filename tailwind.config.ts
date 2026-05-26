import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        court: {
          dark: "#0a0a0f",
          darker: "#050508",
          card: "rgba(20, 20, 30, 0.6)",
          border: "rgba(255, 107, 53, 0.15)",
        },
        accent: {
          orange: "#ff6b35",
          red: "#e63946",
          glow: "#ff8c42",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem,6vw,5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem,4vw,3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #ff6b35 0%, #e63946 50%, #ff8c42 100%)",
        "gradient-dark": "linear-gradient(180deg, #0a0a0f 0%, #141420 50%, #0a0a0f 100%)",
        "gradient-radial": "radial-gradient(ellipse at center, rgba(255,107,53,0.15) 0%, transparent 70%)",
        "gradient-hero": "linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.95) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 107, 53, 0.3)",
        "glow-lg": "0 0 60px rgba(255, 107, 53, 0.4)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
