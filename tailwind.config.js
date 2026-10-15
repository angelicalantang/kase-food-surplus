/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        kaseBg: '#F4F5F8',
        kaseDark: '#0D0D0D',
        kaseGreen: '#3B6038',
        kaseGreenDark: '#2D5A27',
        kaseRed: '#FF5B5B',
        kaseAmber: '#ED9A33',
        kaseMint: '#E8F5E9',
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 20px 50px rgba(0, 0, 0, 0.04)',
        'hover': '0 30px 60px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 40px rgba(59, 96, 56, 0.15)',
      }
    },
  },
  plugins: [],
}