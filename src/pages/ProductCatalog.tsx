
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { products, getProductsByCategory } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import WhatsAppButton from "@/components/WhatsAppButton";

const ProductCatalog = () => {
  const { category } = useParams<{ category?: string }>();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [category]);
  
  // Determine which products to show based on the category
  const productsToShow = category 
    ? getProductsByCategory(category) 
    : products;
  
  // Generate title based on category
  const getTitle = () => {
    if (!category) return "All Products";
    
    // Capitalize first letter
    return `${category.charAt(0).toUpperCase() + category.slice(1)}s`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <ProductGrid products={productsToShow} title={getTitle()} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductCatalog;
