import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`w-full overflow-x-auto`};
    background: var(--panel-background);
    border-bottom: 1px solid var(--panel-border);

    & > div {
        ${tw`flex items-center text-sm mx-auto px-2`};
        max-width: 1440px;

        & > a,
        & > div {
            ${tw`inline-block py-3 px-4 text-neutral-300 no-underline whitespace-nowrap transition-colors duration-150`};

            &:not(:first-of-type) {
                ${tw`ml-2`};
            }

            &:hover {
                ${tw`text-neutral-100`};
            }

            &:active,
            &.active {
                ${tw`text-neutral-100`};
                color: ${theme`colors.cyan.300`.toString()};
                border-bottom: 2px solid ${theme`colors.cyan.500`.toString()};
            }
        }
    }
`;

export default SubNavigation;
