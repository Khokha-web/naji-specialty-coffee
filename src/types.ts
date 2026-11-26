export type Language = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export type MenuCategoryId =
  | 'signatures'
  | 'espresso_filter'
  | 'tea_botanicals'
  | 'pastries_toasts';

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  priceVerified: boolean;
  image: string;
  featured?: boolean;
  available: boolean;
  dietaryNote?: LocalizedText;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderMode = 'takeaway' | 'dine_in' | 'delivery';

export interface DayHours {
  dayKey: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  hours: string;
  verified: boolean;
  note?: LocalizedText;
}

export interface BusinessConfig {
  name: string;
  subtitle: LocalizedText;
  description: LocalizedText;
  story: LocalizedText;
  address: string;
  neighborhood: string;
  postalCity: string;
  nearestMetro: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  phone: string;
  phoneVerified: boolean;
  whatsappNumber: string;
  whatsappVerified: boolean;
  instagramHandle: string;
  instagramUrl: string;
  currencySymbol: string;
  currencyCode: string;
  deliveryAvailable: boolean;
  customLogoDataUrl: string | null;
  hours: DayHours[];
}

export interface GoogleReviewData {
  authorName: string;
  authorUrl?: string;
  authorPhotoUrl?: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
}

export interface GooglePlaceLiveResult {
  placeId?: string;
  displayName?: string;
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsURI?: string;
  nationalPhoneNumber?: string;
  weekdayDescriptions?: string[];
  reviews: GoogleReviewData[];
  photoUrls: {url: string; attribution?: string}[];
  loaded: boolean;
  error: string | null;
}
