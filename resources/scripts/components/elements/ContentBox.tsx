import React from 'react';
import FlashMessageRender from '@/components/FlashMessageRender';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import tw from 'twin.macro';

type Props = Readonly<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        title?: string;
        borderColor?: string;
        showFlashes?: string | boolean;
        showLoadingOverlay?: boolean;
    }
>;

const ContentBox = ({ title, borderColor, showFlashes, showLoadingOverlay, children, ...props }: Props) => (
    <div {...props}>
        {title && <h2 css={tw`text-neutral-100 mb-4 px-1 text-2xl font-semibold tracking-tight`}>{title}</h2>}
        {showFlashes && (
            <FlashMessageRender byKey={typeof showFlashes === 'string' ? showFlashes : undefined} css={tw`mb-4`} />
        )}
        <div
            css={[
                tw`p-5 rounded-2xl shadow-panel relative border border-transparent`,
                !!borderColor && tw`border-t-4`,
            ]}
            style={{
                background: 'linear-gradient(180deg, rgba(16, 28, 39, 0.92) 0%, rgba(11, 20, 29, 0.82) 100%)',
                borderColor: 'var(--panel-border)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
            }}
        >
            <SpinnerOverlay visible={showLoadingOverlay || false} />
            {children}
        </div>
    </div>
);

export default ContentBox;
