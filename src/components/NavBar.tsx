import Icon from '@/components/ui/icon';

type Section = 'catalogo' | 'carrito' | 'pedidos' | 'admin' | 'contacto';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  tag: string;
  img: string;
};

type NavItem = { key: Section; label: string; icon: string };

interface NavBarProps {
  section: Section;
  setSection: (s: Section) => void;
  cart: Product[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  mobileMenu: boolean;
  setMobileMenu: (v: boolean) => void;
  removeFromCart: (idx: number) => void;
  cartTotal: number;
  nav: NavItem[];
}

export default function NavBar({
  section, setSection, cart, cartOpen, setCartOpen,
  mobileMenu, setMobileMenu, removeFromCart, cartTotal, nav,
}: NavBarProps) {
  return (
    <>
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
    </>
  );
}
