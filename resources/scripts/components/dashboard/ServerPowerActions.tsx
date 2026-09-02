import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPowerOff, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Server } from '@/api/server/getServer';
import { PowerSignal } from '@/api/server/sendPowerSignal';
import { Button } from '@/components/elements/button/index';
import { Dialog } from '@/components/elements/dialog/index';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import tw from 'twin.macro';

interface Props {
    server: Server;
    status: 'offline' | 'starting' | 'running' | 'stopping' | undefined;
    disabled?: boolean;
    isSubmitting?: boolean;
    onAction: (signal: PowerSignal) => void;
}

const hasPermission = (server: Server, permission: string): boolean =>
    server.permissions.includes('*') || server.permissions.includes(permission);

export default ({ server, status, disabled = false, isSubmitting = false, onAction }: Props) => {
    const [confirmation, setConfirmation] = useState<PowerSignal | null>(null);
    const actionDisabled = disabled || isSubmitting || !status || status === 'starting' || status === 'stopping';
    const canStart = hasPermission(server, 'control.start');
    const canRestart = hasPermission(server, 'control.restart');
    const canStop = hasPermission(server, 'control.stop');

    if (!canStart && !canRestart && !canStop) {
        return null;
    }

    const requestAction = (signal: PowerSignal, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (signal === 'start') {
            onAction(signal);
            return;
        }

        setConfirmation(signal);
    };

    const confirmAction = () => {
        if (!confirmation) return;

        onAction(confirmation);
        setConfirmation(null);
    };

    const confirmationTitle = confirmation === 'restart' ? 'Restart server?' : 'Stop server?';
    const confirmationText =
        confirmation === 'restart'
            ? `${server.name} will be restarted. Connected players and processes may be interrupted.`
            : `${server.name} will be shut down gracefully.`;

    return (
        <div css={tw`flex items-center justify-end gap-2`} onClick={(event) => event.preventDefault()}>
            <Dialog.Confirm
                open={confirmation !== null}
                onClose={() => setConfirmation(null)}
                title={confirmationTitle}
                confirm={confirmation === 'restart' ? 'Restart Server' : 'Shutdown Server'}
                onConfirmed={confirmAction}
            >
                {confirmationText}
            </Dialog.Confirm>
            {canStart && status === 'offline' && (
                <Tooltip content={'Start server'} placement={'top'}>
                    <Button
                        shape={Button.Shapes.IconSquare}
                        size={Button.Sizes.Small}
                        aria-label={'Start server'}
                        disabled={actionDisabled}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => requestAction('start', event)}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                </Tooltip>
            )}
            {canRestart && status === 'running' && (
                <Tooltip content={'Restart server'} placement={'top'}>
                    <Button.Text
                        shape={Button.Shapes.IconSquare}
                        size={Button.Sizes.Small}
                        aria-label={'Restart server'}
                        disabled={actionDisabled}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => requestAction('restart', event)}
                    >
                        <FontAwesomeIcon icon={faRedoAlt} />
                    </Button.Text>
                </Tooltip>
            )}
            {canStop && status === 'running' && (
                <Tooltip content={'Shutdown server'} placement={'top'}>
                    <Button.Danger
                        shape={Button.Shapes.IconSquare}
                        size={Button.Sizes.Small}
                        aria-label={'Shutdown server'}
                        disabled={actionDisabled}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => requestAction('stop', event)}
                    >
                        <FontAwesomeIcon icon={faPowerOff} />
                    </Button.Danger>
                </Tooltip>
            )}
        </div>
    );
};
