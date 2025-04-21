
import { Link } from "react-router-dom";
import { type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { language, t } = useLanguage();
  
  // Generate WhatsApp link with pre-populated message
  const generateWhatsAppLink = () => {
    const phoneNumber = "972547564251"; 
    const message = language === "he"
      ? encodeURIComponent(`שלום! אני מעוניין לרכוש את ${product.name[language]}. האם תוכל לספק לי מידע נוסף?`)
      : encodeURIComponent(`Hi! I'm interested in purchasing the ${product.name[language]}. Can you provide more information?`);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="cyber-card group">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/products/${product.slug}`}>
          <img 
            src={product.images[0]} 
            alt={product.name[language]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-flipper-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-mono">
          ${product.price.toFixed(2)}
        </div>
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-flipper-danger/90 text-white px-3 py-1 rounded-full text-sm">
            {language === "he" ? t("outOfStock") : "Out of Stock"}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-flipper-purple transition-colors">
            {product.name[language]}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.shortDescription[language]}
        </p>
        
        <div className="flex justify-between items-center">
          {/* Category Badge */}
          <span className="text-xs px-2 py-1 rounded-full bg-flipper-purple/20 text-flipper-purple">
            {language === "he" 
              ? product.category === "device" 
                ? "מכשיר" 
                : product.category === "accessory" 
                  ? "אביזר" 
                  : "חבילה"
              : product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          
          {/* Order Button */}
          <a 
            href={generateWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-green-500 hover:text-green-400 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">{language === "he" ? t("featured.order") : "Order"}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
