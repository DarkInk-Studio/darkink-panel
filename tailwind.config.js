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

const cyan = {
    50: '#e8fcfd',
    100: '#c4f6f8',
    200: '#8cecf1',
    300: '#52dfe7',
    400: '#20ccd9',
    500: '#00bfcf',
    600: '#009baa',
    700: '#087b88',
    800: '#0d626c',
    900: '#104f57',
};

module.exports = {
    content: ['./resources/scripts/**/*.{js,ts,tsx}'],
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
                primary: cyan,
                gray,
                neutral: gray,
                cyan,
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            transitionDuration: {
                250: '250ms',
            },
            borderColor: (theme) => ({
                default: theme('colors.neutral.400', 'currentColor'),
            }),
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
