// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			}
		},
		extend: {
			colors: {
				// Core UI colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: 'hsl(var(--secondary-light))',
					dark: 'hsl(var(--secondary-dark))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
				// Enhanced brand colors
				flipper: {
					purple: '#8B5CF6',
					purpleDark: '#6D28D9',
					purpleLight: '#A78BFA',
					cyan: '#06B6D4',
					cyanDark: '#0891B2',
					cyanLight: '#67E8F9',
					dark: '#0F172A',
					darker: '#080F1E',
					medium: '#1E293B',
					light: '#334155',
					card: '#1A1F2C',
					success: '#10B981',
					danger: '#EF4444',
					warning: '#F59E0B',
					info: '#3B82F6',
					gray: '#CBD5E1',
				},
			},
			fontFamily: {
				'sans': ['Open Sans', 'sans-serif'],
				'heading': ['Montserrat', 'sans-serif'],
				'mono': ['Roboto Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				"pulse": {
					"0%, 100%": { opacity: '1' },
					"50%": { opacity: '0.5' },
				},
				"float": {
					"0%, 100%": { transform: 'translateY(0)' },
					"50%": { transform: 'translateY(-10px)' },
				},
				"glow": {
					"0%, 100%": { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)' },
					"50%": { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)' },
				},
				"shimmer": {
					"100%": { backgroundPosition: "200% 0" },
				},
				"text-gradient": {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"float": "float 3s ease-in-out infinite",
				"glow": "glow 2s ease-in-out infinite",
				"shimmer": "shimmer 2s infinite linear",
				"text-gradient": "text-gradient 3s ease infinite",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"cyberpunk-grid": "linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
				"cyber-glow": "linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.4) 100%)",
				"shimmer": "linear-gradient(to right, #8B5CF6 0%, #06B6D4 20%, #8B5CF6 40%, #8B5CF6 100%)",
				"text-gradient": "linear-gradient(-45deg, #8B5CF6, #06B6D4, #8B5CF6)",
			},
			boxShadow: {
				'neon-purple': '0 0 5px rgba(139, 92, 246, 0.3), 0 0 10px rgba(139, 92, 246, 0.2)',
				'neon-cyan': '0 0 5px rgba(6, 182, 212, 0.3), 0 0 10px rgba(6, 182, 212, 0.2)',
				'card-hover': '0 0 0 1px rgba(139, 92, 246, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)',
			},
			backgroundSize: {
				"200%": "200% auto",
				"cyberpunk-grid": "30px 30px",
			},
			transitionProperty: {
				'height': 'height',
				'width': 'width',
				'spacing': 'margin, padding',
			},
			transitionTimingFunction: {
				'bounce-in': 'cubic-bezier(0.17, 0.67, 0.83, 0.67)',
			},
			transitionDuration: {
				'400': '400ms',
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography'),
		function ({ addUtilities }) {
			const newUtilities = {
				'.text-gradient': {
					'background-clip': 'text',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'color': 'transparent',
					'backgroundSize': '200% auto',
					'animation': 'text-gradient 3s ease infinite',
				},
				'.bg-glass': {
					'background': 'rgba(30, 41, 59, 0.5)',
					'backdrop-filter': 'blur(8px)',
					'border': '1px solid rgba(255, 255, 255, 0.1)',
				},
				'.bg-cyberpunk': {
					'background-image': 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
					'background-size': '100% 100%, 30px 30px, 30px 30px',
				},
				'.text-outlined': {
					'text-shadow': '-1px -1px 0 rgba(139, 92, 246, 0.5), 1px -1px 0 rgba(139, 92, 246, 0.5), -1px 1px 0 rgba(139, 92, 246, 0.5), 1px 1px 0 rgba(139, 92, 246, 0.5)',
				},
			};
			addUtilities(newUtilities);
		},
	],
} satisfies Config;