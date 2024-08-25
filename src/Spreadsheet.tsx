
import './Spreadsheet.css'
import React, { Fragment, MouseEvent as ReactMouseEvent, PureComponent } from 'react'
import Row from './Row'
import { ContextMenu, Item } from './ContextMenu'
import { replaceAt, addAt, replaceBetween, splice } from './Immutable'

type mapFn<T> = ((v: T, k: number) => T)
export function repeatInArray<T> (n: number, item: mapFn<T>): Array<T> {
  return Array.from({ length: n }, item)
}

export type SpreadsheetProps = {
  onChange: (v: string[][]) => void;
  rows: string[][];
  createEmptyRow: () => string[];
}

export type SpreadsheetState = {
  selectedRowStart: number;
  selectedRowFinish: number;
  contextMenuOpenAt: number;
  contextMenuPosition: [number, number];
}

export default class Spreadsheet extends PureComponent<SpreadsheetProps, SpreadsheetState> {
  selectedRowStart: number = -1
  selectedRowFinish: number = -1
  contextMenuRef: React.RefObject<HTMLElement>
  tableBodyRef: React.RefObject<HTMLTableSectionElement>

  constructor (props: SpreadsheetProps) {
    super(props)
    this.state = {
      // Row selection
      selectedRowStart: -1,
      selectedRowFinish: -1,
      // Line number context menu
      contextMenuOpenAt: -1,
      contextMenuPosition: [0, 0],
    }
    this.contextMenuRef = React.createRef<HTMLElement>()
    this.tableBodyRef = React.createRef<HTMLTableSectionElement>()
  }

  override componentDidMount (): void {
    document.body.addEventListener('mousedown', this.closeContextMenu, { capture: true })
    document.body.addEventListener('mousedown', this.deselectAll, { capture: true })
    document.body.addEventListener('keydown', this.maybeClearRow, { capture: true })
    document.body.addEventListener('paste', this.handleCellPaste)
  }

  override componentWillUnmount (): void {
    document.body.removeEventListener('mousedown', this.closeContextMenu)
    document.body.removeEventListener('mousedown', this.deselectAll)
    document.body.removeEventListener('keydown', this.maybeClearRow)
    document.body.removeEventListener('paste', this.handleCellPaste)
  }

  handleCellPaste = (e: ClipboardEvent): void => {
    // Nenhum elemento focado ou o elemento focado não é uma célula da planilha
    if (document.activeElement === null || !document.activeElement.classList.contains('spreadsheet__cell')) {
      return
    }
    if (e.clipboardData === null) {
      return
    }

    const tableBody = this.tableBodyRef.current
    if (tableBody === null) {
      return
    }

    const cell: Element = document.activeElement
    const plainText = e.clipboardData.getData('text/plain')
    const td = cell.parentElement
    if (td === null) {
      return
    }

    const tr = td.parentElement
    if (tr === null) {
      return
    }

    const rowIndex = Array.from(tableBody.childNodes).findIndex(n => n === tr)
    const row = this.props.rows[rowIndex]
    if (row === undefined) {
      return
    }
    const columnIndex = Array.from(tr.childNodes).findIndex(n => n === td)
    if (columnIndex === -1) {
      return
    }
    this.handleRowChange(rowIndex, replaceAt(row, columnIndex - 1, plainText))
  }

  deselectAll = (e: MouseEvent): void => {
    // Caso esteja clicando na primeira coluna, i.e. número da linha OU menu de contexto está aberto
    if (e.target instanceof Element && e.target.matches('tr td:first-child *') || this.state.contextMenuOpenAt !== -1) {
      return
    }

    this.setState({ selectedRowStart: -1, selectedRowFinish: -1 })
  }

  closeContextMenu = (e: MouseEvent): void => {
    if (this.state.contextMenuOpenAt === -1 || this.contextMenuRef.current === null || !(e.target instanceof Element)) {
      return
    }

    if (!this.contextMenuRef.current.contains(e.target)) {
      this.setState({ contextMenuOpenAt: -1 })
    }
  }

  handleRowChange = (index: number, row: string[]): void => {
    const { onChange, rows } = this.props

    onChange(replaceAt(rows, index, row))
  }

