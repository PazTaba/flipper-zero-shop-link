// src/utils/schemaGenerator.ts
import { Product } from "@/data/products";

// Base URL for the site
const BASE_URL = 'https://flipper-zero-shop-link.lovable.app';

// Interface for breadcrumb item
interface BreadcrumbItem {
    name: string;
    item?: string;
}

// Organization schema data
export const getOrganizationSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Flipper Zero Israel",
        "url": BASE_URL,
        "logo": `${BASE_URL}/logo.png`,
        "sameAs": [
            "https://www.facebook.com/FlipperZeroIsrael",
            "https://www.instagram.com/flipperzero_israel/",
            "https://twitter.com/FlipperZeroIL"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+972-54-951-2744",
            "contactType": "customer service",
            "availableLanguage": ["English", "Hebrew"]
        }
    };
};

// WebSite schema data
export const getWebsiteSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Flipper Zero Israel - פליפר זירו ישראל",
        "url": BASE_URL,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${BASE_URL}/products?search={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };
};

// WebPage schema data
export const getWebPageSchema = (title: string, description: string, url: string = BASE_URL) => {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": url,
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", "h2", ".speakable"]
        }
    };
};

// BreadcrumbList schema data
export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item || undefined
        }))
    };
};

// Product schema data
export const getProductSchema = (product: Product, language: string = 'en') => {
    const productName = product.name[language];
    const productDescription = product.description[language];
    const productImage = product.images[0] || `${BASE_URL}/placeholder.png`;
    const productUrl = `${BASE_URL}/products/${product.slug}`;

    // Common attributes for all product types
    const commonAttrs = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productName,
        "description": productDescription,
        "image": productImage,
        "url": productUrl,
        "brand": {
            "@type": "Brand",
            "name": "Flipper Zero"
        },
        "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "ILS",
            "price": product.price,
            "availability": product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": "Flipper Zero Israel"
            }
        }
    };

    // Category-specific attributes
    if (product.category === "device") {
        return {
            ...commonAttrs,
            "category": "Electronics > Hacking Devices",
            "material": "Plastic",
            "suitableForTerrain": "Indoor/Outdoor"
        };
    } else if (product.category === "accessory") {
        return {
            ...commonAttrs,
            "category": "Electronics > Accessories",
            "isAccessoryOrSparePartFor": {
                "@type": "Product",
                "name": "Flipper Zero"
            }
        };
    } else {
        // Bundle
        return {
            ...commonAttrs,
            "category": "Electronics > Bundles",
            "isRelatedTo": [
                {
                    "@type": "Product",
                    "name": "Flipper Zero"
                }
            ]
        };
    }
};

// FAQ schema data
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
};

// Article schema data
export const getArticleSchema = (
    title: string,
    description: string,
    url: string,
    image: string,
    datePublished: string,
    dateModified: string,
    authorName: string = "Flipper Zero Israel Team"
) => {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
            "@type": "Person",
            "name": authorName
        },
        "publisher": {
            "@type": "Organization",
            "name": "Flipper Zero Israel",
            "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };
};

// Store (Local Business) schema data
export const getLocalBusinessSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Flipper Zero Israel",
        "image": `${BASE_URL}/store-image.jpg`,
        "telephone": "+972-54-951-2744",
        "email": "support@flipperzero-shop.com",
        "url": BASE_URL,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IL",
            "addressLocality": "Tel Aviv"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "32.0853",
            "longitude": "34.7818"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
            }
        ],
        "priceRange": "₪₪₪"
    };
};