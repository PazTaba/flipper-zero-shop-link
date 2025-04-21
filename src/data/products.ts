
// Mock product data for the Flipper Zero e-commerce site
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  category: 'device' | 'accessory' | 'bundle';
  inStock: boolean;
  featured: boolean;
  specifications: {
    [key: string]: string | string[];
  };
  relatedProducts?: string[];
}

export const products: Product[] = [
  {
    id: "flipper-zero-main",
    name: "Flipper Zero",
    slug: "flipper-zero",
    description: "Flipper Zero is a portable multi-tool for pentesters and geeks in a toy-like body. It loves collecting digital stuff like RFID cards, radio remotes, digital access keys, and more. The device combines commonly used hardware tools in a single case with a well-thought-out interface based on a transflective LCD.",
    shortDescription: "Portable multi-tool for pentesters and geeks with RFID, radio, and IR capabilities",
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
    name: "Flipper Zero Protective Case",
    slug: "flipper-zero-case",
    description: "Protect your Flipper Zero with this durable silicone case. Designed to perfectly fit the device while providing easy access to all controls and ports. The case offers protection against drops, scratches, and everyday wear and tear.",
    shortDescription: "Durable silicone protective case for Flipper Zero",
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
    name: "Flipper Zero WiFi Development Board",
    slug: "flipper-wifi-dev-board",
    description: "Expand your Flipper Zero's capabilities with this WiFi development board. This module adds WiFi connectivity to your Flipper, enabling wireless penetration testing, remote control, and various IoT applications. The board connects through the GPIO interface and is powered directly from your Flipper Zero.",
    shortDescription: "Add WiFi connectivity to your Flipper Zero for wireless pentest capabilities",
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
    name: "Flipper Zero Complete Bundle",
    slug: "flipper-complete-bundle",
    description: "Get everything you need with this complete Flipper Zero bundle. Package includes the Flipper Zero device, protective case, WiFi development board, and a set of programmable NFC cards. Perfect for both beginners and experienced users wanting the full Flipper experience.",
    shortDescription: "Complete package with Flipper Zero, case, WiFi board, and NFC cards",
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
    name: "Flipper Zero RFID Expansion Pack",
    slug: "flipper-rfid-pack",
    description: "Enhance your RFID capabilities with this specialized expansion pack. Includes a long-range RFID antenna, assorted tags of different frequencies, and a guide on RFID cloning and security testing. Extends the range and functionality of your Flipper Zero's built-in RFID features.",
    shortDescription: "Extended range RFID antenna and tag collection for Flipper Zero",
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
    name: "Flipper Zero GPIO Pin Set",
    slug: "flipper-gpio-pins",
    description: "Connect your Flipper Zero to external hardware with this specialized GPIO pin set. Includes various cables, adapters, and a breakout board for hardware hacking projects. Perfect for connecting to sensors, displays, and other electronic components.",
    shortDescription: "GPIO cables and adapters for hardware connections",
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

// Function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

// Function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Function to get related products
export const getRelatedProducts = (product: Product): Product[] => {
  if (!product.relatedProducts || product.relatedProducts.length === 0) {
    return [];
  }
  
  return products.filter(p => product.relatedProducts?.includes(p.id));
};

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
