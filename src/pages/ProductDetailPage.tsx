
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import WhatsAppButton from "@/components/WhatsAppButton";

const ProductDetailPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductDetail />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetailPage;
