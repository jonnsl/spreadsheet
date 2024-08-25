import './Spreadsheet.css';
import React, { Fragment, PureComponent } from 'react';
import Row from './Row';
import { ContextMenu, Item } from './ContextMenu';
import { replaceAt, addAt, replaceBetween, splice } from './Immutable';
export function repeatInArray(n, item) {
    return Array.from({ length: n }, item);
}
export default class Spreadsheet extends PureComponent {
    constructor(props) {
        super(props);
        this.selectedRowStart = -1;
        this.selectedRowFinish = -1;
        this.handleCellPaste = (e) => {
            // Nenhum elemento focado ou o elemento focado não é uma célula da planilha
            if (document.activeElement === null || !document.activeElement.classList.contains('spreadsheet__cell')) {
                return;
            }
            if (e.clipboardData === null) {
                return;
            }
            const tableBody = this.tableBodyRef.current;
            if (tableBody === null) {
                return;
            }
            const cell = document.activeElement;
            const plainText = e.clipboardData.getData('text/plain');
            const td = cell.parentElement;
            if (td === null) {
                return;
            }
            const tr = td.parentElement;
            if (tr === null) {
                return;
            }
            const rowIndex = Array.from(tableBody.childNodes).findIndex(n => n === tr);
            const row = this.props.rows[rowIndex];
            if (row === undefined) {
                return;
            }
            const columnIndex = Array.from(tr.childNodes).findIndex(n => n === td);
            if (columnIndex === -1) {
                return;
            }
            this.handleRowChange(rowIndex, replaceAt(row, columnIndex - 1, plainText));
        };
        this.deselectAll = (e) => {
            // Caso esteja clicando na primeira coluna, i.e. número da linha OU menu de contexto está aberto
            if (e.target instanceof Element && e.target.matches('tr td:first-child *') || this.state.contextMenuOpenAt !== -1) {
                return;
            }
            this.setState({ selectedRowStart: -1, selectedRowFinish: -1 });
        };
        this.closeContextMenu = (e) => {
            if (this.state.contextMenuOpenAt === -1 || this.contextMenuRef.current === null || !(e.target instanceof Element)) {
                return;
            }
            if (!this.contextMenuRef.current.contains(e.target)) {
                this.setState({ contextMenuOpenAt: -1 });
            }
        };
        this.handleRowChange = (index, row) => {
            const { onChange, rows } = this.props;
            onChange(replaceAt(rows, index, row));
        };
        this.insertRowsAbove = (e) => {
            e.preventDefault();
            const { onChange, rows, createEmptyRow } = this.props;
            const start = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish);
            const finish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish);
            const insertCount = finish - start + 1;
            onChange(addAt(rows, start, ...repeatInArray(insertCount, createEmptyRow)));
            this.setState({
                contextMenuOpenAt: -1,
            });
        };
        this.insertRowsBelow = (e) => {
            e.preventDefault();
            const { onChange, rows, createEmptyRow } = this.props;
            const start = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish);
            const finish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish);
            const insertCount = finish - start + 1;
            onChange(addAt(rows, finish + 1, ...repeatInArray(insertCount, createEmptyRow)));
            this.setState({
                contextMenuOpenAt: -1,
            });
        };
        this.deleteSelectedRows = (e) => {
            e.preventDefault();
            const { onChange, rows, createEmptyRow } = this.props;
            const start = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish);
            const finish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish);
            const deleteCount = finish - start + 1;
            const newcount = Math.max(0, rows.length - deleteCount);
            onChange(newcount === 0 ? [createEmptyRow()] : splice(rows, start, deleteCount));
            this.setState({
                contextMenuOpenAt: -1,
                selectedRowStart: -1,
                selectedRowFinish: -1,
            });
        };
        this.clearSelectedRowsReactEventHandler = (e) => {
            e.preventDefault();
            this.clearSelectedRows();
        };
        this.clearSelectedRows = () => {
            const { onChange, rows, createEmptyRow } = this.props;
            const start = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish);
            const finish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish);
            onChange(replaceBetween(rows, start, finish, createEmptyRow));
            this.setState({ contextMenuOpenAt: -1 });
        };
        this.handleContextMenu = (index, e) => {
            e.preventDefault();
            const rect = document.body.getBoundingClientRect();
            this.setState({
                contextMenuOpenAt: index,
                contextMenuPosition: [e.clientX + rect.x * -1, e.clientY + rect.y * -1],
            });
        };
        this.handleRowSelect = (index, e) => {
            // Botão direito do mouse
            if (e.buttons === 2) {
                const selectedRowStart = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish);
                const selectedRowFinish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish);
                if (index >= selectedRowStart && index <= selectedRowFinish) {
                    // Clicando com botão direito em um dos selecionados.
                    // retorna para não alterar a seleção
                    return;
                }
            }
            const shiftKey = e.shiftKey;
            this.setState(({ selectedRowStart }) => {
                if (shiftKey) {
                    return selectedRowStart === -1 ? { selectedRowStart: index, selectedRowFinish: index } : { selectedRowFinish: index };
                }
                return { selectedRowStart: index, selectedRowFinish: index };
            });
        };
        this.selectAll = () => {
            this.setState({ selectedRowStart: 0, selectedRowFinish: this.props.rows.length - 1 });
        };
        this.maybeClearRow = (e) => {
            // Alguma linha está selecionada e menu de contexto está fechado
            if (e.key === 'Delete' && this.state.selectedRowStart !== -1 && this.state.contextMenuOpenAt === -1) {
                e.preventDefault();
                this.clearSelectedRows();
            }
        };
        this.state = {
            // Row selection
            selectedRowStart: -1,
            selectedRowFinish: -1,
            // Line number context menu
            contextMenuOpenAt: -1,
            contextMenuPosition: [0, 0],
        };
        this.contextMenuRef = React.createRef();
        this.tableBodyRef = React.createRef();
    }
    componentDidMount() {
        document.body.addEventListener('mousedown', this.closeContextMenu, { capture: true });
        document.body.addEventListener('mousedown', this.deselectAll, { capture: true });
        document.body.addEventListener('keydown', this.maybeClearRow, { capture: true });
        document.body.addEventListener('paste', this.handleCellPaste);
    }
    componentWillUnmount() {
        document.body.removeEventListener('mousedown', this.closeContextMenu);
        document.body.removeEventListener('mousedown', this.deselectAll);
        document.body.removeEventListener('keydown', this.maybeClearRow);
        document.body.removeEventListener('paste', this.handleCellPaste);
    }
    /**
     * The start and finish indexes in selectedRowStart, selectedRowFinish
     * are in selection order. That means that if the user is selecting from bottom to top, the start index will be greater than finish.
     * This method calculates and "caches" the selection in numerial order, which is later used to find wich row/cell is selected.
     */
    calculateSelectionBeginningAndEnding() {
        this.selectedRowStart = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish);
        this.selectedRowFinish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish);
    }
    renderRow(row, idx) {
        const isRowSelected = idx <= this.selectedRowFinish && idx >= this.selectedRowStart;
        return React.createElement(Row
        //FIXME
        // key={row.id}
        , { 
            //FIXME
            // key={row.id}
            selected: isRowSelected, onMouseDown: this.handleRowSelect, onContextMenu: this.handleContextMenu, number: idx, value: row, onChange: this.handleRowChange });
    }
    render() {
        const { rows } = this.props;
        this.calculateSelectionBeginningAndEnding();
        const onlyOneLineSelected = this.selectedRowStart === this.selectedRowFinish;
        return (React.createElement(Fragment, null,
            React.createElement("tbody", { ref: this.tableBodyRef }, rows.map(this.renderRow, this)),
            React.createElement(ContextMenu, { isOpen: this.state.contextMenuOpenAt > -1, position: this.state.contextMenuPosition, innerRef: this.contextMenuRef },
                React.createElement(Item, { onClick: this.insertRowsAbove }, `Insert ${this.selectedRowFinish - this.selectedRowStart + 1} row above`),
                React.createElement(Item, { onClick: this.insertRowsBelow }, `Insert ${this.selectedRowFinish - this.selectedRowStart + 1} row below`),
                React.createElement(Item, { onClick: this.deleteSelectedRows, disabled: rows.length === 1 }, onlyOneLineSelected
                    ? 'Delete row'
                    : `Delete rows ${this.selectedRowStart + 1} - ${this.selectedRowFinish + 1}`),
                React.createElement(Item, { onClick: this.clearSelectedRowsReactEventHandler }, onlyOneLineSelected
                    ? 'Clear row'
                    : `Clear rows ${this.selectedRowStart + 1} - ${this.selectedRowFinish + 1}`))));
    }
}
