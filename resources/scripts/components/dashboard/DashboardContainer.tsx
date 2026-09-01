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
    const unlimitedMemoryServers = visibleServers.filter((server) => server.limits.memory === 0).length;
    const memoryByNode = new Map<number, { nodeMemory: number; serverMemory: number; hasUnlimited: boolean }>();

    visibleServers.forEach((server) => {
        const existing = memoryByNode.get(server.nodeId) ?? {
            nodeMemory: Math.max(server.nodeMemory, 0),
            serverMemory: 0,
            hasUnlimited: false,
        };

        existing.nodeMemory = Math.max(existing.nodeMemory, server.nodeMemory);
        existing.serverMemory += Math.max(server.limits.memory, 0);
        existing.hasUnlimited = existing.hasUnlimited || server.limits.memory === 0;

        memoryByNode.set(server.nodeId, existing);
    });

    const totalMemory = Array.from(memoryByNode.values()).reduce((sum, node) => {
        if (node.hasUnlimited && node.nodeMemory > 0) {
            return sum + node.nodeMemory;
        }

        return sum + node.serverMemory;
    }, 0);

    const unlimitedNodeCapped = Array.from(memoryByNode.values()).filter(
        (node) => node.hasUnlimited && node.nodeMemory > 0
    ).length;
    const totalMemoryLabel =
        visibleServers.length === 0
            ? '0 GB'
            : unlimitedMemoryServers > 0 && totalMemory > 0
            ? `${Math.round(totalMemory / 1024)} GB`
            : unlimitedMemoryServers === visibleServers.length
            ? 'Unlimited'
            : unlimitedMemoryServers > 0
            ? `${Math.round(totalMemory / 1024)}+ GB`
            : `${Math.round(totalMemory / 1024)} GB`;

    return (
        <PageContentBlock
            title={'Dashboard'}
            heading={'Your infrastructure'}
            description={'Monitor and manage every server available to your account.'}
            showFlashKey={'dashboard'}
        >
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
                    <div css={tw`grid gap-3 md:grid-cols-2 xl:grid-cols-4 mb-5`}>
                        {[
                            { label: 'Visible Servers', value: visibleServers.length.toString(), tone: '#00bfcf' },
                            { label: 'Suspended', value: suspendedServers.toString(), tone: '#ef6a78' },
                            { label: 'Maintenance Nodes', value: maintenanceNodes.toString(), tone: '#91a3b2' },
                            { label: 'Included Memory', value: totalMemoryLabel, tone: '#71e3ec' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                css={tw`rounded-xl p-4 border border-t-2`}
                                style={{
                                    background: 'var(--panel-background)',
                                    borderColor: 'var(--panel-border)',
                                    borderTopColor: item.tone,
                                }}
                            >
                                <p css={tw`text-xs uppercase tracking-[0.16em] text-neutral-400`}>{item.label}</p>
                                <p css={tw`mt-2 text-2xl font-semibold text-neutral-100 tracking-tight`}>
                                    {item.value}
                                </p>
                                <p css={tw`mt-1 text-xs text-neutral-400`}>
                                    {item.label === 'Visible Servers' && 'Current page after active filters.'}
                                    {item.label === 'Suspended' && 'Servers currently blocked from use.'}
                                    {item.label === 'Maintenance Nodes' && 'Nodes flagged for maintenance.'}
                                    {item.label === 'Included Memory' &&
                                        (unlimitedMemoryServers > 0
                                            ? unlimitedNodeCapped > 0
                                                ? 'Unlimited servers on this page are capped by their assigned node memory.'
                                                : 'At least one server on this page has no fixed memory limit configured.'
                                            : 'Summed from the servers shown here.')}
                                </p>
                            </div>
                        ))}
                    </div>
                    {transferringServers > 0 && (
                        <div
                            css={tw`mb-5 rounded-xl border px-4 py-3 text-sm text-neutral-200`}
                            style={{
                                background: 'var(--panel-highlight)',
                                borderColor: 'rgba(0, 191, 207, 0.28)',
                            }}
                        >
                            {transferringServers} server{transferringServers === 1 ? '' : 's'} on this page are
                            currently transferring.
                        </div>
                    )}
                    <Pagination data={servers} onPageSelect={setPage}>
                        {({ items }) =>
                            items.length > 0 ? (
                                items.map((server, index) => (
                                    <ServerRow
                                        key={server.uuid}
                                        server={server}
                                        css={index > 0 ? tw`mt-4` : undefined}
                                    />
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
