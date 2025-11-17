/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-sidebar-right': 'var(--bg-sidebar-right)',
        'bg-topbar': 'var(--bg-topbar)',
        'bg-hover': 'var(--bg-hover)',
        'bg-card': 'var(--bg-card)',
        'border-color': 'var(--border-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-topbar': 'var(--text-topbar)',
        'accent-primary': 'var(--accent-primary)',
        'accent-hover': 'var(--accent-hover)',
        'accent-gold': 'var(--accent-gold)',
        // Keep old colors for backward compatibility
        'spotify-black': '#121212',
        'spotify-dark': '#181818',
        'spotify-gray': '#282828',
        'spotify-light-gray': '#3e3e3e',
        'spotify-text': '#ffffff',
        'spotify-text-dim': '#c0c0c0',
        'spotify-green': '#4a7c59',
        'spotify-green-hover': '#5a8c69',
        'premium-gold': '#d4af37',
        'premium-gold-light': '#f4e4bc',
        'premium-gold-dark': '#b8941f',
        'elegant-border': '#505050',
        'elegant-hover': '#2a2a2a',
      },
      fontFamily: {
        'serif': ['Garamond', 'Baskerville', 'Georgia', 'Times New Roman', 'serif'],
        'heading': ['Garamond', 'Baskerville', 'Georgia', 'serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'elegant-lg': '0 8px 30px rgba(0, 0, 0, 0.6)',
        'premium': '0 2px 10px rgba(54, 85, 57, 0.3)',
      },
    },
  },
  plugins: [],
}

