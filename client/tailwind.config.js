/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'title-lg': '2.25rem', // 36px
        'title-md': '1.875rem', // 30px
        'title-sm': '1.5rem', // 24px

        'label-lg': '1.25rem', // 20px
        'label-md': '1rem', // 16px
        'label-sm': '0.875rem', // 14px

        'paragraph-lg': '1rem', // 16px
        'paragraph-md': '0.875rem', // 14px
        'paragraph-sm': '0.75rem', // 12px

        'button': '1rem', // 16px
      },
    },
  },
  plugins: [],
}

