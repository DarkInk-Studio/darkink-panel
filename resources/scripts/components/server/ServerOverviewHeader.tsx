import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faServer } from '@fortawesome/free-solid-svg-icons';
import { ServerContext } from '@/state/server';
import { ip } from '@/lib/formatters';

export default () => {
    const server = ServerContext.useStoreState((state) => state.server.data!);
    const allocation = server.allocations.find((item) => item.isDefault);

    return (
        <div className={'border-b border-gray-700 bg-gray-800/40'}>
            <div
                className={
                    'mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-end gap-2 px-4 py-3 sm:px-6'
                }
            >
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
