import http from '@/api/http';

export type PowerSignal = 'start' | 'stop' | 'restart';

export default (server: string, signal: PowerSignal): Promise<void> => {
    return http.post(`/api/client/servers/${server}/power`, { signal }).then(() => undefined);
};
