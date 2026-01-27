import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Press Start 2P"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ice: {
          50: '#EAF7FF',
          100: '#CDEEFF',
          200: '#9BDBFF',
          300: '#5ABFFF',
          400: '#2EA6FF',
          500: '#128CF5',
        },
        military: {
          50: '#E9F1ED',
          100: '#CFE0D7',
          200: '#A4C3B4',
          300: '#779E8F',
          400: '#4E7568',
          500: '#315449',
          600: '#244238',
          700: '#1A312A',
          800: '#11211C',
          900: '#0A1511',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(46, 166, 255, 0.25), 0 0 32px rgba(46, 166, 255, 0.18)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        idle: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(-0.5deg)' },
          '50%': { transform: 'translate3d(0, -8px, 0) rotate(0.5deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        microShake: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '20%': { transform: 'translate3d(-1px, 0, 0)' },
          '40%': { transform: 'translate3d(1px, 0, 0)' },
          '60%': { transform: 'translate3d(-1px, 0, 0)' },
          '80%': { transform: 'translate3d(1px, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        iconDrift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(-2deg)' },
          '50%': { transform: 'translate3d(0, -16px, 0) rotate(2deg)' },
        },
      },
      animation: {
        floaty: 'floaty 5.5s ease-in-out infinite',
        idle: 'idle 6.5s ease-in-out infinite',
        shimmer: 'shimmer 2.2s ease-in-out infinite',
        microShake: 'microShake 0.28s linear 1',
        iconDrift: 'iconDrift 7.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

