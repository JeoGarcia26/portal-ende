/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Todas as cores apontam para variáveis CSS definidas em
        // src/styles/_tokens.scss. Edita esse ficheiro e todo o
        // portal reflecte a mudança automaticamente.
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
        },
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          alt: 'rgb(var(--color-surface-alt) / <alpha-value>)',
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.05), 0 1px 0 0 rgb(0 0 0 / 0.03), 0 8px 24px -12px rgb(20 21 23 / 0.12)',
        'card-hover': '0 4px 8px rgb(0 0 0 / 0.06), 0 16px 36px -8px rgb(20 21 23 / 0.18)',
        bar: '0 1px 0 0 rgb(0 0 0 / 0.05)',
        'inset-line': 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-bolt': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
      },
      animation: {
        'fade-in': 'fade-in .35s cubic-bezier(.16,1,.3,1) both',
        'pulse-bolt': 'pulse-bolt 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
