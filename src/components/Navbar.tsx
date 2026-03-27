import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu sempre que a rota/url mudar ou link for clicado
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto'; // Garante que volta a rolar
  }, [location.pathname]);

  // Impede que a tela role no fundo quando o menu do celular estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Barra de controle principal, com super z-index (z-60) para sempre cobrir o menu animado */}
      <div className="relative z-[60] flex justify-between items-center px-6 md:px-8 py-4 max-w-full mx-auto bg-[#131314]/90 backdrop-blur-md shadow-sm border-b border-surface">

        {/* Logo Box with Circle Overlay */}
        <div className="relative h-10 md:h-16 w-24 md:w-36 flex items-center shrink-0">
          <Link to="/" className="absolute top-1/2 -translate-y-1/2 left-0 flex flex-col items-center justify-center w-[100px] h-[100px] md:w-[140px] md:h-[140px] bg-[#131314] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 z-[70] transition-transform hover:scale-105 duration-300 shrink-0">
            <img src="/logo-wide.svg" alt="ETEL Locações" className="w-[95%] h-auto object-contain drop-shadow-md translate-x-[7px]" />
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link className="font-headline font-bold tracking-tight text-sm uppercase text-white/70 hover:text-white transition-colors" to="/frota">Frota</Link>
          <Link className="font-headline font-bold tracking-tight text-sm uppercase text-white/70 hover:text-white transition-colors" to="/equipamentos">Equipamentos</Link>
          <Link className="font-headline font-bold tracking-tight text-sm uppercase text-white/70 hover:text-white transition-colors" to="/contato">Sobre</Link>
        </div>

        {/* Botão de Contato (Desktop) e Hambúrguer (Mobile) */}
        <div className="flex items-center gap-4">
          <Link to="/contato" className="hidden md:inline-block bg-primary-container text-on-primary font-headline font-bold tracking-tight text-sm uppercase px-6 py-2.5 rounded-lg hover:bg-primary-fixed-dim transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20">
            Contato
          </Link>

          <button
            className="md:hidden text-white p-2 focus:outline-none flex items-center justify-center transition-transform active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Menu Overlay Full-Screen (Apenas Mobile) */}
      <div
        className={`fixed inset-0 z-[55] bg-[#131314] flex flex-col items-center justify-center space-y-10 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
      >
        <Link className="font-headline font-black text-3xl uppercase text-white hover:text-primary transition-colors hover:scale-105 transform" to="/frota">Frota</Link>
        <Link className="font-headline font-black text-3xl uppercase text-white hover:text-primary transition-colors hover:scale-105 transform" to="/equipamentos">Equipamentos</Link>
        <Link className="font-headline font-black text-3xl uppercase text-white hover:text-primary transition-colors hover:scale-105 transform" to="/contato">Sobre</Link>

        <div className="pt-8">
          <Link to="/contato" className="bg-primary-container text-on-primary font-headline font-bold tracking-tight text-lg uppercase px-12 py-4 rounded-xl shadow-2xl shadow-primary/30 inline-block active:scale-95 transition-transform">
            Entrar em Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}
