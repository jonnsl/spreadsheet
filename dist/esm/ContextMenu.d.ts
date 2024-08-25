import React, { MouseEventHandler } from 'react';
export type ItemProps = {
    onClick: MouseEventHandler<HTMLLIElement>;
    disabled?: boolean;
    children: React.ReactNode;
};
export declare function Item(props: ItemProps): React.JSX.Element;
export type ContextMenuProps = {
    innerRef: any;
    isOpen?: boolean;
    position: [number, number];
    children: React.ReactNode;
};
export declare function ContextMenu(props: ContextMenuProps): React.JSX.Element;
