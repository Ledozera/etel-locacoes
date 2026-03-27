import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botField: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botField) return; // honeypot

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: "Contato do Site - ETEL", email: "programa@etelestudos.com.br" },
          replyTo: { name: formData.name, email: formData.email },
          to: [{ email: "programa@etelestudos.com.br" }],
          subject: `Novo Contato do Site: ${formData.name}`,
          htmlContent: `
            <html>
              <body>
                <h2 style="color: #FAA025;">Novo Contato - ETEL Locações</h2>
                <p>Você recebeu uma nova mensagem através da página de contato do site.</p>
                <hr />
                <p><strong>Nome Completo:</strong> ${formData.name}</p>
                <p><strong>E-mail:</strong> ${formData.email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${formData.message}</p>
              </body>
            </html>
          `
        })
      });

      if (!response.ok) throw new Error('Falha ao enviar e-mail');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', botField: '' });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24">
      {/* Hero Section: History & Mission */}
      <section className="relative min-h-[716px] flex items-center px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent z-10"></div>
          <img alt="Industrial" className="w-full h-full object-cover grayscale opacity-30" src="/contato.jpg" />
        </div>
        <div className="relative z-20 max-w-4xl">
          <span className="text-primary-container font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Nossa Trajetória</span>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface mb-8 leading-tight">
            Excelência em <span className="text-primary-container">Engenharia</span> e Mobilidade.
          </h1>
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-xl font-headline font-bold text-white mb-4">A História</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Fundada com o propósito de inovar no setor de locação industrial, a ETEL Locações nasce com a missão de entregar soluções de alta performance. Com visão de futuro e foco na excelência, estamos preparados para prover a infraestrutura necessária para grandes obras e operações logísticas, unindo robustez técnica e tecnologia desde o primeiro dia.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-headline font-bold text-white mb-4">Nossa Missão</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Viabilizar o progresso através do fornecimento de ativos de alta qualidade, garantindo segurança operacional e eficiência de custos para nossos parceiros. Nosso compromisso é com a disponibilidade total e o suporte técnico ininterrupto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Info Cards */}
      <section className="px-8 md:px-20 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp Card */}
            <div className="bg-surface-container-high p-8 group hover:bg-surface-container-highest transition-all duration-500 rounded-lg">
              <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center mb-6 text-primary-container group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">chat</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-white mb-2">WhatsApp Direct</h4>
              <p className="text-on-surface-variant text-sm mb-6">Atendimento ágil para orçamentos e dúvidas rápidas.</p>
              <a className="text-primary-container font-headline font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform" href="https://wa.me/554132621133" target="_blank" rel="noopener noreferrer">
                CONECTAR AGORA <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-surface-container-high p-8 group hover:bg-surface-container-highest transition-all duration-500 rounded-lg">
              <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center mb-6 text-primary-container group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">call</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-white mb-2">Central de Locação</h4>
              <p className="text-on-surface-variant text-sm mb-6">Fale diretamente com nossos consultores técnicos.</p>
              <span className="text-white font-headline font-bold text-xl">+55 (41) 3262-1133</span>
            </div>

            {/* Email Card */}
            <div className="bg-surface-container-high p-8 group hover:bg-surface-container-highest transition-all duration-500 rounded-lg">
              <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center mb-6 text-primary-container group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-white mb-2">Email Corporativo</h4>
              <p className="text-on-surface-variant text-sm mb-6">Para propostas formais e parcerias estratégicas.</p>
              <a className="text-on-surface font-body border-b border-outline-variant pb-1" href="mailto:contato@etel.com.br">contato@etel.com.br</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section id="form-contato" className="px-8 md:px-20 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-headline font-extrabold text-white mb-4">Envie uma Mensagem</h2>
            <p className="text-on-surface-variant mb-12 max-w-md">Preencha o formulário abaixo e nossa equipe retornará em até 24 horas úteis com uma solução personalizada.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Nome Completo</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface placeholder-on-surface-variant/30 py-4 px-4 transition-all duration-300" 
                  placeholder="Ex: João Silva" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">E-mail Corporativo</label>
                <input 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface placeholder-on-surface-variant/30 py-4 px-4 transition-all duration-300" 
                  placeholder="nome@empresa.com.br" 
                  type="email" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Mensagem</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface placeholder-on-surface-variant/30 py-4 px-4 transition-all duration-300" 
                  placeholder="Como podemos ajudar sua operação?" 
                  rows={4}
                ></textarea>
              </div>

              {/* Honeypot */}
              <input type="text" className="hidden" value={formData.botField} onChange={e => setFormData({...formData, botField: e.target.value})} tabIndex={-1} autoComplete="off" />

              {submitStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded text-sm text-center">
                  Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded text-sm text-center">
                  Ops! Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.
                </div>
              )}

              <button disabled={isSubmitting} className="w-full md:w-auto px-12 py-4 bg-primary-container text-on-primary font-headline font-black uppercase tracking-tighter hover:bg-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-primary-container/10" type="submit">
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
              </button>
            </form>
          </div>

          {/* Dark Mode Map */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary-container/5 rounded-xl blur-2xl group-hover:bg-primary-container/10 transition-colors"></div>
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container-low pointer-events-auto">
              <div className="absolute inset-0 z-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.203923588924!2d-49.2705597!3d-25.4314445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce413c23e8045%3A0xe54e3d31afebed73!2sR.%20Alfredo%20Bufren%2C%20285%20-%20Centro%2C%20Curitiba%20-%20PR%2C%2080020-240!5e0!3m2!1spt-BR!2sbr!4v1711000000000!5m2!1spt-BR!2sbr"
                  className="w-full h-full border-0 grayscale-[0.8] invert-[0.9] hue-rotate-[180deg] contrast-125"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Matriz ETEL"
                ></iframe>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-6 border-l-4 border-primary-container pointer-events-none">
                <h5 className="text-white font-headline font-bold mb-1">Matriz - PR</h5>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Rua Alfredo Bufren, 285 - Bloco B Sala 4<br />Curitiba - PR, 80020-240
                </p>
                <div className="mt-4 flex gap-4 pointer-events-auto">
                  <a className="text-[10px] font-bold text-primary-container uppercase tracking-widest hover:underline" href="https://maps.app.goo.gl/NNoJiQ4r1m3Neoxd7" target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
