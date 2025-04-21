
import { useState, useEffect } from "react";
import { getFeaturedProducts, type Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { t } = useLanguage();
  
  useEffect(() => {
    // In a real app, this might be an API call
    const products = getFeaturedProducts();
    setFeaturedProducts(products);
  }, []);
  
  return (
    <section className="py-16 bg-flipper-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold mb-8 techno-header">
          {t("featured.title")}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
