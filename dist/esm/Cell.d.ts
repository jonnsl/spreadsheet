import React from 'react';
declare const _default: React.MemoExoticComponent<typeof Cell>;
export default _default;
export type CellProps = {
    children?: any;
    cellPos: number;
    value: string;
    onChange: (value: string, index: number) => void;
    isLastCell?: boolean;
    isFirstCell?: boolean;
    className?: string;
};
declare function Cell(props: CellProps): React.JSX.Element;
