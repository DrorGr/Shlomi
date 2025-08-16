
import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Layout
    navHome: 'Home',
    navHouses: 'Houses',
    navMyTickets: 'My Tickets',
    navProfile: 'Profile',
    lotteryPlatform: 'Lottery Platform',
    dreamHome: 'Dream Home',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    
    // Home Page
    heroTitle: 'Win Your',
    heroTitleSpan: ' Dream Home',
    heroSubtitle: 'Enter our exclusive house lottery for a chance to win stunning properties worth millions. Your dream home is just one ticket away.',
    viewHouses: 'View Houses',
    signUpNow: 'Sign Up Now',
    learnMore: 'Learn More',
    nextDrawIn: 'Next Draw In',
    propertiesWon: 'Properties Won',
    happyWinners: 'Happy Winners',
    totalValue: 'Total Value',
    featuredProperties: 'Featured Properties',
    featuredSubtitle: 'Discover your next potential dream home',
    viewAllProperties: 'View All Properties',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',

    // Houses Page
    propertiesTitle: 'Dream Properties',
    propertiesSubtitle: 'Choose your dream home from our exclusive collection',
    searchPlaceholder: 'Search by property name or location...',
    sortBy: 'Sort by',
    newestFirst: 'Newest First',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    valueHighLow: 'Value: High to Low',
    ticketsLeft: 'Tickets Left',
    allStatus: 'All Status',
    active: 'Active',
    soldOut: 'Sold Out',
    ended: 'Ended',
    showing: 'Showing',
    of: 'of',
    properties: 'properties',
    noPropertiesFound: 'No properties found',
    noPropertiesSubtitle: 'Try adjusting your search or filter criteria',

    // House Card & Detail
    value: 'Value',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    sqFt: 'Sq Ft',
    ticketsSold: 'Tickets Sold',
    perTicket: 'per ticket',
    viewDetails: 'View Details',
    loadingDetails: 'Loading property details...',
    purchase: 'Purchase',
    ticket: 'Ticket',
    tickets: 'Tickets',
    total: 'Total',
    signInToPurchase: 'Sign In to Purchase',
    processing: 'Processing...',
    propertyDescription: 'Property Description',
    featuresAndAmenities: 'Features & Amenities',
    remaining: 'remaining',
    quantity: 'Quantity',

    // My Tickets
    myTicketsTitle: 'My Tickets',
    myTicketsSubtitle: 'Track all your lottery entries',
    signInRequired: 'Sign In Required',
    signInToViewTickets: 'Please sign in to view your tickets',
    signIn: 'Sign In',
    loadingTickets: 'Loading your tickets...',
    totalTickets: 'Total Tickets',
    totalSpent: 'Total Spent',
    noTicketsYet: 'No tickets yet',
    noTicketsSubtitle: 'Start by purchasing tickets for your dream home',
    browseProperties: 'Browse Properties',
    ticketNumbers: 'Ticket Numbers',
    more: 'more',
    amountPaid: 'Amount Paid',
    purchaseDate: 'Purchase Date',
    viewProperty: 'View Property',
    
    // Profile & Registration
    myProfile: 'My Profile',
    manageAccount: 'Manage your account information',
    signInToViewProfile: 'Please sign in to view your profile',
    logout: 'Logout',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    emailCannotBeChanged: 'Email cannot be changed',
    phoneNumber: 'Phone Number',
    address: 'Address',
    notProvided: 'Not provided',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    cancel: 'Cancel',
    joinLottery: 'Join the Lottery',
    completeProfile: 'Complete your profile to start buying tickets',
    completeRegistration: 'Complete Registration',
    creatingAccount: 'Creating Account...',
  },
  pl: {
    // Layout
    navHome: 'Strona główna',
    navHouses: 'Domy',
    navMyTickets: 'Moje losy',
    navProfile: 'Profil',
    lotteryPlatform: 'Platforma loteryjna',
    dreamHome: 'Wymarzony Dom',
    darkMode: 'Tryb ciemny',
    lightMode: 'Tryb jasny',

    // Home Page
    heroTitle: 'Wygraj swój',
    heroTitleSpan: ' Wymarzony Dom',
    heroSubtitle: 'Weź udział w naszej ekskluzywnej loterii i wygraj oszałamiające nieruchomości warte miliony. Twój wymarzony dom jest na wyciągnięcie ręki.',
    viewHouses: 'Zobacz domy',
    signUpNow: 'Zarejestruj się',
    learnMore: 'Dowiedz się więcej',
    nextDrawIn: 'Następne losowanie za',
    propertiesWon: 'Wygrane nieruchomości',
    happyWinners: 'Zadowoleni zwycięzcy',
    totalValue: 'Łączna wartość',
    featuredProperties: 'Wyróżnione nieruchomości',
    featuredSubtitle: 'Odkryj swój potencjalny wymarzony dom',
    viewAllProperties: 'Zobacz wszystkie nieruchomości',
    days: 'Dni',
    hours: 'Godzin',
    minutes: 'Minut',
    seconds: 'Sekund',

    // Houses Page
    propertiesTitle: 'Wymarzone nieruchomości',
    propertiesSubtitle: 'Wybierz swój wymarzony dom z naszej ekskluzywnej kolekcji',
    searchPlaceholder: 'Szukaj po nazwie lub lokalizacji...',
    sortBy: 'Sortuj według',
    newestFirst: 'Najnowsze',
    priceLowHigh: 'Cena: od najniższej',
    priceHighLow: 'Cena: od najwyższej',
    valueHighLow: 'Wartość: od najwyższej',
    ticketsLeft: 'Pozostało losów',
    allStatus: 'Wszystkie statusy',
    active: 'Aktywne',
    soldOut: 'Wyprzedane',
    ended: 'Zakończone',
    showing: 'Wyświetlanie',
    of: 'z',
    properties: 'nieruchomości',
    noPropertiesFound: 'Nie znaleziono nieruchomości',
    noPropertiesSubtitle: 'Spróbuj zmienić kryteria wyszukiwania',
    
    // House Card & Detail
    value: 'Wartość',
    bedrooms: 'Sypialnie',
    bathrooms: 'Łazienki',
    sqFt: 'm²',
    ticketsSold: 'Sprzedane losy',
    perTicket: 'za los',
    viewDetails: 'Zobacz szczegóły',
    loadingDetails: 'Ładowanie szczegółów nieruchomości...',
    purchase: 'Kup',
    ticket: 'Los',
    tickets: 'Losy',
    total: 'Suma',
    signInToPurchase: 'Zaloguj się, aby kupić',
    processing: 'Przetwarzanie...',
    propertyDescription: 'Opis nieruchomości',
    featuresAndAmenities: 'Cechy i udogodnienia',
    remaining: 'pozostało',
    quantity: 'Ilość',

    // My Tickets
    myTicketsTitle: 'Moje losy',
    myTicketsSubtitle: 'Śledź wszystkie swoje losy na loterii',
    signInRequired: 'Wymagane logowanie',
    signInToViewTickets: 'Zaloguj się, aby zobaczyć swoje losy',
    signIn: 'Zaloguj się',
    loadingTickets: 'Ładowanie Twoich losów...',
    totalTickets: 'Wszystkie losy',
    totalSpent: 'Wydano łącznie',
    noTicketsYet: 'Brak losów',
    noTicketsSubtitle: 'Zacznij od zakupu losów na swój wymarzony dom',
    browseProperties: 'Przeglądaj nieruchomości',
    ticketNumbers: 'Numery losów',
    more: 'więcej',
    amountPaid: 'Zapłacona kwota',
    purchaseDate: 'Data zakupu',
    viewProperty: 'Zobacz nieruchomość',

    // Profile & Registration
    myProfile: 'Mój profil',
    manageAccount: 'Zarządzaj informacjami o swoim koncie',
    signInToViewProfile: 'Zaloguj się, aby zobaczyć swój profil',
    logout: 'Wyloguj się',
    fullName: 'Imię i nazwisko',
    emailAddress: 'Adres e-mail',
    emailCannotBeChanged: 'Adres e-mail nie może zostać zmieniony',
    phoneNumber: 'Numer telefonu',
    address: 'Adres',
    notProvided: 'Nie podano',
    editProfile: 'Edytuj profil',
    saveChanges: 'Zapisz zmiany',
    saving: 'Zapisywanie...',
    cancel: 'Anuluj',
    joinLottery: 'Dołącz do loterii',
    completeProfile: 'Uzupełnij swój profil, aby kupować losy',
    completeRegistration: 'Zakończ rejestrację',
    creatingAccount: 'Tworzenie konta...',
  },
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  const t = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
