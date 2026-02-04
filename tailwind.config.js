/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: ['./apps/forms/src/app/*.{ts,html}', './apps/forms/src/index.html'],
    theme: {
        extend: {
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                inter: ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
