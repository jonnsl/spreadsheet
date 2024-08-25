"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = Item;
exports.ContextMenu = ContextMenu;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
function Item(props) {
    const { onClick, disabled, children } = props;
    return (react_1.default.createElement("li", { onClick: disabled ? noop : onClick, className: (0, classnames_1.default)('context_menu__item', { 'context_menu__item--disabled': disabled }) }, children));
}
function ContextMenu(props) {
    const { innerRef, isOpen, children, position } = props;
    return (react_1.default.createElement("ul", { ref: innerRef, className: (0, classnames_1.default)('context_menu', { hidden: !isOpen }), style: { left: `${position[0]}px`, top: `${position[1]}px` } }, children));
}
function noop() { }
