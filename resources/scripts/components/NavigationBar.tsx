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
    ${tw`w-full overflow-x-auto`};
    position: sticky;
    top: 0;
    z-index: 40;
    background: rgba(7, 16, 24, 0.72);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(137, 161, 172, 0.12);
`;

const BrandBlock = styled(Link)`
    ${tw`no-underline flex items-center gap-4 px-4 py-3 min-w-0`};
`;

const BrandMark = styled.div`
    ${tw`flex items-center justify-center flex-none rounded-2xl`};
    width: 2.75rem;
    height: 2.75rem;
    background: linear-gradient(135deg, rgba(40, 208, 216, 0.24) 0%, rgba(255, 255, 255, 0.08) 100%);
    border: 1px solid rgba(40, 208, 216, 0.18);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.24);
`;

const BrandTitle = styled.div`
    ${tw`text-neutral-100 font-header font-semibold text-xl leading-tight truncate`};
`;

const BrandMeta = styled.div`
    ${tw`text-neutral-400 text-xs uppercase tracking-[0.24em] truncate`};
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
            box-shadow: inset 0 -2px ${theme`colors.cyan.500`.toString()}, 0 0 0 1px rgba(40, 208, 216, 0.08);
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
            <div className={'mx-auto w-full flex items-center gap-4 min-h-[4.75rem] max-w-[1360px] px-2 sm:px-4'}>
                <div id={'logo'} className={'flex-1 min-w-0'}>
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
            </div>
        </Shell>
    );
};
