

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#F3F6FC",
          100: "#E6ECFC",
          200: "#C9D7F9",
          300: "#9DB7F4",
          400: "#6B91ED",
          500: "#3B6DE4",
          600: "#1D4ED8",
          700: "#1743BF",
          800: "#0F2E85",
          850: "#0A2060",
          900: "#0B2369",
          950: "#061858",
        },
        /* Coral Red palette for accent callouts */
        orange: {
          50:  "#FFF5F5",
          100: "#FDE8E8",
          200: "#FCD2D2",
          300: "#FA9D9D",
          400: "#F57272",
          500: "#F05454",
          600: "#E03C3C",
          700: "#C52A2A",
          800: "#A22020",
          900: "#0B2369",
        },
        pipeline: {
          red: {
            100: "#FDE8E8",
            500: "#F05454",
            600: "#E03C3C",
          },
          amber: {
            100: "#FFF1D5",
            400: "#FFB726",
            500: "#FF9F0A",
            600: "#E38B00",
          },
          green: {
            100: "#E6F4EA",
            500: "#10B981",
            600: "#059669",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        glass:    "0 8px 32px 0 rgba(5, 42, 79, 0.08)",
        card:     "0 14px 38px rgba(5, 42, 79, 0.08), 0 3px 10px rgba(5, 42, 79, 0.04)",
        elevated: "0 20px 55px rgba(5, 42, 79, 0.10)",
        product:  "0 38px 100px rgba(5, 42, 79, 0.20), 0 14px 36px rgba(15, 126, 234, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

