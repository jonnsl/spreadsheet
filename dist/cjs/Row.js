"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Row;
const react_1 = __importDefault(require("react"));
const Cell_1 = __importDefault(require("./Cell"));
const classnames_1 = __importDefault(require("classnames"));
const Immutable_1 = require("./Immutable");
function Row(props) {
    const updateCell = (value, index) => {
        const { number, value: row } = props;
        if (row[index] !== value) {
            props.onChange(number, (0, Immutable_1.replaceAt)(row, index, value));
        }
    };
    const renderTextInput = (inputRef, propsToPass) => {
        return (react_1.default.createElement("input", Object.assign({ ref: inputRef, className: "input-upper", type: "text", tabIndex: -1 }, propsToPass)));
    };
    const renderCell = (value, index) => {
        return (react_1.default.createElement("td", { className: "cell-type-text" },
            react_1.default.createElement(Cell_1.default, { cellPos: index, value: value, onChange: updateCell, isLastCell: false }, renderTextInput)));
    };
    const { selected, onMouseDown, onContextMenu, number, value } = props;
    return (react_1.default.createElement("tr", { className: (0, classnames_1.default)({ 'spreadsheet__row--selected': selected }) },
        react_1.default.createElement("td", { onMouseDown: (e) => onMouseDown(number, e), onContextMenu: (e) => onContextMenu(number, e) },
            react_1.default.createElement("div", { className: "spreadsheet__line_number" }, number + 1)),
        value.map(renderCell)));
}
