module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#071430",
          600: "#0b2545",
          400: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ['"Futura Condensed"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
