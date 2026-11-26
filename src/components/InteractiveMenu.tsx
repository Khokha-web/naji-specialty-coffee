import React, {useMemo, useState} from 'react';
import {Check, Coffee, Minus, Plus, QrCode, Search, SlidersHorizontal} from 'lucide-react';
import type {BusinessConfig, Language, MenuCategoryId, MenuItem} from '../types';
import type {Translations} from '../data/translations';

interface InteractiveMenuProps {
  items: MenuItem[];
  business: BusinessConfig;
  lang: Language;
  t: Translations;
  onAddToCart: (item: MenuItem, qty: number) => void;
  onOpenOwnerStudio: () => void;
  onOpenQrPage: () => void;
  compactQrMode?: boolean;
}

const CATEGORY_ORDER: ('all' | MenuCategoryId)[] = [
  'all',
  'signatures',
  'espresso_filter',
  'tea_botanicals',
  'pastries_toasts',
];

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  items,
  business,
  lang,
  t,
  onAddToCart,
  onOpenOwnerStudio,
  onOpenQrPage,
  compactQrMode = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        item.name.en.toLowerCase().includes(q) ||
        item.name.fr.toLowerCase().includes(q) ||
        item.name.ar.toLowerCase().includes(q) ||
        item.description.en.toLowerCase().includes(q) ||
        item.description.fr.toLowerCase().includes(q) ||
        item.description.ar.toLowerCase().includes(q)
      );
    });
  }, [items, selectedCategory, searchQuery]);

  const getQty = (id: string) => quantities[id] ?? 1;

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = Math.max(1, Math.min(20, (prev[id] ?? 1) + delta));
      return {...prev, [id]: next};
    });
  };

  const handleAdd = (item: MenuItem) => {
    const qty = getQty(item.id);
    onAddToCart(item, qty);
    setJustAdded((prev) => ({...prev, [item.id]: true}));
    setQuantities((prev) => ({...prev, [item.id]: 1}));
    window.setTimeout(() => {
      setJustAdded((prev) => ({...prev, [item.id]: false}));
    }, 1400);
  };

  return (
    <section
      id="menu"
      className={`${compactQrMode ? 'py-8' : 'py-16 lg:py-24'} border-b border-[#E5E0D8]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C] mb-2">
              {t.menu.eyebrow}
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1715] tracking-tight"
              style={{textWrap: 'balance'}}
            >
              {t.menu.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5A544E] leading-relaxed">
              {t.menu.subtitle}
            </p>
          </div>

          {!compactQrMode && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenQrPage}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1A1715] bg-white border border-[#E5E0D8] hover:border-[#1A1715] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#3D5A3C]" />
                <span>{t.menu.openQrView}</span>
              </button>
              <button
                type="button"
                onClick={onOpenOwnerStudio}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#5A544E] bg-[#F2EFE9] hover:text-[#1A1715] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t.menu.openOwnerStudio}</span>
              </button>
            </div>
          )}
        </div>

        {/* Search + Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg overflow-x-auto"
          >
            {CATEGORY_ORDER.map((cat) => {
              const label =
                cat === 'all' ? t.menu.allCategories : t.menu.categories[cat];
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
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

          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-[#6B655E] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              aria-label={t.menu.searchPlaceholder}
              className="w-full ps-10 pe-4 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-lg text-[#1A1715] placeholder:text-[#8A837A] focus:outline-none focus:border-[#3D5A3C]"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-[#E5E0D8]">
            <p className="text-base text-[#5A544E] mb-4">{t.menu.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-[#3D5A3C] rounded-lg hover:bg-[#2E462D] transition-colors cursor-pointer"
            >
              {t.menu.resetSearch}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = getQty(item.id);
              const added = Boolean(justAdded[item.id]);
              const imgFailed = Boolean(failedImages[item.id]);

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {/* 4:3 Photography */}
                  <div className="aspect-[4/3] w-full bg-[#F2EFE9] overflow-hidden">
                    {!imgFailed ? (
                      <img
                        src={item.image}
                        alt={item.name[lang]}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({...prev, [item.id]: true}))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <Coffee className="w-8 h-8 text-[#3D5A3C] mb-2" />
                        <span className="text-xs text-[#6B655E]">{item.name[lang]}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Clean unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#6B655E] mb-1.5">
                        <span>{t.menu.categories[item.category]}</span>
                        <span aria-hidden="true">·</span>
                        <span className={item.priceVerified ? 'text-[#3D5A3C]' : 'text-[#8A837A]'}>
                          {item.priceVerified ? t.menu.verifiedPrice : t.menu.estimatedPrice}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-[#1A1715] leading-snug">
                          {item.name[lang]}
                        </h3>
                        <span className="font-mono-num text-base font-semibold text-[#1A1715] shrink-0">
                          {business.currencySymbol}
                          {item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-[#5A544E] leading-relaxed">
                        {item.description[lang]}
                      </p>

                      {item.dietaryNote && (
                        <p className="mt-2 text-xs text-[#6B655E]">
                          {item.dietaryNote[lang]}
                        </p>
                      )}
                    </div>

                    {/* Quantity & Add to Order */}
                    {item.available ? (
                      <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-[#E5E0D8] rounded-lg bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="p-2 text-[#5A544E] hover:text-[#1A1715] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono-num text-xs font-medium text-[#1A1715]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            aria-label="Increase quantity"
                            className="p-2 text-[#5A544E] hover:text-[#1A1715] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                            added
                              ? 'bg-[#1A1715] text-white'
                              : 'bg-[#3D5A3C] hover:bg-[#2E462D] text-white'
                          }`}
                        >
                          {added ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.menu.addedToCart}</span>
                            </>
                          ) : (
                            <span>{t.menu.addToCart}</span>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="pt-3 border-t border-[#F2EFE9]">
                        <p className="text-xs font-medium text-[#8A837A]">
                          {t.menu.unavailable}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Clear Owner Transparency Note */}
        <p className="mt-6 text-xs text-[#6B655E]">{t.menu.ownerEditHint}</p>
      </div>
    </section>
  );
};
