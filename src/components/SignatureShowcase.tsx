import React, {useState} from 'react';
import {Check, Coffee} from 'lucide-react';
import type {BusinessConfig, Language, MenuItem} from '../types';
import type {Translations} from '../data/translations';

interface SignatureShowcaseProps {
  items: MenuItem[];
  business: BusinessConfig;
  lang: Language;
  t: Translations;
  onAddToCart: (item: MenuItem, qty: number) => void;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({
  items,
  business,
  lang,
  t,
  onAddToCart,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const featuredItems = items.filter((item) => item.featured && item.available).slice(0, 3);

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item, 1);
    setAddedId(item.id);
    window.setTimeout(() => {
      setAddedId((prev) => (prev === item.id ? null : prev));
    }, 1400);
  };

  if (featuredItems.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C] mb-2">
            {t.signatures.eyebrow}
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1715] tracking-tight"
            style={{textWrap: 'balance'}}
          >
            {t.signatures.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A544E] leading-relaxed">
            {t.signatures.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map((item) => {
            const isAdded = addedId === item.id;
            return (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#F2EFE9] overflow-hidden">
                    {!failed[item.id] ? (
                      <img
                        src={item.image}
                        alt={item.name[lang]}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailed((prev) => ({...prev, [item.id]: true}))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6">
                        <Coffee className="w-8 h-8 text-[#3D5A3C] mb-2" />
                        <span className="text-xs text-[#6B655E]">{item.name[lang]}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
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
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg transition-colors duration-150 cursor-pointer ${
                      isAdded
                        ? 'bg-[#1A1715] text-white'
                        : 'bg-[#F2EFE9] hover:bg-[#3D5A3C] text-[#1A1715] hover:text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.signatures.added}</span>
                      </>
                    ) : (
                      <span>{t.signatures.addToOrder}</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
