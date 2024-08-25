
import React, { useRef, useState, MouseEvent } from 'react'
import { createRoot } from 'react-dom/client';
import Spreadsheet from '../src/Spreadsheet'
import classnames from 'classnames'

function createEmptyRow(): string[] {
  return Array.from({ length: 26 }, () => "")
}

function intToLetter(num: number): string {
  let result = '';

  do {
    num--;
    result = String.fromCharCode(65 + (num % 26)) + result;
    num = Math.floor(num / 26);
  } while (num > 0);

  return result;
}

const initialRows = Array.from({ length: 50 }, createEmptyRow)
function Example() {
  const [rows, setRows] = useState(initialRows);
  const sheet = useRef<Spreadsheet>(null);

  const selectAll = (e: MouseEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    sheet.current?.selectAll();
  }

  return (
    <table className={classnames('spreadsheet', { 'spreadsheet--disabled': false }, '')}>
      <thead>
        <tr>
          <th style={{ width: '45px' }} onClick={selectAll}><div className="spreadsheet__corner"></div></th>
          { rows[0].map((_, index) => <th><div className="spreadsheet__header_cell">{ intToLetter(index + 1) }</div></th>) }
        </tr>
      </thead>
      <Spreadsheet ref={sheet} createEmptyRow={createEmptyRow} rows={rows} onChange={(rows) => setRows(rows)} />
    </table>
  )
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<Example />);
