
/** Radix Mauve Dark */
const radixMauve = {
  1000: '#191719',
  950: '#1e1a1e',
  900: '#2b272c',
  800: '#332f35',
  700: '#3a363c',
  600: '#423e45',
  500: '#4d4951',
  400: '#625f69',
  300: '#6f6d78',
  200: '#82808b',
  100: '#b1afb8',
  50: '#eeeef0',
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mauved: radixMauve,
        background: radixMauve[1000],
      },
    },
  },
  plugins: [],
};
