export interface TableColumnI {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

export interface TableI {
  columns: TableColumnI[]
  rowsData: {
    id: string
    [x: string]: any
  }[]
}
