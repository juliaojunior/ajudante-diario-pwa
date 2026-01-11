import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gradiente principal (Roxo Lilás → Quase Preto)
        'gradient-start': '#B794F6',
        'gradient-end': '#1A1A1A',
        
        // Glassmorphism
        'glass-bg': 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
        'glass-shadow': 'rgba(0, 0, 0, 0.3)',
        
        // Texto
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        
        // Cores funcionais (mantidas do original para acessibilidade)
        'senior-blue': '#0056D2',
        'senior-yellow': '#F9A825',
        'senior-red': '#D32F2F',
        
        // Aliases semânticos
        primary: '#0056D2',
        secondary: '#F9A825',
        destructive: '#D32F2F',
      },
      fontFamily: {
        display: ['Lexend', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.875rem',   // 14px
        'sm': '1rem',       // 16px
        'base': '1.125rem', // 18px
        'lg': '1.25rem',    // 20px
        'xl': '1.5rem',     // 24px
        '2xl': '2rem',      // 32px
        '3xl': '2.5rem',    // 40px
        '4xl': '3rem',      // 48px
        '5xl': '5rem',      // 80px (timer)
      },
      borderRadius: {
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'neomorph': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
      },
    },
  },
  plugins: [],
};

export default config;
