import React from 'react';
import classnames from 'classnames';
export function Item(props) {
    const { onClick, disabled, children } = props;
    return (React.createElement("li", { onClick: disabled ? noop : onClick, className: classnames('context_menu__item', { 'context_menu__item--disabled': disabled }) }, children));
}
export function ContextMenu(props) {
    const { innerRef, isOpen, children, position } = props;
    return (React.createElement("ul", { ref: innerRef, className: classnames('context_menu', { hidden: !isOpen }), style: { left: `${position[0]}px`, top: `${position[1]}px` } }, children));
}
function noop() { }
