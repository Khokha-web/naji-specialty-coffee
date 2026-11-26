import React, {useMemo, useState} from 'react';
import {Check, Copy, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X} from 'lucide-react';
import type {BusinessConfig, CartItem, Language, OrderMode} from '../types';
import type {Translations} from '../data/translations';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  business: BusinessConfig;
  lang: Language;
  t: Translations;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenOwnerStudio: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  cart,
  business,
  lang,
  t,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenOwnerStudio,
}) => {
  const [orderMode, setOrderMode] = useState<OrderMode>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [copied, setCopied] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0),
    [cart]
  );

  const whatsappMessage = useMemo(() => {
    const modeLabel =
      orderMode === 'takeaway'
        ? t.cart.takeaway
        : orderMode === 'dine_in'
          ? t.cart.dineIn
          : t.cart.delivery;

    const lines = [
      `*${business.name}* — New Order`,
      `Order Type: ${modeLabel}`,
    ];

    if (customerName.trim()) {
      lines.push(`Customer: ${customerName.trim()}`);
    }
    if (orderMode === 'dine_in' && tableNumber.trim()) {
      lines.push(`Table: ${tableNumber.trim()}`);
    }
    if (orderMode === 'delivery' && deliveryAddress.trim()) {
      lines.push(`Delivery Address: ${deliveryAddress.trim()}`);
    }

    lines.push('', '*Items:*');
    cart.forEach(({item, quantity}) => {
      const lineTotal = (item.price * quantity).toFixed(2);
      lines.push(
        `• ${quantity}x ${item.name[lang]} (${business.currencySymbol}${lineTotal})`
      );
    });

    lines.push('', `*Estimated Total: ${business.currencySymbol}${total.toFixed(2)}*`);

    if (instructions.trim()) {
      lines.push(`Notes: ${instructions.trim()}`);
    }

    return lines.join('\n');
  }, [
    business.currencySymbol,
    business.name,
    cart,
    customerName,
    deliveryAddress,
    instructions,
    lang,
    orderMode,
    t.cart.delivery,
    t.cart.dineIn,
    t.cart.takeaway,
    tableNumber,
    total,
  ]);

  const cleanPhone = business.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked in restricted frame
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
    >
      <div className="w-full max-w-md bg-[#FAF8F5] h-full flex flex-col border-s border-[#E5E0D8] shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E5E0D8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#3D5A3C]" />
            <h2 className="font-display text-2xl font-semibold text-[#1A1715]">
              {t.cart.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs text-[#6B655E] hover:text-[#1A1715] px-2 py-1 cursor-pointer"
              >
                {t.cart.clearCart}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 rounded-lg text-[#5A544E] hover:bg-[#F2EFE9] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!business.whatsappVerified && (
            <div className="p-3.5 rounded-lg bg-[#F2EFE9] border border-[#E5E0D8] text-xs text-[#5A544E] flex items-start justify-between gap-3">
              <p className="leading-relaxed">{t.cart.whatsappSetupBanner}</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOwnerStudio();
                }}
                className="text-[#3D5A3C] font-semibold underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.cart.configureWhatsApp}
              </button>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="py-14 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#9E978D] mx-auto" />
              <div>
                <h3 className="text-base font-semibold text-[#1A1715]">
                  {t.cart.emptyTitle}
                </h3>
                <p className="mt-1.5 text-sm text-[#6B655E] max-w-xs mx-auto">
                  {t.cart.emptyBody}
                </p>
              </div>
              <a
                href="#menu"
                onClick={onClose}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium text-white bg-[#3D5A3C] rounded-lg hover:bg-[#2E462D]"
              >
                {t.cart.browseMenu}
              </a>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-3">
                {cart.map(({item, quantity}) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-lg border border-[#E5E0D8] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#1A1715] truncate">
                        {item.name[lang]}
                      </p>
                      <p className="text-xs text-[#6B655E] font-mono-num mt-0.5">
                        {business.currencySymbol}
                        {item.price.toFixed(2)} × {quantity} = {business.currencySymbol}
                        {(item.price * quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="inline-flex items-center border border-[#E5E0D8] rounded-md bg-[#FAF8F5]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#5A544E] hover:text-[#1A1715] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono-num">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#5A544E] hover:text-[#1A1715] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Remove item"
                        className="p-1.5 text-[#8A837A] hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fulfillment Mode */}
              <div>
                <p className="text-xs font-medium text-[#5A544E] mb-2">
                  {t.cart.orderType}
                </p>
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#F2EFE9] rounded-lg">
                  {(['takeaway', 'dine_in', 'delivery'] as OrderMode[]).map((mode) => {
                    if (mode === 'delivery' && !business.deliveryAvailable) return null;
                    const label =
                      mode === 'takeaway'
                        ? t.cart.takeaway
                        : mode === 'dine_in'
                          ? t.cart.dineIn
                          : t.cart.delivery;
                    const active = orderMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setOrderMode(mode)}
                        className={`py-2 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          active
                            ? 'bg-white text-[#1A1715] shadow-xs'
                            : 'text-[#6B655E] hover:text-[#1A1715]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#5A544E] mb-1">
                    {t.cart.customerName}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.cart.namePlaceholder}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg focus:outline-none focus:border-[#3D5A3C]"
                  />
                </div>

                {orderMode === 'dine_in' && (
                  <div>
                    <label className="block text-xs font-medium text-[#5A544E] mb-1">
                      {t.cart.tableNumber}
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder={t.cart.tablePlaceholder}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg focus:outline-none focus:border-[#3D5A3C]"
                    />
                  </div>
                )}

                {orderMode === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-[#5A544E] mb-1">
                      {t.cart.deliveryAddress}
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder={t.cart.deliveryPlaceholder}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg focus:outline-none focus:border-[#3D5A3C]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#5A544E] mb-1">
                    {t.cart.specialInstructions}
                  </label>
                  <textarea
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder={t.cart.instructionsPlaceholder}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg focus:outline-none focus:border-[#3D5A3C]"
                  />
                </div>
              </div>

              {/* Message Preview */}
              <div>
                <p className="text-xs font-medium text-[#5A544E] mb-1.5">
                  {t.cart.messagePreview}
                </p>
                <pre className="p-3 bg-white border border-[#E5E0D8] rounded-lg text-xs text-[#5A544E] whitespace-pre-wrap font-sans leading-relaxed">
                  {whatsappMessage}
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Footer Totals & WhatsApp Confirm */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E5E0D8] space-y-3">
            <div className="flex items-center justify-between text-base font-semibold text-[#1A1715]">
              <span>{t.cart.total}</span>
              <span className="font-mono-num text-lg">
                {business.currencySymbol}
                {total.toFixed(2)}
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#256D43] hover:bg-[#1D5735] rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.cart.confirmWhatsApp}</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#5A544E] bg-[#F2EFE9] hover:text-[#1A1715] rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#3D5A3C]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.cart.copied : t.cart.copyMessage}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
