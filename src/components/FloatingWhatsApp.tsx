import React from 'react';
import {MessageCircle} from 'lucide-react';
import type {BusinessConfig} from '../types';

interface FloatingWhatsAppProps {
  business: BusinessConfig;
  label: string;
  cartCount: number;
  onOpenCart: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  business,
  label,
  cartCount,
  onOpenCart,
}) => {
  const cleanPhone = business.whatsappNumber.replace(/[^0-9]/g, '');

  if (cartCount > 0) {
    return (
      <button
        type="button"
        onClick={onOpenCart}
        aria-label={label}
        className="fixed bottom-4 end-4 z-30 inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#256D43] hover:bg-[#1D5735] rounded-full shadow-lg transition-transform duration-150 hover:scale-[1.02] cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>{label}</span>
        <span className="font-mono-num px-1.5 py-0.5 rounded-full bg-white/20 text-xs">
          {cartCount}
        </span>
      </button>
    );
  }

  return (
    <a
      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hello ${business.name}, I would like to place an order / ask about today's menu.`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-4 end-4 z-30 inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#256D43] hover:bg-[#1D5735] rounded-full shadow-lg transition-transform duration-150 hover:scale-[1.02]"
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
};
