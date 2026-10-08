import { Instagram, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-850">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <a href="#" className="inline-block text-2xl font-extrabold text-white font-display tracking-wider">
              BIG ROCK <span className="text-amber-400 text-sm font-mono">JATAÍ</span>
            </a>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Hamburgueria artesanal com temática rock 'n' roll, blends bovinos nobres grelhados na brasa, porções fartas com Catupiry original, chopp geladíssimo e ambiente para reunir a galera em Jataí, GO.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-pink-400 rounded-lg border border-neutral-800 transition-colors"
                aria-label="Instagram do Big Rock Jataí"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-emerald-400 rounded-lg border border-neutral-800 transition-colors"
                aria-label="WhatsApp do Big Rock Jataí"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Navegação
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#cardapio" className="hover:text-amber-400 transition-colors">Cardápio & Portfólio</a>
              </li>
              <li>
                <a href="#smash" className="hover:text-amber-400 transition-colors">Smash Burguers</a>
              </li>
              <li>
                <a href="#ambiente" className="hover:text-amber-400 transition-colors">O Bar & Jukebox</a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-amber-400 transition-colors">Avaliações de Clientes</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-amber-400 transition-colors">Endereço & Contato</a>
              </li>
            </ul>
          </div>

          {/* Operating hours */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Funcionamento
            </div>
            <div className="space-y-1.5 text-xs text-neutral-300">
              <p className="font-semibold text-white">Terça a Domingo</p>
              <p className="text-amber-400 font-mono">18:00 às 23:30</p>
              <p className="text-neutral-500 pt-1">Segunda-feira: Fechado para descanso da equipe</p>
            </div>
            <div className="pt-2 text-[11px] text-neutral-400">
              <p>Av. Veriano de O. Lima, 2320</p>
              <p>Bairro das Mansões · Jataí - GO</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Big Rock Hamburgueria Jataí. Todos os direitos reservados.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
