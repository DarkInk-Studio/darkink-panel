import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faServer } from '@fortawesome/free-solid-svg-icons';
import { ServerContext } from '@/state/server';
import { ip } from '@/lib/formatters';

export default () => {
    const server = ServerContext.useStoreState((state) => state.server.data!);
    const powerState = ServerContext.useStoreState((state) => state.status.value);
    const allocation = server.allocations.find((item) => item.isDefault);

    const status = powerState || (server.status === 'installing' ? 'installing' : null);
    const statusStyle =
        status === 'running'
            ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200'
            : status === 'starting' || status === 'stopping' || status === 'installing'
            ? 'border-amber-400/20 bg-amber-500/10 text-amber-100'
            : 'border-gray-600 bg-gray-800 text-gray-300';

    return (
        <div className={'border-b border-gray-700 bg-gray-800/40'}>
            <div
                className={
                    'mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6'
                }
            >
                <div className={'flex min-w-0 items-center gap-3'}>
                    <span className={'flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10'}>
                        <FontAwesomeIcon icon={faServer} className={'text-cyan-300'} />
                    </span>
                    <div className={'min-w-0'}>
                        <div className={'flex flex-wrap items-center gap-2'}>
                            <h1 className={'truncate font-header text-lg font-semibold text-gray-50'} title={server.name}>
                                {server.name}
                            </h1>
                            {status && (
                                <span
                                    className={`rounded-lg border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${statusStyle}`}
                                >
                                    {status}
                                </span>
                            )}
                        </div>
                        {allocation && <p className={'mt-0.5 text-sm text-cyan-200/80'}>Port: {allocation.port}</p>}
                    </div>
                </div>
                <div className={'flex flex-wrap items-center gap-2 text-xs text-gray-300'}>
                    <span className={'rounded-lg border border-gray-600 bg-gray-800 px-3 py-2'}>
                        <FontAwesomeIcon icon={faServer} className={'mr-2 text-cyan-300'} />
                        {server.node}
                    </span>
                    {allocation && (
                        <span className={'rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 font-mono'}>
                            <FontAwesomeIcon icon={faNetworkWired} className={'mr-2 text-cyan-300'} />
                            {allocation.alias || ip(allocation.ip)}:{allocation.port}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
