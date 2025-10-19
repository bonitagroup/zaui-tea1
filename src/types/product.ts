export interface PercentSale {
  type: 'percent';
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: 'fixed';
}

export type Sale = PercentSale | FixedSale;

export interface Option {
  id: string;
  label?: string;
  priceChange?: Sale;
}

export interface BaseVariant {
  id: string;
  label?: string;
  options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
  type: 'single';
  default?: string;
}

export interface MultipleOptionVariant extends BaseVariant {
  type: 'multiple';
  default?: string[];
}

export type Variant = SingleOptionVariant | MultipleOptionVariant;

export interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
  description?: string;
  sale?: any;
  categoryId: string[];
  variantId: string[];
  [key: string]: any;
}
