/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#050608",
        panel: "#0d1117",
        line: "#262b35",
        chalk: "#f4f0e8",
        muted: "#9da7b8",
        signal: "#4cd527",
        ember: "#ff7a59",
        violet: "#bca7ff",
      },
      boxShadow: {
        glow: "0 0 80px rgba(88, 215, 196, 0.16)",
      },
    },
  },
  plugins: [],
};
