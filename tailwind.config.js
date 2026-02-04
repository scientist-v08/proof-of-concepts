/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: ['./apps/crackers/src/**/*.{ts,html}', './apps/crackers/src/index.html'],
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
