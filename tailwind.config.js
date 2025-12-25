/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'smocked': {
          pink: '#FFB6C1',
          blue: '#ADD8E6',
          lavender: '#E6E6FA',
          peach: '#FFDAB9',
          mint: '#B0E0C3',
          cream: '#FFF8DC',
          rose: '#FFE4E1',
          sky: '#87CEEB',
        },
        'primary': {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(255, 182, 193, 0.2)',
        'glow': '0 0 20px rgba(255, 182, 193, 0.3)',
      }
    },
  },
  plugins: [],
}
