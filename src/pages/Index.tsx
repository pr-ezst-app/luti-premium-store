import { useState } from 'react';
import NavBar from '@/components/NavBar';
import CatalogSection from '@/components/CatalogSection';
import PedidosSection from '@/components/PedidosSection';
import AdminSection from '@/components/AdminSection';
import ContactoSection from '@/components/ContactoSection';

const HERO_IMG = 'https://cdn.ezst.app/projects/533ab341-c595-4c65-b083-297cde2247e7/files/a67050fc-d6d6-4df5-92f5-0e728fb75b26.jpg';

const PRODUCTS = [
  { id: 1, name: 'Hoodie Oversize Negro', category: 'Hoodies', price: 89900, tag: 'NEW', img: HERO_IMG },
  { id: 2, name: 'Tee Premium Vintage', category: 'Camisetas', price: 49900, tag: 'BEST', img: HERO_IMG },
  { id: 3, name: 'Sudadera Crewneck', category: 'Hoodies', price: 74900, tag: '', img: HERO_IMG },
  { id: 4, name: 'Polo Urbano', category: 'Camisetas', price: 59900, tag: '', img: HERO_IMG },
  { id: 5, name: 'Jogger Cargo', category: 'Pantalones', price: 79900, tag: 'SALE', img: HERO_IMG },
  { id: 6, name: 'Cap Bordada', category: 'Accesorios', price: 34900, tag: '', img: HERO_IMG },
];

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
      <NavBar
        section={section}
        setSection={setSection}
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        nav={nav}
      />

      <main className="pt-16">
        {section === 'catalogo' && (
          <CatalogSection
            categories={categories}
            filter={filter}
            setFilter={setFilter}
            filtered={filtered}
            addToCart={addToCart}
          />
        )}
        {section === 'pedidos' && <PedidosSection />}
        {section === 'admin' && <AdminSection categories={categories} />}
        {section === 'contacto' && <ContactoSection />}
      </main>

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
