/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soup Cook Off brand colors from soupcookoff.com
        brand: {
          peach: '#FECDA5',
          coral: '#FE6B4B',
          red: '#FE2D2D',
          burgundy: '#6B003E',
          wine: '#4A002B',
          cream: '#FFF8F0',
          gold: '#D4A574',
        }
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(107, 0, 62, 0.08)',
        'card-hover': '0 8px 24px rgba(107, 0, 62, 0.12)',
        'bottom-nav': '0 -2px 20px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FECDA5 0%, #FE2D2D 50%, #6B003E 100%)',
        'hero-gradient': 'linear-gradient(180deg, transparent 0%, rgba(74, 0, 43, 0.9) 100%)',
      }
    },
  },
  plugins: [],
}
