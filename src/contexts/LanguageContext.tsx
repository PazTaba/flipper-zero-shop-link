
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "he";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Define all our translations
const translations: Translations = {
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

    // General
    "language": "Language",
    "switchToHebrew": "עברית",
    "switchToEnglish": "English",
    "inStock": "In Stock",
    "outOfStock": "Out of Stock",
  },
  he: {
    // Navigation
    "nav.home": "בית",
    "nav.products": "מוצרים",
    "nav.devices": "מכשירים",
    "nav.accessories": "אביזרים",
    "nav.bundles": "חבילות",
    "nav.admin": "ניהול",
    "nav.cart": "עגלה",
    
    // Admin
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
    "admin.totalProducts": "מוצרים",
    "admin.productsInStock": "במלאי",
    "admin.productsOutOfStock": "אזל מהמלאי",
    "admin.totalCategories": "קטגוריות",
    "admin.totalVisitors": "מבקרים",
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

    // General
    "language": "שפה",
    "switchToHebrew": "עברית",
    "switchToEnglish": "English",
    "inStock": "במלאי",
    "outOfStock": "אזל מהמלאי",
  }
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
