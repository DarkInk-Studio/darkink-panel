import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw from 'twin.macro';
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
    background: var(--panel-page);
    border-bottom: 1px solid var(--panel-border);
    overflow: visible;
`;

const BrandBlock = styled(Link)`
    ${tw`no-underline flex items-center gap-4 px-4 py-3 min-w-0`};
`;

const BrandMark = styled.div`
    ${tw`flex items-center justify-center flex-none rounded-xl`};
    width: 2.5rem;
    height: 2.5rem;
    background: var(--panel-highlight);
    border: 1px solid rgba(0, 191, 207, 0.28);
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
        background: var(--panel-background);
        border-color: var(--panel-border);

        &:active,
        &:hover {
            ${tw`text-neutral-100`};
            background: var(--panel-highlight);
            border-color: rgba(0, 191, 207, 0.3);
        }

        &:active,
        &:hover,
        &.active {
            border-color: rgba(0, 191, 207, 0.3);
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
            <div className={'mx-auto w-full flex items-center gap-4 min-h-[4.5rem] max-w-[1440px] px-2 sm:px-6'}>
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
