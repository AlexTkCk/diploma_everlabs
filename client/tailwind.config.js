/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "title-lg": "2.25rem", // 36px
        "title-md": "1.875rem", // 30px
        "title-sm": "1.5rem", // 24px

        "label-lg": "1.25rem", // 20px
        "label-md": "1rem", // 16px
        "label-sm": "0.875rem", // 14px

        "paragraph-lg": "1rem", // 16px
        "paragraph-md": "0.875rem", // 14px
        "paragraph-sm": "0.75rem", // 12px

        button: "2rem", // 32px
      },
      boxShadow: {
        "neon-green":
          "0 0 2px #fff,inset 0 0 2px #fff,0 0 5px #0f8,0 0 15px #0f8,0 0 30px #0f8",
        "neon-red":
          "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #f00, 0 0 15px #f00, 0 0 30px #f00",
        "neon-blue":
          "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #00f, 0 0 15px #00f, 0 0 30px #00f",
        "neon-yellow":
          "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #ff0, 0 0 15px #ff0, 0 0 30px #ff0",
        "neon-inner": "inset 0 0 10px #00ff00, inset 0 0 20px #00ff00",

        buttonHover_md: "inset 6.5em 0 0 0",
        buttonHover_lg: "inset 10em 0 0 0",
      },
      backgroundColor: {
        cyan: "#7DE2D1",
      },
      fontFamily: {
        primary: ['"Share Tech Mono"'],
        secondary: ['"Anonymous Pro"'],
      },
      backgroundImage: {
        account: "url('/src/assets/account_bg.png')",
      },
      keyframes: {
        speed: {
          "0%": { paddingLeft: "100%", opacity: 0 },
          "75%": { opacity: 1 },
          "100%": { paddingLeft: "0", opacity: 0 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
