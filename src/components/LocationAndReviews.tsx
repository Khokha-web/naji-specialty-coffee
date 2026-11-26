import React, {useEffect, useState} from 'react';
import {
  AdvancedMarker,
  APILoadingStatus,
  APIProvider,
  InfoWindow,
  Map as GoogleMapView,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Star,
} from 'lucide-react';
import type {BusinessConfig, GooglePlaceLiveResult, Language} from '../types';
import type {Translations} from '../data/translations';

interface LocationAndReviewsProps {
  business: BusinessConfig;
  lang: Language;
  t: Translations;
  livePlace: GooglePlaceLiveResult;
  onLivePlaceUpdate: (data: GooglePlaceLiveResult) => void;
}

const getMapsApiKey = (): string => {
  const g = globalThis as unknown as {GOOGLE_MAPS_API_KEY?: string};
  return (
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    g.GOOGLE_MAPS_API_KEY ||
    ''
  );
};

// Inner component inside APIProvider that uses useMapsLibrary('places')
const LivePlaceFetcher: React.FC<{
  business: BusinessConfig;
  lang: Language;
  onLivePlaceUpdate: (data: GooglePlaceLiveResult) => void;
}> = ({business, lang, onLivePlaceUpdate}) => {
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    const fetchPlace = async () => {
      try {
        const {places} = await placesLib.Place.searchByText({
          textQuery: `${business.name} ${business.address} Madrid`,
          locationBias: business.coordinates,
          maxResultCount: 1,
          language: lang,
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'location',
            'rating',
            'userRatingCount',
            'reviews',
            'regularOpeningHours',
            'nationalPhoneNumber',
            'googleMapsURI',
            'photos',
          ],
        });

        if (cancelled) return;

        const match = places?.[0];
        if (!match) {
          onLivePlaceUpdate({
            reviews: [],
            photoUrls: [],
            loaded: true,
            error: null,
          });
          return;
        }

        interface PlaceReviewLike {
          authorAttribution?: {
            displayName?: string | null;
            uri?: string | null;
            photoURI?: string | null;
          } | null;
          rating?: number | null;
          relativePublishTimeDescription?: string | null;
          text?: string | null;
        }

        interface PlacePhotoLike {
          getURI?: (opts: {maxWidth?: number; maxHeight?: number}) => string;
          authorAttributions?: Array<{displayName?: string | null}>;
        }

        const rawReviews = (match.reviews ?? []) as PlaceReviewLike[];
        const mappedReviews = rawReviews.slice(0, 6).map((rev) => ({
          authorName: rev.authorAttribution?.displayName || 'Google Maps Guest',
          authorUrl: rev.authorAttribution?.uri ?? undefined,
          authorPhotoUrl: rev.authorAttribution?.photoURI ?? undefined,
          rating: rev.rating ?? 5,
          relativeTimeDescription: rev.relativePublishTimeDescription || '',
          text: rev.text || '',
        }));

        const rawPhotos = (match.photos ?? []) as PlacePhotoLike[];
        const mappedPhotos = rawPhotos
          .slice(0, 4)
          .map((photo) => ({
            url: typeof photo.getURI === 'function' ? photo.getURI({maxWidth: 800}) : '',
            attribution: photo.authorAttributions?.[0]?.displayName ?? undefined,
          }))
          .filter((p): p is {url: string; attribution: string | undefined} => Boolean(p.url));

        onLivePlaceUpdate({
          placeId: match.id,
          displayName: match.displayName ?? undefined,
          formattedAddress: match.formattedAddress ?? undefined,
          rating: match.rating ?? undefined,
          userRatingCount: match.userRatingCount ?? undefined,
          googleMapsURI: match.googleMapsURI ?? undefined,
          nationalPhoneNumber: match.nationalPhoneNumber ?? undefined,
          weekdayDescriptions: match.regularOpeningHours?.weekdayDescriptions ?? [],
          reviews: mappedReviews,
          photoUrls: mappedPhotos,
          loaded: true,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onLivePlaceUpdate({
          reviews: [],
          photoUrls: [],
          loaded: true,
          error: msg,
        });
      }
    };

    void fetchPlace();
    return () => {
      cancelled = true;
    };
  }, [placesLib, business.name, business.address, business.coordinates, lang, onLivePlaceUpdate]);

  return null;
};

