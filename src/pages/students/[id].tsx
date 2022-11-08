import { useRouter } from 'next/router'
import useSWR from 'swr'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { QRCodeCanvas } from 'qrcode.react'
import { toPng } from 'html-to-image'
import { useReactToPrint } from 'react-to-print'
import { useCallback, useRef } from 'react'

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

  const componentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })
  const onButtonClick = useCallback(() => {
    if (componentRef.current === null) {
      return
    }

    toPng(componentRef.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement('a')
        link.download = data.data.matricCode
        link.href = dataUrl
        link.click()
      })
      .catch(err => {
        console.log('toPNG error:::', err)
      })
  }, [componentRef, data])

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <Grid container spacing={6}>
      <Grid item xs={3}>
        <Card
          sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          ref={componentRef}
        >
          <CardHeader title='Student Details' titleTypographyProps={{ variant: 'h6' }} />
          <Avatar
            alt='Robert Meyer'
            src={data.data.imgUrl}
            sx={{
              width: 200,
              height: 200,
              border: theme => `0.25rem solid ${theme.palette.common.white}`
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h6'>
              {data.data.firstName} {data.data.lastName}
            </Typography>
            <Typography variant='caption'>{data.data.matricCode} </Typography>
          </Box>
          <Box
            sx={{
              width: 220,
              height: 220,
              padding: 2,
              backgroundColor: 'white',
              marginButtom: 10
            }}
          >
            <QRCodeCanvas
              value={JSON.stringify(data.data)}
              size={200}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'L'}
              includeMargin={false}
            />
          </Box>
        </Card>
        <Box
          sx={{
            width: 'full',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5
          }}
        >
          <Button onClick={handlePrint}>PDF Print</Button>
          <Button onClick={onButtonClick}>Download as image</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Student
