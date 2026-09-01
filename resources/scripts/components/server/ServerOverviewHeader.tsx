import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faNetworkWired, faServer } from '@fortawesome/free-solid-svg-icons';
import { ServerContext } from '@/state/server';
import { ip } from '@/lib/formatters';

export default () => {
    const server = ServerContext.useStoreState((state) => state.server.data!);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const connected = ServerContext.useStoreState((state) => state.socket.connected);
    const allocation = server.allocations.find((item) => item.isDefault);
    const visibleStatus = server.isNodeUnderMaintenance
        ? 'maintenance'
        : server.isTransferring
        ? 'transferring'
        : server.status || status || (connected ? 'connected' : 'offline');

    return (
        <div className={'mx-auto w-full max-w-[1440px] px-4 sm:px-6 pt-5'}>
            <div
                className={
                    'flex flex-col gap-4 rounded-xl border border-gray-600 bg-gray-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'
                }
            >
                <div className={'flex min-w-0 items-center gap-4'}>
                    <div
                        className={
                            'flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                        }
                    >
                        <FontAwesomeIcon icon={faCube} />
                    </div>
                    <div className={'min-w-0'}>
                        <div className={'flex flex-wrap items-center gap-2'}>
                            <h1 className={'truncate text-xl font-semibold tracking-tight text-gray-50'}>
                                {server.name}
                            </h1>
                            <span
                                className={
                                    'rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-cyan-200'
                                }
                            >
                                {visibleStatus}
                            </span>
                        </div>
                        <p className={'mt-1 truncate text-sm text-gray-300'}>
                            {server.description || 'Managed through the DarkInk control center.'}
                        </p>
                    </div>
                </div>
                <div className={'flex flex-wrap items-center gap-2 text-xs text-gray-300'}>
                    <span className={'rounded-lg border border-gray-600 bg-gray-700 px-3 py-2'}>
                        <FontAwesomeIcon icon={faServer} className={'mr-2 text-cyan-300'} />
                        {server.node}
                    </span>
                    {allocation && (
                        <span className={'rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 font-mono'}>
                            <FontAwesomeIcon icon={faNetworkWired} className={'mr-2 text-cyan-300'} />
                            {allocation.alias || ip(allocation.ip)}:{allocation.port}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
