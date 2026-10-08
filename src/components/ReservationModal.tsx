import { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Reservation, TableArea, CelebrationType } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservationCreated: (res: Reservation) => void;
}

const TABLE_AREAS: { id: TableArea; label: string; desc: string }[] = [
  { id: 'Salão Rock Principal', label: 'Salão Rock Principal', desc: 'Próximo ao bar de chopp, decoração temática e energia do rock' },
  { id: 'Deck Externo Ventilado', label: 'Deck Externo Ventilado', desc: 'Espaço ao ar livre para noites quentes e happy hours descontraídos' },
  { id: 'Área Climatizada', label: 'Área Climatizada (Booths)', desc: 'Sofás confortáveis estilo diner americano, ideal para famílias e conversas' },
];

const CELEBRATION_TYPES: CelebrationType[] = [
  'Jantar Casual',
  'Aniversário',
  'Happy Hour / Amigos',
  'Confraternização',
];

const TIME_SLOTS = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
];

export function ReservationModal({ isOpen, onClose, onReservationCreated }: ReservationModalProps) {
  if (!isOpen) return null;

  // Tomorrow as default date formatted YYYY-MM-DD
  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [tableArea, setTableArea] = useState<TableArea>('Salão Rock Principal');
  const [celebrationType, setCelebrationType] = useState<CelebrationType>('Jantar Casual');
  const [specialRequests, setSpecialRequests] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if chosen day is Monday (0 in UTC/Local)
  const isMonday = (dateStr: string) => {
    if (!dateStr) return false;
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.getDay() === 1; // 1 is Monday
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome para o agendamento.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Por favor, informe um WhatsApp válido com DDD (ex: 64 98443-0481).');
      return;
    }

    if (isMonday(date)) {
      setErrorMsg('A hamburgueria está fechada às segundas-feiras. Por favor, escolha de terça a domingo.');
      return;
    }

    const codeNum = Math.floor(1000 + Math.random() * 9000);
    const newReservation: Reservation = {
      id: `BR-${codeNum}`,
      customerName: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      tableArea,
      celebrationType,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmada',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const stored = localStorage.getItem('bigrock_reservations');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newReservation);
      localStorage.setItem('bigrock_reservations', JSON.stringify(list));
    } catch {
      // fallback safe
    }

    onReservationCreated(newReservation);
    setConfirmedReservation(newReservation);
  };

  const getWhatsAppBookingUrl = (res: Reservation) => {
    const text = `🎸 *SOLICITAÇÃO DE AGENDAMENTO - BIG ROCK JATAÍ* 🎸\n\n` +
      `*Código:* ${res.id}\n` +
      `*Nome:* ${res.customerName}\n` +
      `*Telefone:* ${res.phone}\n` +
      `*Data:* ${res.date.split('-').reverse().join('/')} às ${res.time}\n` +
      `*Mesa para:* ${res.guests} ${res.guests === 1 ? 'pessoa' : 'pessoas'}\n` +
      `*Ambiente:* ${res.tableArea}\n` +
      `*Ocasião:* ${res.celebrationType}\n` +
      (res.specialRequests ? `*Observações:* ${res.specialRequests}\n\n` : '\n') +
      `Gostaria de garantir a confirmação da nossa mesa para este dia! Muito obrigado!`;

    return `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                {confirmedReservation ? 'Reserva Registrada com Sucesso!' : 'Agendar Mesa / Comemoração'}
              </h3>
              <p className="text-xs text-neutral-400">
                Big Rock Hamburgueria · Av. Veriano de O. Lima, 2320
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedReservation ? (
          /* Confirmation State */
          <div className="p-6 space-y-6">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-white">
                  Reserva {confirmedReservation.id} Registrada!
                </h4>
                <p className="text-xs text-neutral-300 mt-1">
                  Seus dados foram salvos no sistema. Para garantir o melhor atendimento e a reserva antecipada do seu espaço, envie a confirmação direta para a equipe no WhatsApp oficial.
                </p>
              </div>
            </div>

            {/* Voucher details */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Titular da Reserva:</span>
                <span className="text-white font-bold">{confirmedReservation.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Data & Horário:</span>
                <span className="text-amber-400 font-bold">
                  {confirmedReservation.date.split('-').reverse().join('/')} às {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Pessoas:</span>
                <span className="text-white font-bold">{confirmedReservation.guests} convidados</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Ambiente Escolhido:</span>
                <span className="text-white font-bold">{confirmedReservation.tableArea}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Ocasião:</span>
                <span className="text-white font-bold">{confirmedReservation.celebrationType}</span>
              </div>
              {confirmedReservation.specialRequests && (
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Obs:</span>
                  <span className="text-neutral-300">{confirmedReservation.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <a
                href={getWhatsAppBookingUrl(confirmedReservation)}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Confirmar Reserva no WhatsApp (64 98443-0481)</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Fechar janela
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5">
                  WhatsApp com DDD *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(64) 99999-9999"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  min={defaultDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                />
                {isMonday(date) && (
                  <p className="text-[11px] text-amber-400 mt-1">Segunda fechado</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5">
                  Horário *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5">
                  Nº de Pessoas *
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'pessoa' : 'pessoas'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area Choice */}
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-2">
                Ambiente Preferido na Casa
              </label>
              <div className="grid grid-cols-1 gap-2">
                {TABLE_AREAS.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setTableArea(area.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      tableArea === area.id
                        ? 'bg-amber-500/10 border-amber-400 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-sm font-semibold text-white">{area.label}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{area.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Celebration Type */}
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-2">
                Motivo / Ocasião
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CELEBRATION_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCelebrationType(type)}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                      celebrationType === type
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Special notes */}
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-neutral-400 mb-1.5">
                Observações ou Pedidos Especiais (Opcional)
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Ex: comemoração com bolo, cadeira de criança, mesa no canto..."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                Concluir Agendamento
              </button>
              <p className="text-[11px] text-neutral-500 text-center mt-2">
                Atendimento por ordem de reserva · Terça a Domingo das 18h às 23h30
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
