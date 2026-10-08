import { Star, MapPin, Instagram, Phone, Navigation, Clock, ShieldCheck, Heart } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../data/menuData';

export function LocationAndReviews() {
  return (
    <section id="avaliacoes" className="py-20 bg-neutral-950 border-b border-neutral-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Reviews Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
              PROVA SOCIAL & CLIENTES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Quem prova em Jataí, vira fã
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Centenas de clientes atendidos toda semana</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500">{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                    <span className="text-[11px] text-neutral-400">{rev.city}</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Instagram Section */}
        <div id="localizacao" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 border-t border-neutral-850">
          {/* Location info */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold">
                <MapPin className="w-4 h-4" />
                <span>LOCALIZAÇÃO OFICIAL EM JATAÍ - GO</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Venha nos visitar em nossa nova casa
              </h3>

              <div className="space-y-2 text-sm text-neutral-300">
                <p className="font-semibold text-white text-base">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-xs text-neutral-400">
                  Ponto de referência: Antiga Pet Gale · Bairro das Mansões
                </p>
                <p className="text-xs text-amber-400/90 font-mono">
                  Nota: Mudamos do endereço antigo da Rua Prof. Samuel Graham para este espaço maior e mais estruturado!
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Abrir no Google Maps / GPS</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-white font-medium text-xs sm:text-sm border border-neutral-700 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-green-400" />
                <span>Falar no WhatsApp ({RESTAURANT_INFO.phone})</span>
              </a>
            </div>
          </div>

          {/* Instagram Connect Card */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/30 border border-neutral-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-pink-400 text-xs font-mono font-semibold">
                <Instagram className="w-4 h-4" />
                <span>INSTAGRAM OFICIAL</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">
                Siga @{RESTAURANT_INFO.instagram}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Fique por dentro das promoções do dia, novidades do cardápio, vídeos dos hambúrgueres sendo preparados na chapa e dias com noites especiais de chopp em Jataí.
              </p>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-400 font-mono">Instagram Feed</div>
                  <div className="text-sm font-bold text-white">@{RESTAURANT_INFO.instagram}</div>
                </div>
                <div className="text-xs text-amber-400 font-mono font-semibold">
                  Jataí · GO
                </div>
              </div>
            </div>

            <a
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-pink-600/20 active:scale-95 text-xs sm:text-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>Acessar Perfil no Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
