import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-xl no-underline text-neutral-200 items-center p-4 border transition-colors duration-150 overflow-hidden`};

    background: var(--panel-background);
    border-color: var(--panel-border);

    ${(props) =>
        props.$hoverable !== false &&
        `
            &:hover {
                border-color: var(--panel-border-strong);
                background: var(--panel-background-strong);
            }
        `};

    & .icon {
        ${tw`rounded-xl w-12 h-12 flex items-center justify-center p-3`};
        background: var(--panel-highlight);
        border: 1px solid rgba(0, 191, 207, 0.24);
    }
`;
