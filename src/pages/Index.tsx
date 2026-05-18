import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.ezst.app/projects/533ab341-c595-4c65-b083-297cde2247e7/files/a67050fc-d6d6-4df5-92f5-0e728fb75b26.jpg';

const PRODUCTS = [
  { id: 1, name: 'Hoodie Oversize Negro', category: 'Hoodies', price: 89900, tag: 'NEW', img: HERO_IMG },
  { id: 2, name: 'Tee Premium Vintage', category: 'Camisetas', price: 49900, tag: 'BEST', img: HERO_IMG },
  { id: 3, name: 'Sudadera Crewneck', category: 'Hoodies', price: 74900, tag: '', img: HERO_IMG },
  { id: 4, name: 'Polo Urbano', category: 'Camisetas', price: 59900, tag: '', img: HERO_IMG },
  { id: 5, name: 'Jogger Cargo', category: 'Pantalones', price: 79900, tag: 'SALE', img: HERO_IMG },
  { id: 6, name: 'Cap Bordada', category: 'Accesorios', price: 34900, tag: '', img: HERO_IMG },
];

const ORDERS = [
  { id: '#LT-2401', client: 'Carlos Mejía', product: 'Hoodie x3', status: 'Enviado', date: '14 May', total: '$269.700' },
  { id: '#LT-2402', client: 'Daniela Ríos', product: 'Tee Premium x5', status: 'En proceso', date: '15 May', total: '$249.500' },
  { id: '#LT-2403', client: 'Andrés Vargas', product: 'Sudadera x2', status: 'Pendiente', date: '16 May', total: '$149.800' },
  { id: '#LT-2404', client: 'Valentina Cruz', product: 'Cap x10', status: 'Enviado', date: '17 May', total: '$349.000' },
  { id: '#LT-2405', client: 'Miguel Torres', product: 'Polo x4', status: 'En proceso', date: '18 May', total: '$239.600' },
];

const STATUS_COLORS: Record<string, string> = {
  'Enviado': 'text-emerald-400 bg-emerald-400/10',
  'En proceso': 'text-yellow-400 bg-yellow-400/10',
  'Pendiente': 'text-red-400 bg-red-400/10',
};

type Section = 'catalogo' | 'carrito' | 'pedidos' | 'admin' | 'contacto';

