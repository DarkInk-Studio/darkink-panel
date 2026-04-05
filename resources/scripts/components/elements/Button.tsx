import React from 'react';
import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';
import Spinner from '@/components/elements/Spinner';

interface Props {
    isLoading?: boolean;
    size?: 'xsmall' | 'small' | 'large' | 'xlarge';
    color?: 'green' | 'red' | 'primary' | 'grey';
    isSecondary?: boolean;
}

const ButtonStyle = styled.button<Omit<Props, 'isLoading'>>`
    ${tw`relative inline-block rounded-xl p-2 uppercase tracking-[0.18em] text-sm transition-all duration-150 border font-semibold`};

    ${(props) =>
        ((!props.isSecondary && !props.color) || props.color === 'primary') &&
        css<Props>`
            ${(props) => !props.isSecondary && tw`border-transparent text-black`};
            background: linear-gradient(135deg, #28d0d8 0%, #9cf8fb 100%);

            &:hover:not(:disabled) {
                transform: translateY(-1px);
            }
        `};

    ${(props) =>
        props.color === 'grey' &&
        css`
            ${tw`text-neutral-50`};
            background: linear-gradient(180deg, rgba(42, 59, 70, 0.95) 0%, rgba(24, 40, 51, 0.95) 100%);
            border-color: rgba(137, 161, 172, 0.2);

            &:hover:not(:disabled) {
                border-color: rgba(40, 208, 216, 0.18);
            }
        `};

    ${(props) =>
        props.color === 'green' &&
        css<Props>`
            ${tw`border-green-600 text-green-50`};
            background: linear-gradient(135deg, #1ea672 0%, #37d99a 100%);

            &:hover:not(:disabled) {
                ${tw`border-green-700`};
            }

            ${(props) =>
                props.isSecondary &&
                css`
                    &:active:not(:disabled) {
                        ${tw`bg-green-600 border-green-700`};
                    }
                `};
        `};

    ${(props) =>
        props.color === 'red' &&
        css<Props>`
            ${tw`border-red-600 text-red-50`};
            background: linear-gradient(135deg, #c8495d 0%, #f16f84 100%);

            &:hover:not(:disabled) {
                ${tw`border-red-700`};
            }

            ${(props) =>
                props.isSecondary &&
                css`
                    &:active:not(:disabled) {
                        ${tw`bg-red-600 border-red-700`};
                    }
                `};
        `};

    ${(props) => props.size === 'xsmall' && tw`px-2 py-1 text-xs`};
    ${(props) => (!props.size || props.size === 'small') && tw`px-4 py-2`};
    ${(props) => props.size === 'large' && tw`p-4 text-sm`};
    ${(props) => props.size === 'xlarge' && tw`p-4 w-full`};

    ${(props) =>
        props.isSecondary &&
        css<Props>`
            ${tw`text-neutral-100`};
            background: rgba(255, 255, 255, 0.03);
            border-color: rgba(137, 161, 172, 0.18);
            backdrop-filter: blur(10px);

            &:hover:not(:disabled) {
                border-color: rgba(40, 208, 216, 0.26);
                background: rgba(40, 208, 216, 0.08);
                ${(props) => props.color === 'red' && tw`bg-red-500 border-red-600 text-red-50`};
                ${(props) => props.color === 'primary' && tw`text-black`};
                ${(props) => props.color === 'green' && tw`bg-green-500 border-green-600 text-green-50`};
            }
        `};

    &:disabled {
        opacity: 0.55;
        cursor: default;
        transform: none;
        box-shadow: none;
    }
`;

type ComponentProps = Omit<JSX.IntrinsicElements['button'], 'ref' | keyof Props> & Props;

const Button: React.FC<ComponentProps> = ({ children, isLoading, ...props }) => (
    <ButtonStyle {...props}>
        {isLoading && (
            <div css={tw`flex absolute justify-center items-center w-full h-full left-0 top-0`}>
                <Spinner size={'small'} />
            </div>
        )}
        <span css={isLoading ? tw`text-transparent` : undefined}>{children}</span>
    </ButtonStyle>
);

type LinkProps = Omit<JSX.IntrinsicElements['a'], 'ref' | keyof Props> & Props;

const LinkButton: React.FC<LinkProps> = (props) => <ButtonStyle as={'a'} {...props} />;

export { LinkButton, ButtonStyle };
export default Button;
