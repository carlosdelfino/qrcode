import type { QrData } from '../types'

export function buildQrPayload(data: QrData): string {
  switch (data.type) {
    case 'url':
      return data.value.url.trim() || 'https://example.com'

    case 'email': {
      const { email, subject, body } = data.value
      const params = new URLSearchParams()
      if (subject.trim()) params.set('subject', subject.trim())
      if (body.trim()) params.set('body', body.trim())
      const query = params.toString()
      return query
        ? `mailto:${email.trim()}?${query}`
        : `mailto:${email.trim()}`
    }

    case 'whatsapp': {
      const phone = data.value.phone.replace(/\D/g, '')
      const message = encodeURIComponent(data.value.message.trim())
      return message
        ? `https://wa.me/${phone}?text=${message}`
        : `https://wa.me/${phone}`
    }

    case 'vcard': {
      const v = data.value
      const name = `${v.firstName.trim()} ${v.lastName.trim()}`.trim()
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name || 'Contato'}`,
        name && `N:${v.lastName.trim()};${v.firstName.trim()};;;`,
        v.company.trim() && `ORG:${v.company.trim()}`,
        v.jobTitle.trim() && `TITLE:${v.jobTitle.trim()}`,
        v.phone.trim() && `TEL;TYPE=CELL:${v.phone.trim()}`,
        v.whatsapp.trim() && `TEL;TYPE=CELL:${v.whatsapp.trim()}`,
        v.email.trim() && `EMAIL:${v.email.trim()}`,
        v.website.trim() && `URL:${v.website.trim()}`,
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n')
      return lines
    }

    default:
      return ''
  }
}
