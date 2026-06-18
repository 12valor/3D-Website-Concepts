import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        ink: '#000000',
        muted: '#6F6F6F',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
