import React, { useCallback, useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import { Box } from 'mdi-material-ui'

export type CamResultI = {
  cornerPoints: Array<{ x: number; y: number }>
  data: string
}
export interface CamListI {
  id: string
  label: string
}

const QRNew = () => {
  const camInitializeState = useRef<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const qrRefScanner = useRef<any>(null)
  const qrVideoRef = useRef<HTMLVideoElement>(null)

  // const showScanRegionInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [camResult, setCamResult] = useState<CamResultI>({
    cornerPoints: [],
    data: ''
  })
  const [camHasFlash, setCamHasFlash] = useState<boolean>(false)
  const [camHasCamera, setCamHasCamera] = useState<boolean>(false)
  const [flashState, setFlashState] = useState<string>('off')
  const [showScanRegion, setShowScanRegion] = useState<boolean>(false)
  const scannedRegionRef = useRef<HTMLDivElement>(null)
  const [appCameras, setAppCameras] = useState<CamListI[]>([
    {
      id: 'environment',
      label: '  Environment Facing (default)'
    },
    {
      id: 'user',
      label: 'User Facing'
    }
  ])
  const camInitialize = useCallback(() => {
    qrRefScanner.current.start().then(() => {
      updateFlashAvailability()

      // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
      // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
      // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
      // start the scanner earlier.
      QrScanner.listCameras(true).then((cameras: CamListI[]) => {
        setAppCameras(prevCam => [...prevCam, ...cameras])
      })
    })
    camInitializeState.current = true
  }, [])

  const setResult = useCallback((result: CamResultI) => {
    setCamResult(result)
    stopScan()

    console.log(qrRefScanner.current.$canvas)
    createCavans()
  }, [])

  useEffect(() => {
    qrRefScanner.current = new QrScanner(
      qrVideoRef.current as HTMLVideoElement,
      (result: CamResultI) => setResult(result),
      {
        onDecodeError: (error: any) => {
          console.log('error::::', error)
        },
        highlightScanRegion: true,
        highlightCodeOutline: true
      }
    )

    // startScan()
    QrScanner.hasCamera().then(hasCamera => setCamHasCamera(hasCamera))

    return () => {
      if (qrRefScanner?.current) {
        qrRefScanner.current.stop()
        qrRefScanner.current.destroy()
        qrRefScanner.current = null
        camInitializeState.current = false
      }
    }
  }, [setResult])

  const stopScan = () => {
    if (qrRefScanner.current) {
      qrRefScanner.current.stop()
    }
  }

  const startScan = () => {
    if (!camInitializeState.current) {
      camInitialize()
    }
    if (qrRefScanner.current) {
      qrRefScanner.current.start()
    }
  }

  const handleFile = (event: any) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    console.log(fileObj)

    // 👇️ reset file input
    event.target.value = null
    QrScanner.scanImage(fileObj, { returnDetailedScanResult: true })
      .then((result: CamResultI) => setResult(result))
      .catch(e => console.log('input:::', e)) //  || 'No QR code found.'))
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleHighlighStyle = (_e: any) => {
    // videoContainer.className = e.target.value
    qrRefScanner.current._updateOverlay() // reposition the highlight because style 2 sets position: relative
  }

  const createCavans = () => {
    if (scannedRegionRef.current) {
      scannedRegionRef.current.innerHTML = ''
      scannedRegionRef.current?.appendChild(qrRefScanner.current.$canvas)
      setShowScanRegion(true)
    }
  }
  const handleShowScanRegion = (e: any) => {
    const input = e.target

    // const label = input.parentNode
    if (input.checked) {
      createCavans()
    } else {
      setShowScanRegion(false)
    }
    qrRefScanner.current.$canvas.style.display = input.checked ? 'block' : 'none'
  }
  const handleInversionMode = (event: any) => {
    qrRefScanner.current.setInversionMode(event.target.value)
  }

  const updateFlashAvailability = () => {
    qrRefScanner.current.hasFlash().then((hasFlash: boolean) => {
      setCamHasFlash(hasFlash)
    })
  }

  const handleCamList = (event: any) => {
    qrRefScanner.current.setCamera(event.target.value).then(updateFlashAvailability)
  }

  const flashToggle = () => {
    qrRefScanner.current.toggleFlash().then(() => setFlashState(qrRefScanner.current.isFlashOn() ? 'on' : 'off'))
  }

  return (
    <div>
      <h1>Scan from WebCam:</h1>
      <div id='video-container'>
        <video id='qr-video' ref={qrVideoRef} />
      </div>

      <div>
        <label>
          Highlight Style
          <select id='scan-region-highlight-style-select' onChange={handleHighlighStyle}>
            <option value='default-style'>Default style</option>
            <option value='example-style-1'>Example custom style 1</option>
            <option value='example-style-2'>Example custom style 2</option>
          </select>
        </label>
        <label>
          <input id='show-scan-region' type='checkbox' onChange={handleShowScanRegion} checked={showScanRegion} />
          Show scan region canvas
        </label>
        <div ref={scannedRegionRef}></div>
      </div>
      <div>
        <select id='inversion-mode-select' onChange={handleInversionMode}>
          <option value='original'>Scan original (dark QR code on bright background)</option>
          <option value='invert'>Scan with inverted colors (bright QR code on dark background)</option>
          <option value='both'>Scan both</option>
        </select>
        <br />
      </div>
      <b>Device has camera: </b>
      <span id='cam-has-camera'>{camHasCamera ? 'has camera' : 'no camera'}</span>
      <br />
      <div>
        <b>Preferred camera:</b>
        <select id='cam-list' onChange={handleCamList}>
          {appCameras &&
            appCameras.map((v, index: number) => (
              <option key={`${v.id}${index}`} value={v.id}>
                {v.label}
              </option>
            ))}
        </select>
      </div>
      <b>Camera has flash: </b>
      <span id='cam-has-flash'></span>
      <div>
        {camHasFlash && (
          <button id='flash-toggle' onClick={flashToggle}>
            📸 Flash: <span id='flash-state'>{flashState}</span>
          </button>
        )}
      </div>
      <br />
      <b>Detected QR code: </b>
      <span id='cam-qr-result'>{camResult?.data}</span>
      <br />
      <b>Last detected at: </b>
      <span id='cam-qr-result-timestamp'></span>
      <br />
      <button id='start-button' onClick={() => startScan()}>
        Scan
      </button>
      <button id='stop-button' onClick={() => stopScan()}>
        Stop
      </button>
      <hr />

      <h1>Scan from File:</h1>
      <input type='file' id='file-selector' ref={inputRef} onChange={handleFile} />
      <b>Detected QR code: </b>
      <span id='file-qr-result'>{camResult?.data}</span>
    </div>
  )
}

export default QRNew