const InteractiveCafeMap: React.FC<{
  business: BusinessConfig;
  directionsUrl: string;
  t: Translations;
}> = ({business, directionsUrl, t}) => {
  const status = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return (
      <div className="h-[380px] lg:h-[440px] w-full rounded-xl border border-[#E5E0D8] bg-[#F2EFE9] flex flex-col items-center justify-center p-8 text-center">
        <MapPin className="w-8 h-8 text-[#3D5A3C] mb-3" />
        <h3 className="font-display text-2xl font-semibold text-[#1A1715]">
          {business.name}
        </h3>
        <p className="text-sm text-[#5A544E] mt-1">
          {business.address}, {business.postalCity}
        </p>
        <p className="text-xs font-mono-num text-[#6B655E] mt-2">
          {business.coordinates.lat.toFixed(6)}, {business.coordinates.lng.toFixed(6)}
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#3D5A3C] rounded-lg hover:bg-[#2E462D]"
        >
          <Navigation className="w-4 h-4" />
          <span>{t.reviews.getDirections}</span>
        </a>
      </div>
    );
  }

  return (
    <div className="h-[380px] lg:h-[440px] w-full rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#F2EFE9]">
      <GoogleMapView
        mapId="DEMO_MAP_ID"
        defaultCenter={business.coordinates}
        defaultZoom={16}
        gestureHandling="greedy"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{width: '100%', height: '100%'}}
      >
        <AdvancedMarker
          ref={markerRef}
          position={business.coordinates}
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin background="#3D5A3C" borderColor="#1A1715" glyphColor="#FAF8F5" />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
            <div className="p-1 max-w-[230px] text-[#1A1715]">
              <p className="font-semibold text-sm">{business.name}</p>
              <p className="text-xs text-[#5A544E] mt-0.5">
                {business.address}, {business.neighborhood}
              </p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#3D5A3C] underline"
              >
                <span>{t.reviews.getDirections}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMapView>
    </div>
  );
};

