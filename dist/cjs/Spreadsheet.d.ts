import './Spreadsheet.css';
import React, { MouseEvent as ReactMouseEvent, PureComponent } from 'react';
type mapFn<T> = ((v: T, k: number) => T);
export declare function repeatInArray<T>(n: number, item: mapFn<T>): Array<T>;
export type SpreadsheetProps = {
    onChange: (v: string[][]) => void;
    rows: string[][];
    createEmptyRow: () => string[];
};
export type SpreadsheetState = {
    selectedRowStart: number;
    selectedRowFinish: number;
    contextMenuOpenAt: number;
    contextMenuPosition: [number, number];
};
export default class Spreadsheet extends PureComponent<SpreadsheetProps, SpreadsheetState> {
    selectedRowStart: number;
    selectedRowFinish: number;
    contextMenuRef: React.RefObject<HTMLElement>;
    tableBodyRef: React.RefObject<HTMLTableSectionElement>;
    constructor(props: SpreadsheetProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleCellPaste: (e: ClipboardEvent) => void;
    deselectAll: (e: MouseEvent) => void;
    closeContextMenu: (e: MouseEvent) => void;
    handleRowChange: (index: number, row: string[]) => void;
    insertRowsAbove: (e: ReactMouseEvent<HTMLLIElement>) => void;
    insertRowsBelow: (e: ReactMouseEvent<HTMLLIElement>) => void;
    deleteSelectedRows: (e: ReactMouseEvent<HTMLLIElement>) => void;
    clearSelectedRowsReactEventHandler: (e: ReactMouseEvent<HTMLLIElement>) => void;
    clearSelectedRows: () => void;
    handleContextMenu: (index: number, e: ReactMouseEvent) => void;
    handleRowSelect: (index: number, e: ReactMouseEvent) => void;
    selectAll: () => void;
    /**
     * The start and finish indexes in selectedRowStart, selectedRowFinish
     * are in selection order. That means that if the user is selecting from bottom to top, the start index will be greater than finish.
     * This method calculates and "caches" the selection in numerial order, which is later used to find wich row/cell is selected.
     */
    calculateSelectionBeginningAndEnding(): void;
    renderRow(row: string[], idx: number): React.JSX.Element;
    maybeClearRow: (e: KeyboardEvent) => void;
    render(): React.JSX.Element;
}
export {};
