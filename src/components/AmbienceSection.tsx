import { useState } from 'react';
import { Volume2, VolumeX, Music, Beer, Flame, Disc, Radio } from 'lucide-react';
import { ROCK_TRACKS } from '../data/menuData';

export function AmbienceSection() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="ambiente" className="py-20 bg-neutral-950 border-b border-neutral-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
            A EXPERIÊNCIA BIG ROCK
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1">
            Mais que um hambúrguer. Um templo do Rock em Jataí.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Nossa nova casa na Avenida Veriano foi projetada para reunir boa música, torneiras de chopp geladíssimo, porções generosas para dividir e os melhores blends artesanais do sudoeste goiano.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Pub photo card */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 flex flex-col justify-between group">
            <div className="relative h-72 sm:h-96 overflow-hidden bg-neutral-950">
              <img
                src="/src/assets/images/bigrock_pub_atmosphere_1791479106720.jpg"
                alt="Ambiente pub da Big Rock Hamburgueria em Jataí"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded border border-neutral-800 text-xs font-mono text-amber-400">
                NOVA UNIDADE · BAIRRO DAS MANSÕES
              </div>
            </div>

            <div className="p-6 bg-neutral-900/90 border-t border-neutral-850 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold">
                <Beer className="w-4 h-4" />
                <span>CHOPP TRINCANDO & AMBIENTE CLIMATIZADO</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Espaço amplo para turmas, aniversários e comemorações
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Salão temático com luzes vintage, deck externo ventilado e mesas confortáveis para você aproveitar a noite sem pressa com amigos e família.
              </p>
            </div>
          </div>

          {/* Right Column: Skillet Food Card + Interactive Rock Jukebox */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Porção signature */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
              <div className="relative h-48 overflow-hidden bg-neutral-950">
                <img
                  src="/src/assets/images/fries_bigrock_skillet_1791479096921.jpg"
                  alt="Batata Big Rock G com Catupiry e Muçarela Empanada"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Batata Big Rock G (500g)</span>
                  <span className="text-xs font-mono font-bold text-amber-400">Catupiry Legítimo</span>
                </div>
              </div>
            </div>

            {/* Big Rock Jukebox Card */}
            <div className="rounded-2xl p-6 border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold">
                    <Radio className="w-4 h-4" />
                    <span>BIG ROCK RADIO JUKEBOX</span>
                  </div>
                  <button
                    onClick={togglePlay}
                    className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-850 hover:bg-neutral-800 cursor-pointer"
                    aria-label={isPlaying ? 'Pausar áudio' : 'Ouvir playlist'}
                  >
                    {isPlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg bg-amber-400/10 text-amber-400 ${isPlaying ? 'animate-pulse' : ''}`}>
                      <Disc className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 font-mono">Tocando no Salão</div>
                      <div className="text-sm font-bold text-white">
                        {ROCK_TRACKS[activeTrackIndex].title}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {ROCK_TRACKS[activeTrackIndex].artist} · {ROCK_TRACKS[activeTrackIndex].year}
                      </div>
                    </div>
                  </div>

                  {isPlaying && (
                    <div className="flex items-center gap-0.5 h-4">
                      <span className="w-1 h-3 bg-amber-400 rounded-full animate-bounce" />
                      <span className="w-1 h-4 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* Playlist list */}
                <div className="mt-3 space-y-1">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">Seleção de Clássicos</div>
                  {ROCK_TRACKS.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTrackIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                        activeTrackIndex === idx
                          ? 'bg-amber-400/15 text-amber-300 font-semibold'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                      }`}
                    >
                      <span className="truncate">{t.title} - {t.artist}</span>
                      <span className="text-[10px] font-mono text-neutral-500 shrink-0">{t.year}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Playlist tocada diariamente das 18h às 23h30</span>
                <span className="text-amber-400 font-medium">100% Rock Culture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
