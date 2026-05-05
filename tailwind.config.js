/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A0A0B',
          'dark-mid': '#1C1C1E',
          'dark-surface': '#2A2A2C',
          gold: '#C9A84C',
          'gold-light': '#D4B85C',
          'gold-dark': '#A8893A',
          'gold-pale': '#F5EDD6',
          light: '#F9FAFB',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
