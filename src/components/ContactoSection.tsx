import Icon from '@/components/ui/icon';

export default function ContactoSection() {
  return (
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
  );
}
