import React, {useState} from 'react';
import {Menu, ShoppingBag, X} from 'lucide-react';
import type {BusinessConfig, Language} from '../types';
import type {Translations} from '../data/translations';
import {BrandMark} from './BrandMark';

interface NavbarProps {
  business: BusinessConfig;
  t: Translations;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  business,
  t,
  lang,
  onChangeLang,
  cartCount,
  onOpenCart,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {href: '#menu', label: t.nav.menu},
    {href: '#heritage', label: t.nav.heritage},
    {href: '#gallery', label: t.nav.gallery},
    {href: '#reviews', label: t.nav.reviews},
    {href: '#visit', label: t.nav.visit},
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (one line) */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[#1A1715] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A3C] rounded-md"
        >
          <BrandMark customLogoUrl={business.customLogoDataUrl} className="w-7 h-7 shrink-0" />
          <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
            {business.name}
          </span>
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A544E]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-[#1A1715] transition-colors duration-150 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A3C] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary CTA button + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#3D5A3C] hover:bg-[#2E462D] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3D5A3C]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>{t.nav.orderNow}</span>
            {cartCount > 0 && (
              <span className="font-mono-num text-xs px-1.5 py-0.5 rounded bg-white/20">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg text-[#1A1715] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5E0D8] bg-[#FAF8F5] px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 px-2 text-sm font-medium text-[#1A1715] hover:bg-[#F2EFE9] rounded-md"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E5E0D8] flex items-center gap-2">
            {(['en', 'es'] as Language[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  onChangeLang(code);
                  setMobileOpen(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  lang === code
                    ? 'bg-[#1A1715] text-white'
                    : 'bg-[#F2EFE9] text-[#5A544E] hover:text-[#1A1715]'
                }`}
              >
                {code === 'en' ? 'EN' : 'ES'}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
