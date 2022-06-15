const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.tsx"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        mirage: "#0f162a"
      }
    }
  }
}
