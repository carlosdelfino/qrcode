import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import type { QrData, QrStyle } from '../types'
import { buildQrPayload } from '../utils/qrData'

interface QrPreviewProps {
  data: QrData
  style: QrStyle
  onInstance?: (instance: QRCodeStyling) => void
}

export default function QrPreview({ data, style, onInstance }: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const options = {
      width: style.width,
      height: style.height,
      type: 'svg' as const,
      data: buildQrPayload(data),
      margin: style.margin,
      qrOptions: {
        errorCorrectionLevel: style.errorCorrectionLevel,
      },
      dotsOptions: {
        type: style.dotType,
        color: style.dotColor,
      },
      cornersSquareOptions: {
        type: style.cornerSquareType,
        color: style.cornerSquareColor,
      },
      cornersDotOptions: {
        type: style.cornerDotType,
        color: style.cornerDotColor,
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      image: style.image,
      imageOptions: {
        crossOrigin: 'anonymous' as const,
        margin: style.imageMargin,
        imageSize: style.imageSize,
        hideBackgroundDots: style.hideImageDots,
      },
    }

    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(options)
      qrRef.current.append(container)
      onInstance?.(qrRef.current)
    } else {
      qrRef.current.update(options)
    }

    return () => {
      container.innerHTML = ''
      qrRef.current = null
    }
  }, [data, style, onInstance])

  return (
    <div
      className="inline-flex items-center justify-center bg-transparent"
      style={{
        padding: style.hasBorder ? style.borderWidth : 0,
        borderRadius: style.hasBorder ? style.borderRadius : 0,
        backgroundColor: style.hasBorder ? style.borderColor : 'transparent',
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: style.width,
          height: style.height,
          borderRadius: style.shape === 'circle' ? '50%' : 0,
          overflow: style.shape === 'circle' ? 'hidden' : 'visible',
        }}
      />
    </div>
  )
}
