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
        --panel-page: #080f17;
        --panel-background: #0d1721;
        --panel-background-strong: #111c27;
        --panel-background-muted: #162330;
        --panel-border: #223241;
        --panel-border-strong: #315063;
        --panel-highlight: rgba(0, 191, 207, 0.12);
        --panel-text: #e7eef4;
        --panel-muted: #91a3b2;
        --panel-accent: #00bfcf;
        --panel-accent-hover: #20ccd9;
        --panel-accent-soft: #71e3ec;
        --panel-danger: #ef6a78;
        --panel-success: #35c884;
    }

    html, body, #app {
        min-height: 100%;
    }

    body {
        ${tw`font-sans text-neutral-200`};
        letter-spacing: 0.005em;
        background: var(--panel-page);
        color: var(--panel-text);
        overflow-x: hidden;
    }

    #app {
        background: var(--panel-page);
    }

    #app::before {
        content: '';
        position: fixed;
        inset: 0 0 auto 0;
        height: 1px;
        background: rgba(0, 191, 207, 0.42);
        pointer-events: none;
        z-index: 100;
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

    a, button, input, textarea, select {
        -webkit-tap-highlight-color: transparent;
    }

    a:focus-visible,
    button:focus-visible,
    [role='button']:focus-visible {
        outline: 2px solid var(--panel-accent);
        outline-offset: 2px;
    }

    ::selection {
        background: rgba(0, 191, 207, 0.28);
        color: #f5fbff;
    }

    form {
        ${tw`m-0`};
    }

    hr {
        border-color: var(--panel-border);
    }

    code, pre {
        border: 1px solid var(--panel-border);
        background: #071019;
        color: #cceff2;
    }

    table {
        border-collapse: separate;
        border-spacing: 0;
    }

    [data-page-shell] {
        min-height: calc(100vh - 4.5rem);
    }

    [data-page-heading] {
        border-bottom: 1px solid var(--panel-border);
        padding-bottom: 1rem;
    }

    [data-page-heading] h1 {
        color: var(--panel-text);
    }

    [data-page-heading] p {
        color: var(--panel-muted);
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
        background: #334656;
        border: solid transparent;
        border-right-width: 4px;
        border-left-width: 4px;
        background-clip: padding-box;
        border-radius: 9999px;
    }

    ::-webkit-scrollbar-track-piece {
        margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-right-width: 0;
        border-left-width: 0;
        border-top-width: 4px;
        border-bottom-width: 4px;
        border-radius: 9999px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
`;
