import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ctr: {
          blue: "#5B8FFF",
          pink: "#FE558E",
          yellow: "#FED653",
          ink: "#0A0A0A",
          paper: "#F6F6F4",
        },
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        cond: ["var(--font-barlow-condensed)", "var(--font-barlow)", "sans-serif"],
        script: ["var(--font-pacifico)", "cursive"],
        poppins: ["var(--font-poppins)", "var(--font-barlow)", "sans-serif"],
      },
      boxShadow: {
        card: "0 22px 45px -18px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
