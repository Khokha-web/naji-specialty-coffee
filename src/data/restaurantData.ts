import type {BusinessConfig, MenuItem} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_naji_coffee_1795716362374.jpg';
export const PISTACHIO_LATTE_IMAGE = '/src/assets/images/menu_pistachio_latte_1795716362744.jpg';
export const MESOPOTAMIA_V60_IMAGE = '/src/assets/images/menu_mesopotamia_v60_1795716361967.jpg';
export const PASTRIES_IMAGE = '/src/assets/images/menu_pistachio_pastry_1795716363343.jpg';
export const TOAST_IMAGE = '/src/assets/images/menu_amlou_toast_1795716379064.jpg';
export const INTERIOR_IMAGE = '/src/assets/images/gallery_naji_interior_1795716379331.jpg';

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  name: 'Naji Specialty Coffee',
  subtitle: {
    en: 'Specialty Coffee & Iraqi Hospitality in Chamberí',
    es: 'Café de especialidad y hospitalidad iraquí en Chamberí',
  },
  description: {
    en: 'An intimate, owner-led specialty coffee bar in Madrid fusing single-origin espresso and manual pour-overs with Iraqi and Middle Eastern culinary traditions.',
    es: 'Una cafetería de especialidad íntima en Madrid que une espresso de origen único y filtrados manuales con la tradición culinaria iraquí y de Oriente Medio.',
  },
  story: {
    en: 'Founded by Naji Alasil on Calle del Cardenal Cisneros, our bar treats every cup as a personal welcome. From our signature Pistachio Latte—emulsified with house-made pistachio cream and freshly grated pistachios—to single-origin V60 brews and Iraqi cardamom tea, every detail reflects slow craft and warm hospitality.',
    es: 'Fundada por Naji Alasil en la Calle del Cardenal Cisneros, nuestra barra trata cada taza como una bienvenida cercana. Desde nuestro Pistachio Latte con crema de pistacho casera y pistacho recién rallado hasta filtrados V60 y té iraquí con cardamomo, cada detalle refleja calma y calidez.',
  },
  address: 'Calle del Cardenal Cisneros, 39',
  neighborhood: 'Chamberí',
  postalCity: '28010 Madrid, Spain',
  nearestMetro: 'Metro Quevedo',
  coordinates: {
    lat: 40.4316574,
    lng: -3.7021703,
  },
  googleMapsUrl:
    'https://www.google.com/maps/place/NAJI+SPECIALTY+COFFEE/@40.4316574,-3.7021703,14z/data=!4m14!1m7!3m6!1s0xd4229a9933389d7:0x84432a8f9d44d886!2sNAJI+SPECIALTY+COFFEE!8m2!3d40.4316574!4d-3.7021703!16s%2Fg%2F11fql4tynl',
  phone: '+34 699 042 841',
  phoneVerified: true,
  whatsappNumber: '34699042841',
  whatsappVerified: false, // Owner should verify WhatsApp Business ordering is active on this number
  instagramHandle: '@najispecialtycoffee',
  instagramUrl: 'https://www.instagram.com/najispecialtycoffee',
  currencySymbol: '€',
  currencyCode: 'EUR',
  deliveryAvailable: true,
  customLogoDataUrl: null,
  hours: [
    {
      dayKey: 'mon',
      hours: '10:00 – 20:00',
      verified: false,
      note: {
        en: 'Seasonal Monday hours may vary (afternoon opening on select weeks)',
        es: 'El horario de los lunes puede variar según la temporada (apertura de tarde algunas semanas)',
      },
    },
    {dayKey: 'tue', hours: '10:00 – 20:00', verified: true},
    {dayKey: 'wed', hours: '10:00 – 20:00', verified: true},
    {dayKey: 'thu', hours: '10:00 – 20:00', verified: true},
    {dayKey: 'fri', hours: '10:00 – 20:00', verified: true},
    {dayKey: 'sat', hours: '10:00 – 20:00', verified: true},
    {dayKey: 'sun', hours: '10:00 – 20:00', verified: true},
  ],
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'pistachio-latte-hot',
    category: 'signatures',
    name: {
      en: "Naji's Signature Pistachio Latte (Hot)",
      es: 'Pistachio Latte especial de Naji (caliente)',
    },
    description: {
      en: 'Specialty espresso emulsified with our house-made creamy pistachio paste, silky textured milk, and freshly grated pistachios.',
      es: 'Espresso de especialidad emulsionado con nuestra crema de pistacho casera, leche sedosa y pistacho recién rallado.',
    },
    price: 3.7,
    priceVerified: true,
    image: PISTACHIO_LATTE_IMAGE,
    featured: true,
    available: true,
    dietaryNote: {
      en: 'Plant-based milk available',
      es: 'Bebida vegetal disponible',
    },
  },
  {
    id: 'pistachio-latte-iced',
    category: 'signatures',
    name: {
      en: 'Iced Pistachio Latte',
      es: 'Pistachio Latte frío',
    },
    description: {
      en: 'Chilled specialty espresso layered over cold milk, house pistachio cream, ice, and crushed roasted pistachios.',
      es: 'Espresso de especialidad frío sobre leche fría, crema de pistacho casera, hielo y pistacho tostado picado.',
    },
    price: 4.5,
    priceVerified: true,
    image: PISTACHIO_LATTE_IMAGE,
    featured: true,
    available: true,
    dietaryNote: {
      en: 'Plant-based milk available',
      es: 'Bebida vegetal disponible',
    },
  },
  {
    id: 'mesopotamia-latte',
    category: 'signatures',
    name: {
      en: 'Mesopotamia Latte',
      es: 'Latte Mesopotamia',
    },
    description: {
      en: 'Vibrant Iraqi-inspired spiced specialty latte infused with aromatic cardamom and warm regional spices.',
      es: 'Latte de especialidad especiado de inspiración iraquí, infusionado con cardamomo aromático y especias cálidas.',
    },
    price: 4.2,
    priceVerified: false,
    image: MESOPOTAMIA_V60_IMAGE,
    featured: true,
    available: true,
    dietaryNote: {
      en: 'Plant-based milk available',
      es: 'Bebida vegetal disponible',
    },
  },
  {
    id: 'lemon-pie-cappuccino',
    category: 'signatures',
    name: {
      en: 'Lemon Pie Latte / Cappuccino',
      es: 'Latte / Cappuccino Lemon Pie',
    },
    description: {
      en: 'Playful signature pairing bright citrus zest notes with balanced specialty espresso and velvety foam.',
      es: 'Creación de la casa que combina notas cítricas frescas con espresso de especialidad equilibrado y espuma suave.',
    },
    price: 4.0,
    priceVerified: false,
    image: HERO_IMAGE,
    available: true,
  },
  {
    id: 'vienna-coffee',
    category: 'signatures',
    name: {
      en: 'Vienna Specialty Coffee',
      es: 'Café Vienés de especialidad',
    },
    description: {
      en: 'Double specialty espresso crowned with lightly whipped cream in classic European café style.',
      es: 'Doble espresso de especialidad coronado con nata ligeramente montada al estilo clásico europeo.',
    },
    price: 3.8,
    priceVerified: false,
    image: HERO_IMAGE,
    available: true,
  },
  {
    id: 'v60-pour-over',
    category: 'espresso_filter',
    name: {
      en: 'V60 Manual Pour-Over (Single Origin)',
      es: 'Filtrado manual V60 (origen único)',
    },
    description: {
      en: 'Hand-poured seasonal micro-lot filter coffee highlighting floral clarity and terroir.',
      es: 'Café de filtro de microlote de temporada vertido a mano, resaltando notas florales y de origen.',
    },
    price: 4.5,
    priceVerified: false,
    image: MESOPOTAMIA_V60_IMAGE,
    featured: true,
    available: true,
  },
  {
    id: 'chemex-aeropress',
    category: 'espresso_filter',
    name: {
      en: 'Chemex / AeroPress Slow Bar',
      es: 'Filtrado lento Chemex / AeroPress',
    },
    description: {
      en: 'Precision manual brew tailored to your preferred body and acidity from rotating specialty roasters.',
      es: 'Preparación manual de precisión ajustada al cuerpo y acidez que prefieras con tostadores de especialidad.',
    },
    price: 4.5,
    priceVerified: false,
    image: MESOPOTAMIA_V60_IMAGE,
    available: true,
  },
  {
    id: 'flat-white-espresso',
    category: 'espresso_filter',
    name: {
      en: 'Flat White / Espresso / Cortado',
      es: 'Flat White / Espresso / Cortado',
    },
    description: {
      en: 'Classic espresso-bar staples dialed in daily with rotating European specialty coffee beans.',
      es: 'Clásicos de barra calibrados cada día con granos de café de especialidad europeos.',
    },
    price: 2.8,
    priceVerified: false,
    image: HERO_IMAGE,
    available: true,
    dietaryNote: {
      en: 'Specify Espresso, Cortado, or Flat White in notes',
      es: 'Indica Espresso, Cortado o Flat White en las notas',
    },
  },
  {
    id: 'iraqi-cardamom-tea',
    category: 'tea_botanicals',
    name: {
      en: 'Traditional Iraqi Cardamom Tea',
      es: 'Té iraquí tradicional con cardamomo',
    },
    description: {
      en: 'Fragrant black tea (regular or decaf) slow-steeped with crushed green cardamom pods.',
      es: 'Té negro aromático (normal o descafeinado) infusionado lentamente con vainas de cardamomo verde.',
    },
    price: 3.0,
    priceVerified: false,
    image: MESOPOTAMIA_V60_IMAGE,
    available: true,
  },
  {
    id: 'pistachio-financier',
    category: 'pastries_toasts',
    name: {
      en: 'House Pistachio Financier',
      es: 'Financier de pistacho de la casa',
    },
    description: {
      en: 'Tender almond-butter financier baked golden with roasted pistachios—ideal alongside espresso.',
      es: 'Bizcocho financier tierno de mantequilla y almendra con pistacho tostado, ideal junto al espresso.',
    },
    price: 2.0,
    priceVerified: true,
    image: PASTRIES_IMAGE,
    featured: true,
    available: true,
  },
  {
    id: 'pistachio-cheesecake',
    category: 'pastries_toasts',
    name: {
      en: 'Artisanal Pistachio Cheesecake',
      es: 'Cheesecake artesanal de pistacho',
    },
    description: {
      en: 'Rich, velvety baked cheesecake infused with pure pistachio paste and topped with crushed pistachios.',
      es: 'Tarta de queso horneada cremosa con pasta de pistacho puro y cobertura de pistacho triturado.',
    },
    price: 5.0,
    priceVerified: false,
    image: PASTRIES_IMAGE,
    featured: true,
    available: true,
  },
  {
    id: 'amlou-cheese-toast',
    category: 'pastries_toasts',
    name: {
      en: 'Fresh Cheese & Amlou Sourdough Toast',
      es: 'Tostada de masa madre con queso fresco y amlou',
    },
    description: {
      en: 'Crisp sourdough topped with fresh cheese and Moroccan Amlou (roasted almond, argan oil, and honey spread).',
      es: 'Pan de masa madre crujiente con queso fresco y amlou marroquí (almendra tostada, aceite de argán y miel).',
    },
    price: 4.5,
    priceVerified: true,
    image: TOAST_IMAGE,
    available: true,
  },
  {
    id: 'avocado-toast',
    category: 'pastries_toasts',
    name: {
      en: 'Artisanal Avocado Toast',
      es: 'Tostada artesanal de aguacate',
    },
    description: {
      en: 'Toasted artisan sourdough layered with smashed seasoned avocado and fresh herbs.',
      es: 'Pan artesanal tostado con aguacate aliñado machacado y hierbas frescas.',
    },
    price: 4.5,
    priceVerified: false,
    image: TOAST_IMAGE,
    available: true,
  },
];
