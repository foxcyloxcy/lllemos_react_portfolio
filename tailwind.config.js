/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.js,ts,jsx,tsx",
    "./src/components/**.js,ts,jsx,tsx",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backdropFilter: ['hover', 'focus'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  safelist: [
    'bg-slate-800',
    'bg-sky-300',
    'text-yellow-300',
    'text-orange-700',
  ]
}