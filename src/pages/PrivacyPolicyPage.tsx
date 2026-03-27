export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-20 min-h-screen max-w-4xl mx-auto px-6 lg:px-12">
      <h1 className="font-headline text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-8">
        Política de Privacidade
      </h1>
      
      <div className="prose prose-invert max-w-none text-on-surface-variant font-body leading-relaxed space-y-6">
        <p>
          A <strong>ETEL Locações LTDA</strong> respeita a sua privacidade e está empenhada em proteger as suas informações pessoais, atuando de acordo com as disposições da <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong> e demais legislações aplicáveis no Brasil.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">1. Coleta de Dados Pessoais</h2>
        <p>
          Podemos coletar os seguintes dados em diferentes interações que você tem com a nossa plataforma:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Dados Cadastrais e de Contato:</strong> Nome completo, e-mail, telefone e informações da empresa inseridas por você nos formulários de "Fale Conosco" e/ou "Orçamento".</li>
            <li><strong>Dados de Navegação (Cookies):</strong> Informações como endereço IP, tipo de navegador, sistema operacional e as páginas visitadas em nosso site para garantir o bom funcionamento tecnológico e gerar métricas anônimas de usabilidade.</li>
          </ul>
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">2. Finalidade do Uso das Informações</h2>
        <p>
          Os dados coletados são utilizados única e exclusivamente para:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Responder a dúvidas, enviar cotações e orçamentos referentes à locação de frotas e/ou equipamentos pesados.</li>
            <li>Gestão comercial e andamento das contratações de serviço mediante o seu interesse expresso.</li>
            <li>Envio eventual de informações relevantes sobre nossos serviços (caso tenhamos o seu consentimento).</li>
            <li>Cumprimento de obrigações legais, auditorias legais ou ordens judiciais.</li>
          </ul>
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">3. Compartilhamento de Dados</h2>
        <p>
          A ETEL Locações assegura agir de forma lícita e transparente. Nós <strong>não vendemos, não alugamos e nem compartilhamos</strong> suas informações com terceiros para fins publicitários que não os nossos próprios institucionais. Compartilhamos dados apenas com fornecedores de infraestrutura técnica (provedores de hospedagem) sob rigorosos acordos de sigilo, e apenas na medida em que isso seja imprescindível.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">4. Retenção e Segurança dos Dados</h2>
        <p>
          Seus dados serão retidos apenas pelo tempo necessário para atingir as finalidades para as quais foram coletados ou enquanto houver necessidade legal de arquivamento. Adotamos medidas e controles rigorosos de segurança técnica para dificultar acessos não autorizados, vazamentos acidentais ou perda de integridade dos registros que armazenamos.
        </p>

        <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">5. Seus Direitos enquanto Titular dos Dados</h2>
        <p>
          Conforme diretrizes trazidas pela LGPD, a qualquer momento você, como titular de dados, detém os direitos de:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Confirmar a existência de processamento dos seus dados;</li>
            <li>Requerer o acesso, atualização, retificação ou exclusão de suas informações;</li>
            <li>Revogar o seu consentimento sobre determinado tratamento prestado anteriormente.</li>
          </ul>
        </p>
        <p>
          Para pleitear quaisquer dos direitos mencionados acima, entre em contato através dos dados disponibilizados abaixo. Solicitaremos apenas as informações mínimas viáveis para confirmar a conformidade do requerimento.
        </p>

        <div className="bg-surface-container-low p-6 rounded-xl mt-12 border border-outline-variant/30">
          <h3 className="font-headline font-bold text-on-surface mb-2">Encarregado de Proteção de Dados (DPO) / Dúvidas</h3>
          <p className="text-sm">
            Para dúvidas relativas ao uso dos seus dados, você pode acionar os nossos canais:
            <br/><br/>
            <strong>Empresa:</strong> ETEL Locações LTDA<br/>
            <strong>CNPJ:</strong> 61.813.561/0001-02<br/>
            <strong>Responsável (E-mail):</strong> <a href="mailto:locacoes@etelestudos.com.br" className="text-primary hover:underline">locacoes@etelestudos.com.br</a>
          </p>
        </div>
      </div>
    </main>
  );
}
