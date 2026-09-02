import React from 'react';
import classNames from 'classnames';
import styles from '@/components/server/console/style.module.css';

interface ChartBlockProps {
    title: string;
    legend?: React.ReactNode;
    children: React.ReactNode;
}

export default ({ title, legend, children }: ChartBlockProps) => (
    <div className={classNames(styles.chart_container, 'group')}>
        <div className={'flex items-center justify-between border-b border-gray-700 px-4 py-3'}>
            <h3
                className={
                    'font-header text-xs font-semibold uppercase tracking-[0.14em] text-gray-300 transition-colors duration-100 group-hover:text-cyan-200'
                }
            >
                {title}
            </h3>
            {legend && <p className={'flex items-center text-xs text-gray-400'}>{legend}</p>}
        </div>
        <div className={'z-10 min-h-[11rem] px-3 pb-3 pt-2'}>{children}</div>
    </div>
);
