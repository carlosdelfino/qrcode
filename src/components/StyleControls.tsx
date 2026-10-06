import type { QrStyle, DotType, CornerSquareType, CornerDotType, QrShape } from '../types'

interface StyleControlsProps {
  style: QrStyle
  onChange: (style: QrStyle) => void
}

const labelClass = 'mb-1 block text-sm font-medium'
const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]'
const selectClass = `${inputClass} pr-8`
const checkboxClass = 'h-4 w-4 accent-[var(--accent)]'
const colorClass =
  'h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-transparent p-1'

const dotTypes: DotType[] = [
  'square',
  'dots',
  'rounded',
  'extra-rounded',
  'classy',
  'classy-rounded',
]

const cornerSquareTypes: CornerSquareType[] = ['square', 'dot', 'extra-rounded']
const cornerDotTypes: CornerDotType[] = ['square', 'dot']
const shapes: QrShape[] = ['square', 'circle']
const errorLevels = ['L', 'M', 'Q', 'H'] as const
const sizes = [120, 240, 360, 600, 800, 1024] as const

export default function StyleControls({ style, onChange }: StyleControlsProps) {
  function patch<K extends keyof QrStyle>(key: K, value: QrStyle[K]) {
    onChange({ ...style, [key]: value })
  }

  function handleImageUpload(file?: File | null) {
    if (!file) {
      patch('image', undefined)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => patch('image', String(e.target?.result || ''))
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass}>Dimensão do QR Code (px)</label>
        <select
          className={selectClass}
          value={style.width}
          onChange={(e) => {
            const size = Number(e.target.value)
            patch('width', size)
            patch('height', size)
          }}
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s} × {s} px
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Cor do QR Code</label>
        <input
          type="color"
          className={colorClass}
          value={style.dotColor}
          onChange={(e) => patch('dotColor', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Forma dos pontos</label>
          <select
            className={selectClass}
            value={style.dotType}
            onChange={(e) => patch('dotType', e.target.value as DotType)}
          >
            {dotTypes.map((t) => (
              <option key={t} value={t}>
                {t === 'square' && 'Quadrado'}
                {t === 'dots' && 'Pontos'}
                {t === 'rounded' && 'Arredondado'}
                {t === 'extra-rounded' && 'Super arredondado'}
                {t === 'classy' && 'Elegante'}
                {t === 'classy-rounded' && 'Elegante arredondado'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Forma geral</label>
          <select
            className={selectClass}
            value={style.shape}
            onChange={(e) => patch('shape', e.target.value as QrShape)}
          >
            {shapes.map((s) => (
              <option key={s} value={s}>
                {s === 'square' ? 'Quadrada' : 'Circular'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Estilo dos cantos (externo)</label>
          <select
            className={selectClass}
            value={style.cornerSquareType}
            onChange={(e) => patch('cornerSquareType', e.target.value as CornerSquareType)}
          >
            {cornerSquareTypes.map((t) => (
              <option key={t} value={t}>
                {t === 'square' && 'Quadrado'}
                {t === 'dot' && 'Círculo'}
                {t === 'extra-rounded' && 'Arredondado'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Cor dos cantos externos</label>
          <input
            type="color"
            className={colorClass}
            value={style.cornerSquareColor}
            onChange={(e) => patch('cornerSquareColor', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Estilo dos cantos (interno)</label>
          <select
            className={selectClass}
            value={style.cornerDotType}
            onChange={(e) => patch('cornerDotType', e.target.value as CornerDotType)}
          >
            {cornerDotTypes.map((t) => (
              <option key={t} value={t}>
                {t === 'square' ? 'Quadrado' : 'Círculo'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Cor dos cantos internos</label>
          <input
            type="color"
            className={colorClass}
            value={style.cornerDotColor}
            onChange={(e) => patch('cornerDotColor', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Margem interna (px)</label>
          <input
            type="number"
            min={0}
            max={50}
            className={inputClass}
            value={style.margin}
            onChange={(e) => patch('margin', Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelClass}>Correção de erro</label>
          <select
            className={selectClass}
            value={style.errorCorrectionLevel}
            onChange={(e) => patch('errorCorrectionLevel', e.target.value as 'H' | 'Q' | 'M' | 'L')}
          >
            {errorLevels.map((l) => (
              <option key={l} value={l}>
                {l === 'L' && 'Baixa (~7%)'}
                {l === 'M' && 'Média (~15%)'}
                {l === 'Q' && 'Alta (~25%)'}
                {l === 'H' && 'Máxima (~30%)'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] p-4">
        <label className="mb-3 flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            className={checkboxClass}
            checked={style.hasBorder}
            onChange={(e) => patch('hasBorder', e.target.checked)}
          />
          Adicionar borda ao QR Code
        </label>

        {style.hasBorder && (
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div>
              <label className={labelClass}>Cor da borda</label>
              <input
                type="color"
                className={colorClass}
                value={style.borderColor}
                onChange={(e) => patch('borderColor', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Espessura (px)</label>
              <input
                type="number"
                min={0}
                max={100}
                className={inputClass}
                value={style.borderWidth}
                onChange={(e) => patch('borderWidth', Number(e.target.value))}
              />
            </div>
            <div>
              <label className={labelClass}>Arredondamento (px)</label>
              <input
                type="number"
                min={0}
                max={100}
                className={inputClass}
                value={style.borderRadius}
                onChange={(e) => patch('borderRadius', Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-[var(--border)] p-4">
        <label className="mb-3 block font-medium">Logo da empresa (central)</label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-[var(--text)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--accent)] file:px-3 file:py-2 file:font-medium file:text-white hover:file:bg-[var(--accent)]/90"
          onChange={(e) => handleImageUpload(e.target.files?.[0])}
        />

        {style.image && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Tamanho do logo (%)</label>
              <input
                type="number"
                min={5}
                max={50}
                className={inputClass}
                value={Math.round(style.imageSize * 100)}
                onChange={(e) => patch('imageSize', Number(e.target.value) / 100)}
              />
            </div>
            <div>
              <label className={labelClass}>Margem do logo (px)</label>
              <input
                type="number"
                min={0}
                max={50}
                className={inputClass}
                value={style.imageMargin}
                onChange={(e) => patch('imageMargin', Number(e.target.value))}
              />
            </div>
            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className={checkboxClass}
                  checked={style.hideImageDots}
                  onChange={(e) => patch('hideImageDots', e.target.checked)}
                />
                Ocultar pontos por trás
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
