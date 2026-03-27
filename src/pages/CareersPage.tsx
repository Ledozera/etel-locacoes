import React, { useState, useEffect } from 'react';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
    botField: '' // Honeypot
  });
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Math Captcha
  const [captchaDocs, setCaptchaDocs] = useState({ n1: 0, n2: 0, show: false });
  const [captchaInput, setCaptchaInput] = useState('');

  useEffect(() => {
    setCaptchaDocs({
      n1: Math.floor(Math.random() * 10) + 1,
      n2: Math.floor(Math.random() * 10) + 1,
      show: true
    });
  }, []);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check: Se botField estiver preenchido, é um bot automático
    if (formData.botField) {
      console.warn("Spam detected");
      return; 
    }

    // Captcha validation
    if (parseInt(captchaInput) !== captchaDocs.n1 + captchaDocs.n2) {
      alert("A resposta da soma matemática está incorreta. Tente novamente.");
      return;
    }

    if (!file) {
      alert("Por favor, anexe seu currículo.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const base64File = await convertToBase64(file);
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: formData.name, email: formData.email },
          to: [{ email: "programa@etelestudos.com.br" }],
          subject: `Novo Currículo Recebido: ${formData.name} - ${formData.role}`,
          htmlContent: `
            <html>
              <body>
                <h2 style="color: #FAA025;">Novo Currículo - ETEL Locações</h2>
                <p>Você recebeu uma nova candidatura através do site.</p>
                <hr />
                <p><strong>Nome Completo:</strong> ${formData.name}</p>
                <p><strong>E-mail:</strong> ${formData.email}</p>
                <p><strong>Telefone / WhatsApp:</strong> ${formData.phone}</p>
                <p><strong>Área de Interesse:</strong> ${formData.role}</p>
                <p><strong>Apresentação:</strong></p>
                <p>${formData.message || "Nenhuma apresentação informada."}</p>
                <hr />
                <p><em>O currículo segue em anexo a este e-mail.</em></p>
              </body>
            </html>
          `,
          attachment: [
            {
              content: base64File,
              name: file.name
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Brevo API Error:", errorData);
        throw new Error('Falha ao enviar e-mail pela API');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', role: '', message: '', botField: '' });
      setFile(null);
      setCaptchaInput('');
      setCaptchaDocs({
        n1: Math.floor(Math.random() * 10) + 1,
        n2: Math.floor(Math.random() * 10) + 1,
        show: true
      });
      
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <main className="pt-24 bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative px-8 md:px-20 py-32 bg-[#131314] overflow-hidden border-b border-surface-container-high">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-surface-container-high/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl">
          <span className="text-primary-container font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
            Carreiras
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface mb-8 leading-tight">
            Venha fazer parte do nosso <span className="text-primary-container">time</span>.
          </h1>
          <p className="text-on-surface-variant font-body leading-relaxed md:text-lg max-w-3xl">
            Buscamos talentos comprometidos com a excelência técnica e inovação. Na ETEL, você fará parte de uma equipe de alta performance estruturando o futuro das locações industriais no Brasil.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-8 md:px-20 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-headline font-extrabold text-white mb-6">Trabalhe Conosco</h2>
            <p className="text-on-surface-variant mb-10 text-lg">
              Envie seu currículo para nosso banco de talentos através do formulário abaixo ou, se preferir, diretamente para o e-mail:
            </p>
            <div className="bg-surface-container-low p-8 border border-outline-variant/10 rounded-xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary-container/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">E-mail para currículos</div>
                  <a href="mailto:programa@etelestudos.com.br" className="text-xl font-headline font-bold text-white hover:text-primary-container transition-colors">
                    programa@etelestudos.com.br
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-xl font-headline font-bold text-white mb-3">Oportunidades</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Temos constantemente vagas para as áreas operacionais, manutenção de equipamentos, engenharia, comercial e administrativo.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-headline font-bold text-white mb-3">Desenvolvimento</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Investimos no crescimento profissional da nossa equipe com treinamentos contínuos e planos de carreira bem estruturados.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant/10 p-8 md:p-12 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Nome Completo</label>
                  <input 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface placeholder-on-surface-variant/30 py-4 px-4 transition-all duration-300 rounded-t-sm" 
                    placeholder="Ex: João Silva" 
                    type="text" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Seu E-mail</label>
                  <input 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface placeholder-on-surface-variant/30 py-4 px-4 transition-all duration-300 rounded-t-sm" 
                    placeholder="vaga@exemplo.com.br" 
                    type="email" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Telefone / WhatsApp</label>
                  <input 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface placeholder-on-surface-variant/30 py-4 px-4 transition-all duration-300 rounded-t-sm" 
                    placeholder="(00) 00000-0000" 
                    type="tel" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Área de Interesse</label>
                  <select 
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface py-4 px-4 transition-all duration-300 appearance-none rounded-t-sm"
                  >
                    <option value="" disabled className="text-on-surface-variant/30">Selecione uma área</option>
                    <option value="Operacional">Operacional</option>
                    <option value="Engenharia">Engenharia</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Apresentação (Opcional)</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface placeholder-on-surface-variant/30 py-4 px-4 transition-all duration-300 rounded-t-sm" 
                  placeholder="Conte um pouco sobre suas experiências profissionais..." 
                  rows={4}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 block">Anexar Currículo (PDF, DOC)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="w-full bg-surface-container-highest border border-dashed border-outline-variant/30 hover:border-primary-container/50 py-6 px-4 transition-all duration-300 flex flex-col items-center justify-center gap-3 rounded-lg group">
                    <div className="w-10 h-10 bg-primary-container/10 rounded-full flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">upload_file</span>
                    </div>
                    {file ? (
                      <span className="text-sm font-bold text-primary-container">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    ) : (
                      <span className="text-sm text-on-surface-variant">Arraste seu arquivo ou clique para selecionar</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Honeypot field (hidden from users) */}
              <input 
                type="text" 
                name="botField" 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
                value={formData.botField}
                onChange={(e) => setFormData({...formData, botField: e.target.value})}
              />

              {/* Math Captcha */}
              {captchaDocs.show && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary-container ml-1">Verificação de Segurança</label>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-headline text-lg bg-surface-container px-4 py-2 rounded">
                      Quanto é {captchaDocs.n1} + {captchaDocs.n2}?
                    </span>
                    <input 
                      required 
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="flex-1 bg-surface-container-highest border-none focus:ring-0 border-b-2 border-transparent focus:border-primary-container text-on-surface py-4 px-4 transition-all duration-300 rounded-t-sm" 
                      placeholder="Resposta" 
                      type="number" 
                    />
                  </div>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded text-sm text-center mt-4">
                  Seu currículo foi enviado com sucesso! Entraremos em contato caso seu perfil se alinhe com alguma de nossas vagas.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded text-sm text-center mt-4">
                  Ocorreu um erro ao enviar seu currículo. Por favor, verifique sua conexão ou tente enviar diretamente via e-mail.
                </div>
              )}

              <button 
                disabled={isSubmitting} 
                className="w-full px-12 py-5 bg-primary-container text-on-primary font-headline font-black uppercase tracking-tighter hover:bg-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-primary-container/10 mt-6 rounded-sm" 
                type="submit"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin">sync</span> Enviando...
                  </span>
                ) : 'Enviar Currículo'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
