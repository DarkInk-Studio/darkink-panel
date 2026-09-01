import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';

export interface Props {
    isLight?: boolean;
    hasError?: boolean;
}

const light = css<Props>`
    color: #eff7fb;
    background: var(--panel-background-strong);
    border-color: var(--panel-border);
    &:focus {
        ${tw`border-primary-400`}
    }

    &:disabled {
        background: var(--panel-background);
        border-color: var(--panel-border);
        color: rgba(232, 240, 246, 0.72);
    }
`;

const checkboxStyle = css<Props>`
    ${tw`cursor-pointer appearance-none inline-block align-middle select-none flex-shrink-0 w-4 h-4 text-primary-400 border rounded-sm`};
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(137, 161, 172, 0.28);
    color-adjust: exact;
    background-origin: border-box;
    transition: border-color 75ms linear, background-color 75ms linear;

    &:checked {
        ${tw`border-transparent bg-no-repeat bg-center`};
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-color: currentColor;
        background-size: 100% 100%;
    }

    &:focus {
        ${tw`outline-none border-primary-300`};
        box-shadow: none;
    }
`;

const inputStyle = css<Props>`
    resize: none;
    ${tw`appearance-none outline-none w-full min-w-0`};
    ${tw`p-3 border rounded-xl text-sm transition-colors duration-150`};
    ${tw`hover:border-neutral-400 text-neutral-200 shadow-none focus:ring-0`};
    background: var(--panel-background-strong);
    border-color: var(--panel-border);

    & + .input-help {
        ${tw`mt-1 text-xs`};
        ${(props) => (props.hasError ? tw`text-red-200` : tw`text-neutral-300`)};
    }

    &:required,
    &:invalid {
        ${tw`shadow-none`};
    }

    &:not(:disabled):not(:read-only):focus {
        ${tw`shadow-none border-primary-400`};
        ${(props) => props.hasError && tw`border-red-300`};
    }

    &:disabled {
        ${tw`opacity-60 cursor-not-allowed`};
    }

    ${(props) => props.isLight && light};
    ${(props) => props.hasError && tw`text-red-100 border-red-400 hover:border-red-300`};
`;

const Input = styled.input<Props>`
    &:not([type='checkbox']):not([type='radio']) {
        ${inputStyle};
    }

    &[type='checkbox'],
    &[type='radio'] {
        ${checkboxStyle};

        &[type='radio'] {
            ${tw`rounded-full`};
        }
    }
`;
const Textarea = styled.textarea<Props>`
    ${inputStyle}
`;

export { Textarea };
export default Input;
