import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Veiculo {
  _id: string;
  nome?: string;
  disponivel?: boolean;
  "Foto de capa"?: string;
  foto?: string;
  categoria?: string;
  [key: string]: any;
}

export default function FleetPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoriasFrota = ['executivo', 'suv', 'pickup', 'econômico'];
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoriasFrota);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredVeiculos = veiculos.filter(v => {
    const rawCat = v.categoria || v.Categoria;
    if (!rawCat) return false;
    let cat = rawCat.toLowerCase();
    if (cat === 'economico') cat = 'econômico';
    return selectedCategories.includes(cat);
  });

  useEffect(() => {
    const constraints = JSON.stringify([
      { key: "Status", constraint_type: "equals", value: "Disponível" }
    ]);
    fetch(`https://financeiro-etel-89910.bubbleapps.io/version-test/api/1.1/obj/veiculos?constraints=${encodeURIComponent(constraints)}`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar dados');
        return res.json();
      })
      .then(data => {
        const results = data.response?.results || [];
        const frota = results.filter((v: Veiculo) => {
          const rawStatus = v.Status || v.status;
          const statusStr = typeof rawStatus === 'string' ? rawStatus.toLowerCase() : rawStatus?.Display?.toLowerCase() || '';
          const isDisponivel = statusStr === 'disponível' || statusStr === 'disponivel' || statusStr === 'disponivel ';
          if (!isDisponivel) return false;

          const rawCat = v.categoria || v.Categoria;
          if (!rawCat) return false;
          const cat = rawCat.toLowerCase();
          // Pode vir com ou sem acento, entao fazemos match string
          return categoriasFrota.includes(cat) ||
            (cat === 'economico' && categoriasFrota.includes('econômico'));
        });
        setVeiculos(frota);
      })
      .catch(err => {
        console.error(err);
        setError('Ocorreu um erro ao carregar a frota.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-24 min-h-screen max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-28 space-y-10">
          <section>
            <h3 className="font-headline text-on-surface font-extrabold text-sm uppercase tracking-widest mb-6">Categorias</h3>
            <div className="space-y-4">
              <label className="flex items-center group cursor-pointer">
                <input checked={selectedCategories.includes('executivo')} onChange={() => toggleCategory('executivo')} className="hidden peer" type="checkbox" />
                <span className="w-5 h-5 border-2 border-outline-variant rounded-sm flex items-center justify-center peer-checked:bg-primary-container peer-checked:border-primary-container transition-all">
                  <span className="material-symbols-outlined text-[16px] text-on-primary font-bold peer-checked:block hidden">check</span>
                </span>
                <span className="ml-4 font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Executivo</span>
              </label>
              <label className="flex items-center group cursor-pointer">
                <input checked={selectedCategories.includes('suv')} onChange={() => toggleCategory('suv')} className="hidden peer" type="checkbox" />
                <span className="w-5 h-5 border-2 border-outline-variant rounded-sm flex items-center justify-center peer-checked:bg-primary-container peer-checked:border-primary-container transition-all">
                  <span className="material-symbols-outlined text-[16px] text-on-primary font-bold peer-checked:block hidden">check</span>
                </span>
                <span className="ml-4 font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">SUV</span>
              </label>
              <label className="flex items-center group cursor-pointer">
                <input checked={selectedCategories.includes('econômico')} onChange={() => toggleCategory('econômico')} className="hidden peer" type="checkbox" />
                <span className="w-5 h-5 border-2 border-outline-variant rounded-sm flex items-center justify-center peer-checked:bg-primary-container peer-checked:border-primary-container transition-all">
                  <span className="material-symbols-outlined text-[16px] text-on-primary font-bold peer-checked:block hidden">check</span>
                </span>
                <span className="ml-4 font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Econômico</span>
              </label>
              <label className="flex items-center group cursor-pointer">
                <input checked={selectedCategories.includes('pickup')} onChange={() => toggleCategory('pickup')} className="hidden peer" type="checkbox" />
                <span className="w-5 h-5 border-2 border-outline-variant rounded-sm flex items-center justify-center peer-checked:bg-primary-container peer-checked:border-primary-container transition-all">
                  <span className="material-symbols-outlined text-[16px] text-on-primary font-bold peer-checked:block hidden">check</span>
                </span>
                <span className="ml-4 font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Pickup</span>
              </label>
            </div>
          </section>
        </div>
      </aside>

      {/* Main Grid Section */}
      <section className="flex-1 pb-20">
        <header className="mb-12">
          <h1 className="font-headline text-5xl font-black text-on-surface tracking-tighter mb-4">Nossa Frota</h1>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Veículos modernos, manutenção rigorosa e prontos para qualquer desafio. Encontre a solução ideal para sua mobilidade corporativa ou pessoal.
          </p>
        </header>

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
        ) : filteredVeiculos.length === 0 ? (
          <div className="text-center py-32 text-on-surface-variant font-body">
            Nenhum veículo encontrado para os filtros selecionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVeiculos.map(v => {
              const fotoUrl = v['Foto de capa'] || v.foto || v.Foto || 'https://images.unsplash.com/photo-1590496739777-50a11270b200?w=800&q=80';
              const imgUrl = fotoUrl.startsWith('//') ? `https:${fotoUrl}` : fotoUrl;
              const displayName = v.nome || v.Modelo || 'Veículo';
              const brand = v.Marca ? `${v.Marca} ` : '';
              const catDisplay = v.categoria || v.Categoria;

              return (
                <Link to={`/frota/${v.sku || v._id}`} key={v._id || Math.random().toString()} className="group flex flex-col bg-surface-container-low overflow-hidden transition-all duration-300 rounded-xl cursor-pointer hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="h-64 overflow-hidden relative">
                    <img alt={displayName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={imgUrl} />
                    <div className="absolute top-4 left-4">
                      <span className="bg-surface-container-highest/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                        {catDisplay}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col bg-surface-container-high flex-grow">
                    <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">{brand}{displayName}</h2>

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
        )}
      </section>
    </main>
  );
}
