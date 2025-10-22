module.exports = {
  // NOTE: update this to include all paths to your files
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Based on your designs
        'background': '#191716', // Dark background
        'card': '#191716 · 50%',       // Slightly lighter card background
        'primary': '#1496DC',     // Blue accent
        'text': '#E0E2DB',
        'text-secondary': '#AFABA6',
        'red-accent': '#DC143C',
        'coin': '#FAA600',
        'gem': '#1496DC',
      }
    },
  },
  plugins: [],
};
