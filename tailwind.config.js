/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary-rgb))',
          dark: 'rgb(79, 82, 221)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary-rgb))',
          dark: 'rgb(119, 72, 226)',
        },
        dark: {
          DEFAULT: 'rgb(var(--dark-rgb))',
          lighter: 'rgb(24, 24, 38)',
          input: 'rgb(28, 28, 44)',
        },
        light: {
          DEFAULT: 'rgb(var(--light-rgb))',
          darker: 'rgba(var(--light-rgb), 0.7)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 20px rgba(var(--primary-rgb), 0.3)',
        'glow-strong': '0 0 30px rgba(var(--primary-rgb), 0.5)',
      },
    },
  },
  plugins: [],
};
