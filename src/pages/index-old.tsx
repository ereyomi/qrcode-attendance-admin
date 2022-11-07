import { QRCodeCanvas } from 'qrcode.react'
import { useCallback, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Box from '@mui/material/Box'
import { toPng } from 'html-to-image'
import QRNew from 'src/qrcode/QrNew'

const studentDetails = {
  name: 'ereyomi',
  age: 25
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jsonD = JSON.stringify(studentDetails)

const QRCode = () => {
  const componentRef = useRef<HTMLDivElement>(null)
  const [qrCodeString, setQrCodeString] = useState<string>('no qr code')
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
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch(err => {
        console.log('toPNG error:::', err)
      })
  }, [componentRef])

  return (
    <Box>
      <Box
        sx={{
          marginBottom: 5
        }}
      >
        <input
          type='text'
          value={qrCodeString}
          onChange={e => setQrCodeString(e.target.value)}
          placeholder='Enter QR string here'
        />
      </Box>
      <Box
        sx={{
          width: 200,
          height: 200,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7]
          }
        }}
      >
        <div ref={componentRef}>
          <QRCodeCanvas
            value={jsonD}
            size={200}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'L'}
            includeMargin={false}
          />
        </div>
      </Box>
      <button onClick={handlePrint}>Print this out!</button>
      <button onClick={onButtonClick}>Download as image</button>
      <Box
        sx={{
          width: 500,
          height: 500,
          marginBottom: 50
        }}
      >
        <QRNew />
      </Box>
    </Box>
  )
}

export default QRCode
