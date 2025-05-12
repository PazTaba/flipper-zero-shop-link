// src/pages/ProductCatalog.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, getProductsByCategory } from "@/lib/supabaseDb";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackPageView } from "@/lib/analytics";
import SEOManager from "@/components/SEO/SEOManager";
import {
  getWebPageSchema,
  getBreadcrumbSchema
} from "@/utils/schemaGenerator";

const ProductCatalog = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t, dir } = useLanguage();

  useEffect(() => {
    // Track page view
    trackPageView(category ? `/categories/${category}` : '/products');

    // Scroll to top on page load
    window.scrollTo(0, 0);

    const loadProducts = async () => {
      setLoading(true);
      try {
        if (category) {
          const categoryProducts = await getProductsByCategory(category);
          setProducts(categoryProducts);
        } else {
          const allProducts = await fetchProducts();
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  // Generate title based on category
  const getPageTitle = () => {
    if (!category) return language === "he" ? "כל המוצרים | פליפר זירו ישראל" : "All Products | Flipper Zero Israel";

    // Category specific titles
    const categoryName = t(`nav.${category}s`);
    return language === "he"
      ? `${categoryName} | פליפר זירו ישראל`
      : `${categoryName} | Flipper Zero Israel`;
  };

  // Generate meta description based on category
  const getMetaDescription = () => {
    if (!category) return language === "he"
      ? "גלה את כל מוצרי פליפר זירו הזמינים בישראל. מכשירים, אביזרים וחבילות עם משלוח מהיר."
      : "Discover all Flipper Zero products available in Israel. Devices, accessories, and bundles with fast shipping.";

    // Category specific descriptions
    if (category === "device") return language === "he"
      ? "מכשירי פליפר זירו מקוריים למכירה בישראל. הזמינו עכשיו את הגאדג'ט האולטימטיבי לאבטחת מידע ויישומים טכניים."
      : "Original Flipper Zero devices for sale in Israel. Order now the ultimate gadget for cybersecurity and technical applications.";

    if (category === "accessory") return language === "he"
      ? "אביזרים מקוריים לפליפר זירו בישראל. כרטיסי WiFi, NFC, כיסויי מגן ועוד. שדרגו את חווית השימוש במכשיר שלכם."
      : "Original Flipper Zero accessories in Israel. WiFi boards, NFC, protective cases, and more. Upgrade your device experience.";

    if (category === "bundle") return language === "he"
      ? "חבילות פליפר זירו מיוחדות במחיר משתלם. קבלו את המכשיר עם כל האביזרים הנחוצים במשלוח מהיר לכל הארץ."
      : "Special Flipper Zero bundles at great value. Get the device with all necessary accessories with fast shipping nationwide.";

    return language === "he"
      ? "מוצרי פליפר זירו באיכות גבוהה זמינים להזמנה מיידית בישראל. משלוח מהיר ואחריות מלאה."
      : "High-quality Flipper Zero products available for immediate order in Israel. Fast shipping and full warranty.";
  };

  // Generate breadcrumb items for schema
  const breadcrumbItems = category ? [
    {
      name: t("nav.home"),
      item: "https://flipper-zero-shop-link.lovable.app/"
    },
    {
      name: t("nav.products"),
      item: "https://flipper-zero-shop-link.lovable.app/products"
    },
    {
      name: t(`nav.${category}s`)
    }
  ] : [
    {
      name: t("nav.home"),
      item: "https://flipper-zero-shop-link.lovable.app/"
    },
    {
      name: t("nav.products")
    }
  ];

  // Generate page schema
  const pageSchema = [
    getWebPageSchema(
      getPageTitle(),
      getMetaDescription(),
      category
        ? `https://flipper-zero-shop-link.lovable.app/categories/${category}`
        : "https://flipper-zero-shop-link.lovable.app/products"
    ),
    getBreadcrumbSchema(breadcrumbItems)
  ];

  // Generate title for the product grid
  const getTitle = () => {
    if (!category) return language === "he" ? "כל המוצרים" : "All Products";
    return t(`nav.${category}s`);
  };

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <SEOManager
        title={getPageTitle()}
        description={getMetaDescription()}
        canonicalUrl={category
          ? `https://flipper-zero-shop-link.lovable.app/categories/${category}`
          : "https://flipper-zero-shop-link.lovable.app/products"
        }
        schema={pageSchema}
        keywords={`Flipper Zero, פליפר זירו, ${category || 'products'}, ${t(`nav.${category || 'product'}s`)}, Israel, ישראל`}
      />
      <Navbar />
      <BreadcrumbNav />
      <main className="flex-grow py-8">
        {loading ? (
          <div className="container mx-auto px-4 text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-flipper-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4">Loading products...</p>
          </div>
        ) : (
          <ProductGrid products={products} title={getTitle()} />
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductCatalog;