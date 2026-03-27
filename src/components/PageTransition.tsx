import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Dynamic SEO
    let title = "ETEL Locações | Excelência em Engenharia e Mobilidade";
    let desc = "Líder regional em soluções de mobilidade corporativa e locação de equipamentos pesados para grandes obras de infraestrutura.";
    
    if (pathname.includes('/frota')) {
      title = "Frota | ETEL Locações";
      desc = "Conheça nossa frota de veículos executivos, SUVs, Caminhonetes e Populares para mobilidade corporativa.";
    } else if (pathname.includes('/equipamentos')) {
      title = "Equipamentos | ETEL Locações";
      desc = "Locação de equipamentos pesados e maquinários de alta engenharia para suas obras operarem com máxima eficiência.";
    } else if (pathname.includes('/contato')) {
      title = "Contato | ETEL Locações";
      desc = "Fale com nossos especialistas em locação para enviar e-mail ou solicitar atendimento.";
    } else if (pathname.includes('/trabalhe-conosco')) {
      title = "Carreiras | ETEL Locações";
      desc = "Faça parte da nossa equipe. Envie seu currículo para nossas vagas de Engenharia, Comercial e Operacional.";
    } else if (pathname.includes('/termos')) {
      title = "Termos de Uso | ETEL Locações";
    } else if (pathname.includes('/privacidade')) {
      title = "Política de Privacidade | ETEL Locações";
    }
    
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {/* 
        This div covers the screen with the site's background color 
        the exact moment the route changes, hiding any layout shifts.
        Then it smoothly fades out (opacity 1 -> 0), 
        creating a beautiful "fade in" effect for the new page.
      */}
      <motion.div
        key={pathname}
        className="fixed inset-0 z-[100] bg-[#131314] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </AnimatePresence>
  );
}
