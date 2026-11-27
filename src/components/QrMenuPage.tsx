import React, {useRef, useState} from 'react';
import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import {ArrowLeft, Download, Printer, ShoppingBag} from 'lucide-react';
import type {BusinessConfig, Language, MenuItem} from '../types';
import type {Translations} from '../data/translations';
import {BrandMark} from './BrandMark';
import {InteractiveMenu} from './InteractiveMenu';

interface QrMenuPageProps {
  business: BusinessConfig;
  items: MenuItem[];
  lang: Language;
  onChangeLang: (lang: Language) => void;
  t: Translations;
  cartCount: number;
  onAddToCart: (item: MenuItem, qty: number) => void;
  onOpenCart: () => void;
  onExitQrMode: () => void;
  onOpenOwnerStudio: () => void;
}

export const QrMenuPage: React.FC<QrMenuPageProps> = ({
  business,
  items,
  lang,
  onChangeLang,
  t,
  cartCount,
  onAddToCart,
  onOpenCart,
  onExitQrMode,
  onOpenOwnerStudio,
}) => {
  const defaultQrUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?view=qr-menu`
      : 'https://najispecialtycoffee.es/?view=qr-menu';

  const [qrUrl, setQrUrl] = useState(defaultQrUrl);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const svgWrapRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPng = () => {
    const canvas = canvasWrapRef.current?.querySelector('canvas');
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = 'naji-specialty-coffee-table-qr.png';
    a.click();
  };

  const handleDownloadSvg = () => {
    const svg = svgWrapRef.current?.querySelector('svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'naji-specialty-coffee-table-qr.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Compact QR Page Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onExitQrMode}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#5A544E] hover:text-[#1A1715] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t.qrPage.backToWebsite}</span>
          </button>

          <div className="flex items-center gap-2">
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
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    lang === code
                      ? 'bg-white text-[#1A1715] shadow-xs'
                      : 'text-[#6B655E] hover:text-[#1A1715]'
                  }`}
                >
                  {code === 'en' ? 'EN' : 'ES'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#3D5A3C] hover:bg-[#2E462D] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.nav.orderNow}</span>
              {cartCount > 0 && (
                <span className="font-mono-num px-1.5 py-0.5 rounded bg-white/20">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Owner QR Download & Printable Table Card Kit */}
      <section className="py-10 border-b border-[#E5E0D8] bg-[#F2EFE9]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C] mb-1.5">
                  {t.qrPage.digitalMenuBadge}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1715]">
                  {t.qrPage.ownerToolsTitle}
                </h1>
                <p className="mt-2 text-sm text-[#5A544E] leading-relaxed max-w-xl">
                  {t.qrPage.ownerToolsSubtitle}
                </p>
              </div>

              <div className="max-w-xl">
                <label className="block text-xs font-medium text-[#5A544E] mb-1.5">
                  {t.qrPage.targetUrlLabel}
                </label>
                <input
                  type="url"
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg font-mono-num text-[#1A1715] focus:outline-none focus:border-[#3D5A3C]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#3D5A3C] hover:bg-[#2E462D] rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.qrPage.downloadPng}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1A1715] bg-white border border-[#E5E0D8] hover:border-[#1A1715] rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.qrPage.downloadSvg}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1A1715] bg-white border border-[#E5E0D8] hover:border-[#1A1715] rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.qrPage.printCard}</span>
                </button>
              </div>
            </div>

            {/* Printable Table Tent Card Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                id="printable-qr-card"
                className="w-full max-w-xs bg-white rounded-xl border border-[#E5E0D8] p-7 text-center space-y-4"
              >
                <div className="flex justify-center">
                  <BrandMark customLogoUrl={business.customLogoDataUrl} className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[#1A1715]">
                    {business.name}
                  </h2>
                  <p className="text-xs text-[#5A544E] mt-1">
                    {t.qrPage.cardSubheading}
                  </p>
                </div>

                <div ref={canvasWrapRef} className="inline-block p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D8]">
                  <QRCodeCanvas
                    value={qrUrl || defaultQrUrl}
                    size={180}
                    bgColor="#FAF8F5"
                    fgColor="#1A1715"
                    level="M"
                  />
                </div>

                {/* Hidden SVG for vector download */}
                <div ref={svgWrapRef} className="hidden" aria-hidden="true">
                  <QRCodeSVG
                    value={qrUrl || defaultQrUrl}
                    size={512}
                    bgColor="#FFFFFF"
                    fgColor="#1A1715"
                    level="M"
                  />
                </div>

                <p className="text-[11px] text-[#6B655E]">
                  {t.qrPage.cardScanHint}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-First Table Menu */}
      <InteractiveMenu
        items={items}
        business={business}
        lang={lang}
        t={t}
        onAddToCart={onAddToCart}
        onOpenOwnerStudio={onOpenOwnerStudio}
        onOpenQrPage={() => {}}
        compactQrMode
      />
    </div>
  );
};