  insertRowsAbove = (e: ReactMouseEvent<HTMLLIElement>): void => {
    e.preventDefault()
    const { onChange, rows, createEmptyRow } = this.props
    const start: number = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish)
    const finish: number = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish)
    const insertCount: number = finish - start + 1

    onChange(addAt(rows, start, ...repeatInArray(insertCount, createEmptyRow)))
    this.setState({
      contextMenuOpenAt: -1,
    })
  }

  insertRowsBelow = (e: ReactMouseEvent<HTMLLIElement>): void => {
    e.preventDefault()
    const { onChange, rows, createEmptyRow } = this.props
    const start: number = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish)
    const finish: number = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish)
    const insertCount: number = finish - start + 1

    onChange(addAt(rows, finish + 1, ...repeatInArray(insertCount, createEmptyRow)))
    this.setState({
      contextMenuOpenAt: -1,
    })
  }

  deleteSelectedRows = (e: ReactMouseEvent<HTMLLIElement>): void => {
    e.preventDefault()
    const { onChange, rows, createEmptyRow } = this.props
    const start: number = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish)
    const finish: number = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish)
    const deleteCount: number = finish - start + 1
    const newcount: number = Math.max(0, rows.length - deleteCount)

    onChange(newcount === 0 ? [createEmptyRow()] : splice(rows, start, deleteCount))
    this.setState({
      contextMenuOpenAt: -1,
      selectedRowStart: -1,
      selectedRowFinish: -1,
    })
  }

  clearSelectedRowsReactEventHandler = (e: ReactMouseEvent<HTMLLIElement>): void => {
    e.preventDefault()
    this.clearSelectedRows()
  }

  clearSelectedRows = (): void => {
    const { onChange, rows, createEmptyRow } = this.props
    const start: number = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish)
    const finish: number = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish)

    onChange(replaceBetween(rows, start, finish, createEmptyRow))
    this.setState({ contextMenuOpenAt: -1 })
  }

  handleContextMenu = (index: number, e: ReactMouseEvent): void => {
    e.preventDefault()
    const rect = document.body.getBoundingClientRect()
    this.setState({
      contextMenuOpenAt: index,
      contextMenuPosition: [e.clientX + rect.x * -1, e.clientY + rect.y * -1],
    })
  }

  handleRowSelect = (index: number, e: ReactMouseEvent): void => {
    // Botão direito do mouse
    if (e.buttons === 2) {
      const selectedRowStart = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish)
      const selectedRowFinish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish)
      if (index >= selectedRowStart && index <= selectedRowFinish) {
        // Clicando com botão direito em um dos selecionados.
        // retorna para não alterar a seleção
        return
      }
    }

    const shiftKey = e.shiftKey
    this.setState(({ selectedRowStart }: Readonly<SpreadsheetState>): Pick<SpreadsheetState, "selectedRowStart" | "selectedRowFinish"> | Pick<SpreadsheetState, "selectedRowFinish"> => {
      if (shiftKey) {
        return selectedRowStart === -1 ? { selectedRowStart: index, selectedRowFinish: index } : { selectedRowFinish: index }
      }

      return { selectedRowStart: index, selectedRowFinish: index }
    })
  }

  selectAll = (): void => {
    this.setState({ selectedRowStart: 0, selectedRowFinish: this.props.rows.length - 1 })
  }

  /**
   * The start and finish indexes in selectedRowStart, selectedRowFinish
   * are in selection order. That means that if the user is selecting from bottom to top, the start index will be greater than finish.
   * This method calculates and "caches" the selection in numerial order, which is later used to find wich row/cell is selected.
   */
  calculateSelectionBeginningAndEnding (): void {
    this.selectedRowStart = Math.min(this.state.selectedRowStart, this.state.selectedRowFinish)
    this.selectedRowFinish = Math.max(this.state.selectedRowStart, this.state.selectedRowFinish)
  }

  renderRow (row: string[], idx: number): React.JSX.Element {
    const isRowSelected = idx <= this.selectedRowFinish && idx >= this.selectedRowStart

    return <Row
      //FIXME
      // key={row.id}
      selected={isRowSelected}
      onMouseDown={this.handleRowSelect}
      onContextMenu={this.handleContextMenu}
      number={idx}
      value={row}
      onChange={this.handleRowChange} />
  }

  maybeClearRow = (e: KeyboardEvent) => {
    // Alguma linha está selecionada e menu de contexto está fechado
    if (e.key === 'Delete' && this.state.selectedRowStart !== -1 && this.state.contextMenuOpenAt === -1) {
      e.preventDefault()
      this.clearSelectedRows()
    }
  }

  override render () {
    const { rows } = this.props
    this.calculateSelectionBeginningAndEnding()
    const onlyOneLineSelected = this.selectedRowStart === this.selectedRowFinish

    return (
      <Fragment>
        <tbody ref={this.tableBodyRef}>{ rows.map(this.renderRow, this) }</tbody>
        <ContextMenu isOpen={this.state.contextMenuOpenAt > -1} position={this.state.contextMenuPosition} innerRef={this.contextMenuRef}>
          <Item onClick={this.insertRowsAbove}>{`Insert ${this.selectedRowFinish - this.selectedRowStart + 1} row above`}</Item>
          <Item onClick={this.insertRowsBelow}>{`Insert ${this.selectedRowFinish - this.selectedRowStart + 1} row below`}</Item>
          <Item onClick={this.deleteSelectedRows} disabled={rows.length === 1}>{
            onlyOneLineSelected
              ? 'Delete row'
              : `Delete rows ${this.selectedRowStart + 1} - ${this.selectedRowFinish + 1}`
          }</Item>
          <Item onClick={this.clearSelectedRowsReactEventHandler}>{
            onlyOneLineSelected
              ? 'Clear row'
              : `Clear rows ${this.selectedRowStart + 1} - ${this.selectedRowFinish + 1}`
          }</Item>
        </ContextMenu>
      </Fragment>
    )
  }
}
