import { useState } from 'react';
import { X, Plus, Minus, Check, Flame, ShoppingBag } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { EXTRAS_LIST } from '../data/menuData';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (customizedItem: CartItem) => void;
}

const DONENESS_OPTIONS = [
  { id: 'ao-ponto', label: 'Ao Ponto da Casa', desc: 'Centro rosado, macio e ultra suculento' },
  { id: 'bem-passado', label: 'Bem Passado', desc: 'Completamente cozido, sem partes rosadas' },
  { id: 'ponto-para-mal', label: 'Ao Ponto para Mal', desc: 'Selado rápido na chapa, centro bem vermelho' },
];

export function ItemDetailModal({ item, onClose, onAddToCart }: ItemDetailModalProps) {
  if (!item) return null;

  const isMeatItem = item.category === 'burguers' || item.category === 'smash';

  const [quantity, setQuantity] = useState(1);
  const [selectedDoneness, setSelectedDoneness] = useState(isMeatItem ? 'Ao Ponto da Casa' : '');
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [notes, setNotes] = useState('');

  const toggleExtra = (extra: { name: string; price: number }) => {
    const exists = selectedExtras.some((e) => e.name === extra.name);
    if (exists) {
      setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = item.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      doneness: isMeatItem ? selectedDoneness : undefined,
      selectedExtras,
      notes: notes.trim() || undefined,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-neutral-950/80 hover:bg-neutral-950 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-neutral-950">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            {item.highlight && (
              <span className="text-xs font-mono font-semibold text-amber-400 tracking-wider uppercase">
                {item.highlight}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {item.name}
            </h3>
            <p className="text-lg font-mono font-bold text-amber-400 mt-1">
              R$ {item.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-neutral-400 tracking-wider">
              Descrição do Prato
            </h4>
            <p className="text-sm text-neutral-300 mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Ingredients list */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-neutral-400 tracking-wider">
              Ingredientes
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Doneness choice if applicable */}
          {isMeatItem && (
            <div className="border-t border-neutral-800 pt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-semibold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  <span>Ponto da Carne</span>
                </h4>
                <span className="text-[11px] text-neutral-500 font-mono">OBRIGATÓRIO</span>
              </div>
              <div className="grid grid-cols-1 gap-2 mt-3">
                {DONENESS_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedDoneness(opt.label)}
                    className={`flex items-start justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedDoneness === opt.label
                        ? 'bg-amber-500/10 border-amber-400 text-white'
                        : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">{opt.label}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{opt.desc}</div>
                    </div>
                    {selectedDoneness === opt.label && (
                      <Check className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-on extras */}
          <div className="border-t border-neutral-800 pt-5">
            <h4 className="text-xs font-mono font-semibold uppercase text-neutral-400 tracking-wider">
              Adicionais & Turbinar Burguer
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {EXTRAS_LIST.map((extra, idx) => {
                const isSelected = selectedExtras.some((e) => e.name === extra.name);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleExtra(extra)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white font-medium'
                        : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <span>{extra.name}</span>
                      <div className="text-amber-400 font-mono font-bold mt-0.5">
                        + R$ {extra.price.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-neutral-950'
                          : 'border-neutral-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom notes */}
          <div className="border-t border-neutral-800 pt-5">
            <label className="block text-xs font-mono font-semibold uppercase text-neutral-400 tracking-wider mb-2">
              Observações Especiais
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem cebola roxa, molho separado, embalagem para viagem..."
              className="w-full px-4 py-2.5 text-sm bg-neutral-850 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-white text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to order CTA */}
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Adicionar ao Pedido · R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
