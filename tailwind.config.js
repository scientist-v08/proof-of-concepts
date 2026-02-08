/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: [
        './apps/crackers/src/**/*.{ts,html}',
        './apps/crackers/src/index.html',
        './apps/astrology/src/**/*.{ts,html}',
    ],
    theme: {
        extend: {
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                inter: ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                lexend: ['Lexend', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
