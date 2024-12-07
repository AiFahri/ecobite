import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#173302",
                secondary: "#8E8E8E",
            },
            fontFamily: {
                sans: ["Outfit", ...defaultTheme.fontFamily.sans],
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
