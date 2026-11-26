import React, {useEffect, useState} from 'react';
import {AlertCircle, Check, CheckCircle2, Plus, RotateCcw, Upload, X} from 'lucide-react';
import type {BusinessConfig, Language, MenuCategoryId, MenuItem} from '../types';
import type {Translations} from '../data/translations';

interface OwnerStudioModalProps {
  open: boolean;
  onClose: () => void;
  business: BusinessConfig;
  menuItems: MenuItem[];
  lang: Language;
  t: Translations;
  onSaveBusiness: (next: BusinessConfig) => void;
  onSaveMenu: (next: MenuItem[]) => void;
  onResetAll: () => void;
}

type StudioTab = 'business' | 'menu' | 'audit';

export const OwnerStudioModal: React.FC<OwnerStudioModalProps> = ({
  open,
  onClose,
  business,
  menuItems,
  lang,
  t,
  onSaveBusiness,
  onSaveMenu,
  onResetAll,
}) => {
  const [tab, setTab] = useState<StudioTab>('audit');
  const [draftBusiness, setDraftBusiness] = useState<BusinessConfig>(business);
  const [draftMenu, setDraftMenu] = useState<MenuItem[]>(menuItems);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (open) {
      setDraftBusiness(business);
      setDraftMenu(menuItems);
    }
  }, [open, business, menuItems]);

  if (!open) return null;

  const handleSave = () => {
    onSaveBusiness(draftBusiness);
    onSaveMenu(draftMenu);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 1800);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDraftBusiness((prev) => ({...prev, customLogoDataUrl: reader.result as string}));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = () => {
    const id = `custom-${Date.now()}`;
    const newItem: MenuItem = {
      id,
      category: 'signatures' as MenuCategoryId,
      name: {
        en: 'New Specialty Item',
        fr: 'Nouvel Article',
        ar: 'صنف جديد',
      },
      description: {
        en: 'Describe ingredients, roast origin, or preparation style.',
        fr: 'Décrivez les ingrédients ou l’origine du café.',
        ar: 'أضف وصف المكونات أو مصدر البن.',
      },
      price: 4.0,
      priceVerified: true,
      image: '/src/assets/images/menu_pistachio_latte_1795716362744.jpg',
      available: true,
    };
    setDraftMenu((prev) => [newItem, ...prev]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.ownerStudio.title}
    >
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#FAF8F5] rounded-xl border border-[#E5E0D8] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E5E0D8] flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#1A1715]">
              {t.ownerStudio.title}
            </h2>
            <p className="text-xs text-[#6B655E] mt-1">{t.ownerStudio.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.ownerStudio.close}
            className="p-2 rounded-lg text-[#5A544E] hover:bg-[#F2EFE9] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 bg-white border-b border-[#E5E0D8] flex items-center gap-2">
          {(['audit', 'business', 'menu'] as StudioTab[]).map((tabKey) => {
            const label =
              tabKey === 'audit'
                ? t.ownerStudio.tabAudit
                : tabKey === 'business'
                  ? t.ownerStudio.tabBusiness
                  : t.ownerStudio.tabMenu;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setTab(tabKey)}
                className={`px-3.5 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  tab === tabKey
                    ? 'border-[#3D5A3C] text-[#1A1715]'
                    : 'border-transparent text-[#6B655E] hover:text-[#1A1715]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {tab === 'audit' && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-[#1A1715]">
                {t.ownerStudio.auditTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-[#E5E0D8] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#3D5A3C]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.ownerStudio.auditVerified}</span>
                  </div>
                  <ul className="text-xs text-[#5A544E] space-y-1.5 leading-relaxed">
                    <li>• Business Name: Naji Specialty Coffee</li>
                    <li>• Address: Calle del Cardenal Cisneros, 39, Chamberí, 28010 Madrid</li>
                    <li>• Coordinates: 40.4316574, -3.7021703 (Quevedo Metro)</li>
                    <li>• Public Phone: +34 699 042 841</li>
                    <li>• Instagram: @najispecialtycoffee</li>
                    <li>• Tue–Sun Hours: 10:00 – 20:00</li>
                    <li>• Verified Menu Prices: Hot Pistachio Latte (€3.70), Iced Pistachio Latte (€4.50), Pistachio Financier (€2.00), Cheese &amp; Amlou Toast (€4.50)</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E5E0D8] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#9E7B4F]">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t.ownerStudio.auditPending}</span>
                  </div>
                  <ul className="text-xs text-[#5A544E] space-y-1.5 leading-relaxed">
                    <li>• Official Logo File: Currently using custom architectural crest; upload PNG/SVG in Business tab.</li>
                    <li>• WhatsApp Ordering Number: Pre-filled with +34 699 042 841; confirm WhatsApp Business is active on this line.</li>
                    <li>• Monday Seasonal Hours: Public guides note occasional afternoon openings on Mondays; live Google Maps hours override automatically when available.</li>
                    <li>• Remaining Menu Prices: Marked as "Reference price · Editable" (Mesopotamia Latte, V60, Lemon Pie Latte, Pistachio Cheesecake, etc.).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === 'business' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5A544E] mb-1">
                    {t.ownerStudio.businessName}
                  </label>
                  <input
                    type="text"
                    value={draftBusiness.name}
                    onChange={(e) =>
                      setDraftBusiness((prev) => ({...prev, name: e.target.value}))
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5A544E] mb-1">
                    {t.ownerStudio.phoneNumber}
                  </label>
                  <input
                    type="text"
                    value={draftBusiness.phone}
                    onChange={(e) =>
                      setDraftBusiness((prev) => ({...prev, phone: e.target.value}))
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg font-mono-num"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5A544E] mb-1">
                    {t.ownerStudio.whatsappNumber}
                  </label>
                  <input
                    type="text"
                    value={draftBusiness.whatsappNumber}
                    onChange={(e) =>
                      setDraftBusiness((prev) => ({
                        ...prev,
                        whatsappNumber: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg font-mono-num"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5A544E] mb-1">
                    {t.ownerStudio.instagramField}
                  </label>
                  <input
                    type="text"
                    value={draftBusiness.instagramHandle}
                    onChange={(e) =>
                      setDraftBusiness((prev) => ({
                        ...prev,
                        instagramHandle: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A544E] mb-1">
                  {t.ownerStudio.addressField}
                </label>
                <input
                  type="text"
                  value={draftBusiness.address}
                  onChange={(e) =>
                    setDraftBusiness((prev) => ({...prev, address: e.target.value}))
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E5E0D8] rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2.5 text-xs font-medium text-[#1A1715] cursor-pointer">
                <input
                  type="checkbox"
                  checked={draftBusiness.whatsappVerified}
                  onChange={(e) =>
                    setDraftBusiness((prev) => ({
                      ...prev,
                      whatsappVerified: e.target.checked,
                    }))
                  }
                  className="rounded border-[#D6D0C6] text-[#3D5A3C]"
                />
                <span>{t.ownerStudio.whatsappActiveLabel}</span>
              </label>

              <div className="pt-2 border-t border-[#E5E0D8]">
                <label className="block text-xs font-medium text-[#5A544E] mb-2">
                  {t.ownerStudio.logoUploadLabel}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1A1715] bg-white border border-[#E5E0D8] rounded-lg cursor-pointer hover:border-[#1A1715]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {draftBusiness.customLogoDataUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setDraftBusiness((prev) => ({...prev, customLogoDataUrl: null}))
                      }
                      className="text-xs text-[#6B655E] hover:text-[#1A1715] underline cursor-pointer"
                    >
                      {t.ownerStudio.logoRemove}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === 'menu' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#3D5A3C] rounded-lg hover:bg-[#2E462D] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.ownerStudio.addNewItem}</span>
                </button>
              </div>

              <div className="space-y-3">
                {draftMenu.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-xl border border-[#E5E0D8] space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-6">
                        <input
                          type="text"
                          value={item.name[lang]}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftMenu((prev) =>
                              prev.map((m, i) =>
                                i === idx ? {...m, name: {...m.name, [lang]: val}} : m
                              )
                            );
                          }}
                          className="w-full px-3 py-1.5 text-sm font-medium bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg"
                        />
                      </div>

                      <div className="sm:col-span-3 flex items-center gap-2">
                        <span className="text-xs text-[#6B655E]">€</span>
                        <input
                          type="number"
                          step="0.10"
                          min="0"
                          value={item.price}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setDraftMenu((prev) =>
                              prev.map((m, i) => (i === idx ? {...m, price: val} : m))
                            );
                          }}
                          className="w-full px-2.5 py-1.5 text-sm font-mono-num bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg"
                        />
                      </div>

                      <div className="sm:col-span-3 flex items-center gap-3 text-xs">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.priceVerified}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setDraftMenu((prev) =>
                                prev.map((m, i) =>
                                  i === idx ? {...m, priceVerified: checked} : m
                                )
                              );
                            }}
                          />
                          <span>{t.ownerStudio.verifiedPriceToggle}</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.available}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setDraftMenu((prev) =>
                                prev.map((m, i) =>
                                  i === idx ? {...m, available: checked} : m
                                )
                              );
                            }}
                          />
                          <span>{t.ownerStudio.availableToggle}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onResetAll();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#6B655E] hover:text-[#1A1715] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.ownerStudio.resetDefaults}</span>
          </button>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#3D5A3C]">
                <Check className="w-3.5 h-3.5" />
                {t.ownerStudio.savedFeedback}
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-medium text-white bg-[#3D5A3C] hover:bg-[#2E462D] rounded-lg transition-colors cursor-pointer"
            >
              {t.ownerStudio.saveChanges}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
