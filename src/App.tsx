import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuPortfolio } from './components/MenuPortfolio';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { CartDrawer } from './components/CartDrawer';
import { AmbienceSection } from './components/AmbienceSection';
import { LocationAndReviews } from './components/LocationAndReviews';
import { MyReservationsModal } from './components/MyReservationsModal';
import { Footer } from './components/Footer';
import { MenuItem, CartItem, Reservation } from './types';
import { Calendar, ShoppingBag, Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('bigrock_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bigrock_cart', JSON.stringify(cartItems));
    } catch {
      // safe fallback
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((curr) => (curr === message ? null : curr));
    }, 3000);
  };

  const handleAddToCart = (customizedItem: CartItem) => {
    setCartItems((prev) => {
      // check if identical item already in cart
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === customizedItem.item.id &&
          ci.doneness === customizedItem.doneness &&
          JSON.stringify(ci.selectedExtras) === JSON.stringify(customizedItem.selectedExtras) &&
          ci.notes === customizedItem.notes
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += customizedItem.quantity;
        return copy;
      }
      return [...prev, customizedItem];
    });

    showToast(`${customizedItem.item.name} adicionado à sacola!`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    // If it has multiple required meat doneness, open detail modal for best customization
    if (item.category === 'burguers' || item.category === 'smash') {
      setSelectedDetailItem(item);
    } else {
      const quickCartItem: CartItem = {
        cartId: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        selectedExtras: [],
      };
      handleAddToCart(quickCartItem);
    }
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.cartId === cartId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleReservationCreated = (res: Reservation) => {
    showToast(`Agendamento ${res.id} registrado com sucesso!`);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-neutral-900 border border-amber-400/40 rounded-xl shadow-2xl text-white text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onExploreMenu={() => {
            document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Menu & Food Portfolio */}
        <MenuPortfolio
          onSelectItem={(item) => setSelectedDetailItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Pub Experience & Music Section */}
        <AmbienceSection />

        {/* Location, Verified Reviews & Instagram Profile Connect */}
        <LocationAndReviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onAddToCart={handleAddToCart}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onReservationCreated={handleReservationCreated}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <MyReservationsModal
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        onOpenNewReservation={() => setIsReservationOpen(true)}
      />

      {/* Floating Quick Action for Mobile (below 15% viewport height cap) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsReservationOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-amber-400 text-neutral-950 font-bold rounded-xl shadow-xl shadow-black/80 text-xs active:scale-95 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Agendar Mesa</span>
        </button>

        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-center gap-1.5 py-3 px-4 bg-neutral-900 border border-neutral-700 text-white font-bold rounded-xl shadow-xl text-xs active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-amber-400">({totalCartCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}
