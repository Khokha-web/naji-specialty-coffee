import React, {useState} from 'react';
import {Coffee} from 'lucide-react';
import type {BusinessConfig, GooglePlaceLiveResult, Language} from '../types';
import type {Translations} from '../data/translations';
import {
  HERO_IMAGE,
  INTERIOR_IMAGE,
  MESOPOTAMIA_V60_IMAGE,
  PASTRIES_IMAGE,
  PISTACHIO_LATTE_IMAGE,
  TOAST_IMAGE,
} from '../data/restaurantData';

interface HeritageAndGalleryProps {
  business: BusinessConfig;
  lang: Language;
  t: Translations;
  livePlace: GooglePlaceLiveResult;
}

export const HeritageAndGallery: React.FC<HeritageAndGalleryProps> = ({
  business,
  lang,
  t,
  livePlace,
}) => {
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const curatedImages = [
    {src: HERO_IMAGE, caption: t.gallery.captions[0]},
    {src: PISTACHIO_LATTE_IMAGE, caption: t.gallery.captions[1]},
    {src: MESOPOTAMIA_V60_IMAGE, caption: t.gallery.captions[2]},
    {src: PASTRIES_IMAGE, caption: t.gallery.captions[3]},
    {src: TOAST_IMAGE, caption: t.gallery.captions[4]},
    {src: INTERIOR_IMAGE, caption: t.gallery.captions[5]},
  ];

  return (
    <>
      {/* Heritage / Craft Story Section */}
      <section id="heritage" className="py-16 lg:py-24 bg-[#F2EFE9]/60 border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C] mb-2">
                {t.heritage.eyebrow}
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1715] tracking-tight leading-tight"
                style={{textWrap: 'balance'}}
              >
                {t.heritage.title}
              </h2>
              <p className="mt-5 text-sm sm:text-base text-[#5A544E] leading-relaxed">
                {business.story[lang]}
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#DFD9CF] border-y border-[#DFD9CF]">
              {t.heritage.points.map((pt) => (
                <div key={pt.title} className="py-6 first:pt-5 last:pb-5">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1A1715]">
                    {pt.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5A544E] leading-relaxed">
                    {pt.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-16 lg:py-24 border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C] mb-2">
              {t.gallery.eyebrow}
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1715] tracking-tight"
              style={{textWrap: 'balance'}}
            >
              {t.gallery.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5A544E] leading-relaxed">
              {t.gallery.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {curatedImages.map((img, idx) => (
              <figure
                key={img.src}
                className="group bg-white rounded-xl border border-[#E5E0D8] overflow-hidden"
              >
                <div className="aspect-[4/3] w-full bg-[#F2EFE9] overflow-hidden">
                  {!failed[idx] ? (
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailed((prev) => ({...prev, [idx]: true}))}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6">
                      <Coffee className="w-8 h-8 text-[#3D5A3C] mb-2" />
                      <span className="text-xs text-[#6B655E]">{img.caption}</span>
                    </div>
                  )}
                </div>
                <figcaption className="px-4 py-3 text-xs text-[#5A544E]">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Live Google Maps Photos if available */}
          {livePlace.photoUrls.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[#E5E0D8]">
              <p className="text-xs font-medium text-[#6B655E] mb-4">
                {t.reviews.liveBadge} · Google Maps Photos
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {livePlace.photoUrls.slice(0, 4).map((photo, idx) => (
                  <figure
                    key={photo.url}
                    className="rounded-lg overflow-hidden border border-[#E5E0D8] bg-white"
                  >
                    <div className="aspect-[4/3] bg-[#F2EFE9]">
                      <img
                        src={photo.url}
                        alt={`Naji Specialty Coffee on Google Maps ${idx + 1}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {photo.attribution && (
                      <figcaption className="px-2.5 py-1.5 text-[11px] text-[#6B655E] truncate">
                        Photo: {photo.attribution}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
