/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        "steal-inner-shadow": "inset 0 2px 4px -2px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        launch: {
          "0%": { transform: "translateY(150%)" },
          "100%": { transform: "translateY(-150%)" },
        },
        flap: {
          "0%": { transform: "translate(0%, 0%)" },
          "100%": { transform: "translate(150%, -150%)" },
        },
        float: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0%)" },
        },
        recording: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        slide: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },

        "slide-1": {
          "0%": { transform: "translateX(-200%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        launch: "launch 1s linear infinite",
        flap: "flap 1s linear",
        float: "float 2s ease-in-out infinite",
        recording: "recording 2s linear infinite",
        slide: "slide 5s linear infinite",
        "slide-1": "slide-1 20s linear infinite",
      },
      colors: {
        primary: "#5A708C",
        primaryDark: "#273D59",
        primaryLight: "#ccd9e6",
        primary50: "#eaf3fc",
        primary100: "#ccd9e6",
        primary700: "#273d59",
        primary600: "#37557b",
        accent: "#33FFDA",
        accentDark: "#91D9CC",
        accent800: "#318575",
        accent50: "#d8fff5",
      },
    },
  },
  plugins: [],
};
