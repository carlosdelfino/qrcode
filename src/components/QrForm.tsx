import type { QrData } from '../types'

interface QrFormProps {
  data: QrData
  onChange: (data: QrData) => void
}

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]'

export default function QrForm({ data, onChange }: QrFormProps) {
  function update<T extends QrData['type']>(
    type: T,
    patch: Partial<Extract<QrData, { type: T }>['value']>
  ) {
    const current = data.type === type ? (data.value as any) : {}
    onChange({ type, value: { ...current, ...patch } } as QrData)
  }

  switch (data.type) {
    case 'url':
      return (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">URL do site</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://exemplo.com.br"
              value={data.value.url}
              onChange={(e) => update('url', { url: e.target.value })}
            />
          </div>
        </div>
      )

    case 'email':
      return (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">E-mail</label>
            <input
              type="email"
              className={inputClass}
              placeholder="contato@empresa.com"
              value={data.value.email}
              onChange={(e) => update('email', { email: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Assunto</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Orçamento"
              value={data.value.subject}
              onChange={(e) => update('email', { subject: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Mensagem</label>
            <textarea
              rows={3}
              className={inputClass}
              placeholder="Olá, gostaria de mais informações..."
              value={data.value.body}
              onChange={(e) => update('email', { body: e.target.value })}
            />
          </div>
        </div>
      )

    case 'whatsapp':
      return (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Telefone (WhatsApp)</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="+55 11 99999-9999"
              value={data.value.phone}
              onChange={(e) => update('whatsapp', { phone: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Mensagem pré-preenchida</label>
            <textarea
              rows={3}
              className={inputClass}
              placeholder="Olá, vi o QR Code e gostaria de..."
              value={data.value.message}
              onChange={(e) => update('whatsapp', { message: e.target.value })}
            />
          </div>
        </div>
      )

    case 'vcard':
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <input
              type="text"
              className={inputClass}
              placeholder="João"
              value={data.value.firstName}
              onChange={(e) => update('vcard', { firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Sobrenome</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Silva"
              value={data.value.lastName}
              onChange={(e) => update('vcard', { lastName: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Empresa</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Minha Empresa LTDA"
              value={data.value.company}
              onChange={(e) => update('vcard', { company: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Cargo</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Diretor Comercial"
              value={data.value.jobTitle}
              onChange={(e) => update('vcard', { jobTitle: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Telefone</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="+55 11 99999-9999"
              value={data.value.phone}
              onChange={(e) => update('vcard', { phone: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">WhatsApp</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="+55 11 99999-9999"
              value={data.value.whatsapp}
              onChange={(e) => update('vcard', { whatsapp: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">E-mail</label>
            <input
              type="email"
              className={inputClass}
              placeholder="joao@empresa.com"
              value={data.value.email}
              onChange={(e) => update('vcard', { email: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Site</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://empresa.com.br"
              value={data.value.website}
              onChange={(e) => update('vcard', { website: e.target.value })}
            />
          </div>
        </div>
      )

    default:
      return null
  }
}
