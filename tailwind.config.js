const colors = require('tailwindcss/colors');

const gray = {
    50: '#edf4f7',
    100: '#d8e5ea',
    200: '#b7cbd3',
    300: '#8eaab7',
    400: '#688391',
    500: '#425c69',
    600: '#293d49',
    700: '#182833',
    800: '#0f1a24',
    900: '#091119',
};

module.exports = {
    content: [
        './resources/scripts/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"IBM Plex Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
                header: ['"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
            },
            colors: {
                black: '#071018',
                // "primary" and "neutral" are deprecated, prefer the use of "blue" and "gray"
                // in new code.
                primary: colors.cyan,
                gray: gray,
                neutral: gray,
                cyan: colors.cyan,
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            boxShadow: {
                panel: '0 24px 60px rgba(0, 0, 0, 0.38)',
                glow: '0 0 0 1px rgba(40, 208, 216, 0.12), 0 18px 44px rgba(0, 0, 0, 0.32)',
            },
            transitionDuration: {
                250: '250ms',
            },
            borderColor: theme => ({
                default: theme('colors.neutral.400', 'currentColor'),
            }),
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ]
};
