import Icon from '@/components/ui/icon';

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

export default function PedidosSection() {
  return (
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
  );
}
