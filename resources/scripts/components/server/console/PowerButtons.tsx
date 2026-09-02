import React, { useEffect, useState } from 'react';
import { Button } from '@/components/elements/button/index';
import Can from '@/components/elements/Can';
import { ServerContext } from '@/state/server';
import { PowerAction } from '@/components/server/console/ServerConsoleContainer';
import { Dialog } from '@/components/elements/dialog/index';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPlay, faPowerOff, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { usePermissions } from '@/plugins/usePermissions';

interface PowerButtonProps {
    className?: string;
}

export default ({ className }: PowerButtonProps) => {
    const [confirmation, setConfirmation] = useState<PowerAction | null>(null);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const instance = ServerContext.useStoreState((state) => state.socket.instance);
    const [canStart, canRestart, canStop] = usePermissions(['control.start', 'control.restart', 'control.stop']);

    const killable = status === 'stopping';
    const onButtonClick = (action: PowerAction, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        if (action === 'start') {
            instance?.send('set state', action);
            return;
        }

        setConfirmation(action);
    };

    const onConfirmed = () => {
        if (!confirmation) return;

        instance?.send('set state', confirmation);
        setConfirmation(null);
    };

    useEffect(() => {
        if (status === 'offline') {
            setConfirmation(null);
        }
    }, [status]);

    const confirmationTitle =
        confirmation === 'restart'
            ? 'Restart server?'
            : confirmation === 'kill'
            ? 'Forcibly stop process?'
            : 'Stop server?';
    const confirmationText =
        confirmation === 'restart'
            ? 'Connected players and running processes may be interrupted.'
            : confirmation === 'kill'
            ? 'Forcibly stopping a server can lead to data corruption.'
            : 'The server will be shut down gracefully.';

    const hasAvailableAction =
        (status === 'offline' && canStart) ||
        (status === 'running' && (canRestart || canStop)) ||
        (killable && canStop);

    if (!hasAvailableAction) {
        return null;
    }

    return (
        <div className={className}>
            <Dialog.Confirm
                open={confirmation !== null}
                hideCloseIcon
                onClose={() => setConfirmation(null)}
                title={confirmationTitle}
                confirm={
                    confirmation === 'restart'
                        ? 'Restart Server'
                        : confirmation === 'kill'
                        ? 'Force Stop'
                        : 'Shutdown Server'
                }
                onConfirmed={onConfirmed}
            >
                {confirmationText}
            </Dialog.Confirm>
            <div className={'flex items-center justify-end gap-2 rounded-xl border border-gray-600 bg-gray-800 p-2'}>
                <Can action={'control.start'}>
                    {status === 'offline' && (
                        <Tooltip content={'Start server'} placement={'top'}>
                            <Button
                                shape={Button.Shapes.IconSquare}
                                size={Button.Sizes.Small}
                                aria-label={'Start server'}
                                onClick={onButtonClick.bind(this, 'start')}
                            >
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
                        </Tooltip>
                    )}
                </Can>
                <Can action={'control.restart'}>
                    {status === 'running' && (
                        <Tooltip content={'Restart server'} placement={'top'}>
                            <Button.Text
                                shape={Button.Shapes.IconSquare}
                                size={Button.Sizes.Small}
                                aria-label={'Restart server'}
                                onClick={onButtonClick.bind(this, 'restart')}
                            >
                                <FontAwesomeIcon icon={faRedoAlt} />
                            </Button.Text>
                        </Tooltip>
                    )}
                </Can>
                <Can action={'control.stop'}>
                    {(status === 'running' || killable) && (
                        <Tooltip content={killable ? 'Force stop server' : 'Shutdown server'} placement={'top'}>
                            <Button.Danger
                                shape={Button.Shapes.IconSquare}
                                size={Button.Sizes.Small}
                                aria-label={killable ? 'Force stop server' : 'Shutdown server'}
                                onClick={onButtonClick.bind(this, killable ? 'kill' : 'stop')}
                            >
                                <FontAwesomeIcon icon={killable ? faBolt : faPowerOff} />
                            </Button.Danger>
                        </Tooltip>
                    )}
                </Can>
            </div>
        </div>
    );
};
