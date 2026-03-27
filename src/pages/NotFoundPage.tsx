import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="pt-24 min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-surface">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 px-8 text-center max-w-3xl mx-auto">
        <h1 className="text-[120px] md:text-[180px] font-headline font-black text-transparent bg-clip-text bg-gradient-to-b from-primary-container to-surface-container-highest leading-none select-none drop-shadow-2xl mb-4">
          404
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">
          Página Não Encontrada
        </h2>
        
        <p className="text-on-surface-variant text-lg md:text-xl font-body leading-relaxed mb-12">
          Parece que você acessou uma rota inexistente. A página que você está procurando pode ter sido removida, mudado de nome ou está temporariamente indisponível.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 px-10 py-4 bg-primary-container text-on-primary font-headline font-black uppercase tracking-widest hover:bg-primary-fixed-dim transition-all duration-300 shadow-[0_0_20px_rgba(250,184,62,0.2)] hover:shadow-[0_0_30px_rgba(250,184,62,0.4)] hover:-translate-y-1"
        >
          <span className="material-symbols-outlined text-xl">home</span>
          Voltar ao Início
        </Link>
      </div>
    </main>
  );
}
