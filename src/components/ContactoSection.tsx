import { useState } from 'react';
import Icon from '@/components/ui/icon';

const API_CONTACT = 'https://functions.poehali.dev/003864a2-25be-4cdc-8552-daa697fd8081';

export default function ContactoSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', service_type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      const res = await fetch(API_CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', company: '', email: '', service_type: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-cyan-400/10 flex items-center justify-center mb-4">
                <Icon name="CheckCircle" size={28} className="neon-text" />
              </div>
              <p className="font-display text-2xl text-white mb-2">¡Mensaje enviado!</p>
              <p className="text-white/40 text-sm">Te contactaremos pronto.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline-neon px-6 py-2 rounded mt-6 text-[11px]">
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Nombre *</label>
                  <input value={form.name} onChange={update('name')} className="luti-input w-full px-4 py-3 rounded" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Empresa</label>
                  <input value={form.company} onChange={update('company')} className="luti-input w-full px-4 py-3 rounded" placeholder="Tu empresa" />
                </div>
              </div>
              <div>
                <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Email *</label>
                <input type="email" value={form.email} onChange={update('email')} className="luti-input w-full px-4 py-3 rounded" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Tipo de proyecto</label>
                <select value={form.service_type} onChange={update('service_type')} className="luti-input w-full px-4 py-3 rounded appearance-none">
                  <option value="">Seleccionar servicio</option>
                  <option>Serigrafía</option>
                  <option>DTF Premium</option>
                  <option>Bordado</option>
                  <option>Sublimación</option>
                  <option>Colección completa</option>
                </select>
              </div>
              <div>
                <label className="block text-white/35 text-[10px] tracking-widest uppercase mb-2">Mensaje *</label>
                <textarea value={form.message} onChange={update('message')} className="luti-input w-full px-4 py-3 rounded resize-none h-28" placeholder="Cuéntanos sobre tu proyecto, cantidad, plazos..." />
              </div>
              {status === 'error' && (
                <p className="text-red-400 text-xs tracking-wide">Hubo un error. Intenta de nuevo.</p>
              )}
              <button
                onClick={submit}
                disabled={status === 'loading'}
                className="btn-neon w-full py-3.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </div>
          )}
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
