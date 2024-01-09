/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/preline/preline.js'],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin'),],
};
