import React, { MouseEvent } from 'react';
type RowProps = {
    selected?: boolean;
    onMouseDown: (index: number, e: MouseEvent) => void;
    onContextMenu: (index: number, e: MouseEvent) => void;
    number: number;
    value: string[];
    onChange: (index: number, row: string[]) => void;
};
export default function Row(props: RowProps): React.JSX.Element;
export {};
