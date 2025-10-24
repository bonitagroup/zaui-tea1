import { createOrder } from 'zmp-sdk';
import { Option, Product, SingleOptionVariant } from '../types/product';
import { getConfig } from './config';
import { CartItem, SelectedOptions } from '../types/cart';

export function calcFinalPrice(product: Product, options?: SelectedOptions): number {
  let finalPrice = product.price;

  if (product.sale) {
    if (product.sale.type === 'fixed') {
      finalPrice = product.price - product.sale.amount;
    } else {
      finalPrice = product.price * (1 - product.sale.percent);
    }
  }

  if (options && product.variants) {
    product.variants.forEach((variant: SingleOptionVariant) => {
      const selectedOptionId = options[variant.id];
      if (selectedOptionId) {
        const option = variant.options.find((opt) => opt.id === selectedOptionId);
        if (option?.priceChange) {
          if (option.priceChange.type === 'fixed') {
            finalPrice += option.priceChange.amount;
          } else {
            finalPrice += product.price * option.priceChange.percent;
          }
        }
      }
    });
  }

  return finalPrice;
}

export function isIdentical(option1: CartItem, option2: CartItem) {
  const option1Keys = Object.keys(option1);
  const option2Keys = Object.keys(option2);

  if (option1Keys.length !== option2Keys.length) {
    return false;
  }

  for (const key of option1Keys) {
    const option1Value = option1[key];
    const option2Value = option2[key];

    const areEqual =
      Array.isArray(option1Value) &&
      Array.isArray(option2Value) &&
      [...option1Value].sort().toString() === [...option2Value].sort().toString();

    if (option1Value !== option2Value && !areEqual) {
      return false;
    }
  }

  return true;
}

const pay = (amount: number, description?: string) =>
  createOrder({
    desc: description ?? `Thanh toán cho ${getConfig((config) => config.app.title)}`,
    item: [],
    amount: amount,
    success: (data) => {
      // Payment success handled in hooks
    },
    fail: (err) => {
      // Payment error handled in hooks
    },
  });

export function getDummyImage() {
  return '/fallback.svg';
}

export default pay;
