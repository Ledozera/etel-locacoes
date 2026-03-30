import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Veiculo {
  _id: string;
  nome?: string;
  Modelo?: string;
  disponivel?: boolean;
  Disponivel?: boolean;
  "Foto de capa"?: string;
  foto?: string;
  Foto?: string;
  categoria?: string;
  Categoria?: string;
  Marca?: string;
  destaque?: boolean | string;
  Destaque?: boolean | string;
  [key: string]: any;
}

export default function HomePage() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || 400;
      scrollContainerRef.current.scrollBy({ left: -(itemWidth + 32), behavior: 'smooth' });
    }
  };

  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || 400;
      scrollContainerRef.current.scrollBy({ left: (itemWidth + 32), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const constraints = JSON.stringify([
      { key: "Status", constraint_type: "equals", value: "Disponível" },
      { key: "Destaque", constraint_type: "equals", value: true }
    ]);
    fetch(`/api/veiculos?constraints=${encodeURIComponent(constraints)}`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar dados');
        return res.json();
      })
      .then(data => {
        const results = data.response?.results || [];
        const destaques = results.filter((v: Veiculo) => {
          const isDestaque = v.destaque === true || v.destaque === 'yes' || v.Destaque === true || v.Destaque === 'yes';
          const rawStatus = v.Status || v.status;
          const statusStr = typeof rawStatus === 'string' ? rawStatus.toLowerCase() : rawStatus?.Display?.toLowerCase() || '';
          const isDisponivel = statusStr === 'disponível' || statusStr === 'disponivel' || statusStr === 'disponivel ';
          return isDestaque && isDisponivel;
        }).slice(0, 6);
        setFeaturedVehicles(destaques);
      })
      .catch(err => {
        console.error('Erro ao carregar veículos em destaque:', err);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="pt-0">
      {/* Mobile Title - Shows only on small screens to prevent overlap */}
      <div className="md:hidden bg-[#131314] pt-32 pb-12 px-6 text-center z-20 relative shadow-xl shadow-black/20 border-b border-outline-variant/10">
        <div className="inline-block px-4 py-1 mb-6 bg-primary-container text-on-primary text-[0.6875rem] font-bold tracking-[0.2em] uppercase rounded-full">
          Excelência em Engenharia e Mobilidade
        </div>
        <h1 className="font-headline font-extrabold text-4xl text-white tracking-tight leading-tight">
          Locação de Veículos e Equipamentos <span className="text-primary-container">em um só lugar</span>
        </h1>
      </div>

      {/* Hero Section: Split Screen */}
      <section className="relative min-h-[80vh] md:min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left: SUV */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-screen group overflow-hidden">
          <img alt="Kwid" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/hero-car.png" />
          <div className="absolute inset-0 bg-surface/40 backdrop-grayscale-[0.2] transition-colors group-hover:bg-surface/20"></div>
          <div className="absolute inset-0 flex flex-col justify-center md:justify-end p-8 md:p-20 z-10 items-center md:items-start text-center md:text-left">
            <Link to="/frota" className="w-full sm:w-auto bg-primary-container/90 backdrop-blur-sm text-on-primary py-4 px-8 md:py-5 md:px-10 font-headline font-extrabold text-base md:text-lg uppercase tracking-wider rounded-lg shadow-2xl shadow-black/50 hover:shadow-primary-container/30 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-3">
              Quero Alugar um Carro
              <span className="material-symbols-outlined">directions_car</span>
            </Link>
          </div>
        </div>

        {/* Right: Heavy Equipment */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-screen group overflow-hidden">
          <img alt="Escavadeira Pesada" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/maquinas.jpg" />
          <div className="absolute inset-0 bg-surface/40 backdrop-grayscale-[0.2] transition-colors group-hover:bg-surface/20"></div>
          <div className="absolute inset-0 flex flex-col justify-center md:justify-end p-8 md:p-20 z-10 items-center md:items-end text-center md:text-right">
            <Link to="/equipamentos" className="w-full sm:w-auto bg-primary-container/90 backdrop-blur-sm text-on-primary py-4 px-8 md:py-5 md:px-10 font-headline font-extrabold text-base md:text-lg uppercase tracking-wider rounded-lg shadow-2xl shadow-black/50 hover:shadow-primary-container/30 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-3">
              Quero Alugar Equipamento
              <span className="material-symbols-outlined">construction</span>
            </Link>
          </div>
        </div>

        {/* Central Content Overlay (Desktop Only) */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6 pointer-events-none text-center z-20">
          <div className="inline-block px-4 py-1 mb-6 bg-primary-container text-on-primary text-[0.6875rem] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg">
            Excelência em Engenharia e Mobilidade
          </div>
          <h1 className="font-headline font-extrabold md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tighter leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            Locação de Veículos e Equipamentos de Engenharia <span className="text-primary-container">em um só lugar</span>
          </h1>
        </div>
      </section>

      {/* Quick Links: Bento Grid Highlights */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="space-y-4">
            <h2 className="font-headline font-bold text-3xl md:text-5xl text-on-surface tracking-tight">Destaques da Frota e Máquinas</h2>
            <div className="w-24 h-1.5 bg-primary-container"></div>
          </div>
          
          <div className="flex gap-4 hidden md:flex">
            <button onClick={scrollLeftBtn} className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary transition-all shadow-lg active:scale-95" aria-label="Anterior">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button onClick={scrollRightBtn} className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary transition-all shadow-lg active:scale-95" aria-label="Próximo">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <svg className="animate-spin h-12 w-12 text-primary-container" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : featuredVehicles.length === 0 ? (
          <div className="text-center py-32 text-on-surface-variant font-body">
            Nenhum veículo em destaque encontrado no momento.
          </div>
        ) : (
          <div className="relative group">
            {/* Mobile/Tablet Buttons */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 md:hidden opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={scrollLeftBtn} className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-container text-on-primary shadow-xl active:scale-95" aria-label="Anterior">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 md:hidden opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={scrollRightBtn} className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-container text-on-primary shadow-xl active:scale-95" aria-label="Próximo">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-x-contain scroll-smooth">
            {featuredVehicles.map(v => {
              const fotoUrl = v['Foto de capa'] || v.foto || v.Foto || 'https://images.unsplash.com/photo-1590496739777-50a11270b200?w=800&q=80';
              const imgUrl = fotoUrl.startsWith('//') ? `https:${fotoUrl}` : fotoUrl;
              const displayName = v.nome || v.Modelo || 'Veículo';
              const brand = v.Marca ? `${v.Marca} ` : '';
              const motor = v.Motor || v.motor || '';
              const versao = v.versao || v.Versao || v['dbtype versao'] || '';
              const cambioDisplay = v.Cambio || v.cambio || 'Automático';
              const catDisplay = v.categoria || v.Categoria;
              const fullSubtitle = `${motor} ${versao}`.trim().replace(/\s+/g, ' ');

              return (
                <Link to={`/frota/${v.sku || v._id}`} key={v._id || Math.random().toString()} className="shrink-0 snap-start w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.33rem)] group flex flex-col bg-surface-container-low overflow-hidden transition-all duration-300 rounded-xl cursor-pointer hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="h-64 overflow-hidden relative">
                    <img alt={displayName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={imgUrl} />
                    {catDisplay && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-surface-container-highest/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                          {catDisplay}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col bg-surface-container-high flex-grow">
                    <h2 className="font-headline text-xl font-bold text-on-surface mb-1 line-clamp-1" title={`${brand}${displayName}`}>{brand}{displayName}</h2>
                    <p className="font-body text-xs text-on-surface-variant mb-2 line-clamp-1">{fullSubtitle}</p>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-on-surface-variant mb-4 bg-surface-container px-2 py-1 rounded w-fit">
                       <span className="material-symbols-outlined text-[14px]">settings</span>
                       {cambioDisplay}
                    </div>

                    <div className="flex-grow">
                      {v.Valor_Diaria && (
                        <div className="mb-4">
                           <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">A partir de</div>
                           <div className="font-headline font-black text-2xl text-primary">
                             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v.Valor_Diaria))}
                             <span className="text-[12px] font-bold text-on-surface-variant ml-1">/ diária</span>
                           </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-outline-variant/10">
                      <button className="w-full bg-primary-container text-on-primary font-headline font-extrabold tracking-tight uppercase py-4 rounded-lg hover:bg-primary-fixed-dim transition-all shadow-lg shadow-primary/10 pointer-events-none">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
        )}
      </section>

      {/* CTAs Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="font-headline font-extrabold text-4xl md:text-6xl tracking-tight">Pronto para elevar o nível da sua operação?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/frota" className="flex-1 bg-primary-container text-on-primary font-headline font-extrabold text-xl py-8 rounded-xl shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Alugar Carros
            </Link>
            <Link to="/equipamentos" className="flex-1 bg-primary-container text-on-primary font-headline font-extrabold text-xl py-8 rounded-xl shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Alugar Equipamentos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
