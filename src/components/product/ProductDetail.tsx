
import { useState, useEffect } from "react";
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
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const productData = await getProductBySlug(slug);
        setProduct(productData);
        
        if (productData) {
          const related = await getRelatedProducts(productData);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-flipper-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-4">Loading product...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {language === "he" ? "המוצר לא נמצא" : "Product Not Found"}
        </h2>
        <p className="mb-8">
          {language === "he" ? "מצטערים, המוצר שאתה מחפש אינו קיים." : "Sorry, the product you're looking for doesn't exist."}
        </p>
        <Link to="/products">
          <Button>
            {language === "he" ? "עיין בכל המוצרים" : "Browse All Products"}
          </Button>
        </Link>
      </div>
    );
  }

  const phoneNumber = "972547564251"; 
  const generateWhatsAppLink = () => {
    const message = language === "he"
      ? encodeURIComponent(`שלום! אני מעוניין לרכוש את ${product.name[language]}. האם תוכל לספק לי מידע נוסף?`)
      : encodeURIComponent(`Hi! I'm interested in purchasing the ${product.name[language]}. Can you provide more information?`);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/products" className="text-flipper-purple hover:underline flex items-center gap-1">
          {language === "he" ? "← חזרה למוצרים" : "← Back to Products"}
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
                {language === "he" ? t("outOfStock") : "Out of Stock"}
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
                ? t("inStock")
                : t("outOfStock")}
            </span>
          </div>
          
          <div className="mb-6">
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-flipper-purple/20 text-flipper-purple mb-4">
              {product.category === "device"
                ? t("nav.devices")
                : product.category === "accessory"
                ? t("nav.accessories")
                : t("nav.bundles")}
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
              {language === "he" ? "מפרט טכני" : "Technical Specifications"}
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
            {language === "he" ? "מוצרים קשורים" : "Related Products"}
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
