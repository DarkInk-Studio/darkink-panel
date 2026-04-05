import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${tw`px-4`};

    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <Container>
        {title && <h2 css={tw`text-4xl text-center text-neutral-100 font-semibold py-4 tracking-tight`}>{title}</h2>}
        <FlashMessageRender css={tw`mb-2 px-1`} />
        <Form {...props} ref={ref}>
            <div
                css={tw`w-full rounded-[28px] p-2 md:p-3 mx-1 overflow-hidden`}
                style={{
                    background: 'linear-gradient(180deg, rgba(14, 26, 36, 0.92) 0%, rgba(9, 17, 25, 0.94) 100%)',
                    border: '1px solid rgba(137, 161, 172, 0.14)',
                    backdropFilter: 'blur(18px)',
                }}
            >
                <div css={tw`rounded-[22px] p-6 md:p-10 flex items-center`} style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <div css={tw`flex-1`}>{props.children}</div>
                </div>
            </div>
        </Form>
        <p css={tw`text-center text-neutral-500 text-xs mt-4`}>
            DarkInk Panel &copy; {new Date().getFullYear()}&nbsp;
            <a
                rel={'noopener nofollow noreferrer'}
                href={'https://pterodactyl.io'}
                target={'_blank'}
                css={tw`no-underline text-neutral-500 hover:text-neutral-300`}
            >
                Powered by Pterodactyl
            </a>
        </p>
    </Container>
));
