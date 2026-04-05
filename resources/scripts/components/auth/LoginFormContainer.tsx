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
                css={tw`w-full rounded-[28px] p-2 md:p-3 mx-1 lg:grid lg:grid-cols-[0.92fr,1.08fr] overflow-hidden`}
                style={{
                    background: 'linear-gradient(180deg, rgba(14, 26, 36, 0.92) 0%, rgba(9, 17, 25, 0.94) 100%)',
                    border: '1px solid rgba(137, 161, 172, 0.14)',
                    backdropFilter: 'blur(18px)',
                }}
            >
                <div
                    css={tw`rounded-[22px] p-8 md:p-10 flex flex-col justify-center min-h-[20rem] mb-4 lg:mb-0`}
                    style={{
                        background:
                            'radial-gradient(circle at top left, rgba(40, 208, 216, 0.18), transparent 40%), linear-gradient(180deg, rgba(14, 31, 40, 0.94) 0%, rgba(9, 18, 26, 0.94) 100%)',
                    }}
                >
                    <div>
                        <div css={tw`inline-flex items-center rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-cyan-200 border border-cyan-400/20 bg-cyan-400/10`}>
                            DarkInk Panel
                        </div>
                        <p css={tw`mt-6 text-3xl font-semibold text-neutral-100 leading-tight`}>
                            Zentrale Steuerung fuer deine Server.
                        </p>
                        <p css={tw`mt-4 text-sm text-neutral-300 leading-6 max-w-md`}>
                            Hier verwaltest du Instanzen, Ressourcen und geplante Aufgaben im DarkInk-Setup. Melde dich mit deinem Panel-Konto an, um direkt weiterzuarbeiten.
                        </p>
                        <div css={tw`mt-8 pt-6 border-t border-white/10 max-w-md`}>
                            <p css={tw`text-xs uppercase tracking-[0.24em] text-neutral-400 font-semibold`}>
                                Zugriff nur fuer freigeschaltete Panel-Konten
                            </p>
                        </div>
                    </div>
                </div>
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
