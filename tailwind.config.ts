import { type Config } from "tailwindcss";


export default {
	darkMode: ["class"],
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist'], // GeistSans as the default font-sans
				serif: ['Instrument Serif', 'serif'], // Instrument_Serif as font-serif
			  },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {}
		}
	},
	plugins: [],
} satisfies Config;
