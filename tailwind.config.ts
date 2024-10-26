import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf7f2",
          100: "#f3ece1",
          200: "#e7d8c1",
          300: "#d7bd9a",
          400: "#c49a6c",
          500: "#ba8555",
          600: "#ac724a",
          700: "#905c3e",
          800: "#744b38",
          900: "#5f3e2f",
          950: "#321f18"
        },
        bay: {
          50: "#f1f5fd",
          100: "#dfe8fa",
          200: "#c6d7f7",
          300: "#a0bef0",
          400: "#729ce8)",
          500: "#5179e0)",
          600: "#3c5dd4)",
          700: "#334bc2)",
          800: "#2b3990)",
          900: "#2b387d)",
          950: "#1e244d)"
        },
        "soft-grey": "#D4D4D4"
      },
      screens: {
        xs: "500px"
      },
      zIndex: {
        top: "1000"
      },
      boxShadow: {
        soft: "0px 18px 15px 0px rgba(0,0,0,0.04)"
      },
      container: {
        center: true,
        padding: "1rem"
        // screens: {
        //   xxl: "1400px"
        // }
      },
      spacing: {
        navbar: "70px"
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#292929",
          secondary: "#fff",
          accent: "#2B3990",
          neutral: "#fff",
          "base-100": "#FAF7F2",
          info: "#38bdf8",
          success: "#4ade80",
          warning: "#facc15",
          error: "#dc2626"
        }
      },
      "light",
      "dark",
      "lofi"
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
export default config;
