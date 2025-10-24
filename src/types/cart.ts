import { Product } from './product';

export interface SelectedOptions {
  [key: string]: string | string[];
}

export interface CartItem {
  product: Product;
  options: SelectedOptions;
  quantity: number;
}

export type Cart = CartItem[];
