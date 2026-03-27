import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already answered the consent screen
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    // Save consent in local storage
    localStorage.setItem('cookieConsent', 'accepted_all');
    // Here we could trigger a function to load Analytics/Pixels (e.g. GA)
    setIsVisible(false);
  };

  const handleNecessaryOnly = () => {
    // Save minimal consent
    localStorage.setItem('cookieConsent', 'necessary_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-surface-container-high border-t border-outline-variant/30 shadow-2xl p-4 md:p-6 animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 pr-0 md:pr-12">
          <h3 className="font-headline font-bold text-on-surface text-lg mb-2">Aviso de Cookies e Privacidade</h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Utilizamos cookies essenciais do navegador para garantir o correto funcionamento do site e salvar as suas as preferências baseadas na sua interação com o nosso catálogo de locações. Ao prosseguir, você concorda com as disposições da nossa{' '}
            <Link to="/privacidade" className="text-primary hover:underline font-semibold">Política de Privacidade</Link>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
          <button 
            onClick={handleNecessaryOnly}
            className="px-6 py-2.5 rounded-lg border border-outline-variant text-on-surface font-headline font-bold text-sm tracking-tight hover:bg-surface-variant transition-colors whitespace-nowrap"
          >
            Apenas Necessários
          </button>
          <button 
            onClick={handleAcceptAll}
            className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-headline font-bold text-sm tracking-tight hover:bg-primary-fixed-dim transition-colors whitespace-nowrap shadow-lg shadow-primary/10"
          >
            Aceitar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
