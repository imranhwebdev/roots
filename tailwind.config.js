/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.liquid",   // Shopify এর সব Liquid files scan করবে
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
     extend: {
      fontFamily: {
        armany: ['Armany-regular', 'sans-serif'],
        armanyMedium: ['Armany-Medium', 'sans-serif'],
        armanySemi: ['Armany-Semibold', 'sans-serif'],
        armanyBold: ['Armany-Bold', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
