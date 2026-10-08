import { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, MapPin, Instagram, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenMyReservations: () => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenMyReservations,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones */}
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand title, single element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:text-amber-400 transition-colors"
          >
            <span className="font-display tracking-wider">BIG ROCK</span>
            <span className="text-amber-500 text-xs font-mono font-medium tracking-widest px-2 py-0.5 border border-amber-500/30 rounded">
              JATAÍ
            </span>
          </a>

          {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line text with subtle hover */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#cardapio" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Cardápio
            </a>
            <a href="#smash" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Smash & Blends
            </a>
            <a href="#ambiente" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              O Bar & Rock
            </a>
            <a href="#avaliacoes" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Avaliações
            </a>
            <a href="#localizacao" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Localização
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              aria-label="Ver sacola de pedidos"
              className="relative p-2.5 text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-neutral-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-200">
            <a
              href="#cardapio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
            >
              Cardápio Completo
            </a>
            <a
              href="#smash"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
            >
              Smash & Blends 140g
            </a>
            <a
              href="#ambiente"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
            >
              Ambiente Rock & Chopp
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
            >
              Avaliações de Jataí
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
            >
              Onde Estamos (Av. Veriano)
            </a>
          </nav>

          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Mesa / Aniversário</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyReservations();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 rounded-lg transition-colors"
            >
              Minhas Reservas Ativas
            </button>

            <div className="flex items-center justify-center gap-6 pt-3 text-neutral-400 text-xs">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-amber-400"
              >
                <Instagram className="w-4 h-4" />
                <span>@{RESTAURANT_INFO.instagram}</span>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-green-400"
              >
                <Phone className="w-4 h-4" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
