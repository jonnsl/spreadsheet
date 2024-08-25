import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import { isGraphemeKey } from './KeyboardEventKeys';
import { copyToClipboard as copy } from './Copy';
/**
 * Mede a largura de um texto e define um title apenas se o texto for maior que seu container.
 */
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
if (ctx !== null) {
    ctx.font = '14px Raleway, sans-serif';
}
function useMeasureText(ref, text) {
    const [title, setTitle] = useState(undefined);
    useEffect(() => {
        if (text !== '' && ref.current && ctx !== null) {
            const measurements = ctx.measureText(text);
            const textIsBiggerThanInput = measurements.width > ref.current.offsetWidth;
            setTitle(textIsBiggerThanInput ? text : undefined);
        }
    }, [ref, text]);
    return title;
}
export default React.memo(Cell);
function Cell(props) {
    const { children, cellPos, value } = props;
    const { onChange } = props;
    const { isLastCell, isFirstCell, className } = props;
    const [stateValue, setValue] = useState(null);
    const tdRef = useRef(null);
    const inputRef = useRef(null);
    const title = useMeasureText(tdRef, value);
    const moveCursorToEnd = () => {
        if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
        }
    };
    const inputIsFocused = () => document.activeElement === inputRef.current;
    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const cellIsFocused = () => document.activeElement === tdRef.current;
    const focusCell = () => {
        if (tdRef.current) {
            tdRef.current.focus();
        }
    };
    const focusCellAbove = () => {
        if (tdRef.current) {
            const parent = tdRef.current.parentElement;
            if (parent === null) {
                return;
            }
            const thisRow = parent.parentElement;
            if (thisRow === null) {
                return;
            }
            const prevRow = thisRow.previousElementSibling;
            if (prevRow && prevRow instanceof HTMLTableRowElement) {
                const cellElement = prevRow.cells[cellPos + 1];
                if (cellElement === null || cellElement === undefined || !(cellElement.firstElementChild instanceof HTMLElement)) {
                    return;
                }
                cellElement.firstElementChild.focus();
            }
        }
    };
    const focusNextCell = () => {
        if (tdRef.current) {
            const parent = tdRef.current.parentElement;
            if (parent === null) {
                return;
            }
            const thisRow = parent.parentElement;
            if (thisRow === null || !(thisRow instanceof HTMLTableRowElement)) {
                return;
            }
            const nextCell = thisRow.cells[cellPos + 2];
            if (nextCell && nextCell.firstElementChild instanceof HTMLElement) {
                nextCell.firstElementChild.focus();
            }
        }
    };
    const focusCellBelow = () => {
        if (tdRef.current) {
            const parent = tdRef.current.parentElement;
            if (parent === null) {
                return;
            }
            const thisRow = parent.parentElement;
            if (thisRow === null) {
                return;
            }
            const nextRow = thisRow.nextElementSibling;
            if (nextRow && nextRow instanceof HTMLTableRowElement) {
                const cellElement = nextRow.cells[cellPos + 1];
                if (cellElement === null || cellElement === undefined || !(cellElement.firstElementChild instanceof HTMLElement)) {
                    return;
                }
                cellElement.firstElementChild.focus();
            }
        }
    };
    const focusPrevCell = () => {
        if (cellPos === 1) {
            return;
        }
        if (tdRef.current) {
            const parent = tdRef.current.parentElement;
            if (parent === null) {
                return;
            }
            const thisRow = parent.parentElement;
            if (thisRow === null || !(thisRow instanceof HTMLTableRowElement)) {
                return;
            }
            const prevCell = thisRow.cells[cellPos];
            if (prevCell && prevCell.firstElementChild instanceof HTMLElement) {
                prevCell.firstElementChild.focus();
            }
        }
    };
    const focusFirstCellInThisRow = () => {
        if (cellPos === 1) {
            return;
        }
        if (tdRef.current) {
            const parent = tdRef.current.parentElement;
            if (parent === null) {
                return;
            }
            const thisRow = parent.parentElement;
            if (thisRow === null || !(thisRow instanceof HTMLTableRowElement)) {
                return;
            }
            const firstCell = thisRow.cells[1];
            if (firstCell && firstCell.firstElementChild instanceof HTMLElement) {
                firstCell.firstElementChild.focus();
            }
        }
    };
    const focusLastCellInThisRow = () => {
        if (tdRef.current) {
            const parent = tdRef.current.parentElement;
            if (parent === null) {
                return;
            }
            const thisRow = parent.parentElement;
            if (thisRow === null || !(thisRow instanceof HTMLTableRowElement)) {
                return;
            }
            const lastCellPos = thisRow.cells.length;
            if (cellPos === lastCellPos) {
                return;
            }
            const lastCell = thisRow.cells[lastCellPos - 1];
            if (lastCell && lastCell.firstElementChild instanceof HTMLElement) {
                lastCell.firstElementChild.focus();
            }
        }
    };
    const focusFirstCellInNextRow = () => {
        if (tdRef.current) {
            const parent = tdRef.current.parentElement;
            if (parent === null) {
                return;
            }
            const thisRow = parent.parentElement;
            if (thisRow === null) {
                return;
            }
            const nextRow = thisRow.nextElementSibling;
            if (nextRow === null || !(nextRow instanceof HTMLTableRowElement)) {
                return;
            }
            const firstCell = nextRow.cells[1];
            if (firstCell && firstCell.firstElementChild instanceof HTMLElement) {
                firstCell.firstElementChild.focus();
            }
        }
    };
    const handleMouseDown = (e) => {
        if (inputIsFocused()) {
            // Input is already focused and user is clicking on the input
            return;
        }
        e.preventDefault();
        focusCell();
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            return;
        }
        // Prevent focus change to next or previous row
        else if (e.key === 'Tab') {
            if (isFirstCell && e.shiftKey === true) {
                // TODO: double tap on Tab should remove focus from table.
                e.preventDefault();
            }
            if (isLastCell && e.shiftKey === false) {
                e.preventDefault();
                focusFirstCellInNextRow();
            }
            return;
        }
        // Change focus to cell above or below
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) {
                focusCellAbove();
            }
            else {
                // Caso não tenha mais célula abaixo, somente foca a célula atual para desfocar do input atualmente focado.
                focusCell();
                focusCellBelow();
            }
            return;
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!inputIsFocused()) {
                focusCellAbove();
            }
            return;
        }
        else if (e.key === 'ArrowRight') {
            if (!inputIsFocused()) {
                e.preventDefault();
                focusNextCell();
            }
            return;
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (inputIsFocused()) {
                moveCursorToEnd();
            }
            else {
                focusCellBelow();
            }
            return;
        }
        else if (e.key === 'ArrowLeft') {
            if (!inputIsFocused()) {
                e.preventDefault();
                focusPrevCell();
            }
            return;
        }
        else if (e.key === 'Home') {
            if (!inputIsFocused()) {
                e.preventDefault();
                focusFirstCellInThisRow();
            }
            return;
        }
        else if (e.key === 'End') {
            if (!inputIsFocused()) {
                e.preventDefault();
                focusLastCellInThisRow();
            }
            return;
        }
        // Delete cell's content
        else if (e.key === 'Delete') {
            onChange('', cellPos);
            return;
        }
        // Revert changes to cell's content
        else if (e.key === 'Escape') {
            e.preventDefault();
            if (e.target instanceof HTMLInputElement) {
                e.target.value = value;
            }
            focusCell();
            return;
        }
        // Copy
        else if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
            copy(value);
            return;
        }
        // Cut
        else if (e.ctrlKey && (e.key === 'x' || e.key === 'X')) {
            e.preventDefault();
            copy(value);
            onChange('', cellPos);
            return;
        }
        // Paste
        else if (e.ctrlKey && (e.key === 'v' || e.key === 'V')) {
            // The pasting itself is handle by the onPaste listener
            // focusInput()
            return;
        }
        else if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) {
            // Prevent focusing the input.
            return;
        }
        // Focus input on first key pressed
        if (cellIsFocused() && isGraphemeKey(e.key)) {
            focusInput();
            setValue('');
        }
    };
    const propsToPass = {
        value: stateValue !== null ? stateValue : value,
        onFocus: () => setValue(value),
        onBlur: (e) => {
            onChange(e.target.value, cellPos);
            setValue(null);
        },
        onChange: (e) => {
            if (inputIsFocused()) {
                setValue(e.target.value);
            }
            else {
                onChange(e.target.value, cellPos);
            }
        },
    };
    return (React.createElement("div", { ref: tdRef, title: stateValue === null && title ? title : undefined, tabIndex: 0, className: classnames('spreadsheet__cell', className, {
            'txt-ellipsis': stateValue === null && title,
        }), onMouseDownCapture: handleMouseDown, onDoubleClick: focusInput, onKeyDown: handleKeyDown }, children(inputRef, propsToPass)));
}
