const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                lexend: ['Lexend', 'sans-serif'],
            },
        },
    },
    content: [
        join(__dirname, 'src/**/*.{html,ts}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
};
