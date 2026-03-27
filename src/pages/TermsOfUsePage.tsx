export default function TermsOfUsePage() {
  return (
    <main className="pt-32 pb-20 min-h-screen max-w-4xl mx-auto px-6 lg:px-12">
      <h1 className="font-headline text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-8">
        Termos de Uso
      </h1>
      
      <div className="prose prose-invert max-w-none text-on-surface-variant font-body leading-relaxed space-y-6">
        <p>
          Bem-vindo ao site da <strong>ETEL Locações LTDA</strong>. Ao acessar e utilizar este site, você concorda com os seguintes Termos de Uso. Recomendamos que os leia atentamente antes de prosseguir com a navegação ou locação de veículos e equipamentos.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">1. Aceitação dos Termos</h2>
        <p>
          A utilização deste site implica na aceitação plena e sem reservas de todos os itens estabelecidos nestes Termos de Uso. Caso você não concorde com alguma condição, solicitamos que suspenda o uso de nossa plataforma.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">2. Serviços Oferecidos</h2>
        <p>
          A ETEL Locações atua na área de mobilidade corporativa, oferecendo locação de frota de veículos (executivos, SUVs, utilitários, etc.) e locação de equipamentos pesados para construção civil e infraestrutura. As informações, modelos de veículos e equipamentos apresentados neste site têm finalidade de catálogo visual e podem sofrer alterações sem aviso prévio. A efetivação da locação está condicionada à assinatura de contrato específico e análise cadastral.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">3. Obrigações e Responsabilidades do Usuário</h2>
        <p>
          O usuário compromete-se a:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Fornecer informações verdadeiras e exatas ao preencher formulários de contato ou solicitações de orçamento.</li>
            <li>Não utilizar o site de forma a causar danos, interrupções ou sobrecarga nos sistemas da ETEL Locações.</li>
            <li>Ler atentamente todos os descritivos dos veículos e equipamentos referentes a seguros, manutenções e requisitos para operação antes da assinatura do contrato final.</li>
          </ul>
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">4. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo presente neste site, como marcas, logotipos, textos, imagens e design gráfico, é de propriedade exclusiva da ETEL Locações LTDA ou de parceiros licenciantes, estando protegido pelas leis brasileiras de direitos autorais e propriedade industrial. É vedada a reprodução total ou parcial destes conteúdos sem prévia autorização.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">5. Limitação de Responsabilidade</h2>
        <p>
          A ETEL Locações se empenha em manter as informações do site atualizadas e precisas. No entanto, não garantimos a total ausência de falhas tecnológicas, interrupções momentâneas ou que as descrições dos equipamentos estejam sempre isentas de pequenas variações em relação ao estoque físico disponível. Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso inadequado deste portal.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">6. Alterações nos Termos</h2>
        <p>
          Reservamo-nos o direito de alterar, adicionar ou remover partes destes Termos de Uso a qualquer tempo, sendo sua responsabilidade verificá-los periodicamente para estar a par das modificações.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">7. Legislação e Foro Aplicável</h2>
        <p>
          Estes Termos de Uso são regidos pela legislação da República Federativa do Brasil. As partes elegem o foro da Comarca pertinente à sede da empresa para dirimir quaisquer questões originadas deste documento.
        </p>

        <div className="bg-surface-container-low p-6 rounded-xl mt-12 border border-outline-variant/30">
          <h3 className="font-headline font-bold text-on-surface mb-2">Dados da Empresa</h3>
          <p className="text-sm">
            <strong>Razão Social:</strong> ETEL Locações LTDA<br/>
            <strong>CNPJ:</strong> 61.813.561/0001-02<br/>
            <strong>E-mail de Contato:</strong> <a href="mailto:locacoes@etelestudos.com.br" className="text-primary hover:underline">locacoes@etelestudos.com.br</a>
          </p>
        </div>
      </div>
    </main>
  );
}
