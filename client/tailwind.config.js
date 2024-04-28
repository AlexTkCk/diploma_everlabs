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
      boxShadow: {
        'neon': '0 0 2px #fff,inset 0 0 2px #fff,0 0 5px #0f8,0 0 15px #0f8,0 0 30px #0f8',
        'neon-inner': 'inset 0 0 10px #00ff00, inset 0 0 20px #00ff00, inset 0 0 30px #00ff00, inset 0 0 40px #00ff00, inset 0 0 70px #00ff00, inset 0 0 80px #00ff00, inset 0 0 100px #00ff00, inset 0 0 150px #00ff00',
      },
      fontFamily: {
        'primary': ['"Share Tech Mono"'],
        'secondary': ['"Anonymous Pro"']
      }
    }
    ,
  },
  plugins: [],
}

