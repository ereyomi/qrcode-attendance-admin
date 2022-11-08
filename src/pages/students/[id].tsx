import { useRouter } from 'next/router'
import useSWR from 'swr'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }

  return data
}
const Student = () => {
  const { query } = useRouter()
  const { data, error } = useSWR(() => query.id && `/api/students/${query.id}`, fetcher)

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>
  console.log( data )

  return (
    <Grid container spacing={ 6 }>
      <Grid item xs={6}>
        <Card>
          <CardHeader title='Student Name' titleTypographyProps={{ variant: 'h6' }} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Student
