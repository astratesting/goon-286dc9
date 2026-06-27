import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0807',
          900: '#0a0807',
          800: '#131110',
          700: '#1c1815',
          600: '#2a2420',
          500: '#3a322c',
        },
        flame: '#FF5A1F',
        magenta: '#FF2DA0',
        acid: '#B6FF3C',
        bone: '#F4EDE3',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'Archivo Black', 'system-ui', 'sans-serif'],
        sans: ['var(--font-satoshi)', 'Satoshi', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
