/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    screens: {
      sm: '640px',

      md: '768px',

      lg: '1024px',

      xl: '1280px',

      '2xl': '1536px',
    },
    container: {
      center: false,
      padding: {
        DEFAULT: '1rem',
        tablet: '200px',
      },
    },
    extend: {
      fontFamily: {
        custom: ['MaFontPerso', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5faff',
          100: '#e0f2ff',
          200: '#b3e5ff',
          300: '#81d4fa',
          400: '#4fc3f7',
          500: '#29b6f6',
          600: '#039be5',
          700: '#0288d1',
          800: '#0277bd',
          900: '#01579b',
        },
      },
    },
  },
  plugins: [],
};
