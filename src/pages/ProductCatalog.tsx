
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, getProductsByCategory } from "@/lib/supabaseDb";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackPageView } from "@/lib/analytics";

const ProductCatalog = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
    const { language, t } = useLanguage();
  

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
  const getTitle = () => {
    if (!category) return language === "he" ? "עיין בכל המוצרים" : "Browse All Products";

    // Capitalize first letter
    return `${category.charAt(0).toUpperCase() + category.slice(1)}s`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
