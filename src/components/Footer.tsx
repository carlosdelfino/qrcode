/**
 * Footer do aplicativo Gerador de QR Code.
 *
 * Reproduz o rodapé institucional do site https://rapport.tec.br, agrupando
 * links de navegação, redes sociais, serviços, contratos e dados cadastrais
 * da Rapport Tecnologia.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

const footerLinks = {
  sections: [
    { label: 'Início', href: 'https://rapport.tec.br/' },
    { label: 'Sobre', href: 'https://rapport.tec.br/sobre' },
    { label: 'Portfólio', href: 'https://rapport.tec.br/servicos/#portfolio-completo' },
    { label: 'Contato', href: 'https://rapport.tec.br/contato' },
    { label: 'Consultoria', href: 'https://rapport.tec.br/consultoria' },
    { label: 'Blog', href: 'https://rapport.tec.br/blog/' },
    { label: 'Siará Tech Summit', href: 'https://rapport.tec.br/siara-tech-summit/' },
    { label: 'Arquivo', href: 'https://rapport.tec.br/arquivo' },
  ],
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/rapporttecnologia' },
    { label: 'Twitter', href: 'https://twitter.com/rapport_tec' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rapport-tecnologia' },
    { label: 'GitHub', href: 'https://github.com/rapporttecnologia' },
  ],
  services: [
    { label: 'Serviço de Busca', href: 'https://busca.rapport.tec.br' },
    { label: 'Optimização de Prompt', href: 'https://prompt.rapport.tec.br' },
    { label: 'Indexação de Grupos', href: 'https://groups.rapport.tec.br' },
  ],
  contracts: [
    { label: 'Service Agreement UK', href: 'https://rapport.tec.br/contrato/en-gb/' },
    { label: 'Service Agreement US', href: 'https://rapport.tec.br/contrato/en-us/' },
    { label: 'Contrato España', href: 'https://rapport.tec.br/contrato/es/' },
    { label: 'Contrato Brasil', href: 'https://rapport.tec.br/contrato/pt-br/' },
    { label: 'Contrato Portugal', href: 'https://rapport.tec.br/contrato/pt-pt/' },
  ],
}

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#f39c12]">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#95a5a6] transition hover:text-[#F05F40]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-12 w-full rounded-3xl bg-[#222222] px-6 py-12 text-white sm:px-10">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <LinkColumn title="Seções do Site" links={footerLinks.sections} />
        <LinkColumn title="Redes Sociais" links={footerLinks.social} />
        <LinkColumn title="Serviços" links={footerLinks.services} />
        <LinkColumn title="Contratos" links={footerLinks.contracts} />
      </div>

      <div className="mt-10 border-t border-[#34495e] pt-8 text-sm text-[#95a5a6]">
        <p className="font-medium text-white">Raport Tecnologia Inova Simples</p>
        <p>CNPJ: 67.904.299/0001-80</p>
        <p>CEO/CTO/CDO: Carlos Delfino Carvalho Pinheiro</p>
        <p>
          Contato:{' '}
          <a className="text-[#f39c12] hover:underline" href="mailto:admin@rapport.tec.br">
            admin@rapport.tec.br
          </a>{' '}
          e{' '}
          <a
            className="text-[#f39c12] hover:underline"
            href="mailto:consultoria@carlosdelfino.eti.br"
          >
            consultoria@carlosdelfino.eti.br
          </a>
        </p>
        <p>
          WhatsApp:{' '}
          <a className="text-[#f39c12] hover:underline" href="https://wa.me/5585985205490">
            (+55 85) 98520-5490
          </a>
        </p>
        <p>Endereço: Aquiraz, Ceará, Brasil</p>

        <p className="mt-4">
          Seus dados com total confidencialidade de acordo com as normas da{' '}
          <a
            className="text-[#f39c12] hover:underline"
            href="https://rapport.tec.br/lgpd"
            target="_blank"
            rel="noopener noreferrer"
          >
            LGPD (Lei 13.709/2018)
          </a>
          .
        </p>
      </div>

      <div className="mt-8 border-t border-[#34495e] pt-6 text-center text-xs text-[#95a5a6]">
        <p>
          &copy; 2026{' '}
          <a
            className="text-[#f39c12] hover:underline"
            href="https://carlosdelfino.eti.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Carlos Delfino
          </a>
          . Autoria dos conceitos, projetos e concepção do layout. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
