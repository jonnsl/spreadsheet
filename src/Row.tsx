
import React, { MouseEvent, InputHTMLAttributes } from 'react'
import Cell from './Cell'
import classnames from 'classnames'
import { replaceAt } from './Immutable'

type RowProps = {
  selected?: boolean;
  onMouseDown: (index: number, e: MouseEvent) => void;
  onContextMenu: (index: number, e: MouseEvent) => void;
  number: number;
  value: string[];
  onChange: (index: number, row: string[]) => void;
}
export default function Row (props: RowProps): React.JSX.Element {
  const updateCell = (value: string, index: number) => {
    const { number, value: row } = props
    if (row[index] !== value) {
      props.onChange(number, replaceAt(row, index, value))
    }
  }

  const renderTextInput = (inputRef: any, propsToPass: InputHTMLAttributes<HTMLInputElement>) => {
    return (
      <input
        ref={inputRef}
        className="input-upper"
        type="text"
        tabIndex={-1}
        {...propsToPass} />
    )
  }

  const renderCell = (value: string, index: number) => {
    return (
      <td className="cell-type-text">
        <Cell
          cellPos={index}
          value={value}
          onChange={updateCell}
          isLastCell={false}>{ renderTextInput }</Cell>
      </td>
    )
  }

  const { selected, onMouseDown, onContextMenu, number, value } = props
  return (
    <tr className={classnames({ 'spreadsheet__row--selected': selected })}>
      <td
        onMouseDown={(e) => onMouseDown(number, e)}
        onContextMenu={(e) => onContextMenu(number, e)}>
        <div className="spreadsheet__line_number">{ number + 1 }</div>
      </td>
      { value.map(renderCell) }
    </tr>
  )
}
