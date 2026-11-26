import React, {useState} from 'react';
import {ArrowRight, Coffee, QrCode} from 'lucide-react';
import type {BusinessConfig, GooglePlaceLiveResult, Language} from '../types';
import type {Translations} from '../data/translations';
import {HERO_IMAGE} from '../data/restaurantData';

interface HeroProps {
  business: BusinessConfig;
  t: Translations;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  livePlace: GooglePlaceLiveResult;
  onOpenQrPage: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  business,
  t,
  lang,
  onChangeLang,
  livePlace,
  onOpenQrPage,
  onOpenCart,
}) => {
  const [imgError, setImgError] = useState(false);

  const ratingDisplay =
    livePlace.rating && livePlace.userRatingCount
      ? `${livePlace.rating.toFixed(1)} ★ (${livePlace.userRatingCount.toLocaleString()})`
      : t.hero.ratingFallback;

  const todayHours =
    livePlace.weekdayDescriptions && livePlace.weekdayDescriptions.length > 0
      ? livePlace.weekdayDescriptions[0]
      : 'Tue–Sun · 10:00 – 20:00';

  return (
    <section id="top" className="border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-10 lg:pb-14">
        {/* Utility Sub-bar: Language Switcher + Unboxed Location */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5E0D8]/80">
          <p className="text-xs sm:text-sm text-[#6B655E] tracking-wide">
            {t.hero.locationLine}
          </p>

          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg"
          >
            {(['en', 'es'] as Language[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onChangeLang(code)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === code
                    ? 'bg-white text-[#1A1715] shadow-xs'
                    : 'text-[#6B655E] hover:text-[#1A1715]'
                }`}
              >
                {code === 'en' ? 'English' : 'Español'}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-6">
              <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C]">
                {business.subtitle[lang]}
              </p>

              <h1
                className="font-display text-[#1A1715] font-semibold leading-[1.08] tracking-tight"
                style={{fontSize: 'clamp(2.35rem, 4.2vw, 3.85rem)', textWrap: 'balance'}}
              >
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#5A544E] leading-relaxed max-w-xl">
                {business.description[lang]}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#3D5A3C] hover:bg-[#2E462D] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.hero.viewMenu}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#1A1715] bg-white border border-[#D6D0C6] hover:border-[#1A1715] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{t.hero.orderWhatsApp}</span>
              </button>

              <button
                type="button"
                onClick={onOpenQrPage}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#5A544E] hover:text-[#1A1715] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>{t.hero.qrMenuLink}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] rounded-xl overflow-hidden bg-[#ECE7DF] border border-[#E5E0D8]">
              {!imgError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Naji Specialty Coffee counter in Madrid serving Pistachio Latte"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F2EFE9]">
                  <Coffee className="w-10 h-10 text-[#3D5A3C] mb-3" />
                  <p className="font-display text-2xl text-[#1A1715]">{business.name}</p>
                  <p className="text-sm text-[#6B655E] mt-1">{business.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Quick Facts Strip */}
        <div className="mt-10 pt-8 border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-[#6B655E] mb-1">{t.hero.hoursLabel}</p>
            <p className="text-sm font-medium text-[#1A1715] tabular-nums">{todayHours}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B655E] mb-1">{t.hero.addressLabel}</p>
            <p className="text-sm font-medium text-[#1A1715]">
              {business.address} · {business.neighborhood}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#6B655E] mb-1">{t.hero.metroLabel}</p>
            <p className="text-sm font-medium text-[#1A1715]">{t.hero.walkingDistance}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B655E] mb-1">{t.hero.ratingLabel}</p>
            <p className="text-sm font-medium text-[#1A1715] tabular-nums">{ratingDisplay}</p>
          </div>
        </div>
      </div>
    </section>
  );
};