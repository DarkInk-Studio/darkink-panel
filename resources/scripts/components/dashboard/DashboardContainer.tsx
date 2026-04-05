import React, { useEffect, useState } from 'react';
import { Server } from '@/api/server/getServer';
import getServers from '@/api/getServers';
import ServerRow from '@/components/dashboard/ServerRow';
import Spinner from '@/components/elements/Spinner';
import PageContentBlock from '@/components/elements/PageContentBlock';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from 'easy-peasy';
import { usePersistedState } from '@/plugins/usePersistedState';
import Switch from '@/components/elements/Switch';
import tw from 'twin.macro';
import useSWR from 'swr';
import { PaginatedResult } from '@/api/http';
import Pagination from '@/components/elements/Pagination';
import { useLocation } from 'react-router-dom';

export default () => {
    const { search } = useLocation();
    const defaultPage = Number(new URLSearchParams(search).get('page') || '1');

    const [page, setPage] = useState(!isNaN(defaultPage) && defaultPage > 0 ? defaultPage : 1);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const uuid = useStoreState((state) => state.user.data!.uuid);
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [showOnlyAdmin, setShowOnlyAdmin] = usePersistedState(`${uuid}:show_all_servers`, false);

    const { data: servers, error } = useSWR<PaginatedResult<Server>>(
        ['/api/client/servers', showOnlyAdmin && rootAdmin, page],
        () => getServers({ page, type: showOnlyAdmin && rootAdmin ? 'admin' : undefined })
    );

    useEffect(() => {
        setPage(1);
    }, [showOnlyAdmin]);

    useEffect(() => {
        if (!servers) return;
        if (servers.pagination.currentPage > 1 && !servers.items.length) {
            setPage(1);
        }
    }, [servers?.pagination.currentPage]);

    useEffect(() => {
        // Don't use react-router to handle changing this part of the URL, otherwise it
        // triggers a needless re-render. We just want to track this in the URL incase the
        // user refreshes the page.
        window.history.replaceState(null, document.title, `/${page <= 1 ? '' : `?page=${page}`}`);
    }, [page]);

    useEffect(() => {
        if (error) clearAndAddHttpError({ key: 'dashboard', error });
        if (!error) clearFlashes('dashboard');
    }, [error]);

    const visibleServers = servers?.items ?? [];
    const suspendedServers = visibleServers.filter((server) => server.status === 'suspended').length;
    const maintenanceNodes = visibleServers.filter((server) => server.isNodeUnderMaintenance).length;
    const transferringServers = visibleServers.filter((server) => server.isTransferring).length;
    const totalMemory = visibleServers.reduce((sum, server) => sum + Math.max(server.limits.memory, 0), 0);

    return (
        <PageContentBlock title={'Dashboard'} showFlashKey={'dashboard'}>
            {rootAdmin && (
                <div css={tw`mb-6 flex justify-end items-center`}>
                    <p css={tw`uppercase text-xs text-neutral-400 mr-2 tracking-[0.18em]`}>
                        {showOnlyAdmin ? "Showing others' servers" : 'Showing your servers'}
                    </p>
                    <Switch
                        name={'show_all_servers'}
                        defaultChecked={showOnlyAdmin}
                        onChange={() => setShowOnlyAdmin((s) => !s)}
                    />
                </div>
            )}
            {!servers ? (
                <Spinner centered size={'large'} />
            ) : (
                <>
                    <div css={tw`grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6`}>
                        {[
                            { label: 'Visible Servers', value: visibleServers.length.toString(), tone: 'rgba(40, 208, 216, 0.18)' },
                            { label: 'Suspended', value: suspendedServers.toString(), tone: 'rgba(241, 111, 132, 0.18)' },
                            { label: 'Maintenance Nodes', value: maintenanceNodes.toString(), tone: 'rgba(255, 255, 255, 0.08)' },
                            { label: 'Included Memory', value: `${Math.round(totalMemory / 1024)} GB`, tone: 'rgba(124, 236, 240, 0.14)' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                css={tw`rounded-2xl p-5 border`}
                                style={{
                                    background: `linear-gradient(180deg, ${item.tone} 0%, rgba(11, 20, 29, 0.84) 100%)`,
                                    borderColor: 'var(--panel-border)',
                                    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.24)',
                                }}
                            >
                                <p css={tw`text-xs uppercase tracking-[0.22em] text-neutral-400`}>{item.label}</p>
                                <p css={tw`mt-3 text-3xl font-semibold text-neutral-100 tracking-tight`}>{item.value}</p>
                                <p css={tw`mt-2 text-sm text-neutral-300`}>
                                    {item.label === 'Visible Servers' && 'Current page after active filters.'}
                                    {item.label === 'Suspended' && 'Servers currently blocked from use.'}
                                    {item.label === 'Maintenance Nodes' && 'Nodes flagged for maintenance.'}
                                    {item.label === 'Included Memory' && 'Summed from the servers shown here.'}
                                </p>
                            </div>
                        ))}
                    </div>
                    {transferringServers > 0 && (
                        <div
                            css={tw`mb-6 rounded-2xl border px-5 py-4 text-sm text-neutral-200`}
                            style={{
                                background: 'rgba(40, 208, 216, 0.08)',
                                borderColor: 'rgba(40, 208, 216, 0.16)',
                            }}
                        >
                            {transferringServers} server{transferringServers === 1 ? '' : 's'} on this page are currently transferring.
                        </div>
                    )}
                    <Pagination data={servers} onPageSelect={setPage}>
                        {({ items }) =>
                            items.length > 0 ? (
                                items.map((server, index) => (
                                    <ServerRow key={server.uuid} server={server} css={index > 0 ? tw`mt-4` : undefined} />
                                ))
                            ) : (
                                <p css={tw`text-center text-sm text-neutral-400`}>
                                    {showOnlyAdmin
                                        ? 'There are no other servers to display.'
                                        : 'There are no servers associated with your account.'}
                                </p>
                            )
                        }
                    </Pagination>
                </>
            )}
        </PageContentBlock>
    );
};
