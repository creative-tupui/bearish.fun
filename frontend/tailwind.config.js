/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'accent': '#F1FF3E',
        'black': '#030303',
        'yellow': '#FACC14',
        'positive': {
          'light': '#67C561',
          'middle': '#67DE42',
          'dark': '#B6F36A',
        },
        'negative': {
          'light': '#E83557',
          'dark': '#FF9A62',
        },
        'gray': {
          'primary': '#F3F3F4',
          'secondary': '#B6B7BA',
          'tertiary': '#3F4452',
        },
        'bg': '#06060B',
        'card': {
          'primary': '#121219',
          'secondary': '#18181E',
          'stroke': '#252527',
        },
      },
      fontFamily: {
        'oxanium': ['Oxanium', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

