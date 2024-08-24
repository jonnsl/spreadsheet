
import React, { MouseEventHandler } from 'react'
import classnames from 'classnames'

export type ItemProps = {
  onClick: MouseEventHandler<HTMLLIElement>;
  disabled?: boolean;
  children: React.ReactNode;
}
export function Item(props: ItemProps): React.JSX.Element {
  const { onClick, disabled, children } = props

  return (
    <li
      onClick={disabled ? noop : onClick}
      className={classnames('context_menu__item', { 'context_menu__item--disabled': disabled })}>
      { children }
    </li>
  )
}

export type ContextMenuProps = {
  innerRef: any;
  isOpen?: boolean;
  position: [number, number];
  children: React.ReactNode;
}
export function ContextMenu(props: ContextMenuProps): React.JSX.Element {
  const { innerRef, isOpen, children, position } = props
  return (
    <ul
      ref={innerRef}
      className={classnames('context_menu', { hidden: !isOpen })}
      style={{ left: `${position[0]}px`, top: `${position[1]}px` }}>
      { children }
    </ul>
  )
}

function noop () {}
