import useSWR from 'swr'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import React from 'react'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { TableColumnI } from 'src/views/tables/interface/table.interface'
import { NextPage } from 'next'

const columnsData: TableColumnI[] = [
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  {
    id: 'matricCode',
    label: 'Matric Code',
    minWidth: 170
  }
]
const ActionColumn = (props: any): JSX.Element => {
  return (
    <Button size='small' href={`/students/${props.id}`}>
      View
    </Button>
  )
}
const fetcher = (url: string) => fetch(url).then(res => res.json())

const index: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR('/api/students', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Student Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader columns={columnsData} rowsData={data.data} actionColumn={ActionColumn} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default index
