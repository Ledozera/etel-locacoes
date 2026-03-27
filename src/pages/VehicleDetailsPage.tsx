import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Veiculo {
  _id: string;
  nome?: string;
  Modelo?: string;
  Marca?: string;
  Ano?: string;
  disponivel?: boolean;
  Disponivel?: boolean;
  "Foto de capa"?: string;
  foto?: string;
  Foto?: string;
  categoria?: string;
  Categoria?: string;
  [key: string]: any;
}

export default function VehicleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isNumericId = !isNaN(Number(id));

    let url = '';
    if (isNumericId) {
      const constraints = JSON.stringify([
        { key: "sku", constraint_type: "equals", value: Number(id) }
      ]);
      url = `/api/veiculos?constraints=${encodeURIComponent(constraints)}`;
    } else {
      url = `/api/veiculos?bubble_id=${id}`;
    }

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar detalhes do veículo');
        return res.json();
      })
      .then(data => {
        if (isNumericId) {
          const results = data.response?.results || [];
          if (results.length > 0) {
            setVeiculo(results[0]);
          } else {
            setError('Veículo não encontrado (SKU inválido).');
            setVeiculo(null);
          }
        } else {
          setVeiculo(data.response);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Ocorreu um erro ao carregar os detalhes do veículo.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="pt-32 lg:pt-40 min-h-screen flex justify-center items-center">
        <svg className="animate-spin h-12 w-12 text-primary-container" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </main>
    );
  }

  if (error || !veiculo) {
    return (
      <main className="pt-32 lg:pt-40 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="bg-red-900/20 text-red-200 p-6 rounded-lg font-body text-sm border border-red-900/50 mb-6">
          {error || 'Veículo não encontrado.'}
        </div>
        <Link to="/frota" className="text-primary hover:underline font-headline font-semibold">
          ← Voltar para a frota
        </Link>
      </main>
    );
  }

  const fotoUrl = veiculo['Foto de capa'] || veiculo.foto || veiculo.Foto || 'https://images.unsplash.com/photo-1590496739777-50a11270b200?w=800&q=80';
  const imgUrl = fotoUrl.startsWith('//') ? `https:${fotoUrl}` : fotoUrl;
  const displayName = veiculo.nome || veiculo.Modelo || 'Veículo';
  const brand = veiculo.Marca ? `${veiculo.Marca} ` : '';
  const catDisplay = veiculo.categoria || veiculo.Categoria;
  const rawStatus = veiculo.Status || veiculo.status;
  const statusStr = typeof rawStatus === 'string' ? rawStatus.toLowerCase() : rawStatus?.Display?.toLowerCase() || '';
  const isDisponivel = statusStr === 'disponível' || statusStr === 'disponivel' || statusStr === 'disponivel ' || veiculo.disponivel === true;

  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse em alugar o veículo ${brand}${displayName} (SKU: ${veiculo.sku || 'Não informado'}) que encontrei disponível no site!`);
  const whatsappLink = `https://wa.me/5541988908464?text=${whatsappMessage}`;

  return (
    <main className="pt-32 lg:pt-40 min-h-screen max-w-7xl mx-auto px-6 lg:px-12 flex flex-col pb-20">
      <Link to="/frota" className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors font-headline font-semibold mb-8 w-fit flex-shrink-0">
        <span className="material-symbols-outlined mr-2">arrow_back</span>
        Voltar para a Frota
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Imagem do Veiculo */}
        <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl relative">
          <img src={imgUrl} alt={displayName} className="w-full h-auto object-cover aspect-video lg:aspect-square" />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="bg-surface-container-highest/90 backdrop-blur px-4 py-2 text-xs font-black uppercase tracking-widest text-primary w-fit rounded-sm shadow-lg">
              {catDisplay}
            </span>
            {isDisponivel && (
              <span className="bg-green-500/90 text-white backdrop-blur px-4 py-2 text-xs font-black uppercase tracking-widest rounded-sm shadow-lg w-fit">
                Disponível
              </span>
            )}
            {!isDisponivel && (
              <span className="bg-red-500/90 text-white backdrop-blur px-4 py-2 text-xs font-black uppercase tracking-widest rounded-sm shadow-lg w-fit">
                Indisponível
              </span>
            )}
          </div>
        </div>

        {/* Informacoes */}
        <div className="flex flex-col h-full justify-center">
          <h1 className="font-headline text-4xl lg:text-5xl font-black text-on-surface tracking-tighter mb-4">
            {brand}{displayName}
          </h1>

          <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-8 whitespace-pre-wrap">
            {veiculo.descricao || veiculo.Descricao || veiculo.description || 'Nenhuma descrição fornecida para este veículo.'}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex items-center">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mr-4">calendar_today</span>
              <div>
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Ano</div>
                <div className="font-headline text-xl font-black text-on-surface">{veiculo.Ano || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex items-center">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mr-4">directions_car</span>
              <div>
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Marca</div>
                <div className="font-headline text-xl font-black text-on-surface">{veiculo.Marca || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex items-center">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mr-4">category</span>
              <div>
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Categoria</div>
                <div className="font-headline text-xl font-black text-on-surface">{catDisplay || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex items-center">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mr-4">check_circle</span>
              <div>
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Status</div>
                <div className="font-headline text-xl font-black text-on-surface">{isDisponivel ? 'Livre' : 'Ocupado'}</div>
              </div>
            </div>
          </div>

          {veiculo.Itens && veiculo.Itens.length > 0 && (
            <div className="mb-10">
              <h3 className="font-headline text-xl font-black text-on-surface mb-6">Itens Inclusos</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {veiculo.Itens.map((item: string, index: number) => (
                  <li key={index} className="flex items-center text-on-surface-variant bg-surface-container-low px-4 py-3 rounded-lg border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[20px] text-primary mr-3">done_all</span>
                    <span className="font-body text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {veiculo.Valor_Diaria && (
            <div className="mb-6 bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex flex-col">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">A partir de</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-4xl font-black text-primary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(veiculo.Valor_Diaria))}
                </span>
                <span className="text-sm font-bold text-on-surface-variant">/ diária + taxas operacionais</span>
              </div>
            </div>
          )}

          {isDisponivel ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full font-headline font-extrabold tracking-tight uppercase py-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 bg-primary-container text-on-primary hover:bg-primary-fixed-dim shadow-primary/20 hover:shadow-primary/40"
            >
              <span className="material-symbols-outlined">key</span>
              Alugar Agora
            </a>
          ) : (
            <button
              disabled
              className="w-full font-headline font-extrabold tracking-tight uppercase py-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 bg-surface-variant text-on-surface-variant cursor-not-allowed opacity-70 border border-outline-variant"
            >
              <span className="material-symbols-outlined">lock</span>
              Indisponível no momento
            </button>
          )}

          <button
            onClick={() => {
              const url = window.location.origin + `/frota/${veiculo.sku || id}`;
              if (navigator.share) {
                navigator.share({
                  title: `${brand}${displayName}`,
                  url: url
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(url);
                alert('Link copiado para a área de transferência!');
              }
            }}
            className="w-full mt-4 font-headline font-bold text-on-surface-variant uppercase py-4 rounded-xl transition-all flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30"
          >
            <span className="material-symbols-outlined">share</span>
            Compartilhar Veículo
          </button>
        </div>
      </div>
    </main>
  );
}
