
import { useState, useEffect } from "react";
import { getFeaturedProducts, type Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedProducts();
  }, []);
  
  return (
    <section className="py-16 bg-flipper-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold mb-8 techno-header">
          {t("featured.title")}
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-flipper-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No featured products found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
