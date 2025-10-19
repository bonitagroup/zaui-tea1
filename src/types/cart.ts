import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  options?: any;
}

export type Cart = CartItem[];
