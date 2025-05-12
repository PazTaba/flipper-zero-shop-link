// src/components/SEO/SEOManager.tsx
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOManagerProps {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
    schema?: object;
    keywords?: string;
    noIndex?: boolean;
    isArticle?: boolean;
    articlePublishedTime?: string;
    articleModifiedTime?: string;
}

const SEOManager = ({
    title,
    description,
    canonicalUrl,
    ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
    schema,
    keywords,
    noIndex = false,
    isArticle = false,
    articlePublishedTime,
    articleModifiedTime,
}: SEOManagerProps) => {
    const { language } = useLanguage();

    // Default SEO values
    const defaultTitle = language === "he"
        ? "פליפר זירו (Flipper Zero) - הגאדג'ט האולטימטיבי להאקרים | קנה עכשיו"
        : "Flipper Zero - The Ultimate Hacking Multi-tool | Buy Now";

    const defaultDescription = language === "he"
        ? "מה זה פליפר זירו? Flipper Zero הוא גאדג'ט רב-תכליתי לחובבי האקינג, אבטחת מידע וטכנולוגיה. קנה עכשיו פליפר זירו עם כל האביזרים: כרטיס Wi-Fi, NFC, אנטנות ועוד במשלוח מהיר!"
        : "What is Flipper Zero? A multi-tool gadget for cybersecurity professionals, tech enthusiasts, and hackers. Buy now with fast shipping and all accessories: WiFi card, NFC, antennas and more!";

    const defaultKeywords = language === "he"
        ? "פליפר זירו, Flipper Zero, מה זה פליפר זירו, what is Flipper Zero, לקנות פליפר זירו, גאדג'ט האקינג, אביזרים לפליפר זירו, כרטיס WiFi, NFC"
        : "Flipper Zero, hacking device, penetration testing, security research, NFC, RFID, WiFi, IR blaster, multi-tool, cybersecurity gadget";

    const siteUrl = "https://flipper-zero-shop-link.lovable.app";
    const currentUrl = canonicalUrl || siteUrl;

    // Default schema data
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": isArticle ? "Article" : "WebPage",
        "name": title || defaultTitle,
        "description": description || defaultDescription,
        "url": currentUrl,
        ...(isArticle && articlePublishedTime ? {
            "datePublished": articlePublishedTime,
            "dateModified": articleModifiedTime || articlePublishedTime
        } : {}),
        "publisher": {
            "@type": "Organization",
            "name": "Flipper Zero Israel",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
            }
        }
    };

    // Alternative language links
    const alternateLanguageUrl = canonicalUrl || window.location.pathname;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title || defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords || defaultKeywords} />}
            <link rel="canonical" href={currentUrl} />

            {/* Indexing Controls */}
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content={isArticle ? "article" : "website"} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:locale" content={language === "he" ? "he_IL" : "en_US"} />
            <meta property="og:locale:alternate" content={language === "he" ? "en_US" : "he_IL"} />
            <meta property="og:site_name" content="Flipper Zero Israel - פליפר זירו ישראל" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* Article-specific meta tags */}
            {isArticle && articlePublishedTime && (
                <>
                    <meta property="article:published_time" content={articlePublishedTime} />
                    {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
                </>
            )}

            {/* Alternate language links */}
            <link rel="alternate" hrefLang="he" href={`${siteUrl}/he${alternateLanguageUrl}`} />
            <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${alternateLanguageUrl}`} />
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${alternateLanguageUrl}`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schema || defaultSchema)}
            </script>
        </Helmet>
    );
};

export default SEOManager;