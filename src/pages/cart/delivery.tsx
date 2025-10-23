import { ListRenderer } from '../../components/list-renderer';
import React, { FC, useState } from 'react';
import { Box, Icon, Input, Text, Button, Switch } from 'zmp-ui';
import { useRecoilValue } from 'recoil';
import { totalPriceState } from '../../state';
import { useNavigate } from 'react-router';
import locations from '../../../mock/vietnam_locations.json';
import { SavedAddress } from '../../types/adress';
import { Voucher } from '../../types/voucher';
import vouchersMock from '../../../mock/vouchers.json';
import { FaTruckFast } from 'react-icons/fa6';
import { BiSolidDiscount } from 'react-icons/bi';
import { FaRegCreditCard } from 'react-icons/fa';
import testimg from '@/static/iconsvg/cart-card.svg';

export const Delivery: FC = () => {
  const navigate = useNavigate();

  const raw = typeof window !== 'undefined' ? localStorage.getItem('addresses') : null;
  const addresses = raw ? JSON.parse(raw) : [];
  const saved = addresses.find((a: any) => a.isDefault) || addresses[0] || null;

  const totalPrice = useRecoilValue(totalPriceState);

  const hasValidAddress =
    !!saved && saved.name && saved.phone && (saved.street || saved.wardId || saved.districtId);

  const resolveAddressText = (addr: SavedAddress) => {
    const provinces = locations as any[];
    const prov = provinces.find((p) => p.id === addr.provinceId);
    const dist = prov?.districts?.find((d: any) => d.id === addr.districtId);
    const ward = dist?.wards?.find((w: any) => w.id === addr.wardId);
    return `${addr.street || ''}${ward ? ', ' + ward.name : ''}${dist ? ', ' + dist.name : ''}${
      prov ? ', ' + prov.name : ''
    }`;
  };

  const [showVoucherSheet, setShowVoucherSheet] = useState(false);
  const [availableVouchers] = useState<Voucher[]>(() => (vouchersMock as Voucher[]) || []);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(() => {
    try {
      const v = typeof window !== 'undefined' ? localStorage.getItem('selectedVoucher') : null;
      return v ? (JSON.parse(v) as Voucher) : null;
    } catch {
      return null;
    }
  });
  const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>(
    selectedVoucher?.id ?? null
  );
  const [voucherCodeInput, setVoucherCodeInput] = useState('');

  const setVoucherSheetVisible = (v: boolean) => {
    setShowVoucherSheet(v);
    try {
      window.dispatchEvent(new CustomEvent('voucher-sheet-open', { detail: !!v }));
    } catch (err) {
      (window as any).dispatchEvent?.({ type: 'voucher-sheet-open', detail: !!v });
    }
  };

  const applyVoucherLocal = (v: Voucher | null) => {
    setSelectedVoucher(v);
    setSelectedVoucherId(v?.id ?? null);
    try {
      if (v) localStorage.setItem('selectedVoucher', JSON.stringify(v));
      else localStorage.removeItem('selectedVoucher');
    } catch {}
    setVoucherSheetVisible(false);
  };

  const findVoucherByCode = (code: string) => {
    return availableVouchers.find(
      (v) =>
        v.id.toLowerCase() === code.toLowerCase() ||
        v.title.toLowerCase().includes(code.toLowerCase())
    );
  };

  const [usePoints, setUsePoints] = useState(false);
  const [shippingFee] = useState(20000);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');

  const discount = selectedVoucher?.amount ?? 0;
  const computedDiscount = discount + (usePoints ? 0 : 0);
  const totalWithShipping = (totalPrice ?? 0) + (shippingFee || 0);
  const finalTotal = Math.max(0, totalWithShipping - computedDiscount);
  const IconFast = FaTruckFast as React.ElementType;
  const IconDiscount = BiSolidDiscount as React.ElementType;
  const IconCard = FaRegCreditCard as React.ElementType;

  return (
    <>
      <Box className="flex items-center gap-3 py-3 px-5">
        <div className="w-14 h-8 flex items-center justify-center rounded-md p-1.5">
          <IconFast size={32} color="#0b4f3a" />
        </div>
        <Text className="text-[#0b4f3a] font-semibold text-lg">Sản phẩm đặt mua</Text>
      </Box>
      <Box className="space-y-3 px-4 pb-36">
        <ListRenderer
          items={[
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <div onClick={() => navigate('/cart/addresses')} style={{ cursor: 'pointer' }}>
                  {hasValidAddress ? (
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="text-sm font-medium">
                          {saved.name} • {saved.phone}
                        </div>
                        <Text size="xSmall" className="text-gray">
                          {resolveAddressText(saved)}
                        </Text>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm font-medium text-red">Vui lòng chọn địa chỉ</div>
                      <div className="text-xs text-gray">Chưa có địa chỉ nhận hàng được chọn</div>
                    </>
                  )}
                </div>
              ),
            },
          ]}
          limit={5}
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />

        <Box className="flex items-center gap-3 py-2 px-1">
          <div className="w-14 h-8 flex items-center justify-center rounded-md p-1.5">
            <IconDiscount size={32} color="#0b4f3a" />
          </div>
          <Text className="text-[#0b4f3a] font-semibold text-lg">Thông tin voucher</Text>
        </Box>
        <ListRenderer
          items={[
            {
              left: <Icon icon="zi-note" className="my-auto" />,
              right: (
                <div
                  onClick={() => {
                    setSelectedVoucherId(selectedVoucher?.id ?? null);
                    setVoucherCodeInput('');
                    setVoucherSheetVisible(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="text-sm font-medium">
                    {selectedVoucher ? selectedVoucher.title : 'Chọn voucher'}
                  </div>
                  <div className="text-xs text-gray">
                    {selectedVoucher
                      ? selectedVoucher.description ?? ''
                      : 'Chọn voucher để được giảm giá'}
                  </div>
                </div>
              ),
            },
          ]}
          limit={5}
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
        <div className="flex items-center gap-3 mb-3 px-4">
          <div className="w-8 h-8 rounded-md bg-[#f0faf2] flex items-center justify-center">
            <img src={testimg} alt="Card" className="w-full h-full object-contain text-[#0b4f3a]" />
          </div>
          <Text className="text-[#0b4f3a] font-semibold text-lg">Sản phẩm đặt mua</Text>
        </div>
        <Box className="bg-white rounded-xl p-4 mt-2 shadow-md">
          <div className="divide-slate-200 divide-y">
            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{(totalPrice ?? 0).toLocaleString()} đ</div>
                <div className="text-xs text-gray">Tổng tiền hàng</div>
              </div>
              <div />
            </div>

            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{(shippingFee ?? 0).toLocaleString()} đ</div>
                <div className="text-xs text-gray">Phí vận chuyển</div>
              </div>
              <div />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <Text className="font-medium">Bạn chưa có điểm thưởng</Text>
                <Text size="xSmall" className="text-gray">
                  Mua hàng để tích lũy điểm bạn nhé!
                </Text>
              </div>
              <div>
                <Switch checked={usePoints} onChange={(v: any) => setUsePoints(!!v)} />
              </div>
            </div>

            <div className="py-3">
              <Text className="font-medium mb-2">Phương thức thanh toán:</Text>

              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl ${
                    paymentMethod === 'bank'
                      ? 'border-2 border-[#0a7a5b] bg-white'
                      : 'border border-[#E9EBED] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#eaf6ef] flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 8h18v12H3z" fill="#0a7a5b" />
                      </svg>
                    </div>
                    <div className="text-sm">Chuyển khoản ngân hàng</div>
                  </div>
                  <div>
                    {paymentMethod === 'bank' ? (
                      <svg width="18" height="18">
                        <path
                          d="M5 12l3 3 8-8"
                          stroke="#0a7a5b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl ${
                    paymentMethod === 'cod'
                      ? 'border-2 border-[#0a7a5b] bg-white'
                      : 'border border-[#E9EBED] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#eaf6ef] flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 8h18v12H3z" fill="#0a7a5b" />
                      </svg>
                    </div>
                    <div className="text-sm text-[#0a5132] font-semibold">
                      Thanh toán khi nhận hàng (COD)
                    </div>
                  </div>
                  <div>
                    {paymentMethod === 'cod' ? (
                      <svg width="18" height="18">
                        <path
                          d="M5 12l3 3 8-8"
                          stroke="#0a7a5b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Box>

        {showVoucherSheet && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.32)' }}
            onClick={() => setVoucherSheetVisible(false)}
          >
            <div
              className="w-full max-w-[680px] bg-white rounded-t-2xl shadow-xl"
              style={{
                height: '82%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mt-3">
                <div className="w-16 h-1.5 rounded-full bg-gray-300" />
              </div>

              <div style={{ overflow: 'auto', flex: 1 }}>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        background: '#eaf6ef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 8h18v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z"
                          stroke="#0a7a5b"
                          strokeWidth="1.2"
                        />
                        <path d="M12 8V3" stroke="#0a7a5b" strokeWidth="1.2" />
                        <path
                          d="M7 8V4c0-1.1.9-2 2-2s2 .9 2 2"
                          stroke="#0a7a5b"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Trà Dược Việt Nam</div>
                      <div className="text-xs text-gray">Ưu đãi khách hàng</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Input
                      value={voucherCodeInput}
                      placeholder="Nhập mã ưu đãi"
                      onChange={(e: any) => setVoucherCodeInput(e.target.value)}
                      className="flex-1 rounded-xl border border-[#E9EBED] px-4 py-3"
                    />
                    <Button
                      type="highlight"
                      disabled={!voucherCodeInput.trim()}
                      onClick={() => {
                        const v = findVoucherByCode(voucherCodeInput.trim());
                        if (v) {
                          setSelectedVoucherId(v.id);
                        } else {
                          alert('Mã không hợp lệ');
                        }
                      }}
                    >
                      Áp dụng
                    </Button>
                  </div>

                  <div className="mt-6 text-sm font-medium">Voucher từ Trà Dược Việt Nam</div>
                  <div className="mt-3 space-y-3">
                    {availableVouchers.map((v) => {
                      const active = selectedVoucherId === v.id;
                      return (
                        <div
                          key={v.id}
                          className={`flex items-center rounded-xl border ${
                            active ? 'border-[#0a7a5b]' : 'border-[#E9EBED]'
                          } overflow-hidden`}
                        >
                          <div
                            className="p-4 bg-white"
                            style={{
                              width: 84,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div style={{ width: 48, height: 48 }}>
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M4 7h4v10H4z" fill="#F9B61C" />
                                <path d="M10 7h10v10H10z" fill="#E5E5E5" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="text-base font-semibold">{v.title}</div>
                            <div className="text-xs text-gray mt-1">{v.description}</div>
                            <div className="text-xs text-gray mt-2">
                              Đơn tối thiểu 0 đ • HSD: 24/10/2025
                            </div>
                          </div>
                          <div className="p-4 flex items-center">
                            <button
                              onClick={() => setSelectedVoucherId(v.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                active ? 'bg-[#0a7a5b]' : 'bg-gray-200'
                              }`}
                            >
                              {active ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M20 6L9 17l-5-5"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="6"
                                    stroke="#9CA3AF"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ height: 110 }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', padding: 12, background: '#fff' }}>
                <Button
                  fullWidth
                  type="highlight"
                  className="rounded-full h-12 font-semibold text-white"
                  style={{ background: '#055140' }}
                  onClick={() => {
                    const v = availableVouchers.find((x) => x.id === selectedVoucherId) ?? null;
                    applyVoucherLocal(v);
                  }}
                  disabled={!selectedVoucherId}
                >
                  Áp dụng voucher
                </Button>
              </div>
            </div>
          </div>
        )}
      </Box>
    </>
  );
};