export default function Index() {
  const [section, setSection] = useState<Section>('catalogo');
  const [cart, setCart] = useState<typeof PRODUCTS>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [mobileMenu, setMobileMenu] = useState(false);

  const categories = ['Todos', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = filter === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  const cartTotal = cart.reduce((s, p) => s + p.price, 0);

  const addToCart = (p: typeof PRODUCTS[0]) => {
    setCart(c => [...c, p]);
    setCartOpen(true);
  };
  const removeFromCart = (idx: number) => setCart(c => c.filter((_, i) => i !== idx));

  const nav: { key: Section; label: string; icon: string }[] = [
    { key: 'catalogo', label: 'Catálogo', icon: 'Grid3X3' },
    { key: 'pedidos', label: 'Pedidos', icon: 'ClipboardList' },
    { key: 'admin', label: 'Admin', icon: 'Settings' },
    { key: 'contacto', label: 'Contacto', icon: 'Mail' },
  ];

  return (
    <div className="grain min-h-screen bg-[#0a0a0a]">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#0a0a0a]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => setSection('catalogo')} className="logo-luti text-2xl tracking-[0.4em]">
            L&thinsp;U&thinsp;T&thinsp;I
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map(n => (
              <button
                key={n.key}
                onClick={() => setSection(n.key)}
                className={`nav-link ${section === n.key ? 'active' : ''}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative flex items-center gap-2 nav-link"
            >
              <Icon name="ShoppingBag" size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full neon-bg text-[#0a0a0a] text-[9px] font-bold flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden nav-link" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-white/5 bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
            {nav.map(n => (
              <button
                key={n.key}
                onClick={() => { setSection(n.key); setMobileMenu(false); }}
                className={`nav-link text-left flex items-center gap-3 ${section === n.key ? 'active' : ''}`}
              >
                <Icon name={n.icon} size={14} />
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-[#0f0f0f] border-l border-white/8 h-full flex flex-col animate-slide-up">
            <div className="p-6 border-b border-white/6 flex items-center justify-between">
              <span className="font-display text-xl text-white/90 tracking-widest">Carrito</span>
              <button onClick={() => setCartOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="ShoppingBag" size={40} className="text-white/10 mx-auto mb-4" />
                  <p className="text-white/30 text-sm tracking-widest uppercase">Carrito vacío</p>
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-white/3 rounded border border-white/6">
                    <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/90 text-sm font-medium truncate">{item.name}</p>
                      <p className="neon-text text-xs mt-0.5">${item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeFromCart(i)} className="text-white/25 hover:text-red-400 transition-colors">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm tracking-widest uppercase">Total</span>
                  <span className="neon-text font-display text-xl">${cartTotal.toLocaleString()}</span>
                </div>
                <button className="btn-neon w-full py-3 rounded">
                  Finalizar pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="pt-16">

        {/* CATÁLOGO */}
        {section === 'catalogo' && (
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
        )}

        {/* PEDIDOS */}
        {section === 'pedidos' && (
          <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
            <div className="mb-10">
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">Historial</p>
              <h2 className="font-display text-4xl text-white">Mis Pedidos</h2>
            </div>

            <div className="relative mb-8 max-w-md">
              <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" placeholder="Buscar pedido..." className="luti-input w-full pl-10 pr-4 py-3 rounded" />
            </div>

            <div className="bg-[#0f0f0f] border border-white/6 rounded overflow-hidden">
              <table className="luti-table w-full">
                <thead>
                  <tr>
                    <th className="text-left">Pedido</th>
                    <th className="text-left">Cliente</th>
                    <th className="text-left hidden md:table-cell">Producto</th>
                    <th className="text-left">Estado</th>
                    <th className="text-left hidden md:table-cell">Fecha</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ORDERS.map(o => (
                    <tr key={o.id} className="cursor-pointer">
                      <td className="neon-text font-mono text-xs">{o.id}</td>
                      <td className="text-white/80">{o.client}</td>
                      <td className="text-white/50 text-xs hidden md:table-cell">{o.product}</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${STATUS_COLORS[o.status]}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="text-white/40 text-xs hidden md:table-cell">{o.date}</td>
                      <td className="text-right text-white/80 font-medium">{o.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: 'Package', label: 'Total pedidos', value: '23', color: 'neon-text' },
                { icon: 'TrendingUp', label: 'Este mes', value: '$2.1M', color: 'neon-text' },
                { icon: 'Clock', label: 'En proceso', value: '5', color: 'text-yellow-400' },
              ].map(s => (
                <div key={s.label} className="bg-[#0f0f0f] border border-white/6 rounded p-6 flex items-center gap-5">
                  <div className="w-10 h-10 rounded bg-white/4 flex items-center justify-center">
                    <Icon name={s.icon} size={18} className={s.color} />
                  </div>
                  <div>
                    <p className="text-white/35 text-xs tracking-widest uppercase mb-1">{s.label}</p>
                    <p className={`font-display text-2xl ${s.color}`}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {section === 'admin' && (
          <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
            <div className="mb-10">
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">Panel de control</p>
              <h2 className="font-display text-4xl text-white">Admin</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Ventas hoy', value: '$340.000', icon: 'DollarSign', up: true },
                { label: 'Pedidos activos', value: '12', icon: 'ShoppingBag', up: true },
                { label: 'Clientes nuevos', value: '8', icon: 'Users', up: false },
                { label: 'Stock bajo', value: '3', icon: 'AlertCircle', up: false },
              ].map(m => (
                <div key={m.label} className="bg-[#0f0f0f] border border-white/6 rounded p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Icon name={m.icon} size={16} className="text-white/30" />
                    <span className={`text-[10px] tracking-wide ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      {m.up ? '↑ +12%' : '↓ -3%'}
                    </span>
                  </div>
                  <p className="neon-text font-display text-2xl">{m.value}</p>
                  <p className="text-white/35 text-[10px] tracking-widest uppercase mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0f0f0f] border border-white/6 rounded p-6">
                <h3 className="font-display text-xl text-white/90 mb-6 tracking-widest">Agregar Producto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Nombre</label>
                    <input className="luti-input w-full px-4 py-3 rounded" placeholder="Nombre del producto" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Precio</label>
                      <input className="luti-input w-full px-4 py-3 rounded" placeholder="$0" />
                    </div>
                    <div>
                      <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Categoría</label>
                      <select className="luti-input w-full px-4 py-3 rounded appearance-none">
                        <option value="">Seleccionar</option>
                        {categories.filter(c => c !== 'Todos').map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Descripción</label>
                    <textarea className="luti-input w-full px-4 py-3 rounded resize-none h-24" placeholder="Descripción del producto..." />
                  </div>
                  <button className="btn-neon w-full py-3 rounded">Publicar Producto</button>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/6 rounded p-6">
                <h3 className="font-display text-xl text-white/90 mb-6 tracking-widest">Acciones Rápidas</h3>
                <div className="space-y-3">
                  {[
                    { icon: 'Package', label: 'Gestionar Inventario', desc: 'Ver y actualizar stock' },
                    { icon: 'Tag', label: 'Crear Descuento', desc: 'Códigos y promociones' },
                    { icon: 'FileText', label: 'Generar Reporte', desc: 'Ventas y métricas' },
                    { icon: 'Truck', label: 'Actualizar Envíos', desc: 'Estado de despachos' },
                    { icon: 'Image', label: 'Subir Catálogo', desc: 'Imágenes y multimedia' },
                  ].map(a => (
                    <button
                      key={a.label}
                      className="w-full flex items-center gap-4 p-4 bg-white/3 hover:bg-white/5 border border-white/4 hover:border-white/10 rounded transition-all text-left group"
                    >
                      <div className="w-9 h-9 rounded bg-white/4 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors">
                        <Icon name={a.icon} size={15} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium">{a.label}</p>
                        <p className="text-white/30 text-xs">{a.desc}</p>
                      </div>
                      <Icon name="ChevronRight" size={14} className="ml-auto text-white/20 group-hover:text-cyan-400/50 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTO */}
        {section === 'contacto' && (
          <div className="max-w-5xl mx-auto px-6 py-16 animate-fade-in">
            <div className="mb-12 text-center">
              <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">¿Tienes un proyecto?</p>
              <h2 className="font-display text-5xl text-white mb-4">Hablemos</h2>
              <p className="text-white/40 text-sm tracking-wide max-w-md mx-auto">
                Diseñamos y producimos tu ropa personalizada con los más altos estándares de calidad urbana.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-[#0f0f0f] border border-white/6 rounded p-8">
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Nombre</label>
                      <input className="luti-input w-full px-4 py-3 rounded" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Empresa</label>
                      <input className="luti-input w-full px-4 py-3 rounded" placeholder="Tu empresa" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Email</label>
                    <input type="email" className="luti-input w-full px-4 py-3 rounded" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Tipo de proyecto</label>
                    <select className="luti-input w-full px-4 py-3 rounded appearance-none">
                      <option value="">Seleccionar servicio</option>
                      <option>Serigrafía</option>
                      <option>DTF Premium</option>
                      <option>Bordado</option>
                      <option>Sublimación</option>
                      <option>Colección completa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Mensaje</label>
                    <textarea className="luti-input w-full px-4 py-3 rounded resize-none h-28" placeholder="Cuéntanos sobre tu proyecto, cantidad, plazos..." />
                  </div>
                  <button className="btn-neon w-full py-3.5 rounded">Enviar Mensaje</button>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {[
                  { icon: 'MapPin', label: 'Ubicación', val: 'Bogotá, Colombia\nZona Industrial' },
                  { icon: 'Phone', label: 'WhatsApp', val: '+57 321 000 0000' },
                  { icon: 'Mail', label: 'Email', val: 'hola@luti.co' },
                  { icon: 'Clock', label: 'Horario', val: 'Lun–Vie: 8am – 6pm\nSáb: 9am – 2pm' },
                ].map(i => (
                  <div key={i.label} className="bg-[#0f0f0f] border border-white/6 rounded p-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded bg-cyan-400/8 flex items-center justify-center flex-shrink-0">
                      <Icon name={i.icon} size={15} className="neon-text" />
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">{i.label}</p>
                      <p className="text-white/80 text-sm whitespace-pre-line">{i.val}</p>
                    </div>
                  </div>
                ))}

                <div className="bg-[#0f0f0f] border border-white/6 rounded p-5">
                  <p className="text-white/30 text-[10px] tracking-widest uppercase mb-3">Redes Sociales</p>
                  <div className="flex gap-3 flex-wrap">
                    {['Instagram', 'Youtube', 'Linkedin'].map(s => (
                      <button key={s} className="btn-outline-neon px-3 py-1.5 rounded text-[10px]">{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="logo-luti text-lg tracking-[0.4em]">L&thinsp;U&thinsp;T&thinsp;I</span>
          <p className="text-white/20 text-xs tracking-widest">© 2024 LUTI — Impresión Textil Premium</p>
          <div className="flex gap-6">
            {nav.map(n => (
              <button key={n.key} onClick={() => setSection(n.key)} className="nav-link text-[10px]">{n.label}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
