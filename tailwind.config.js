const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      "xs": "500px",
      ...defaultTheme.screens
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      colors: {
        darkGray: "#212121",
        sectionSilver: "#fcfcfc",
        promotionCard: "#d6d6d8",
        promotionProduct: "#efe1c7",
        promotionProduct2: "#d7d7d9",
        socialIconbg: "#f1f1f1",
        productSubtitle: "#666666",



      }

    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography')
  ],
}