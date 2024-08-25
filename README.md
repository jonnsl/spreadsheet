# Spreadsheet in typescript for React.js

A spreadsheet like interface for React.js

## Demo

Check out the demo here [here](https://jonnsl.github.io/spreadsheet/)

## Installation

```bash
npm install --save @jonnsl/spreadsheet
```

## Examples

```javascript
function createEmptyRow(): string[] {
  return Array.from({ length: 26 }, () => "")
}

function Example() {
  const [rows, setRows] = useState([createEmptyRow(), createEmptyRow()]);

  return (
    <table className="spreadsheet">
      <thead>
        <tr>
          <th style={{ width: '45px' }}><div className="spreadsheet__corner"></div></th>
          { rows[0].map((_, index) => <th><div className="spreadsheet__header_cell">{ intToLetter(index + 1) }</div></th>) }
        </tr>
      </thead>
      <Spreadsheet createEmptyRow={createEmptyRow} rows={rows} onChange={(rows) => setRows(rows)} />
    </table>
  )
}
```

## Props

| Props | Options | Default | Description |
| - | - | - | - |
| createEmptyRow | () => string[] | undefined | Function to create an array with values of a empty row |
| rows | string[][] | undefined | Array of rows |
| onChange | (rows: string[][]) => void | undefined | The change event is fired when the user modifies a cell. |

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.
