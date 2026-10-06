export type QrType = 'url' | 'email' | 'vcard' | 'whatsapp'

export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'extra-rounded'
  | 'classy'
  | 'classy-rounded'

export type CornerSquareType = 'square' | 'dot' | 'extra-rounded'
export type CornerDotType = 'square' | 'dot'
export type QrShape = 'square' | 'circle'

export interface UrlData {
  url: string
}

export interface EmailData {
  email: string
  subject: string
  body: string
}

export interface VCardData {
  firstName: string
  lastName: string
  phone: string
  whatsapp: string
  email: string
  website: string
  company: string
  jobTitle: string
}

export interface WhatsAppData {
  phone: string
  message: string
}

export type QrData =
  | { type: 'url'; value: UrlData }
  | { type: 'email'; value: EmailData }
  | { type: 'vcard'; value: VCardData }
  | { type: 'whatsapp'; value: WhatsAppData }

export interface QrStyle {
  width: number
  height: number
  dotType: DotType
  dotColor: string
  bgColor: string
  cornerSquareType: CornerSquareType
  cornerSquareColor: string
  cornerDotType: CornerDotType
  cornerDotColor: string
  shape: QrShape
  margin: number
  hasBorder: boolean
  borderColor: string
  borderRadius: number
  borderWidth: number
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  image?: string
  imageSize: number
  imageMargin: number
  hideImageDots: boolean
}
