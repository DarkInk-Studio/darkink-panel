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
        {title && <h2 css={tw`text-3xl text-center text-neutral-100 font-semibold py-4 tracking-tight`}>{title}</h2>}
        <FlashMessageRender css={tw`mb-2 px-1`} />
        <Form {...props} ref={ref}>
            <div
                css={tw`w-full rounded-xl p-1 mx-1 overflow-hidden border`}
                style={{
                    background: 'var(--panel-background)',
                    borderColor: 'var(--panel-border)',
                }}
            >
                <div
                    css={tw`rounded-lg p-6 md:p-8 flex items-center`}
                    style={{ background: 'var(--panel-background-strong)' }}
                >
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
