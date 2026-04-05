module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          50: '#fff5f5',
          100: '#fed7d7',
          200: '#fc8181',
          300: '#f56565',
          400: '#ed8936',
          500: '#e53e3e',
          600: '#c53030',
          700: '#9b2c2c',
          800: '#742a2a',
          900: '#5a2323',
        }
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-red': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
