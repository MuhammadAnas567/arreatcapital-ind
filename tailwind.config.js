/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        dark: "#071418",
        olive: "#0F242C",
        capabilities: "#050F13",
        cream: "#F3EADF",
        gold: "#D4B37A",
        "gold-border": "#C49A5E",
        jade: "#1B3A40",
        white: "#FFFFFF",
      },
      fontFamily: {
        hero: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'hero-body': ['"Sora"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Sora"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-.04em',
        widest: '.08em',
      },
      lineHeight: {
        tight: '0.87',
      },
      maxWidth: {
        design: '1200px',
      },
      spacing: {
        navbar: '56px',
        'hero-nav': '100px',
        18: '4.5rem',
        22: '5.5rem',
        24: '6rem',
      },
      scrollMargin: {
        navbar: '56px',
        hero: '100px',
      },
      height: {
        hero: '684px',
        'hero-nav': '100px',
        'partner-bar': '112px',
        navbar: '56px',
      },
      padding: {
        'hero-nav': '100px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'rule-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'soft-zoom': {
          '0%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'sheen': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1s ease both',
        'rule-grow': 'rule-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'soft-zoom': 'soft-zoom 22s ease-out forwards',
        'sheen': 'sheen 1.1s ease',
      },
    },
  },
  plugins: [],
}
