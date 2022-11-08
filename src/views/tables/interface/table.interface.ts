import {ReactNode} from 'react'

export interface TableColumnI {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

export interface TableI {
  columns: TableColumnI[]
  actionColumn?: (props?: any) => ReactNode
  rowsData: {
    id: string
    [x: string]: any
  }[]
}
