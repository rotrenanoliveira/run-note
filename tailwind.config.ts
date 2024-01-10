import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'runnote-gray-900': '#111315',
        'runnote-gray-700': '#1D1D1D',
        'runnote-gray-50': '#FCFCFC',
        'runnote-red': '#D42849',
        'runnote-green-50': '#BCE7B7',
        'runnote-green-300': '#30A46C',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
