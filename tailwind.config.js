/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.js,ts,jsx,tsx",
    "./src/components/**.js,ts,jsx,tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-slate-800',
    'bg-sky-300',
    'text-yellow-600',
    'text-orange-700',
  ]
}