import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#131314] w-full border-t border-[#504535]/20 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 max-w-7xl mx-auto">
        <div className="col-span-1">
          <div className="mb-8">
            <img src="/logo-wide.svg" alt="ETEL Locações" className="h-16 md:h-28 w-auto" />
          </div>
          <p className="font-body text-xs text-[#d5c4ae] leading-relaxed">
            Soluções de mobilidade corporativa e locação de equipamentos pesados para grandes obras de infraestrutura.
          </p>
        </div>
        <div>
          <h4 className="text-[#FAB83E] font-bold text-sm uppercase mb-6">Serviços</h4>
          <ul className="space-y-4">
            <li><Link className="font-body text-xs text-[#d5c4ae] hover:text-white transition-transform hover:translate-x-1 inline-block" to="/frota">Frota de Carros</Link></li>
            <li><Link className="font-body text-xs text-[#d5c4ae] hover:text-white transition-transform hover:translate-x-1 inline-block" to="/equipamentos">Locação de Equipamentos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#FAB83E] font-bold text-sm uppercase mb-6">Empresa</h4>
          <ul className="space-y-4">
            <li><Link className="font-body text-xs text-[#d5c4ae] hover:text-white transition-transform hover:translate-x-1 inline-block" to="/contato#form-contato">Fale Conosco</Link></li>
            <li><Link className="font-body text-xs text-[#d5c4ae] hover:text-white transition-transform hover:translate-x-1 inline-block" to="/trabalhe-conosco">Trabalhe Conosco</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#FAB83E] font-bold text-sm uppercase mb-6">Legal</h4>
          <ul className="space-y-4">
            <li><Link className="font-body text-xs text-[#d5c4ae] hover:text-white transition-transform hover:translate-x-1 inline-block" to="/termos">Termos de Uso</Link></li>
            <li><Link className="font-body text-xs text-[#d5c4ae] hover:text-white transition-transform hover:translate-x-1 inline-block" to="/privacidade">Privacidade</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 pb-8">
        <p className="font-body text-[10px] text-[#d5c4ae]/50 text-center md:text-left">
          © {new Date().getFullYear()} ETEL Locações. Excelência em Engenharia e Mobilidade.
        </p>
      </div>
    </footer>
  );
}
