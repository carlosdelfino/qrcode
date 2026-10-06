# Gerador de QR Code Rapport

Aplicação React + TypeScript + Vite para criar QR Codes estilizados de forma criativa.

## Funcionalidades

- Tipos de QR Code:
  - **Link de site** (URL)
  - **E-mail** (com assunto e mensagem pré-preenchida)
  - **WhatsApp** (com mensagem pré-preenchida)
  - **Cartão de visitas** (vCard com nome, empresa, cargo, telefone, WhatsApp, e-mail e site)
- Personalização visual:
  - Cor do QR Code via seletor de cores
  - Fundo do QR Code sempre branco
  - Formato dos pontos: quadrado, pontos, arredondado, super arredondado, elegante e elegante arredondado
  - Formato geral: quadrado ou circular
  - Estilos independentes para cantos externos e internos
  - Borda opcional com cor, espessura e arredondamento ajustáveis
  - Logo da empresa no centro do QR Code
  - Correção de erro configurável (recomendado "H" com logo)
- Dimensões do QR Code: 120, 240, 360, 600, 800 e 1024 px
- Exportação em PNG ou SVG
- Copiar imagem do QR Code diretamente para a área de transferência

## Scripts

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Deploy no Vercel

O projeto já está configurado para deploy no Vercel. Acesse [vercel.com](https://vercel.com), importe o repositório e use as seguintes configurações (já definidas em `vercel.json`):

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Ou faça deploy pela CLI:

```bash
npm i -g vercel
vercel --prod
```

## Tecnologias

- [React](https://react.dev)
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [qr-code-styling](https://www.npmjs.com/package/qr-code-styling)
