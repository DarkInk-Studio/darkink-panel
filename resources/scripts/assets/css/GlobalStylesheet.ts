import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';
// @ts-expect-error untyped font file
import font from '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-display: swap;
        font-weight: 100 700;
        src: url(${font}) format('woff2-variations');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
    }

    :root {
        color-scheme: dark;
        --panel-background: rgba(11, 20, 29, 0.78);
        --panel-background-strong: rgba(14, 26, 36, 0.94);
        --panel-border: rgba(130, 190, 204, 0.14);
        --panel-highlight: rgba(40, 208, 216, 0.22);
        --panel-text: #e8f0f6;
        --panel-muted: #89a1ac;
        --panel-accent: #28d0d8;
        --panel-accent-soft: #7cecf0;
    }

    html, body, #app {
        min-height: 100%;
    }

    body {
        ${tw`font-sans text-neutral-200`};
        letter-spacing: 0.015em;
        background:
            radial-gradient(circle at top left, rgba(40, 208, 216, 0.14), transparent 28%),
            radial-gradient(circle at 85% 12%, rgba(255, 255, 255, 0.09), transparent 18%),
            linear-gradient(180deg, #0a1118 0%, #091119 45%, #071018 100%);
        color: var(--panel-text);
        overflow-x: hidden;
    }

    body::before,
    body::after {
        content: '';
        position: fixed;
        inset: auto;
        width: 28rem;
        height: 28rem;
        border-radius: 9999px;
        pointer-events: none;
        filter: blur(90px);
        opacity: 0.18;
        z-index: -1;
    }

    body::before {
        top: -8rem;
        left: -10rem;
        background: #28d0d8;
    }

    body::after {
        right: -10rem;
        bottom: -10rem;
        background: #6e8498;
    }

    h1, h2, h3, h4, h5, h6 {
        ${tw`font-medium tracking-normal font-header`};
    }

    p {
        ${tw`text-neutral-200 leading-snug font-sans`};
    }

    a {
        color: inherit;
    }

    ::selection {
        background: rgba(40, 208, 216, 0.28);
        color: #f5fbff;
    }

    form {
        ${tw`m-0`};
    }

    textarea, select, input, button, button:focus, button:focus-visible {
        ${tw`outline-none`};
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield !important;
    }

    /* Scroll Bar Style */
    ::-webkit-scrollbar {
        background: none;
        width: 16px;
        height: 16px;
    }

    ::-webkit-scrollbar-thumb {
        border: solid 0 rgb(0 0 0 / 0%);
        border-right-width: 4px;
        border-left-width: 4px;
        -webkit-border-radius: 9px 4px;
        -webkit-box-shadow: inset 0 0 0 1px rgba(136, 161, 172, 0.55), inset 0 0 0 4px rgba(15, 26, 36, 0.9);
    }

    ::-webkit-scrollbar-track-piece {
        margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-right-width: 0;
        border-left-width: 0;
        border-top-width: 4px;
        border-bottom-width: 4px;
        -webkit-border-radius: 4px 9px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
`;
