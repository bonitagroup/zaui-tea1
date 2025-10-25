import { FinalPrice } from '../../components/display/final-price';
import { Sheet } from '../../components/fullscreen-sheet';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../../state/state';
import { CartItem } from '../../types/cart';
import { Product, Variant, MultipleOptionVariant } from '../../types/product';
import { isIdentical } from '../../utils/product';
import { Box, Button, Text } from 'zmp-ui';
import { SingleOptionPicker } from './single-option-picker';
import { MultipleOptionPicker } from './multiple-option-picker';
import { QuantityPicker } from './quantity-picker';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { CiShoppingCart } from 'react-icons/ci';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

const images = import.meta.glob('../../static/page/product-list/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
}) as Record<string, { default: string }>;

const getImage = (filename: string): string => {
  if (!filename) return '/fallback.svg';
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key].default : '/fallback.svg';
};
const IconCart = CiShoppingCart as React.ElementType;
const IconCheck = IoCheckmarkCircleSharp as React.ElementType;

export interface ProductPickerProps {
  product?: Product;
  selected?: {
    options: CartItem;
    quantity: number;
  };
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

function getDefaultOptions(product?: Product) {
  if (product && product.variants) {
    return product.variants.reduce(
      (options, variant) =>
        Object.assign(options, {
          [variant.id]: variant.default,
        }),
      {}
    );
  }
  return {};
}

export const ProductPicker: FC<ProductPickerProps> = ({ children, product, selected }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<Record<string, any>>(
    selected ? selected.options : getDefaultOptions(product)
  );
  const [quantity, setQuantity] = useState<number>(selected ? selected.quantity : 1);
  const setCart = useSetRecoilState(cartState);
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      setOptions(selected.options);
      setQuantity(selected.quantity);
    } else if (product) {
      setOptions(getDefaultOptions(product));
      setQuantity(1);
    }
  }, [selected, product]);

  const addToCart = (goToCart = false) => {
    if (product) {
      setCart((cart) => {
        let res = [...cart];
        if (selected) {
          const editing = cart.find(
            (item) => item.product.id === product.id && isIdentical(item.options, selected.options)
          )!;
          if (quantity === 0) {
            res.splice(cart.indexOf(editing), 1);
          } else {
            const existed = cart.find(
              (item, i) =>
                i !== cart.indexOf(editing) &&
                item.product.id === product.id &&
                isIdentical(item.options, options as CartItem)
            )!;
            res.splice(cart.indexOf(editing), 1, {
              ...editing,
              options,
              quantity: existed ? existed.quantity + quantity : quantity,
            });
            if (existed) {
              res.splice(cart.indexOf(existed), 1);
            }
          }
        } else {
          const existed = cart.find(
            (item) =>
              item.product.id === product.id && isIdentical(item.options, options as CartItem)
          );
          if (existed) {
            res.splice(cart.indexOf(existed), 1, {
              ...existed,
              quantity: existed.quantity + quantity,
            });
          } else {
            res = res.concat({
              product,
              options,
              quantity,
            });
          }
        }
        return res;
      });
    }
    setVisible(false);
    if (goToCart) navigate('/cart');
  };

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}

      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <Box className="bg-white rounded-t-2xl overflow-hidden">
              <div className="w-full flex justify-center pt-2">
                <div style={{ width: 72, height: 6 }} className="rounded-full bg-gray-200" />
              </div>

              <Box p={4} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={getImage(product.image || '')}
                      alt={product.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Text.Title
                      className="text-lg text-zinc-700 font-medium leading-tight mb-1"
                      style={{ lineHeight: '1.1' }}
                    >
                      {product.name}
                    </Text.Title>
                    {product.variants?.length > 0 && product.variants[0].options?.length > 0 && (
                      <Text className="text-zinc-700 text-sm mb-1">
                        {product.variants[0].label ?? 'Phân loại'}:{' '}
                        {product.variants[0].options.find(
                          (o) => o.id === options[product.variants[0].id]
                        )?.label ?? ''}
                      </Text>
                    )}
                    <Text className="text-red-700 font-medium text-lg mb-2">
                      <FinalPrice options={options}>{product}</FinalPrice>
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  {product.variants &&
                    product.variants.map((variant: Variant | MultipleOptionVariant) => {
                      if (variant.type === 'single') {
                        return (
                          <Box key={variant.id} className="flex gap-5 mt-9 mb-8">
                            {variant.options.map((option) => {
                              const selected = options[variant.id] === option.id;
                              return (
                                <button
                                  key={option.id}
                                  onClick={() =>
                                    setOptions((prev) => ({ ...prev, [variant.id]: option.id }))
                                  }
                                  className={`flex items-center pr-2 px-2 py-3 border text-base font-medium transition-all
                                    ${
                                      selected
                                        ? 'border-[#0a5132] bg-white text-[#0a5132] font-medium shadow'
                                        : 'border-gray-300 bg-white text-neutral-500'
                                    }
                                  `}
                                  style={{ minWidth: 120, position: 'relative' }}
                                >
                                  {selected && (
                                    <IconCheck className="absolute left-[-8px] top-[-8px] w-6 h-6" />
                                  )}
                                  <span className="ml-0.5">{option.label}</span>
                                  {option.id === 'l' && (
                                    <span className="absolute left-[66px] top-[-10px] rounded bg-[#0a5132] text-white text-xs font-semibold w-14 h-2/5">
                                      Tiện lợi
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </Box>
                        );
                      } else {
                        return (
                          <MultipleOptionPicker
                            key={variant.id}
                            product={product}
                            variant={variant as MultipleOptionVariant}
                            value={(options[variant.id] as string[]) || []}
                            onChange={(selectedOption) =>
                              setOptions((prevOptions) => ({
                                ...prevOptions,
                                [variant.id]: selectedOption,
                              }))
                            }
                          />
                        );
                      }
                    })}
                </div>

                <div>
                  <QuantityPicker value={quantity} onChange={setQuantity} />
                </div>

                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => addToCart(false)}
                    className="flex-initial px-3.5 py-3 text-sm rounded-full border border-red-600 text-red-600 font-bold bg-white hover:bg-red-50 transition"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={() => addToCart(true)}
                    className="flex-1 px-4 py-3 rounded-full bg-[#0a5132] text-white font-semibold hover:bg-[#055140] transition text-base flex items-center justify-center gap-2"
                  >
                    <IconCart className="text-xl" />
                    Mua ngay
                  </button>
                </div>
              </Box>
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
