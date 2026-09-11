/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}', './src/lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fbf9f5',
        brand: {
          50: '#f0fdfc',
          100: '#ccfbf1',
          500: '#00a896',
          600: '#008b8b',
          900: '#0b1f3f',
          950: '#071328',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 40px -15px rgba(11, 31, 63, 0.05)',
        float: '0 15px 30px -10px rgba(0, 168, 150, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
