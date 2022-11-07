import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import React from 'react'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default index
