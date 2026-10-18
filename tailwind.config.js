/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f5f7f5',
          100: '#e5ece6',
          200: '#cddbcF',
          300: '#a7c1a9',
          400: '#7fa483',
          500: '#5f8764',
          600: '#4a6c4f',
          700: '#3c5640',
          800: '#324635',
          900: '#2a3a2d',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf7f2',
          200: '#f4efe5',
          300: '#eae0cf',
          400: '#d9c6ab',
          500: '#c5ab87',
        },
        terracotta: {
          50: '#fdf6f2',
          100: '#faede4',
          200: '#f4dacb',
          300: '#eabfa8',
          400: '#dc9a7a',
          500: '#c8704d',
          600: '#b65938',
          700: '#97452c',
          800: '#7c3a28',
        },
        charcoal: {
          700: '#3d4841',
          800: '#28342c',
          900: '#1b231e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(40, 52, 44, 0.06)',
        'lift': '0 12px 30px -4px rgba(40, 52, 44, 0.12)',
      }
    },
  },
  plugins: [],
}
