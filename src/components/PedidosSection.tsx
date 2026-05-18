import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const API_PEDIDOS = 'https://functions.poehali.dev/45d2eabf-35ed-4356-86cc-2af41596cbfd';

const STATUS_COLORS: Record<string, string> = {
  'Enviado': 'text-emerald-400 bg-emerald-400/10',
  'En proceso': 'text-yellow-400 bg-yellow-400/10',
  'Pendiente': 'text-red-400 bg-red-400/10',
};

type Order = {
  id: string;
  client: string;
  product: string;
  status: string;
  date: string;
  total: string;
};

type Stats = {
  total_orders: number;
  month_total: number;
  in_progress: number;
};

export default function PedidosSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({ total_orders: 0, month_total: 0, in_progress: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(API_PEDIDOS)
      .then(r => r.json())
      .then(data => {
        setOrders(data.orders || []);
        setStats(data.stats || { total_orders: 0, month_total: 0, in_progress: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.client.toLowerCase().includes(search.toLowerCase()) ||
    o.product.toLowerCase().includes(search.toLowerCase())
  );

  const monthFormatted = `$${Math.round(stats.month_total / 1000)}K`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
      <div className="mb-10">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">Historial</p>
        <h2 className="font-display text-4xl text-white">Mis Pedidos</h2>
      </div>

      <div className="relative mb-8 max-w-md">
        <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar pedido..."
          className="luti-input w-full pl-10 pr-4 py-3 rounded"
        />
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
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6}>
                    <div className="h-4 bg-white/5 rounded animate-pulse my-1 mx-2" />
                  </td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-white/30 py-10 text-sm tracking-widest">
                  No se encontraron pedidos
                </td>
              </tr>
            ) : (
              filtered.map(o => (
                <tr key={o.id} className="cursor-pointer">
                  <td className="neon-text font-mono text-xs">{o.id}</td>
                  <td className="text-white/80">{o.client}</td>
                  <td className="text-white/50 text-xs hidden md:table-cell">{o.product}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${STATUS_COLORS[o.status] || 'text-white/50 bg-white/5'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="text-white/40 text-xs hidden md:table-cell">{o.date}</td>
                  <td className="text-right text-white/80 font-medium">{o.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: 'Package', label: 'Total pedidos', value: String(stats.total_orders), color: 'neon-text' },
          { icon: 'TrendingUp', label: 'Este mes', value: monthFormatted, color: 'neon-text' },
          { icon: 'Clock', label: 'En proceso', value: String(stats.in_progress), color: 'text-yellow-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#0f0f0f] border border-white/6 rounded p-6 flex items-center gap-5">
            <div className="w-10 h-10 rounded bg-white/4 flex items-center justify-center">
              <Icon name={s.icon} size={18} className={s.color} />
            </div>
            <div>
              <p className="text-white/35 text-xs tracking-widest uppercase mb-1">{s.label}</p>
              <p className={`font-display text-2xl ${s.color}`}>{loading ? '—' : s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
