import {useCallback, useEffect, useMemo, useState} from 'react';
import {QrCode, SlidersHorizontal} from 'lucide-react';
import type {
  BusinessConfig,
  CartItem,
  GooglePlaceLiveResult,
  Language,
  MenuItem,
} from './types';
import {DEFAULT_BUSINESS_CONFIG, DEFAULT_MENU_ITEMS} from './data/restaurantData';
import {TRANSLATIONS} from './data/translations';
import {Navbar} from './components/Navbar';
import {Hero} from './components/Hero';
import {SignatureShowcase} from './components/SignatureShowcase';
import {InteractiveMenu} from './components/InteractiveMenu';
import {HeritageAndGallery} from './components/HeritageAndGallery';
import {LocationAndReviews} from './components/LocationAndReviews';
import {CartDrawer} from './components/CartDrawer';
import {QrMenuPage} from './components/QrMenuPage';
import {OwnerStudioModal} from './components/OwnerStudioModal';
import {FloatingWhatsApp} from './components/FloatingWhatsApp';
import {BrandMark} from './components/BrandMark';

const STORAGE_KEYS = {
  lang: 'naji_coffee_lang_v2',
  business: 'naji_coffee_business_v1',
  menu: 'naji_coffee_menu_v1',
  cart: 'naji_coffee_cart_v1',
};

function detectDefaultLanguage(): Language {
  if (typeof window === 'undefined') return 'es';
  const saved = window.localStorage.getItem(STORAGE_KEYS.lang);
  if (saved === 'en' || saved === 'es') return saved;
  const navLang = (window.navigator.language || 'es').toLowerCase();
  if (navLang.startsWith('en')) return 'en';
  return 'es';
}

function isQrRouteInitial(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('view') === 'qr-menu' || window.location.hash === '#qr-menu';
}

export default function App() {
  const [lang, setLang] = useState<Language>(detectDefaultLanguage);
  const [qrMode, setQrMode] = useState<boolean>(isQrRouteInitial);
  const [cartOpen, setCartOpen] = useState(false);
  const [ownerStudioOpen, setOwnerStudioOpen] = useState(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  const [business, setBusiness] = useState<BusinessConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_BUSINESS_CONFIG;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.business);
      return raw ? {...DEFAULT_BUSINESS_CONFIG, ...JSON.parse(raw)} : DEFAULT_BUSINESS_CONFIG;
    } catch {
      return DEFAULT_BUSINESS_CONFIG;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_MENU_ITEMS;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.menu);
      return raw ? JSON.parse(raw) : DEFAULT_MENU_ITEMS;
    } catch {
      return DEFAULT_MENU_ITEMS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.cart);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [livePlace, setLivePlace] = useState<GooglePlaceLiveResult>({
    reviews: [],
    photoUrls: [],
    loaded: false,
    error: null,
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
    window.localStorage.setItem(STORAGE_KEYS.lang, lang);
  }, [lang]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#qr-menu') {
        setQrMode(true);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const t = TRANSLATIONS[lang];

  const totalCartItems = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.quantity, 0),
    [cart]
  );

  const handleAddToCart = useCallback((item: MenuItem, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) =>
          e.item.id === item.id ? {...e, quantity: e.quantity + qty} : e
        );
      }
      return [...prev, {item, quantity: qty}];
    });
  }, []);

  const handleUpdateCartQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((e) => (e.item.id === id ? {...e, quantity: e.quantity + delta} : e))
        .filter((e) => e.quantity > 0)
    );
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((e) => e.item.id !== id));
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleSaveBusiness = useCallback((next: BusinessConfig) => {
    setBusiness(next);
    window.localStorage.setItem(STORAGE_KEYS.business, JSON.stringify(next));
  }, []);

  const handleSaveMenu = useCallback((next: MenuItem[]) => {
    setMenuItems(next);
    window.localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(next));
  }, []);

  const handleResetAll = useCallback(() => {
    setBusiness(DEFAULT_BUSINESS_CONFIG);
    setMenuItems(DEFAULT_MENU_ITEMS);
    window.localStorage.removeItem(STORAGE_KEYS.business);
    window.localStorage.removeItem(STORAGE_KEYS.menu);
  }, []);

  const handleOpenQrMode = () => {
    setQrMode(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleExitQrMode = () => {
    setQrMode(false);
    if (window.location.hash === '#qr-menu') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleLivePlaceUpdate = useCallback((data: GooglePlaceLiveResult) => {
    setLivePlace(data);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1715]">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {qrMode ? (
        <QrMenuPage
          business={business}
          items={menuItems}
          lang={lang}
          onChangeLang={setLang}
          t={t}
          cartCount={totalCartItems}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setCartOpen(true)}
          onExitQrMode={handleExitQrMode}
          onOpenOwnerStudio={() => setOwnerStudioOpen(true)}
        />
      ) : (
        <>
          <Navbar
            business={business}
            t={t}
            lang={lang}
            onChangeLang={setLang}
            cartCount={totalCartItems}
            onOpenCart={() => setCartOpen(true)}
          />

          <main>
            <Hero
              business={business}
              t={t}
              lang={lang}
              onChangeLang={setLang}
              livePlace={livePlace}
              onOpenQrPage={handleOpenQrMode}
              onOpenCart={() => setCartOpen(true)}
            />

            <SignatureShowcase
              items={menuItems}
              business={business}
              lang={lang}
              t={t}
              onAddToCart={handleAddToCart}
            />

            <InteractiveMenu
              items={menuItems}
              business={business}
              lang={lang}
              t={t}
              onAddToCart={handleAddToCart}
              onOpenOwnerStudio={() => setOwnerStudioOpen(true)}
              onOpenQrPage={handleOpenQrMode}
            />

            <HeritageAndGallery
              business={business}
              lang={lang}
              t={t}
              livePlace={livePlace}
            />

            <LocationAndReviews
              business={business}
              lang={lang}
              t={t}
              livePlace={livePlace}
              onLivePlaceUpdate={handleLivePlaceUpdate}
            />
          </main>

          <footer className="bg-[#1A1715] text-[#FAF8F5] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <BrandMark
                    customLogoUrl={business.customLogoDataUrl}
                    className="w-6 h-6"
                  />
                  <span className="font-display text-xl font-semibold">
                    {business.name}
                  </span>
                </div>
                <p className="text-xs text-[#B5AEA4]">
                  {business.address}, {business.neighborhood}, {business.postalCity}
                </p>
                <p className="text-[11px] text-[#8A837A]">{t.footer.mapsTerms}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenQrMode}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#FAF8F5] bg-white/10 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{t.footer.qrMenuBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOwnerStudioOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#FAF8F5] bg-white/10 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{t.footer.ownerToolsBtn}</span>
                </button>
              </div>
            </div>
          </footer>
        </>
      )}

      <FloatingWhatsApp
        business={business}
        label={t.floatingWhatsapp.label}
        cartCount={totalCartItems}
        onOpenCart={() => setCartOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        business={business}
        lang={lang}
        t={t}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenOwnerStudio={() => setOwnerStudioOpen(true)}
      />

      <OwnerStudioModal
        open={ownerStudioOpen}
        onClose={() => setOwnerStudioOpen(false)}
        business={business}
        menuItems={menuItems}
        lang={lang}
        t={t}
        onSaveBusiness={handleSaveBusiness}
        onSaveMenu={handleSaveMenu}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
