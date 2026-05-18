import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.ezst.app/projects/533ab341-c595-4c65-b083-297cde2247e7/files/a67050fc-d6d6-4df5-92f5-0e728fb75b26.jpg';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  tag: string;
  img: string;
};

interface CatalogSectionProps {
  categories: string[];
  filter: string;
  setFilter: (v: string) => void;
  filtered: Product[];
  addToCart: (p: Product) => void;
}

export default function CatalogSection({ categories, filter, setFilter, filtered, addToCart }: CatalogSectionProps) {
  return (
    <div>
      <section className="relative h-[85vh] overflow-hidden">
        <img src={HERO_IMG} alt="LUTI Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            style={{ animation: 'scan-line 8s linear infinite', top: 0 }} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 max-w-7xl mx-auto">
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-4 animate-fade-in">
            Impresión Textil Premium
          </p>
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-white animate-fade-in delay-100">
            Viste<br />
            <span className="neon-text italic">diferente.</span>
          </h1>
          <p className="mt-6 text-white/50 text-sm tracking-widest max-w-md animate-fade-in delay-200">
            Personalización premium con tecnología de impresión de última generación.
            Cada prenda, una obra de arte urbana.
          </p>
          <div className="flex gap-4 mt-8 animate-fade-in delay-300">
            <button className="btn-neon px-8 py-3 rounded">
              Ver Colección
            </button>
            <button className="btn-outline-neon px-8 py-3 rounded">
              Personalizar
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">Colección 2024</p>
            <h2 className="font-display text-4xl text-white">Catálogo</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded text-xs tracking-widest uppercase transition-all duration-200 ${
                  filter === cat ? 'btn-neon' : 'btn-outline-neon opacity-60 hover:opacity-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="product-card bg-[#0f0f0f] border border-white/6 rounded overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {p.tag && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 neon-bg text-[#0a0a0a] text-[9px] font-bold tracking-widest rounded">
                    {p.tag}
                  </span>
                )}
                <button
                  onClick={() => addToCart(p)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#0a0a0a]/80 backdrop-blur border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-cyan-400/50"
                >
                  <Icon name="Plus" size={16} className="text-white" />
                </button>
              </div>
              <div className="p-5">
                <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase mb-1">{p.category}</p>
                <h3 className="text-white/90 font-medium text-sm mb-3">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="neon-text font-display text-lg">${p.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(p)} className="btn-outline-neon px-3 py-1.5 rounded text-[10px]">
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/6 bg-[#0f0f0f]/50">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '+500', label: 'Clientes activos' },
            { n: '48h', label: 'Entrega express' },
            { n: '100%', label: 'Calidad premium' },
            { n: '+50', label: 'Técnicas de impresión' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl neon-text mb-1">{s.n}</p>
              <p className="text-white/35 text-xs tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
