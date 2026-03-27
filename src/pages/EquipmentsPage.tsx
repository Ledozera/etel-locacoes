import { useEffect, useState } from 'react';

interface Veiculo {
  _id: string;
  nome?: string;
  disponivel?: boolean;
  "Foto de capa"?: string;
  foto?: string;
  categoria?: string;
  [key: string]: any;
}

export default function EquipmentsPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = JSON.stringify([
      { key: "Status", constraint_type: "equals", value: "Disponível" }
    ]);
    fetch(`/api/veiculos?constraints=${encodeURIComponent(constraints)}`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar dados');
        return res.json();
      })
      .then(data => {
        const results = data.response?.results || [];
        const categoriasFrota = ['executivo', 'suv', 'pickup', 'econômico', 'economico'];
        
        const disponiveis = results.filter((v: Veiculo) => {
          const isDisponivel = v.disponivel === true || v.Disponivel === true;
          if (!isDisponivel) return false;
          const rawCat = v.categoria || v.Categoria;
          if (rawCat && categoriasFrota.includes(rawCat.toLowerCase())) return false;
          return true;
        });
        setVeiculos(disponiveis);
      })
      .catch(err => {
        console.error(err);
        setError('Ocorreu um erro ao carregar os equipamentos.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="relative pt-32 pb-20 px-8 bg-gradient-to-br from-surface to-surface-bright overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
          <span className="bg-outline-variant/20 text-primary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">Engenharia &amp; Mobilidade</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none max-w-3xl">Equipamentos de <span className="text-primary-container">Alta Performance.</span></h1>
          <p className="text-on-surface-variant max-w-xl text-lg mt-4 leading-relaxed">Tecnologia industrial de ponta para construção civil e infraestrutura. Locações flexíveis com manutenção garantida.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-8">
          <div className="p-6 bg-surface-container-low rounded-xl">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-6">Categorias</h3>
            <nav className="flex flex-col gap-2">
              <button className="flex items-center justify-between w-full text-left p-3 rounded-lg bg-surface-container-high text-primary-container group transition-all">
                <span className="flex items-center gap-3 font-semibold">
                  <span className="material-symbols-outlined text-xl">architecture</span> Scaffoldings
                </span>
                <span className="material-symbols-outlined text-sm opacity-50">chevron_right</span>
              </button>
              <button className="flex items-center justify-between w-full text-left p-3 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface group transition-all">
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">construction</span> Excavators
                </span>
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-50">chevron_right</span>
              </button>
            </nav>
          </div>
          
          <div className="p-6 bg-surface-container-low rounded-xl">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-4">Disponibilidade</h3>
            <label className="flex items-center gap-3 cursor-pointer group mb-4">
              <input className="rounded bg-surface-container-highest border-none text-primary-container focus:ring-0" type="checkbox" defaultChecked />
              <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Pronta Entrega</span>
            </label>
          </div>
        </aside>

        {/* Main Section */}
        <section className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <svg className="animate-spin h-12 w-12 text-primary-container" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 text-red-200 p-6 rounded-lg font-body text-sm border border-red-900/50">
              {error}
            </div>
          ) : veiculos.length === 0 ? (
            <div className="text-center py-32 text-on-surface-variant font-body">
              Nenhum equipamento disponível no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {veiculos.map(v => {
                const fotoUrl = v['Foto de capa'] || v.foto || v.Foto || 'https://images.unsplash.com/photo-1590496739777-50a11270b200?w=800&q=80';
                const imgUrl = fotoUrl.startsWith('//') ? `https:${fotoUrl}` : fotoUrl;
                const displayName = v.nome || v.Modelo || 'Equipamento Sem Nome';
                const brand = v.Marca ? `${v.Marca} ` : '';
                const catDisplay = v.categoria || v.Categoria || 'Listado';

                return (
                  <div key={v._id || Math.random().toString()} className="group bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300 flex flex-col">
                    <div className="relative h-64 w-full overflow-hidden bg-surface-container-high">
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" src={imgUrl} alt={displayName} />
                      <div className="absolute top-4 left-4 bg-primary-container text-on-primary px-3 py-1 rounded-sm font-bold text-[10px] uppercase tracking-wider">
                        {catDisplay}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col gap-6 flex-grow">
                      <div>
                        <h2 className="font-headline text-2xl font-extrabold text-white mb-2">{brand}{displayName}</h2>
                        <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">Equipamento industrial verificado e disponível em nossa frota para operação imediata.</p>
                      </div>
                      <div className="mt-auto pt-4">
                        <button className="w-full bg-primary-container text-on-primary font-headline font-bold text-sm uppercase py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-primary-fixed-dim transition-all shadow-lg shadow-primary-container/10">
                          Solicitar Orçamento
                          <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
