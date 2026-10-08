import { Calendar, ChevronRight, Clock, MapPin, Sparkles, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export function Hero({ onOpenReservation, onExploreMenu }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-neutral-950/80 to-neutral-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Column Left: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata separator */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <span>Hambúrguer Artesanal</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Pub & Rock 'n' Roll</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Jataí - GO</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              O autêntico <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Rock 'n' Roll</span> em hambúrgueres artesanais.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Blends frescos de 140g grelhados com ponto impecável, smash burgers com crosta perfeita, costela desfiada no bafo, queijo empanado crocante e chopp trincando em caneca congelada. Conheça a nossa nova casa no Bairro das Mansões.
            </p>

            {/* Operating status & address line */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 text-xs text-neutral-400 border-l-2 border-amber-500/80 pl-3">
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Terça a Domingo: 18:00 às 23:30</span>
              </div>
              <span className="hidden sm:inline text-neutral-600">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span className="truncate">Av. Veriano de Oliveira Lima, 2320</span>
              </div>
            </div>

            {/* Primary actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenReservation}
                className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xl shadow-amber-500/20 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Mesa / Evento</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Ver Cardápio Completo</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Trust and social proof indicators (clean unboxed metrics) */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-850 max-w-lg">
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Nota média em Jataí</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white">100%</div>
                <div className="text-xs text-neutral-400 mt-0.5">Blends bovinos frescos</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white">500g</div>
                <div className="text-xs text-neutral-400 mt-0.5">Batata G com Catupiry</div>
              </div>
            </div>
          </div>

          {/* Column Right: Dominant Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              <img
                src="/src/assets/images/hero_bigrock_burger_1791479077303.jpg"
                alt="Big Rock Burguer Artesanal com queijo derretido, bacon e cebola caramelizada"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              {/* Floating feature note */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-mono font-medium">DESTAQUE DA CASA</div>
                    <div className="text-lg font-bold text-white">Big Rock Signature</div>
                    <div className="text-xs text-neutral-400">2x Blend 140g · Queijo Cheddar Cremoso · Bacon Crocante</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-mono font-bold text-amber-400">R$ 44,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative glow */}
            <div className="absolute -inset-4 bg-amber-500/10 rounded-3xl filter blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
