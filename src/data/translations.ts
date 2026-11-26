import type {Language, MenuCategoryId} from '../types';

export interface Translations {
  nav: {
    menu: string;
    heritage: string;
    gallery: string;
    reviews: string;
    visit: string;
    orderNow: string;
  };
  hero: {
    locationLine: string;
    headline: string;
    viewMenu: string;
    orderWhatsApp: string;
    qrMenuLink: string;
    hoursLabel: string;
    addressLabel: string;
    metroLabel: string;
    ratingLabel: string;
    ratingFallback: string;
    walkingDistance: string;
  };
  signatures: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addToOrder: string;
    added: string;
  };
  heritage: {
    eyebrow: string;
    title: string;
    points: {title: string; body: string}[];
  };
  menu: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    categories: Record<MenuCategoryId, string>;
    verifiedPrice: string;
    estimatedPrice: string;
    unavailable: string;
    addToCart: string;
    addedToCart: string;
    noResults: string;
    resetSearch: string;
    ownerEditHint: string;
    openOwnerStudio: string;
    openQrView: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    captions: string[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    liveBadge: string;
    publicGuideSummaryTitle: string;
    publicGuideSummaryText: string;
    verifiedReviewsCount: string;
    viewOnGoogleMaps: string;
    getDirections: string;
    loadingLive: string;
    liveUnavailable: string;
    googleAttribution: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    openingHours: string;
    contactTitle: string;
    addressTitle: string;
    phoneLabel: string;
    whatsappLabel: string;
    whatsappUnverifiedNote: string;
    instagramLabel: string;
    days: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', string>;
    verifiedHoursNote: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyBody: string;
    browseMenu: string;
    orderType: string;
    takeaway: string;
    dineIn: string;
    delivery: string;
    tableNumber: string;
    tablePlaceholder: string;
    deliveryAddress: string;
    deliveryPlaceholder: string;
    customerName: string;
    namePlaceholder: string;
    specialInstructions: string;
    instructionsPlaceholder: string;
    subtotal: string;
    total: string;
    confirmWhatsApp: string;
    copyMessage: string;
    copied: string;
    clearCart: string;
    messagePreview: string;
    whatsappSetupBanner: string;
    configureWhatsApp: string;
  };
  qrPage: {
    backToWebsite: string;
    digitalMenuBadge: string;
    tableWelcome: string;
    ownerToolsTitle: string;
    ownerToolsSubtitle: string;
    targetUrlLabel: string;
    downloadPng: string;
    downloadSvg: string;
    printCard: string;
    cardHeading: string;
    cardSubheading: string;
    cardScanHint: string;
  };
  ownerStudio: {
    title: string;
    subtitle: string;
    auditTitle: string;
    auditVerified: string;
    auditPending: string;
    tabBusiness: string;
    tabMenu: string;
    tabAudit: string;
    saveChanges: string;
    savedFeedback: string;
    resetDefaults: string;
    businessName: string;
    phoneNumber: string;
    whatsappNumber: string;
    whatsappActiveLabel: string;
    addressField: string;
    instagramField: string;
    logoUploadLabel: string;
    logoRemove: string;
    priceEur: string;
    verifiedPriceToggle: string;
    availableToggle: string;
    addNewItem: string;
    close: string;
  };
  footer: {
    rights: string;
    ownerToolsBtn: string;
    qrMenuBtn: string;
    mapsTerms: string;
  };
  floatingWhatsapp: {
    label: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      menu: 'Menu',
      heritage: 'Heritage',
      gallery: 'Gallery',
      reviews: 'Reviews',
      visit: 'Visit',
      orderNow: 'Order Now',
    },
    hero: {
      locationLine: 'Chamberí, Madrid · Calle del Cardenal Cisneros, 39',
      headline: 'Specialty coffee crafted with Iraqi warmth in the heart of Madrid.',
      viewMenu: 'View Digital Menu',
      orderWhatsApp: 'Order via WhatsApp',
      qrMenuLink: 'QR Table Menu',
      hoursLabel: 'Opening Hours',
      addressLabel: 'Location',
      metroLabel: 'Nearest Metro',
      ratingLabel: 'Google Maps',
      ratingFallback: '4.8 ★ Public Guide Average',
      walkingDistance: 'Quevedo · 2 min walk',
    },
    signatures: {
      eyebrow: 'House Signatures',
      title: 'What Madrid comes back for',
      subtitle:
        'Emulsified pistachio cream, cardamom-spiced espresso, and slow-bar filter brews prepared to order.',
      addToOrder: 'Add to Order',
      added: 'Added',
    },
    heritage: {
      eyebrow: 'Our Craft',
      title: 'Third-wave precision meets Middle Eastern hospitality',
      points: [
        {
          title: '01. House Pistachio Craft',
          body: 'Our signature Pistachio Latte blends velvety specialty espresso with house-emulsified pistachio cream and freshly grated pistachios—balanced, nutty, and never artificial.',
        },
        {
          title: '02. Rotating Micro-Lot Filter Bar',
          body: 'For purists, we dial in single-origin beans from respected European roasters across V60, Chemex, and AeroPress.',
        },
        {
          title: '03. Personal Welcome',
          body: 'Founded by Naji Alasil, our intimate Chamberí bar is laptop-friendly, pet-friendly, and guided by unhurried conversation.',
        },
      ],
    },
    menu: {
      eyebrow: 'Interactive Digital Menu',
      title: 'Coffee, Tea & Artisanal Pastries',
      subtitle:
        'Select items and quantities below to build your takeaway, dine-in, or local delivery order via WhatsApp.',
      searchPlaceholder: 'Search pistachio, V60, cardamom, cheesecake...',
      allCategories: 'All Items',
      categories: {
        signatures: 'Signature Creations',
        espresso_filter: 'Espresso & Slow Bar',
        tea_botanicals: 'Iraqi Tea',
        pastries_toasts: 'Pastries & Toasts',
      },
      verifiedPrice: 'Publicly listed price',
      estimatedPrice: 'Reference price · Editable',
      unavailable: 'Currently unavailable',
      addToCart: 'Add to Order',
      addedToCart: 'Added',
      noResults: 'No menu items match your search.',
      resetSearch: 'Show all items',
      ownerEditHint:
        'Prices marked "Reference price" were not listed in public menus and can be updated anytime in Owner Studio.',
      openOwnerStudio: 'Edit Prices & Info',
      openQrView: 'QR Table Menu',
    },
    gallery: {
      eyebrow: 'Atmosphere & Craft',
      title: 'Inside Calle del Cardenal Cisneros, 39',
      subtitle:
        'Sunlit oak counters, ceramic tableware, and fresh pastries made for slow mornings in Chamberí.',
      captions: [
        'Pistachio Latte & espresso bar counter',
        'Signature hot & iced Pistachio Latte',
        'V60 pour-over & Mesopotamia spiced latte',
        'Pistachio cheesecake & golden financiers',
        'Fresh cheese & Moroccan Amlou sourdough toast',
        'Warm Chamberí coffee bar interior',
      ],
    },
    reviews: {
      eyebrow: 'Verified Reputation',
      title: 'Guest Reviews & Google Maps Profile',
      liveBadge: 'Verified via Google Maps',
      publicGuideSummaryTitle: 'Verified Public Guide Consensus',
      publicGuideSummaryText:
        'Consistently rated ~4.8/5 across European Coffee Trip, Wanderlog, and Madrid specialty guides for our house Pistachio Latte, warm owner-led service, and calm Chamberí atmosphere.',
      verifiedReviewsCount: 'reviews on Google Maps',
      viewOnGoogleMaps: 'Open Google Maps Listing',
      getDirections: 'Get Directions',
      loadingLive: 'Fetching live verified Google Maps reviews...',
      liveUnavailable:
        'Live Google Maps reviews are displayed directly when Maps API quota allows; open our Google Maps listing below to read all verified guest reviews.',
      googleAttribution: 'Place data & reviews powered by Google Maps',
    },
    visit: {
      eyebrow: 'Visit Us',
      title: 'Find Naji Specialty Coffee in Madrid',
      openingHours: 'Opening Hours',
      contactTitle: 'Contact & Social',
      addressTitle: 'Address & Directions',
      phoneLabel: 'Phone',
      whatsappLabel: 'WhatsApp Ordering',
      whatsappUnverifiedNote:
        'Pre-filled with listed café phone (+34 699 042 841) — owner can confirm or update in Owner Studio.',
      instagramLabel: 'Instagram',
      days: {
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
      },
      verifiedHoursNote: 'Live Google Maps hours override defaults when available.',
    },
    cart: {
      title: 'Your WhatsApp Order',
      emptyTitle: 'Your order is empty',
      emptyBody: 'Add signature drinks, filter brews, or pastries from the menu to send an order directly via WhatsApp.',
      browseMenu: 'Browse Menu',
      orderType: 'Fulfillment Option',
      takeaway: 'Takeaway',
      dineIn: 'Dine-In',
      delivery: 'Delivery',
      tableNumber: 'Table Number (optional)',
      tablePlaceholder: 'e.g. Table 2 / Window Bar',
      deliveryAddress: 'Delivery Address in Madrid',
      deliveryPlaceholder: 'Street, floor, doorbell...',
      customerName: 'Your Name',
      namePlaceholder: 'Your name',
      specialInstructions: 'Special Instructions',
      instructionsPlaceholder: 'Oat milk, decaf, iced, allergies...',
      subtotal: 'Subtotal',
      total: 'Estimated Total',
      confirmWhatsApp: 'Confirm Order on WhatsApp',
      copyMessage: 'Copy Order Text',
      copied: 'Copied to clipboard',
      clearCart: 'Clear',
      messagePreview: 'WhatsApp Message Preview',
      whatsappSetupBanner:
        'Note: WhatsApp number is currently pre-filled from the café phone (+34 699 042 841) and awaiting owner verification.',
      configureWhatsApp: 'Configure Number',
    },
    qrPage: {
      backToWebsite: 'Back to Full Website',
      digitalMenuBadge: 'Table Digital Menu',
      tableWelcome: 'Scan, browse & order directly to your table or counter.',
      ownerToolsTitle: 'Owner Table QR Kit',
      ownerToolsSubtitle:
        'Download or print this QR code for table tents, window displays, or takeaway bags once published.',
      targetUrlLabel: 'Menu URL encoded in QR',
      downloadPng: 'Download PNG',
      downloadSvg: 'Download SVG',
      printCard: 'Print Table Card',
      cardHeading: 'Naji Specialty Coffee',
      cardSubheading: 'Scan for Digital Menu & WhatsApp Ordering',
      cardScanHint: 'Chamberí · C. del Cardenal Cisneros, 39 · EN / ES',
    },
    ownerStudio: {
      title: 'Owner Configuration Studio',
      subtitle:
        'Easily edit business details, WhatsApp ordering number, and menu prices. Changes save locally in your browser for demonstration.',
      auditTitle: 'Verified vs. Pending Configuration Audit',
      auditVerified: 'Verified from Google Maps & Public Sources',
      auditPending: 'Pending Owner Confirmation / Editable',
      tabBusiness: 'Business & Contact',
      tabMenu: 'Menu & Prices',
      tabAudit: 'Verification Audit',
      saveChanges: 'Save Changes',
      savedFeedback: 'Changes Saved',
      resetDefaults: 'Reset to Defaults',
      businessName: 'Café Name',
      phoneNumber: 'Public Phone',
      whatsappNumber: 'WhatsApp Number (digits with country code)',
      whatsappActiveLabel: 'Mark WhatsApp ordering number as verified',
      addressField: 'Street Address',
      instagramField: 'Instagram Handle',
      logoUploadLabel: 'Upload Official Restaurant Logo (PNG/SVG/JPG)',
      logoRemove: 'Use Default Crest',
      priceEur: 'Price (€)',
      verifiedPriceToggle: 'Verified Price',
      availableToggle: 'Available',
      addNewItem: 'Add Menu Item',
      close: 'Close',
    },
    footer: {
      rights: 'Naji Specialty Coffee · Chamberí, Madrid',
      ownerToolsBtn: 'Owner Studio & Config',
      qrMenuBtn: 'Table QR Code',
      mapsTerms: 'Map data subject to Google Maps Platform Terms',
    },
    floatingWhatsapp: {
      label: 'Order via WhatsApp',
    },
  },
  es: {
    nav: {
      menu: 'Carta',
      heritage: 'Esencia',
      gallery: 'Galería',
      reviews: 'Reseñas',
      visit: 'Visítanos',
      orderNow: 'Pedir ahora',
    },
    hero: {
      locationLine: 'Chamberí, Madrid · Calle del Cardenal Cisneros, 39',
      headline: 'Café de especialidad preparado con calidez iraquí en el corazón de Madrid.',
      viewMenu: 'Ver carta digital',
      orderWhatsApp: 'Pedir por WhatsApp',
      qrMenuLink: 'Carta QR en mesa',
      hoursLabel: 'Horario',
      addressLabel: 'Ubicación',
      metroLabel: 'Metro más cercano',
      ratingLabel: 'Google Maps',
      ratingFallback: '4,8 ★ Media en guías públicas',
      walkingDistance: 'Quevedo · 2 min a pie',
    },
    signatures: {
      eyebrow: 'Especialidades de la casa',
      title: 'Lo que siempre repiten en Madrid',
      subtitle:
        'Crema de pistacho emulsionada, espresso con cardamomo y filtrados lentos preparados al momento.',
      addToOrder: 'Añadir',
      added: 'Añadido',
    },
    heritage: {
      eyebrow: 'Nuestra esencia',
      title: 'Precisión de especialidad y hospitalidad de Oriente Medio',
      points: [
        {
          title: '01. Pistacho artesanal de la casa',
          body: 'Nuestro Pistachio Latte combina espresso de especialidad sedoso con crema de pistacho hecha en casa y pistacho recién rallado: equilibrado y sin aromas artificiales.',
        },
        {
          title: '02. Barra de filtrado y microlotes',
          body: 'Para los amantes del café puro, ajustamos granos de origen único de tostadores europeos en V60, Chemex y AeroPress.',
        },
        {
          title: '03. Trato cercano y acogedor',
          body: 'Fundado por Naji Alasil, nuestro rincón en Chamberí admite portátil y mascotas, ideal para disfrutar sin prisas.',
        },
      ],
    },
    menu: {
      eyebrow: 'Carta digital interactiva',
      title: 'Café, té y repostería artesanal',
      subtitle:
        'Elige tus bebidas y dulces para preparar tu pedido para llevar, en local o a domicilio por WhatsApp.',
      searchPlaceholder: 'Buscar pistacho, V60, cardamomo, cheesecake...',
      allCategories: 'Todo',
      categories: {
        signatures: 'Especialidades de la casa',
        espresso_filter: 'Espresso y filtrado',
        tea_botanicals: 'Té iraquí',
        pastries_toasts: 'Repostería y tostadas',
      },
      verifiedPrice: 'Precio publicado',
      estimatedPrice: 'Precio orientativo · Editable',
      unavailable: 'No disponible ahora',
      addToCart: 'Añadir al pedido',
      addedToCart: 'Añadido',
      noResults: 'No hay productos que coincidan con tu búsqueda.',
      resetSearch: 'Ver toda la carta',
      ownerEditHint:
        'Los precios marcados como "Precio orientativo" se pueden actualizar cuando quieras desde el Panel del propietario.',
      openOwnerStudio: 'Editar precios e info',
      openQrView: 'Carta QR en mesa',
    },
    gallery: {
      eyebrow: 'Ambiente y detalle',
      title: 'Dentro de Calle del Cardenal Cisneros, 39',
      subtitle:
        'Barras de roble con luz natural, cerámica cuidada y repostería fresca para las mañanas de Chamberí.',
      captions: [
        'Pistachio Latte en la barra de espresso',
        'Pistachio Latte caliente y frío de la casa',
        'Filtrado V60 y latte especiado Mesopotamia',
        'Cheesecake de pistacho y financiers dorados',
        'Tostada de queso fresco y amlou marroquí',
        'Interior acogedor en Chamberí',
      ],
    },
    reviews: {
      eyebrow: 'Reputación verificada',
      title: 'Reseñas y perfil de Google Maps',
      liveBadge: 'Verificado en Google Maps',
      publicGuideSummaryTitle: 'Valoración en guías públicas',
      publicGuideSummaryText:
        'Valorado en torno a 4,8/5 en European Coffee Trip, Wanderlog y guías de Madrid por su Pistachio Latte casero, el trato cercano y el ambiente tranquilo de Chamberí.',
      verifiedReviewsCount: 'reseñas en Google Maps',
      viewOnGoogleMaps: 'Abrir en Google Maps',
      getDirections: 'Cómo llegar',
      loadingLive: 'Cargando reseñas verificadas de Google Maps...',
      liveUnavailable:
        'Las reseñas en directo de Google Maps se muestran cuando lo permite la cuota de la API; abre el enlace de Google Maps para ver todas las reseñas.',
      googleAttribution: 'Datos del lugar y reseñas proporcionados por Google Maps',
    },
    visit: {
      eyebrow: 'Visítanos',
      title: 'Encuentra Naji Specialty Coffee en Madrid',
      openingHours: 'Horario de apertura',
      contactTitle: 'Contacto y redes',
      addressTitle: 'Dirección y cómo llegar',
      phoneLabel: 'Teléfono',
      whatsappLabel: 'Pedidos por WhatsApp',
      whatsappUnverifiedNote:
        'Rellenado con el teléfono del local (+34 699 042 841); el propietario puede confirmarlo o cambiarlo en su panel.',
      instagramLabel: 'Instagram',
      days: {
        mon: 'Lunes',
        tue: 'Martes',
        wed: 'Miércoles',
        thu: 'Jueves',
        fri: 'Viernes',
        sat: 'Sábado',
        sun: 'Domingo',
      },
      verifiedHoursNote: 'El horario en vivo de Google Maps sustituye al predeterminado cuando está disponible.',
    },
    cart: {
      title: 'Tu pedido por WhatsApp',
      emptyTitle: 'Tu pedido está vacío',
      emptyBody: 'Añade bebidas de especialidad, cafés filtrados o dulces de la carta para enviar tu pedido por WhatsApp.',
      browseMenu: 'Ver la carta',
      orderType: 'Tipo de pedido',
      takeaway: 'Para llevar',
      dineIn: 'En local',
      delivery: 'A domicilio',
      tableNumber: 'Número de mesa (opcional)',
      tablePlaceholder: 'Ej. Mesa 2 / Barra',
      deliveryAddress: 'Dirección de entrega en Madrid',
      deliveryPlaceholder: 'Calle, piso, timbre...',
      customerName: 'Tu nombre',
      namePlaceholder: 'Tu nombre',
      specialInstructions: 'Instrucciones especiales',
      instructionsPlaceholder: 'Leche de avena, descafeinado, con hielo, alergias...',
      subtotal: 'Subtotal',
      total: 'Total estimado',
      confirmWhatsApp: 'Confirmar pedido en WhatsApp',
      copyMessage: 'Copiar texto del pedido',
      copied: 'Copiado al portapapeles',
      clearCart: 'Vaciar',
      messagePreview: 'Vista previa del mensaje de WhatsApp',
      whatsappSetupBanner:
        'Nota: el número de WhatsApp usa por ahora el teléfono del local (+34 699 042 841) pendiente de confirmación del propietario.',
      configureWhatsApp: 'Configurar número',
    },
    qrPage: {
      backToWebsite: 'Volver a la web completa',
      digitalMenuBadge: 'Carta digital de mesa',
      tableWelcome: 'Escanea, explora y pide directamente desde tu mesa o barra.',
      ownerToolsTitle: 'Kit QR de mesa para el propietario',
      ownerToolsSubtitle:
        'Descarga o imprime este código QR para mesas, escaparates o bolsas de pedido una vez publicada la web.',
      targetUrlLabel: 'URL codificada en el QR',
      downloadPng: 'Descargar PNG',
      downloadSvg: 'Descargar SVG',
      printCard: 'Imprimir tarjeta de mesa',
      cardHeading: 'Naji Specialty Coffee',
      cardSubheading: 'Escanea para ver la carta y pedir por WhatsApp',
      cardScanHint: 'Chamberí · C. del Cardenal Cisneros, 39 · EN / ES',
    },
    ownerStudio: {
      title: 'Panel de configuración del propietario',
      subtitle:
        'Edita fácilmente los datos del local, el número de WhatsApp y los precios de la carta. Los cambios se guardan en tu navegador.',
      auditTitle: 'Revisión de datos verificados y pendientes',
      auditVerified: 'Verificado en Google Maps y fuentes públicas',
      auditPending: 'Pendiente de confirmar por el propietario / Editable',
      tabBusiness: 'Negocio y contacto',
      tabMenu: 'Carta y precios',
      tabAudit: 'Revisión de datos',
      saveChanges: 'Guardar cambios',
      savedFeedback: 'Cambios guardados',
      resetDefaults: 'Restablecer valores',
      businessName: 'Nombre del café',
      phoneNumber: 'Teléfono público',
      whatsappNumber: 'Número de WhatsApp (dígitos con prefijo)',
      whatsappActiveLabel: 'Marcar número de WhatsApp como verificado',
      addressField: 'Dirección',
      instagramField: 'Usuario de Instagram',
      logoUploadLabel: 'Subir logo oficial del local (PNG/SVG/JPG)',
      logoRemove: 'Usar logotipo por defecto',
      priceEur: 'Precio (€)',
      verifiedPriceToggle: 'Precio verificado',
      availableToggle: 'Disponible',
      addNewItem: 'Añadir producto',
      close: 'Cerrar',
    },
    footer: {
      rights: 'Naji Specialty Coffee · Chamberí, Madrid',
      ownerToolsBtn: 'Panel del propietario',
      qrMenuBtn: 'Código QR de mesa',
      mapsTerms: 'Datos de mapas sujetos a las condiciones de Google Maps Platform',
    },
    floatingWhatsapp: {
      label: 'Pedir por WhatsApp',
    },
  },
};
