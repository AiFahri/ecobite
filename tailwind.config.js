import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
        './resources/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                outfit: ["Outfit", "sans-serif"],
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
          const newUtilities = {
            ".no-scrollbar::-webkit-scrollbar": {
              display: "none",
            },
            ".noscrollbar": {
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            },
          };
          addUtilities(newUtilities);
        },
    ],
};
