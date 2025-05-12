// src/styles/designSystem.ts
/**
 * Design System for Flipper Zero Shop
 * This file defines the core design elements including colors, typography,
 * spacing, and other visual elements for a consistent look and feel.
 */

// Color palette - Cyberpunk-inspired with neon accents
export const colors = {
    // Primary brand colors
    primary: {
        purple: '#8B5CF6',     // Main brand color - Vibrant purple
        purpleDark: '#6D28D9', // Darker shade for hover states
        purpleLight: '#A78BFA', // Lighter shade for backgrounds
    },

    // Secondary brand colors
    secondary: {
        cyan: '#06B6D4',       // Electric cyan for accents
        cyanDark: '#0891B2',   // Darker shade
        cyanLight: '#67E8F9',  // Lighter shade
    },

    // Background colors
    background: {
        dark: '#0F172A',       // Main dark background
        darker: '#080F1E',     // Darker panels
        medium: '#1E293B',     // Medium panels
        light: '#334155',      // Light panels
        card: '#1A1F2C',       // Card background
    },

    // Text colors
    text: {
        primary: '#F8FAFC',    // Primary text color
        secondary: '#CBD5E1',  // Secondary text color
        muted: '#94A3B8',      // Muted text color
        link: '#A78BFA',       // Link text color
    },

    // UI elements
    ui: {
        border: '#334155',     // Border color
        divider: '#1E293B',    // Divider color
        focus: '#8B5CF6',      // Focus ring color
        hover: 'rgba(139, 92, 246, 0.1)', // Hover state background
    },

    // Functional colors
    success: '#10B981',      // Success color
    error: '#EF4444',        // Error color
    warning: '#F59E0B',      // Warning color
    info: '#3B82F6',         // Info color

    // Gradient presets
    gradients: {
        purple: 'linear-gradient(to right, #8B5CF6, #6D28D9)',
        purpleCyan: 'linear-gradient(to right, #8B5CF6, #06B6D4)',
        cyanPurple: 'linear-gradient(to right, #06B6D4, #8B5CF6)',
        dark: 'linear-gradient(to bottom, #0F172A, #080F1E)',
    },
};

// Typography system
export const typography = {
    fontFamily: {
        heading: '"Montserrat", sans-serif',
        body: '"Open Sans", sans-serif',
        mono: '"Roboto Mono", monospace',
    },

    // Font sizes with both rem and px values for reference
    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
    },

    // Font weights
    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    // Line heights
    lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },

    // Letter spacing
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
};

// Spacing system based on 4px grid
export const spacing = {
    0: '0',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem',      // 384px
};

// Shadow system
export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(139, 92, 246, 0.5)',
    glow: '0 0 15px rgba(139, 92, 246, 0.5)',
    neonPurple: '0 0 10px #8B5CF6, 0 0 20px rgba(139, 92, 246, 0.5)',
    neonCyan: '0 0 10px #06B6D4, 0 0 20px rgba(6, 182, 212, 0.5)',
};

// Border radius system
export const borderRadius = {
    none: '0',
    sm: '0.125rem',   // 2px  
    md: '0.25rem',    // 4px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',   // Circle/pill
};

// Z-index system to prevent z-index wars
export const zIndex = {
    auto: 'auto',
    0: '0',
    10: '10',     // Base elements
    20: '20',     // Dropdown menus
    30: '30',     // Fixed navigation
    40: '40',     // Modal backdrop
    50: '50',     // Modal content
    60: '60',     // Tooltips
};

// Animations
export const animations = {
    duration: {
        faster: '100ms',
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        slower: '700ms',
    },
    easing: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    keyframes: {
        fadeIn: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `,
        pulse: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `,
        glow: `
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8); }
          100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
        }
      `,
        float: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `,
    },
};

// Export all design tokens as a unified system
export const designSystem = {
    colors,
    typography,
    spacing,
    shadows,
    borderRadius,
    zIndex,
    animations,
};

export default designSystem;