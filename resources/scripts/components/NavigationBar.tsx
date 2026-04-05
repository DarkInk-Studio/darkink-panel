import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Avatar from '@/components/Avatar';

const Shell = styled.div`
    ${tw`w-full`};
    position: sticky;
    top: 0;
    z-index: 40;
    background: transparent;
    padding: 1rem 0.75rem 0;
`;

const ShellFrame = styled.div`
    ${tw`mx-auto w-full`};
    max-width: 1360px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 1.25rem;
    background: linear-gradient(115deg, rgba(8, 14, 22, 0.92), rgba(10, 16, 25, 0.86));
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(18px);
`;

const BrandBlock = styled(Link)`
    ${tw`no-underline flex items-center gap-4 px-2 py-1 min-w-0`};
`;

const BrandMark = styled.div`
    ${tw`flex items-center justify-center flex-none rounded-2xl`};
    width: 2.75rem;
    height: 2.75rem;
    background: linear-gradient(135deg, rgba(40, 208, 216, 0.24) 0%, rgba(255, 255, 255, 0.08) 100%);
    border: 1px solid rgba(40, 208, 216, 0.18);
`;

const BrandTitle = styled.div`
    ${tw`text-neutral-100 font-header font-semibold text-xl leading-tight truncate`};
`;

const BrandMeta = styled.div`
    ${tw`text-cyan-300 text-xs uppercase tracking-[0.24em] truncate`};
`;

const CenterNavigation = styled.div`
    ${tw`hidden lg:flex items-center justify-center min-w-0`};
`;

const CenterRail = styled.div`
    ${tw`flex items-center gap-2 px-2 py-2 rounded-2xl`};
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CenterLink = styled(NavLink)`
    ${tw`no-underline text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150`};
    color: rgba(196, 205, 216, 0.82);
    border: 1px solid transparent;

    &:hover,
    &.active {
        color: rgb(244, 248, 253);
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(40, 208, 216, 0.14);
    }
`;

const CenterAnchor = styled.a`
    ${tw`no-underline text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150`};
    color: rgba(196, 205, 216, 0.82);
    border: 1px solid transparent;

    &:hover {
        color: rgb(244, 248, 253);
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(40, 208, 216, 0.14);
    }
`;

const RightNavigation = styled.div`
    & > a,
    & > button,
    & > .navigation-link {
        ${tw`flex items-center justify-center h-11 w-11 no-underline text-neutral-300 cursor-pointer transition-all duration-150 rounded-xl border border-transparent`};
        background: rgba(255, 255, 255, 0.02);

        &:active,
        &:hover {
            ${tw`text-neutral-100`};
            background: rgba(40, 208, 216, 0.08);
            border-color: rgba(40, 208, 216, 0.18);
        }

        &:active,
        &:hover,
        &.active {
            border-color: rgba(40, 208, 216, 0.18);
            outline: 1px solid rgba(40, 208, 216, 0.08);
        }
    }
`;

export default () => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    return (
        <Shell>
            <SpinnerOverlay visible={isLoggingOut} />
            <ShellFrame>
                <div id={'logo'} className={'min-w-0'}>
                    <BrandBlock to={'/'}>
                        <BrandMark>
                            <span className={'text-sm font-bold tracking-[0.24em] text-cyan-300'}>DI</span>
                        </BrandMark>
                        <div className={'min-w-0'}>
                            <BrandMeta>Control Center</BrandMeta>
                            <BrandTitle>{name}</BrandTitle>
                        </div>
                    </BrandBlock>
                </div>
                <CenterNavigation>
                    <CenterRail>
                        <CenterLink to={'/'} exact>
                            Dashboard
                        </CenterLink>
                        <CenterLink to={'/account'}>
                            Account
                        </CenterLink>
                        {rootAdmin && (
                            <CenterAnchor href={'/admin'} rel={'noreferrer'}>
                                Admin
                            </CenterAnchor>
                        )}
                    </CenterRail>
                </CenterNavigation>
                <RightNavigation className={'flex items-center justify-center gap-2'}>
                    <SearchContainer />
                    <Tooltip placement={'bottom'} content={'Dashboard'}>
                        <NavLink to={'/'} exact>
                            <FontAwesomeIcon icon={faLayerGroup} />
                        </NavLink>
                    </Tooltip>
                    {rootAdmin && (
                        <Tooltip placement={'bottom'} content={'Admin'}>
                            <a href={'/admin'} rel={'noreferrer'}>
                                <FontAwesomeIcon icon={faCogs} />
                            </a>
                        </Tooltip>
                    )}
                    <Tooltip placement={'bottom'} content={'Account Settings'}>
                        <NavLink to={'/account'}>
                            <span className={'flex items-center w-5 h-5'}>
                                <Avatar.User />
                            </span>
                        </NavLink>
                    </Tooltip>
                    <Tooltip placement={'bottom'} content={'Sign Out'}>
                        <button onClick={onTriggerLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    </Tooltip>
                </RightNavigation>
            </ShellFrame>
        </Shell>
    );
};
