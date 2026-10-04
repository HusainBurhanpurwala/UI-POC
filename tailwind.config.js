/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F3EE',
        blush: '#EAD1D5',
        'dusty-rose': '#C98291',
        'deep-rose': '#9E4F60',
        burgundy: '#5C1724',
        wine: '#300B13',
        'almost-black': '#12090B',
        'warm-white': '#FFFDFC',
        'accent-red': '#8B1E2D',
        ink: '#201719',
      },
      fontFamily: {
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        handwritten: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        devanagari: ['"Rozha One"', '"Tiro Devanagari Hindi"', '"Noto Serif Devanagari"', 'serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.99)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.12)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.08)' },
          '70%': { transform: 'scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
