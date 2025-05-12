// src/components/product/ProductCard.tsx
import { Link } from "react-router-dom";
import { type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { MessageSquare, ShoppingCart, Star, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  className?: string;
}

const ProductCard = ({ product, featured = false, className }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate WhatsApp link with pre-populated message
  const generateWhatsAppLink = () => {
    const phoneNumber = "972549512744";
    const message = language === "he"
      ? encodeURIComponent(`שלום! אני מעוניין לרכוש את ${product.name[language]}. האם תוכל לספק לי מידע נוסף?`)
      : encodeURIComponent(`Hi! I'm interested in purchasing the ${product.name[language]}. Can you provide more information?`);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <motion.div 
      className={cn(
        "product-card group",
        featured && "md:col-span-2 md:row-span-2",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image with hover effects */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name[language]}
            className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Optional second image on hover for gallery effect */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name[language]} - view 2`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          
          {/* Image overlay with gradient */}
          <div className="product-overlay absolute inset-0 bg-gradient-to-t from-flipper-dark via-flipper-dark/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70"></div>
        </Link>

        {/* Top right badges/actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Featured badge */}
          {product.featured && (
            <div className="tech-badge bg-flipper-purple/30 text-white border-flipper-purple/40">
              <Star className="h-3 w-3" />
              <span>{language === "he" ? "מומלץ" : "Featured"}</span>
            </div>
          )}
          
          {/* Quick action buttons that appear on hover */}
          <div className="flex flex-col gap-2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-top-right">
            <button className="w-8 h-8 rounded-full bg-flipper-dark/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-flipper-purple transition-colors">
              <Heart className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-flipper-dark/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-flipper-purple transition-colors">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Top left - price tag */}
        <div className="absolute top-3 left-3 bg-flipper-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-mono">
          {product.price.toFixed(2)} ₪ 
        </div>

        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute top-12 left-3 bg-flipper-danger/90 text-white px-3 py-1 rounded-full text-sm">
            {language === "he" ? t("outOfStock") : "Out of Stock"}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 bg-flipper-dark/95 relative z-10">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-flipper-purple transition-colors">
            {product.name[language]}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.shortDescription[language]}
        </p>

        <div className="flex justify-between items-center">
          {/* Category Badge */}
          <span className="tech-badge text-xs text-flipper-purple">
            {language === "he"
              ? product.category === "device"
                ? "מכשיר"
                : product.category === "accessory"
                  ? "אביזר"
                  : "חבילה"
              : product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            
            <button 
              className={cn(
                "inline-flex items-center justify-center h-8 w-8 rounded-full transition-colors",
                product.inStock 
                  ? "bg-flipper-purple hover:bg-flipper-purpleDark text-white" 
                  : "bg-flipper-purple/30 text-white/70 cursor-not-allowed"
              )}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* "View Details" button that slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 px-4 pb-4 pt-8 bg-gradient-to-t from-flipper-dark/95 to-transparent">
          <Link to={`/products/${product.slug}`} className="block">
            <Button 
              variant="outline" 
              className="w-full border-flipper-purple/50 text-flipper-purple hover:bg-flipper-purple hover:text-white"
            >
              {language === "he" ? "צפה בפרטים" : "View Details"}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Neon glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 opacity-30 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-flipper-purple/40 to-flipper-cyan/40 rounded-lg blur-xl"></div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;