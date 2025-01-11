// Purpose: Tailwind CSS configuration file.
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#1B1B3A',
        'primary-red': '#DC2626',
        'primary-blue': '#4169E1',
      },
    },
  },
  plugins: [],
};