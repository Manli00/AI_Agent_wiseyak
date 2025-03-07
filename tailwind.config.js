// tailwind.config.js - Add these animation configurations to your existing config
module.exports = {
    // ... your existing config
    theme: {
      extend: {
        // ... your existing extensions
        keyframes: {
          slideInChat: {
            '0%': { transform: 'translateY(100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          slideOutChat: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(100%)', opacity: '0' }
          },
          bounceInChat: {
            '0%': { transform: 'scale(0.5)', opacity: '0' },
            '70%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)', opacity: '1' }
          },
          fadeInChat: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          pulseButton: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' }
          }
        },
        animation: {
          slideInChat: 'slideInChat 0.4s ease-out forwards',
          slideOutChat: 'slideOutChat 0.3s ease-in forwards',
          bounceInChat: 'bounceInChat 0.5s ease-out forwards',
          fadeInChat: 'fadeInChat 0.4s ease-out forwards',
          fadeIn: 'fadeIn 0.3s ease-out forwards',
          pulseButton: 'pulseButton 2s infinite'
        }
      }
    }
  }