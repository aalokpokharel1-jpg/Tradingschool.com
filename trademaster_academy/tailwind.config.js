/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // slate-50
        ring: 'var(--color-ring)', // blue-800
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // slate-800
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-800
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // emerald-600
          foreground: 'var(--color-secondary-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100
          foreground: 'var(--color-muted-foreground)' // slate-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // orange-600
          foreground: 'var(--color-accent-foreground)' // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-800
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-800
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        surface: {
          DEFAULT: 'var(--color-surface)', // slate-100
          foreground: 'var(--color-surface-foreground)' // slate-800
        },
        trust: {
          DEFAULT: 'var(--color-trust)', // slate-900
          foreground: 'var(--color-trust-foreground)' // white
        },
        conversion: {
          DEFAULT: 'var(--color-conversion)', // red-600
          foreground: 'var(--color-conversion-foreground)' // white
        }
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        cta: ['Inter', 'sans-serif']
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'cta-semibold': '600',
        'mono-normal': '400'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      borderRadius: {
        'brand': '8px',
        'lg': '12px',
        'xl': '16px'
      },
      boxShadow: {
        'brand': '0 4px 20px rgba(30, 58, 138, 0.1)',
        'brand-lg': '0 10px 30px rgba(30, 58, 138, 0.15)',
        'float': '0 10px 30px rgba(30, 58, 138, 0.2)',
        'educational': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'interactive': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'achievement': '0 0 20px rgba(5, 150, 105, 0.6)'
      },
      animation: {
        'draw-path': 'drawPath 2.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s infinite',
        'conversion-pulse': 'conversionPulse 4s infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        drawPath: {
          'to': {
            'stroke-dashoffset': '0'
          }
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(5, 150, 105, 0.6)'
          },
          '50%': {
            'box-shadow': '0 0 30px rgba(5, 150, 105, 0.8)'
          }
        },
        conversionPulse: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.02)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      },
      backdropBlur: {
        'brand': '10px'
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        '400': '400ms'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}