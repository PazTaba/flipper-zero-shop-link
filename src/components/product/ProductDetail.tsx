
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug, getRelatedProducts, type Product } from "@/data/products";
import { MessageSquare, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | undefined>(() => {
    if (!slug) return undefined;
    return getProductBySlug(slug);
  });
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(() => {
    if (!product) return [];
    return getRelatedProducts(product);
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { language } = useLanguage();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-8">Sorry, the product you're looking for doesn't exist.</p>
        <Link to="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    );
  }

  const generateWhatsAppLink = () => {
    const phoneNumber = "11234567890"; // Replace with your actual WhatsApp business number
    const message = encodeURIComponent(
      `Hi! I'm interested in purchasing the ${product.name[language]}. Can you provide more information?`
    );
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/products" className="text-flipper-purple hover:underline flex items-center gap-1">
          ← {language === "he" ? "חזרה למוצרים" : "Back to Products"}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square border border-flipper-purple/30 rounded-lg overflow-hidden bg-flipper-dark">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name[language]}
              className="w-full h-full object-contain"
            />
            
            <Dialog>
              <DialogTrigger asChild>
                <button className="absolute top-4 right-4 bg-flipper-dark/80 text-white p-2 rounded-full">
                  <ZoomIn className="h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="aspect-square">
                  <img
                    src={product.images[activeImageIndex]}
                    alt={product.name[language]}
                    className="w-full h-full object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
            
            {!product.inStock && (
              <div className="absolute top-4 left-4 bg-flipper-danger/90 text-white px-3 py-1 rounded-full text-sm">
                Out of Stock
              </div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden
                    ${activeImageIndex === index ? 'border-flipper-purple' : 'border-flipper-purple/30'}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`${product.name[language]} - view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            {product.name[language]}
          </h1>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-mono font-semibold text-flipper-purple">
              ${product.price.toFixed(2)}
            </span>
            <span className={`text-sm ${product.inStock ? "in-stock" : "out-of-stock"}`}>
              {product.inStock
                ? language === "he" ? "במלאי" : "In Stock"
                : language === "he" ? "אזל מהמלאי" : "Out of Stock"}
            </span>
          </div>
          
          <div className="mb-6">
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-flipper-purple/20 text-flipper-purple mb-4">
              {product.category === "device"
                ? language === "he" ? "מכשירים" : "Devices"
                : product.category === "accessory"
                ? language === "he" ? "אביזרים" : "Accessories"
                : language === "he" ? "חבילות" : "Bundles"}
            </span>
            
            <p className="text-gray-300 mb-6">{product.description[language]}</p>
            
            <a 
              href={generateWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-tech bg-green-600 hover:bg-green-700 py-3 px-6 w-full md:w-auto"
            >
              <MessageSquare className="h-5 w-5" />
              {language === "he" ? "הזמן בוואטסאפ" : "Order via WhatsApp"}
            </a>
          </div>
          
          <div className="border border-flipper-purple/30 rounded-lg overflow-hidden mt-8">
            <h3 className="text-xl font-heading font-semibold px-4 py-3 border-b border-flipper-purple/30 bg-flipper-purple/10">
              Technical Specifications
            </h3>
            
            <div className="p-4">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <AccordionItem key={key} value={`spec-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {key}
                    </AccordionTrigger>
                    <AccordionContent>
                      {Array.isArray(value) ? (
                        <ul className="list-disc list-inside text-gray-300 ml-2 space-y-1">
                          {value.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-300">{value}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold mb-6 techno-header">
            Related Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
