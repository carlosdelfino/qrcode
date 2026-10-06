import { useEffect, useState, useRef } from 'react'
import type { QrData, QrStyle, QrType } from './types'
import QRCodeStyling from 'qr-code-styling'
import QrForm from './components/QrForm'
import QrPreview from './components/QrPreview'
import StyleControls from './components/StyleControls'
import Footer from './components/Footer'

const defaultData: Record<QrType, QrData> = {
  url: { type: 'url', value: { url: 'https://example.com' } },
  email: { type: 'email', value: { email: '', subject: '', body: '' } },
  whatsapp: { type: 'whatsapp', value: { phone: '', message: '' } },
  vcard: {
    type: 'vcard',
    value: {
      firstName: '',
      lastName: '',
      phone: '',
      whatsapp: '',
      email: '',
      website: '',
      company: '',
      jobTitle: '',
    },
  },
}

const defaultStyle: QrStyle = {
  width: 360,
  height: 360,
  dotType: 'rounded',
  dotColor: '#222222',
  bgColor: '#ffffff',
  cornerSquareType: 'extra-rounded',
  cornerSquareColor: '#F05F40',
  cornerDotType: 'dot',
  cornerDotColor: '#F05F40',
  shape: 'square',
  margin: 12,
  hasBorder: true,
  borderColor: '#F05F40',
  borderRadius: 24,
  borderWidth: 16,
  errorCorrectionLevel: 'H',
  imageSize: 0.35,
  imageMargin: 4,
  hideImageDots: true,
}

const typeLabels: Record<QrType, string> = {
  url: 'Link de site',
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  vcard: 'Cartão de visitas',
}

export default function App() {
  const [qrType, setQrType] = useState<QrType>('url')
  const [dataByType, setDataByType] = useState<Record<QrType, QrData>>(defaultData)
  const [style, setStyle] = useState<QrStyle>(defaultStyle)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const qrInstanceRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const data = dataByType[qrType]

  function changeType(type: QrType) {
    setQrType(type)
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  function setData(next: QrData) {
    setDataByType((prev) => ({ ...prev, [next.type]: next }))
  }

  function handleDownload(format: 'png' | 'svg') {
    if (!qrInstanceRef.current) return
    qrInstanceRef.current.download({ name: `qrcode-${Date.now()}`, extension: format })
  }

  async function handleCopyImage() {
    if (!qrInstanceRef.current) return

    try {
      const blob = await qrInstanceRef.current.getRawData('png')
      if (!blob) {
        setCopyStatus('error')
        return
      }

      if (!navigator.clipboard || !window.ClipboardItem) {
        setCopyStatus('error')
        return
      }

      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    } finally {
      setTimeout(() => setCopyStatus('idle'), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8 text-[var(--text)]">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-xl sm:p-10">
        <header className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h1 className="mb-2 text-3xl font-semibold text-[var(--text-h)] sm:text-4xl">
              Gerador de QR Code Rapport
            </h1>
            <p className="text-base">
              Crie QR Codes criativos para sites, e-mails, WhatsApp e cartões de visitas.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--code-bg)] p-2 text-[var(--text-h)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            {theme === 'light' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Tipo de QR Code</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(Object.keys(typeLabels) as QrType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => changeType(t)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                      qrType === t
                        ? 'border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--accent)]'
                        : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {typeLabels[t]}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]/30 p-5">
              <h2 className="mb-4 text-lg font-medium text-[var(--text-h)]">Conteúdo</h2>
              <QrForm data={data} onChange={setData} />
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]/30 p-5">
              <h2 className="mb-4 text-lg font-medium text-[var(--text-h)]">Aparência</h2>
              <StyleControls style={style} onChange={setStyle} />
            </div>
          </section>

          <section className="flex flex-col items-center justify-start rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]/20 p-6 lg:sticky lg:top-6 lg:self-start">
            <h2 className="mb-6 text-lg font-medium text-[var(--text-h)]">Pré-visualização</h2>
            <div className="rounded-3xl bg-white/50 p-6 shadow-inner">
              <QrPreview
                data={data}
                style={style}
                onInstance={(instance) => (qrInstanceRef.current = instance)}
              />
            </div>

            <div className="mt-8 flex w-full flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => handleDownload('png')}
                className="rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-white shadow-md transition hover:brightness-110"
              >
                Baixar PNG
              </button>
              <button
                type="button"
                onClick={() => handleDownload('svg')}
                className="rounded-xl border border-[var(--accent)] bg-[var(--accent-bg)] px-6 py-3 font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
              >
                Baixar SVG
              </button>
              <button
                type="button"
                onClick={handleCopyImage}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-6 py-3 font-medium text-[var(--text-h)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {copyStatus === 'copied'
                  ? 'Imagem copiada!'
                  : copyStatus === 'error'
                    ? 'Erro ao copiar'
                    : 'Copiar imagem'}
              </button>
            </div>

            <p className="mt-4 text-xs text-[var(--text)]/70">
              Use alta correção de erro quando adicionar um logo central.
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  )
}
