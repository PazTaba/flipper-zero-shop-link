
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "he";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Define all our translations
const translations: Translations = {

  he: {
    // ניווט
    "nav.home": "בית",
    "nav.products": "מוצרים",
    "nav.devices": "מכשירים",
    "nav.accessories": "אביזרים",
    "nav.bundles": "חבילות",
    "nav.admin": "ניהול",
    "nav.cart": "עגלה",

    "admin.dashboard": "לוח בקרה",
    "admin.products": "מוצרים",
    "admin.categories": "קטגוריות",
    "admin.settings": "הגדרות",
    "admin.logout": "התנתק",
    "admin.portal": "פורטל ניהול",
    "admin.signin": "התחבר כדי לנהל את החנות שלך",
    "admin.email": "אימייל",
    "admin.password": "סיסמה",
    "admin.forgotPassword": "שכחת סיסמה?",
    "admin.login": "התחבר",
    "admin.signingIn": "מתחבר...",
    "admin.demoCredentials": "פרטי התחברות לדוגמה (לבדיקה):",
    "admin.welcomeBack": "ברוך הבא, מנהל",
    "admin.totalProducts": "סה״כ מוצרים",
    "admin.productsInStock": "במלאי",
    "admin.productsOutOfStock": "אזל מהמלאי",
    "admin.totalCategories": "סה״כ קטגוריות",
    "admin.totalVisitors": "סה״כ מבקרים",
    "admin.fromLastWeek": "משבוע שעבר",
    "admin.whatsappInquiries": "פניות בוואטסאפ",
    "admin.convertedToSales": "הומרו למכירות",
    "admin.visitorTrends": "מגמות מבקרים - 7 ימים אחרונים",
    "admin.mostViewedProducts": "המוצרים הנצפים ביותר",
    "admin.addProduct": "הוסף מוצר",
    "admin.searchProducts": "חפש מוצרים...",
    "admin.image": "תמונה",
    "admin.name": "שם",
    "admin.price": "מחיר",
    "admin.category": "קטגוריה",
    "admin.status": "סטטוס",
    "admin.actions": "פעולות",
    "admin.productInStock": "במלאי",
    "admin.productOutOfStock": "אזל מהמלאי",
    "admin.shortDescription": "תיאור קצר",
    "admin.description": "תיאור",
    "admin.save": "שמור",
    "admin.cancel": "ביטול",
    "admin.slug": "שם מזהה",
    "admin.slugDesc": "מזהה ייחודי לשימוש בקישור או כתובת URL. רצוי באנגלית וללא רווחים.",
    "admin.images": "תמונה",



    // כללי
    "language": "שפה",
    "switchToHebrew": "עברית",
    "switchToEnglish": "English",
    "inStock": "במלאי",
    "outOfStock": "אזל מהמלאי",

    // דף הבית / מוצרים / גיבורים
    "hero.title1": "פליפר זירו",
    "hero.subtitle": "פליפר זירו – מכשיר רב-תכליתי לאינטראקציה מתקדמת עם מערכות בקרת גישה וטכנולוגיות דיגיטליות.",
    "hero.cta.products": "צפו במוצרים",
    "hero.cta.flagship": "מכשיר הדגל שלנו",
    "hero.flagship.title": "פליפר זירו – מכשיר קומפקטי עם ממשקי רדיו, NFC, RFID ושלט אינפרה-אדום.\nהכל פתוח – גם החומרה וגם התוכנה.",
    "hero.feature.sub1": "רדיו תת-1GHz",
    "hero.feature.nfc": "NFC ו-RFID",
    "hero.feature.ir": "שידור אינפרה-אדום (IR)",
    "hero.feature.os": "קוד פתוח",
    "hero.specs.sunlcd": "עיצוב אינטואיטיבי עם מסך LCD שקרא באור שמש",

    // מוצרים נבחרים
    "featured.title": "מוצרים נבחרים",
    "featured.device.name": "פליפר זירו",
    "featured.device.price": "₪1350",
    "featured.device.desc": "המולטיטול הנייד למקצועני סייבר וחובבי גאדג'טים עם יכולות RFID, רדיו ו-IR.",
    "featured.device.category": "מכשיר",
    "featured.wifiaddon.name": "כרטיס הרחבת WiFi לפליפר זירו",
    "featured.wifiaddon.price": "₪115",
    "featured.wifiaddon.desc": "הוסיפו חיבור WiFi לפליפר זירו שלכם לפעולות פנטסטינג אלחוטיות.",
    "featured.wifiaddon.category": "אביזר",
    "featured.bundle.name": "חבילת פליפר זירו המלאה",
    "featured.bundle.price": "₪835",
    "featured.bundle.desc": "הכול כלול: המכשיר, כיסוי מגן, כרטיס WiFi וכרטיסי NFC.",
    "featured.bundle.category": "חבילה",
    "featured.bundle.outofstock": "אזל מהמלאי",
    "featured.order": "הזמנה",

    // אודות
    "about.title": "מהו פליפר זירו?",
    "about.paragraph1": "פליפר זירו הוא מכשיר נייד בגודל כיס שנראה כמו צעצוע, אך עמוס בכלים לחקירת העולם הדיגיטלי.\nהוא מאפשר לבדוק פרוטוקולי רדיו, מערכות בקרה, חומרה חכמה ועוד – בצורה נוחה ומעוצבת.",
    "about.paragraph2": "מתאים גם למקצוענים וגם לסקרנים חובבי טכנולוגיה.",
    "about.feature.sub1": "רדיו תת-1GHz",
    "about.feature.rfid": "RFID בתדר 125kHz",
    "about.feature.nfc": "NFC ו-RFID בתדר 13.56MHz",
    "about.feature.ir": "שלט אינפרה-אדום",
    "about.feature.ibutton": "ממשק iButton",
    "about.feature.gpio": "GPIO וחיבורים חיצוניים",
    "about.feature.usb": "חיבור USB-C",
    "about.feature.bt": "קישוריות Bluetooth",

    // תחתית/צור קשר
    "footer.company": "פליפר זירו",
    "footer.subtitle": "המשווק המורשה שלכם למכשירי פליפר זירו ואביזרים מקוריים.\nאנו מציעים אחריות מלאה, תמיכה מקצועית ושירות לקוחות מצוין.",
    "footer.contact": "צור קשר:",
    "footer.email": "דוא\"ל: support@flipperzero-shop.com",
    "footer.whatsapp": "וואטסאפ: +972 54-951-2744",
    "footer.hours": "שעות פעילות: ראשון–שישי, 09:00–17:00",
    "footer.privacy": "מדיניות פרטיות",
    "footer.terms": "תנאי שירות",
    "footer.contact.cta": "פנה בוואטסאפ",
    "footer.contact.whatsapp": "וואטסאפ: +972 54-951-2744",
    "footer.copyright": "אין זו חנות רשמית של פליפר זירו",
    "footer.quickLinks": "קישורים מהירים",

  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.devices": "Devices",
    "nav.accessories": "Accessories",
    "nav.bundles": "Bundles",
    "nav.admin": "Admin",
    "nav.cart": "Cart",

    // Admin
    "admin.dashboard": "Dashboard",
    "admin.products": "Products",
    "admin.categories": "Categories",
    "admin.settings": "Settings",
    "admin.logout": "Logout",
    "admin.portal": "Admin Portal",
    "admin.signin": "Sign in to manage your store",
    "admin.email": "Email",
    "admin.password": "Password",
    "admin.forgotPassword": "Forgot password?",
    "admin.login": "Sign In",
    "admin.signingIn": "Signing in...",
    "admin.demoCredentials": "Demo credentials (for testing):",
    "admin.welcomeBack": "Welcome back, Admin",
    "admin.totalProducts": "Total Products",
    "admin.productsInStock": "in stock",
    "admin.productsOutOfStock": "out of stock",
    "admin.totalCategories": "Categories",
    "admin.totalVisitors": "Total Visitors",
    "admin.fromLastWeek": "from last week",
    "admin.whatsappInquiries": "WhatsApp Inquiries",
    "admin.convertedToSales": "converted to sales",
    "admin.visitorTrends": "Visitor Trends - Last 7 Days",
    "admin.mostViewedProducts": "Most Viewed Products",
    "admin.addProduct": "Add Product",
    "admin.searchProducts": "Search products...",
    "admin.image": "Image",
    "admin.name": "Name",
    "admin.price": "Price",
    "admin.category": "Category",
    "admin.status": "Status",
    "admin.actions": "Actions",
    "admin.productInStock": "In Stock",
    "admin.productOutOfStock": "Out of Stock",
    "admin.shortDescription": "Short Description",
    "admin.description": "Description",
    "admin.save": "Save",
    "admin.cancel": "Cancel",

    // General
    "language": "Language",
    "switchToHebrew": "עברית",
    "switchToEnglish": "English",
    "inStock": "In Stock",
    "outOfStock": "Out of Stock",

    "hero.title1": "Flipper Zero",
    "hero.subtitle": "Flipper Zero – a multifunctional device for advanced interaction with access control systems and digital technologies.",
    "hero.cta.products": "View Products",
    "hero.cta.flagship": "Our Flagship Device",
    "hero.flagship.title": "Flipper Zero – a compact device with radio, NFC, RFID, and IR interfaces.\nOpen source – both hardware and software.",
    "hero.feature.sub1": "Sub-1GHz Radio",
    "hero.feature.nfc": "NFC and RFID",
    "hero.feature.ir": "Infrared Transmission (IR)",
    "hero.feature.os": "Open Source",
    "hero.specs.sunlcd": "Intuitive design with a sunlight-readable LCD display",

    "featured.title": "Featured Products",
    "featured.device.name": "Flipper Zero",
    "featured.device.price": "₪1350",
    "featured.device.desc": "The portable multitool for tech enthusiasts and professionals with RFID, radio, and IR capabilities.",
    "featured.device.category": "Device",
    "featured.wifiaddon.name": "Flipper Zero WiFi Expansion Board",
    "featured.wifiaddon.price": "₪115",
    "featured.wifiaddon.desc": "Add WiFi capability to your Flipper Zero for advanced wireless pentesting.",
    "featured.wifiaddon.category": "Accessory",
    "featured.bundle.name": "Full Flipper Zero Bundle",
    "featured.bundle.price": "₪835",
    "featured.bundle.desc": "Everything you need: device, protective case, WiFi board, and NFC cards.",
    "featured.bundle.category": "Bundle",
    "featured.bundle.outofstock": "Out of Stock",
    "featured.order": "Order Now",

    "about.title": "What is Flipper Zero?",
    "about.paragraph1": "Flipper Zero is a pocket-sized device that looks like a toy, but is packed with tools to explore the digital world.\nIt enables testing of radio protocols, control systems, smart hardware, and more – in a user-friendly, stylish way.",
    "about.paragraph2": "Perfect for professionals and tech-savvy enthusiasts alike.",
    "about.feature.sub1": "Sub-1GHz Radio",
    "about.feature.rfid": "125kHz RFID",
    "about.feature.nfc": "13.56MHz NFC & RFID",
    "about.feature.ir": "Infrared Remote",
    "about.feature.ibutton": "iButton Interface",
    "about.feature.gpio": "GPIO and External Connections",
    "about.feature.usb": "USB-C Connection",
    "about.feature.bt": "Bluetooth Connectivity",



    // Footer translations that were missing
    "footer.company": "Flipper Zero Shop",
    "footer.subtitle": "Your authorized distributor for Flipper Zero devices and original accessories. We offer full warranty, professional support, and excellent customer service.",
    "footer.contact": "Contact Us:",
    "footer.email": "Email: support@flipperzero-shop.com",
    "footer.whatsapp": "WhatsApp: +972 54-951-2744",
    "footer.hours": "Working hours: Sunday-Friday, 09:00-17:00",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.copyright": "© 2025 Flipper Zero Shop. All rights reserved.",
    "footer.contact.cta": "Contact via WhatsApp",
    "footer.quickLinks": "Quick Links",

  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get language from localStorage, default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && ["en", "he"].includes(savedLanguage) ? savedLanguage : "en";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
    // Update document direction
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Direction based on language
  const dir: "ltr" | "rtl" = language === "he" ? "rtl" : "ltr";

  const value = {
    language,
    setLanguage,
    t,
    dir
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
