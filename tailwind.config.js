/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            'titles': ['Nunito', 'sans-serif'],
            'texts': ['Cabin', 'sans-serif'],
            'secondary': ['Raleway', 'sans-serif']
        },
        colors: {
            'c-primary': '#009ACD',
            'c-back': '#1E1E1E',
            'c-secondary': '#FF6347',
            'c-gris': '#808080'
        },
        transitionDuration: {
            '0': '0ms',
            '200': '200ms',
            '400': '400ms',
            '300': '300ms',
            '500': '500ms',
            '600': '600ms',
          },
          transformOrigin: {
            'top-y': 'center top',
          },
      },
    },
    plugins: [],
  }