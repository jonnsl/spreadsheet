import React from 'react';
import Cell from './Cell';
import classnames from 'classnames';
import { replaceAt } from './Immutable';
export default function Row(props) {
    const updateCell = (value, index) => {
        const { number, value: row } = props;
        if (row[index] !== value) {
            props.onChange(number, replaceAt(row, index, value));
        }
    };
    const renderTextInput = (inputRef, propsToPass) => {
        return (React.createElement("input", Object.assign({ ref: inputRef, className: "input-upper", type: "text", tabIndex: -1 }, propsToPass)));
    };
    const renderCell = (value, index) => {
        return (React.createElement("td", { className: "cell-type-text" },
            React.createElement(Cell, { cellPos: index, value: value, onChange: updateCell, isLastCell: false }, renderTextInput)));
    };
    const { selected, onMouseDown, onContextMenu, number, value } = props;
    return (React.createElement("tr", { className: classnames({ 'spreadsheet__row--selected': selected }) },
        React.createElement("td", { onMouseDown: (e) => onMouseDown(number, e), onContextMenu: (e) => onContextMenu(number, e) },
            React.createElement("div", { className: "spreadsheet__line_number" }, number + 1)),
        value.map(renderCell)));
}
