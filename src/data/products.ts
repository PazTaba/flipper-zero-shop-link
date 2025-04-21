export interface MultilangText {
  en: string;
  he: string;
}

export interface Product {
  id: string;
  name: MultilangText;
  slug: string;
  description: MultilangText;
  shortDescription: MultilangText;
  price: number;
  images: string[];
  category: "device" | "accessory" | "bundle";
  inStock: boolean;
  featured: boolean;
  specifications: {
    [key: string]: string | string[];
  };
  relatedProducts?: string[];
}

// עדכון הדאטה – דוגמה ל־2 מוצרים מלאים
export const products: Product[] = [
  {
    id: "flipper-zero-main",
    name: { en: "Flipper Zero", he: "פליפר זירו" },
    slug: "flipper-zero",
    description: {
      en: "Flipper Zero is a portable multi-tool for pentesters and geeks in a toy-like body. It loves collecting digital stuff like RFID cards, radio remotes, digital access keys, and more. The device combines commonly used hardware tools in a single case with a well-thought-out interface based on a transflective LCD.",
      he: "פליפר זירו הוא כלי רב־תכליתי לפנטסטרים וגיקים בגוף צעצוע. הוא אוהב לאסוף מידע דיגיטלי כמו כרטיסי RFID, שלטים ועוד. המכשיר משלב כלים נפוצים בממשק חכם עם מסך LCD."
    },
    shortDescription: {
      en: "Portable multi-tool for pentesters and geeks with RFID, radio, and IR capabilities",
      he: "כלי רב־תכליתי קטן לפנטסטרים וגיקים – RFID, רדיו ו־IR",
    },
    price: 169.99,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    ],
    category: "device",
    inStock: true,
    featured: true,
    specifications: {
      "MCU": "1x ST ARM Cortex-M4 (80 MHz)",
      "Wireless": ["Sub-1 GHz (EU/US/RU)", "NFC (13.56 MHz)", "Bluetooth (2.4 GHz)", "IR"],
      "Controls": ["5-way action button", "Back button"],
      "Display": "1-bit 128×64 pixel LCD (1.4 inch)",
      "Power": "1x 18650 Li-Ion battery (2 days of active use)",
      "Memory": "16 MB external Flash",
      "Connectivity": "USB Type-C"
    },
    relatedProducts: ["flipper-zero-case", "flipper-wifi-dev-board"]
  },
  {
    id: "flipper-zero-case",
    name: {
      en: "Flipper Zero Protective Case",
      he: "מגן לפליפר זירו"
    },
    slug: "flipper-zero-case",
    description: {
      en: "Protect your Flipper Zero with this durable silicone case. Designed to perfectly fit the device while providing easy access to all controls and ports. The case offers protection against drops, scratches, and everyday wear and tear.",
      he: "הגנו על הפליפר שלכם עם מגן סיליקון ייעודי. מתאים בצורה מושלמת ומגן מפני שברים ושריטות, עם גישה מלאה לכל החיבורים והכפתורים."
    },
    shortDescription: {
      en: "Durable silicone protective case for Flipper Zero",
      he: "מגן סיליקון איכותי לפליפר זירו"
    },
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    ],
    category: "accessory",
    inStock: true,
    featured: false,
    specifications: {
      "Material": "High-quality silicone",
      "Color": ["Black", "Purple", "Clear"],
      "Features": ["Full access to all ports and buttons", "Shock resistant", "Non-slip grip"],
      "Compatibility": "All Flipper Zero models"
    }
  },
  {
    id: "flipper-wifi-dev-board",
    name: { en: "Flipper Zero WiFi Development Board", he: "לוח פיתוח WiFi לפליפר זירו" },
    slug: "flipper-wifi-dev-board",
    description: {
      en: "Expand your Flipper Zero's capabilities with this WiFi development board. This module adds WiFi connectivity to your Flipper, enabling wireless penetration testing, remote control, and various IoT applications. The board connects through the GPIO interface and is powered directly from your Flipper Zero.",
      he: "הרחב את היכולות של הפליפר זירו שלך עם לוח פיתוח WiFi זה. מודול זה מוסיף קישוריות WiFi לפליפר שלך, ומאפשר בדיקות חדירה אלחוטיות, שלט רחוק ויישומי IoT שונים. הלוח מתחבר דרך ממשק GPIO ומופעל ישירות מהפליפר זירו שלך."
    },
    shortDescription: {
      en: "Add WiFi connectivity to your Flipper Zero for wireless pentest capabilities",
      he: "הוסף קישוריות WiFi לפליפר זירו שלך ליכולות בדיקת חדירה אלחוטיות"
    },
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    ],
    category: "accessory",
    inStock: true,
    featured: true,
    specifications: {
      "Chipset": "ESP32-S2",
      "WiFi": "2.4 GHz IEEE 802.11 b/g/n",
      "Interface": "GPIO pin connector",
      "Power": "Powered through Flipper Zero",
      "Firmware": "Open source, customizable",
      "Dimensions": "40mm x 30mm x 10mm"
    }
  },
  {
    id: "flipper-complete-bundle",
    name: { en: "Flipper Zero Complete Bundle", he: "חבילה שלמה של פליפר זירו" },
    slug: "flipper-complete-bundle",
    description: {
      en: "Get everything you need with this complete Flipper Zero bundle. Package includes the Flipper Zero device, protective case, WiFi development board, and a set of programmable NFC cards. Perfect for both beginners and experienced users wanting the full Flipper experience.",
      he: "קבל את כל מה שאתה צריך עם חבילה שלמה זו של Flipper Zero. החבילה כוללת את מכשיר ה-Flipper Zero, כיסוי מגן, לוח פיתוח WiFi וסט של כרטיסי NFC הניתנים לתכנות. מושלם למתחילים ולמשתמשים מנוסים שרוצים את חוויית ה-Flipper המלאה."
    },
    shortDescription: {
      en: "Complete package with Flipper Zero, case, WiFi board, and NFC cards",
      he: "חבילה שלמה עם Flipper Zero, כיסוי, לוח WiFi וכרטיסי NFC"
    },
    price: 219.99,
    images: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    ],
    category: "bundle",
    inStock: false,
    featured: true,
    specifications: {
      "Contents": [
        "1x Flipper Zero device",
        "1x Protective case (Black)",
        "1x WiFi development board",
        "5x Programmable NFC cards",
        "1x USB-C cable",
        "Quick start guide"
      ]
    },
    relatedProducts: ["flipper-zero-main", "flipper-zero-case", "flipper-wifi-dev-board"]
  },
  {
    id: "flipper-rfid-pack",
    name: { en: "Flipper Zero RFID Expansion Pack", he: "ערכת הרחבת RFID של Flipper Zero" },
    slug: "flipper-rfid-pack",
    description: {
      en: "Enhance your RFID capabilities with this specialized expansion pack. Includes a long-range RFID antenna, assorted tags of different frequencies, and a guide on RFID cloning and security testing. Extends the range and functionality of your Flipper Zero's built-in RFID features.",
      he: "שפר את יכולות ה-RFID שלך עם ערכת הרחבה מיוחדת זו. כולל אנטנת RFID לטווח ארוך, תגים מגוונים בתדרים שונים ומדריך לשכפול RFID ובדיקות אבטחה. מרחיב את הטווח והפונקציונליות של תכונות ה-RFID המובנות של ה-Flipper Zero שלך."
    },
    shortDescription: {
      en: "Extended range RFID antenna and tag collection for Flipper Zero",
      he: "אנטנת RFID לטווח מורחב ואוסף תגים עבור Flipper Zero"
    },
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    ],
    category: "accessory",
    inStock: true,
    featured: false,
    specifications: {
      "Contents": [
        "Long-range RFID antenna",
        "10x Assorted RFID tags (125 kHz and 13.56 MHz)",
        "RFID security testing guide",
        "Carrying case"
      ],
      "Compatibility": "All Flipper Zero models",
      "Range Extension": "Up to 3x normal range"
    }
  },
  {
    id: "flipper-gpio-pins",
    name: { en: "Flipper Zero GPIO Pin Set", he: "סט פינים GPIO של Flipper Zero" },
    slug: "flipper-gpio-pins",
    description: {
      en: "Connect your Flipper Zero to external hardware with this specialized GPIO pin set. Includes various cables, adapters, and a breakout board for hardware hacking projects. Perfect for connecting to sensors, displays, and other electronic components.",
      he: "חבר את ה-Flipper Zero שלך לחומרה חיצונית עם סט פינים GPIO מיוחד זה. כולל כבלים, מתאמים ולוח breakout לפרויקטים של פריצת חומרה. מושלם לחיבור לחיישנים, צגים ורכיבים אלקטרוניים אחרים."
    },
    shortDescription: {
      en: "GPIO cables and adapters for hardware connections",
      he: "כבלים ומתאמי GPIO לחיבורי חומרה"
    },
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    ],
    category: "accessory",
    inStock: true,
    featured: false,
    specifications: {
      "Contents": [
        "GPIO breakout board",
        "Ribbon cable",
        "Jumper wires (male and female)",
        "Pin headers",
        "Quick reference guide"
      ],
      "Compatibility": "All Flipper Zero models with GPIO interface"
    }
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product): Product[] => {
  if (!product.relatedProducts || product.relatedProducts.length === 0) {
    return [];
  }
  return products.filter(p => product.relatedProducts?.includes(p.id));
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
