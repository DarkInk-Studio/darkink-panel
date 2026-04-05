import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';

export interface Props {
    isLight?: boolean;
    hasError?: boolean;
}

const light = css<Props>`
    color: #eff7fb;
    background: linear-gradient(180deg, rgba(18, 31, 41, 0.94) 0%, rgba(12, 22, 30, 0.88) 100%);
    border-color: rgba(137, 161, 172, 0.18);
    &:focus {
        ${tw`border-primary-400`}
    }

    &:disabled {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(137, 161, 172, 0.14);
        color: rgba(232, 240, 246, 0.72);
    }
`;

const checkboxStyle = css<Props>`
    ${tw`cursor-pointer appearance-none inline-block align-middle select-none flex-shrink-0 w-4 h-4 text-primary-400 border rounded-sm`};
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(137, 161, 172, 0.28);
    color-adjust: exact;
    background-origin: border-box;
    transition: all 75ms linear, box-shadow 25ms linear;

    &:checked {
        ${tw`border-transparent bg-no-repeat bg-center`};
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-color: currentColor;
        background-size: 100% 100%;
    }

    &:focus {
        ${tw`outline-none border-primary-300`};
        box-shadow: 0 0 0 1px rgba(9, 103, 210, 0.25);
    }
`;

const inputStyle = css<Props>`
    resize: none;
    ${tw`appearance-none outline-none w-full min-w-0`};
    ${tw`p-3 border rounded-xl text-sm transition-all duration-150`};
    ${tw`hover:border-neutral-400 text-neutral-200 shadow-none focus:ring-0`};
    background: linear-gradient(180deg, rgba(18, 31, 41, 0.94) 0%, rgba(12, 22, 30, 0.88) 100%);
    border-color: rgba(137, 161, 172, 0.18);
    backdrop-filter: blur(10px);

    & + .input-help {
        ${tw`mt-1 text-xs`};
        ${(props) => (props.hasError ? tw`text-red-200` : tw`text-neutral-300`)};
    }

    &:required,
    &:invalid {
        ${tw`shadow-none`};
    }

    &:not(:disabled):not(:read-only):focus {
        ${tw`shadow-md border-primary-300 ring-2 ring-primary-400 ring-opacity-30`};
        ${(props) => props.hasError && tw`border-red-300 ring-red-200`};
    }

    &:disabled {
        ${tw`opacity-75`};
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
