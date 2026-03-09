/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        body: ['"Cabinet Grotesk"', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0A0A0F',
          50: '#F0F0F5',
          100: '#E0E0EB',
          200: '#C1C1D6',
          300: '#9191B8',
          400: '#61619A',
          500: '#41417C',
          600: '#2E2E5A',
          700: '#1E1E3E',
          800: '#14142C',
          900: '#0A0A1E',
        },
        volt: '#C8FF00',
        coral: '#FF4D6D',
        azure: '#00C2FF',
        mint: '#00FFB3',
        amber: '#FFB800',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    }
  },
  plugins: []
}
