export interface MenuItem {
  id: string;
  name: string;
  category: 'burguers' | 'smash' | 'combos' | 'entradas' | 'sobremesas' | 'bebidas' | 'cervejas';
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  highlight?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  doneness?: string;
  selectedExtras: { name: string; price: number }[];
  notes?: string;
}

export type TableArea = 'Salão Rock Principal' | 'Deck Externo Ventilado' | 'Área Climatizada';

export type CelebrationType = 'Jantar Casual' | 'Aniversário' | 'Happy Hour / Amigos' | 'Confraternização';

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  tableArea: TableArea;
  celebrationType: CelebrationType;
  specialRequests?: string;
  status: 'confirmada' | 'pendente';
  createdAt: string;
}

export interface OrderSchedule {
  id: string;
  customerName: string;
  phone: string;
  type: 'retirada' | 'entrega';
  date: string;
  scheduledTime: string;
  address?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Pix' | 'Cartão de Crédito/Débito' | 'Dinheiro';
  notes?: string;
  createdAt: string;
}
