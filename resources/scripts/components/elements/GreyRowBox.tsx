import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-2xl no-underline text-neutral-200 items-center p-5 border transition-all duration-150 overflow-hidden`};

    background: linear-gradient(180deg, rgba(15, 26, 36, 0.92) 0%, rgba(10, 18, 27, 0.84) 100%);
    border-color: var(--panel-border);
    box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(14px);

    ${(props) => props.$hoverable !== false && tw`hover:-translate-y-1`};

    ${(props) =>
        props.$hoverable !== false &&
        `
            &:hover {
                border-color: rgba(40, 208, 216, 0.24);
                box-shadow: 0 28px 64px rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(40, 208, 216, 0.1);
            }
        `};

    & .icon {
        ${tw`rounded-2xl w-16 h-16 flex items-center justify-center p-3`};
        background: linear-gradient(135deg, rgba(40, 208, 216, 0.18), rgba(255, 255, 255, 0.05));
        border: 1px solid rgba(40, 208, 216, 0.18);
    }
`;
