export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipping'
  | 'completed'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  productId: number | string;
  name: string;
  quantity: number;
  price: number;
  options?: any;
}

export interface Order {
  id: string | number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  amount: number;
  address?: string;
  voucherId?: string;
  total?: number;
}
