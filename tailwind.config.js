/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/main/webapp/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        // 1. Primary: Green Growth (Learning Progress) - Duolingo Style
        primary: {
          DEFAULT: '#58CC02', // Main green
          hover: '#46A302', // Hover state
          light: '#D7FFB8', // Light background
          shadow: '#46A302', // 3D shadow
          dark: '#3a8a01', // Dark variant
        },

        // 2. Secondary: Golden Gamification (Streak/Crown/VIP)
        secondary: {
          DEFAULT: '#FFC800', // Honey yellow
          hover: '#E5B400', // Hover state
          shadow: '#D6A800', // 3D shadow
          light: '#FFF8D6', // Light background
        },

        // 3. Semantic Colors
        success: {
          DEFAULT: '#58CC02', // Green for correct
          hover: '#46A302',
          light: '#D7FFB8',
        },
        error: {
          DEFAULT: '#FF4B4B', // Coral red for wrong
          hover: '#EA2B2B',
          shadow: '#EA2B2B',
          light: '#FFE5E5',
        },
        warning: {
          DEFAULT: '#FFC800', // Yellow
          hover: '#E6B400',
          light: '#FFF8D6',
        },
        info: {
          DEFAULT: '#1CB0F6', // Sky blue
          hover: '#0E8FD6',
          shadow: '#0E8FD6',
          light: '#E0F5FF',
        },

        // 4. Neutral (Soft & Friendly)
        neutral: {
          50: '#F7F9FB', // Page background (soft gray-blue)
          100: '#E5E5E5', // Light border
          200: '#CFD9DE', // Input border / separator
          400: '#AFBCC5', // Secondary text / disabled
          600: '#777777', // Body text
          800: '#3C3C3C', // Heading (NOT pure black)
        },
      },

      // 5. Box Shadows - 3D Buttons & Soft Cards
      boxShadow: {
        'btn-primary': '0 4px 0 #46A302', // Green 3D shadow
        'btn-secondary': '0 4px 0 #D6A800', // Yellow 3D shadow
        'btn-error': '0 4px 0 #EA2B2B', // Red 3D shadow
        'btn-info': '0 4px 0 #0E8FD6', // Blue 3D shadow

        card: '0 2px 4px rgba(0,0,0,0.05)', // Subtle card shadow
        'card-hover': '0 4px 12px rgba(0,0,0,0.1)', // Card hover

        lift: '0 8px 24px rgba(88, 204, 2, 0.15)', // Green lift effect
        'lift-yellow': '0 8px 24px rgba(255, 200, 0, 0.15)', // Yellow lift
      },

      // 6. Border Radius - Friendly & Rounded
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },

      // 7. Animations - Gamification Effects
      animation: {
        'streak-pulse': 'streak-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce-soft 1s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-in',
        confetti: 'confetti 0.5s ease-out',
      },
      keyframes: {
        'streak-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.8',
          },
        },
        'bounce-soft': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        confetti: {
          '0%': {
            transform: 'translateY(0) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100px) rotate(360deg)',
            opacity: '0',
          },
        },
      },

      // 8. Font Family - Friendly Nunito
      fontFamily: {
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight để không conflict với Ant Design
  },
};
