import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Trash2, MessageSquare, AlertCircle } from 'lucide-react';
import { Reservation } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewReservation: () => void;
}

export function MyReservationsModal({ isOpen, onClose, onOpenNewReservation }: MyReservationsModalProps) {
  if (!isOpen) return null;

  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bigrock_reservations');
      if (stored) {
        setReservations(JSON.parse(stored));
      }
    } catch {
      // safe fallback
    }
  }, [isOpen]);

  const removeReservation = (id: string) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    try {
      localStorage.setItem('bigrock_reservations', JSON.stringify(updated));
    } catch {
      // safe fallback
    }
  };

  const getWhatsAppResync = (res: Reservation) => {
    const text = `Olá Big Rock! Gostaria de confirmar informações sobre a minha reserva existente (${res.id}) em nome de ${res.customerName} para o dia ${res.date.split('-').reverse().join('/')} às ${res.time}.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        <div className="p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-display">Minhas Reservas Ativas</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {reservations.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Calendar className="w-12 h-12 text-neutral-700 mx-auto" />
              <p className="text-sm text-neutral-300 font-medium">Nenhum agendamento ativo encontrado</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Você pode agendar sua mesa para hoje à noite ou para um aniversário com antecedência.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewReservation();
                }}
                className="mt-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Fazer Nova Reserva
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400">{res.id}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          {res.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{res.customerName}</h4>
                    </div>

                    <button
                      onClick={() => removeReservation(res.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                      aria-label="Excluir reserva salva"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{res.date.split('-').reverse().join('/')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{res.time}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Mesa: </span>
                      <span>{res.guests} pessoas</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Espaço: </span>
                      <span className="truncate">{res.tableArea}</span>
                    </div>
                  </div>

                  {res.specialRequests && (
                    <div className="text-[11px] text-neutral-400 bg-neutral-900/60 p-2 rounded">
                      Obs: {res.specialRequests}
                    </div>
                  )}

                  <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
                    <a
                      href={getWhatsAppResync(res)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Falar sobre esta reserva no WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
