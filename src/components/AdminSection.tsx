import Icon from '@/components/ui/icon';

interface AdminSectionProps {
  categories: string[];
}

export default function AdminSection({ categories }: AdminSectionProps) {
  return (
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
  );
}
