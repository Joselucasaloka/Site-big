import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Clock, MapPin, CreditCard, Send, AlertCircle } from 'lucide-react';
import { CartItem, OrderSchedule } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

const SCHEDULE_TIMES = [
  'Preparo Imediato (Mais rápido possível)',
  'Hoje às 18:30',
  'Hoje às 19:00',
  'Hoje às 19:30',
  'Hoje às 20:00',
  'Hoje às 20:30',
  'Hoje às 21:00',
  'Hoje às 21:30',
  'Hoje às 22:00',
];

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'retirada' | 'entrega'>('retirada');
  const [scheduledTime, setScheduledTime] = useState(SCHEDULE_TIMES[0]);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão de Crédito/Débito' | 'Dinheiro'>('Pix');
  const [changeFor, setChangeFor] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = items.reduce((sum, item) => {
    const extrasPrice = item.selectedExtras.reduce((acc, e) => acc + e.price, 0);
    return sum + (item.item.price + extrasPrice) * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'entrega' ? 7.0 : 0.0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (items.length === 0) {
      setErrorMsg('Sua sacola está vazia.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Por favor, informe seu telefone com WhatsApp.');
      return;
    }

    if (orderType === 'entrega' && !address.trim()) {
      setErrorMsg('Por favor, informe seu endereço de entrega em Jataí.');
      return;
    }

    const orderId = `PED-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderSchedule = {
      id: orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      type: orderType,
      date: new Date().toISOString().split('T')[0],
      scheduledTime,
      address: orderType === 'entrega' ? address.trim() : undefined,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      notes: orderNotes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    // Save to local storage
    try {
      const stored = localStorage.getItem('bigrock_orders');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newOrder);
      localStorage.setItem('bigrock_orders', JSON.stringify(list));
    } catch {
      // safe fallback
    }

    // Format WhatsApp message
    let itemsText = '';
    items.forEach((ci) => {
      const extrasStr = ci.selectedExtras.length > 0
        ? ` (+ ${ci.selectedExtras.map((e) => e.name).join(', ')})`
        : '';
      const donenessStr = ci.doneness ? ` [Ponto: ${ci.doneness}]` : '';
      const notesStr = ci.notes ? `\n   _Obs: ${ci.notes}_` : '';
      itemsText += `• ${ci.quantity}x *${ci.item.name}*${donenessStr}${extrasStr} - R$ ${((ci.item.price + ci.selectedExtras.reduce((s, e) => s + e.price, 0)) * ci.quantity).toFixed(2).replace('.', ',')}${notesStr}\n`;
    });

    const msg =
      `🍔 *NOVO PEDIDO - BIG ROCK JATAÍ* 🍔\n` +
      `*Código:* ${newOrder.id}\n` +
      `*Cliente:* ${newOrder.customerName}\n` +
      `*WhatsApp:* ${newOrder.phone}\n` +
      `*Tipo:* ${newOrder.type === 'entrega' ? '🛵 Delivery em Jataí' : '🏬 Retirada no Balcão'}\n` +
      `*Horário Programado:* ${newOrder.scheduledTime}\n` +
      (newOrder.address ? `*Endereço:* ${newOrder.address}\n` : `*Local de Retirada:* Av. Veriano de O. Lima, 2320 (Mansões)\n`) +
      `*Forma de Pagamento:* ${newOrder.paymentMethod}${paymentMethod === 'Dinheiro' && changeFor ? ` (Troco para R$ ${changeFor})` : ''}\n` +
      (newOrder.notes ? `*Obs Geral:* ${newOrder.notes}\n` : '') +
      `\n*ITENS DO PEDIDO:*\n${itemsText}\n` +
      `*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n` +
      (orderType === 'entrega' ? `*Taxa de Entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n` : '') +
      `*TOTAL:* *R$ ${total.toFixed(2).replace('.', ',')}*\n\n` +
      `_Por favor, confirme o recebimento para iniciar a produção!_`;

    const zapUrl = `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;

    // Open WhatsApp
    window.open(zapUrl, '_blank');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Sacola de Pedidos
            </h3>
            <span className="text-xs text-neutral-400 font-mono">
              ({items.reduce((s, i) => s + i.quantity, 0)} itens)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-neutral-700 mb-3" />
            <p className="text-base text-neutral-300 font-medium">Sua sacola está vazia</p>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs">
              Adicione os hambúrgueres artesanais, batatas rústicas ou chopps do cardápio para fazer seu pedido.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 cursor-pointer"
            >
              Explorar Cardápio
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="flex-1 flex flex-col overflow-hidden">
            {/* Scrollable Items & Setup */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {errorMsg && (
                <div className="p-3 bg-red-500/15 border border-red-500/30 text-red-200 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase">
                  <span>Itens Selecionados</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    Esvaziar
                  </button>
                </div>

                {items.map((ci) => {
                  const extrasPrice = ci.selectedExtras.reduce((s, e) => s + e.price, 0);
                  const itemUnitPrice = ci.item.price + extrasPrice;
                  return (
                    <div
                      key={ci.cartId}
                      className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-white">{ci.item.name}</h4>
                          <span className="text-xs font-mono text-amber-400">
                            R$ {itemUnitPrice.toFixed(2).replace('.', ',')} cada
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(ci.cartId)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Doneness & Extras */}
                      {ci.doneness && (
                        <div className="text-[11px] text-neutral-400 font-mono">
                          Ponto: <span className="text-neutral-200">{ci.doneness}</span>
                        </div>
                      )}

                      {ci.selectedExtras.length > 0 && (
                        <div className="text-[11px] text-neutral-400">
                          Adicionais: {ci.selectedExtras.map((e) => e.name).join(', ')}
                        </div>
                      )}

                      {ci.notes && (
                        <div className="text-[11px] text-neutral-400 italic">
                          "{ci.notes}"
                        </div>
                      )}

                      {/* Counter */}
                      <div className="flex items-center justify-between pt-1 border-t border-neutral-850">
                        <div className="flex items-center gap-2 bg-neutral-900 px-2 py-1 rounded-lg border border-neutral-800">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.cartId, -1)}
                            className="text-neutral-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center text-xs font-mono font-bold text-white">
                            {ci.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.cartId, 1)}
                            className="text-neutral-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-bold text-white">
                          R$ {(itemUnitPrice * ci.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Type Toggle */}
              <div className="pt-2">
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5">
                  Tipo de Entrega
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('retirada')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      orderType === 'retirada'
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800'
                    }`}
                  >
                    Retirada no Balcão
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('entrega')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      orderType === 'entrega'
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800'
                    }`}
                  >
                    Delivery em Jataí (+R$ 7)
                  </button>
                </div>
              </div>

              {/* Scheduled Time */}
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Programar Horário</span>
                </label>
                <select
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {SCHEDULE_TIMES.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Info */}
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome completo *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp com DDD (64 9XXXX-XXXX) *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                {orderType === 'entrega' && (
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Rua, Número, Bairro e Ponto de Referência *"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Forma de Pagamento</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Pix', 'Cartão de Crédito/Débito', 'Dinheiro'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-1 rounded-lg border text-[11px] font-semibold text-center transition-all cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-amber-400 text-neutral-950 border-amber-400'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'Dinheiro' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Precisa de troco para quanto? (Ex: 100)"
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>

              {/* General Order Notes */}
              <div>
                <input
                  type="text"
                  placeholder="Instruções adicionais de entrega ou preparo..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Sticky Order Summary & Checkout Button */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 space-y-3">
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {orderType === 'entrega' && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Taxa de Entrega:</span>
                    <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-neutral-850">
                  <span>Total:</span>
                  <span className="text-amber-400">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Pedido pelo WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