export const LocationAndReviews: React.FC<LocationAndReviewsProps> = ({
  business,
  lang,
  t,
  livePlace,
  onLivePlaceUpdate,
}) => {
  const apiKey = getMapsApiKey();
  const mapsListingUrl = livePlace.googleMapsURI || business.googleMapsUrl;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.lat},${business.coordinates.lng}`;
  const cleanWhatsapp = business.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Verified Reviews Section */}
      <section id="reviews" className="py-16 lg:py-24 bg-[#F2EFE9]/60 border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C] mb-2">
                {t.reviews.eyebrow}
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1715] tracking-tight"
                style={{textWrap: 'balance'}}
              >
                {t.reviews.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={mapsListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1A1715] bg-white border border-[#E5E0D8] hover:border-[#1A1715] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>{t.reviews.viewOnGoogleMaps}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#3D5A3C] hover:bg-[#2E462D] rounded-lg transition-colors whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.reviews.getDirections}</span>
              </a>
            </div>
          </div>

          {/* Live Google Maps Reviews OR Transparent Public Consensus */}
          {livePlace.reviews.length > 0 ? (
            <div className="space-y-6">
              {livePlace.rating && (
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#1A1715]">
                  <span className="font-mono-num text-2xl font-semibold">
                    {livePlace.rating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#9E7B4F]">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(livePlace.rating ?? 5)
                            ? 'fill-[#9E7B4F]'
                            : 'text-[#D6D0C6]'
                        }`}
                      />
                    ))}
                  </div>
                  {livePlace.userRatingCount && (
                    <span className="text-[#5A544E] tabular-nums">
                      ({livePlace.userRatingCount.toLocaleString()} {t.reviews.verifiedReviewsCount})
                    </span>
                  )}
                  <span aria-hidden="true" className="text-[#D6D0C6]">·</span>
                  <span className="text-xs text-[#3D5A3C] font-medium">
                    {t.reviews.liveBadge}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {livePlace.reviews.map((rev, idx) => (
                  <article
                    key={`${rev.authorName}-${idx}`}
                    className="bg-white p-6 rounded-xl border border-[#E5E0D8] flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-0.5 text-[#9E7B4F]">
                          {Array.from({length: 5}).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-[#9E7B4F]' : 'text-[#D6D0C6]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#6B655E]">
                          {rev.relativeTimeDescription}
                        </span>
                      </div>
                      <p className="text-sm text-[#3A3530] leading-relaxed">
                        {rev.text}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#1A1715]">
                        {rev.authorName}
                      </span>
                      {rev.authorUrl && (
                        <a
                          href={rev.authorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#3D5A3C] hover:underline"
                        >
                          Google Maps
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <p className="text-xs text-[#6B655E]">{t.reviews.googleAttribution}</p>
            </div>
          ) : (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E0D8] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-[#9E7B4F]">
                  <Star className="w-4 h-4 fill-[#9E7B4F]" />
                  <span className="font-mono-num text-sm font-semibold text-[#1A1715]">
                    4.8 / 5.0
                  </span>
                  <span className="text-xs text-[#6B655E]">
                    · {t.reviews.publicGuideSummaryTitle}
                  </span>
                </div>
                <p className="text-sm text-[#5A544E] leading-relaxed">
                  {t.reviews.publicGuideSummaryText}
                </p>
                <p className="text-xs text-[#8A837A]">
                  {apiKey && !livePlace.loaded
                    ? t.reviews.loadingLive
                    : t.reviews.liveUnavailable}
                </p>
              </div>
              <a
                href={mapsListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#1A1715] bg-[#FAF8F5] border border-[#D6D0C6] hover:border-[#1A1715] rounded-lg whitespace-nowrap shrink-0"
              >
                <span>{t.reviews.viewOnGoogleMaps}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Visit, Opening Hours, Contact & Live Interactive Google Map */}
      <section id="visit" className="py-16 lg:py-24 border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium tracking-widest uppercase text-[#3D5A3C] mb-2">
              {t.visit.eyebrow}
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1715] tracking-tight"
              style={{textWrap: 'balance'}}
            >
              {t.visit.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Hours + Contact */}
            <div className="lg:col-span-5 space-y-6">
              {/* Opening Hours */}
              <div className="bg-white p-6 rounded-xl border border-[#E5E0D8]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#3D5A3C]" />
                  <h3 className="text-base font-semibold text-[#1A1715]">
                    {t.visit.openingHours}
                  </h3>
                </div>

                {livePlace.weekdayDescriptions && livePlace.weekdayDescriptions.length > 0 ? (
                  <ul className="space-y-2 text-sm text-[#3A3530] tabular-nums">
                    {livePlace.weekdayDescriptions.map((line) => (
                      <li
                        key={line}
                        className="py-1.5 border-b border-[#F2EFE9] last:border-b-0"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {business.hours.map((entry) => (
                      <li
                        key={entry.dayKey}
                        className="py-1.5 border-b border-[#F2EFE9] last:border-b-0"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[#5A544E]">
                            {t.visit.days[entry.dayKey]}
                          </span>
                          <span className="font-mono-num text-[#1A1715] font-medium">
                            {entry.hours}
                          </span>
                        </div>
                        {entry.note && (
                          <p className="text-[11px] text-[#8A837A] mt-0.5">
                            {entry.note[lang]}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Contact & Address */}
              <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] space-y-4">
                <h3 className="text-base font-semibold text-[#1A1715]">
                  {t.visit.contactTitle}
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#3D5A3C] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-[#1A1715]">
                        {livePlace.formattedAddress ||
                          `${business.address}, ${business.neighborhood}, ${business.postalCity}`}
                      </p>
                      <p className="text-xs text-[#6B655E] mt-0.5">
                        {business.nearestMetro}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#3D5A3C] shrink-0" />
                    <div>
                      <a
                        href={`tel:${business.phone.replace(/\s+/g, '')}`}
                        className="font-mono-num text-[#1A1715] hover:underline"
                      >
                        {livePlace.nationalPhoneNumber || business.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 text-[#256D43] mt-0.5 shrink-0" />
                    <div>
                      <a
                        href={`https://wa.me/${cleanWhatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#256D43] hover:underline"
                      >
                        {t.visit.whatsappLabel} (+{cleanWhatsapp})
                      </a>
                      {!business.whatsappVerified && (
                        <p className="text-xs text-[#8A837A] mt-0.5 leading-relaxed">
                          {t.visit.whatsappUnverifiedNote}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Instagram className="w-4 h-4 text-[#3D5A3C] shrink-0" />
                    <a
                      href={business.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1A1715] hover:underline"
                    >
                      {business.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Google Map */}
            <div className="lg:col-span-7">
              {apiKey ? (
                <APIProvider apiKey={apiKey} language={lang} region="ES">
                  <LivePlaceFetcher
                    business={business}
                    lang={lang}
                    onLivePlaceUpdate={onLivePlaceUpdate}
                  />
                  <InteractiveCafeMap
                    business={business}
                    directionsUrl={directionsUrl}
                    t={t}
                  />
                </APIProvider>
              ) : (
                <div className="h-[380px] lg:h-[440px] w-full rounded-xl border border-[#E5E0D8] bg-[#F2EFE9] flex flex-col items-center justify-center p-8 text-center">
                  <MapPin className="w-8 h-8 text-[#3D5A3C] mb-3" />
                  <h3 className="font-display text-2xl font-semibold text-[#1A1715]">
                    {business.name}
                  </h3>
                  <p className="text-sm text-[#5A544E] mt-1">
                    {business.address}, {business.postalCity}
                  </p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#3D5A3C] rounded-lg hover:bg-[#2E462D]"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{t.reviews.getDirections}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
