export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'returned'
  | 'canceled';

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
}
