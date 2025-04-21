
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppButtonProps {
  productName?: string;
  className?: string;
}

const WhatsAppButton = ({ productName, className = "" }: WhatsAppButtonProps) => {
  const { language, t, dir } = useLanguage();
  const phoneNumber = "972547564251"; // WhatsApp business number with country code (without special chars)
  
  // Create message text based on whether a product name was provided and the current language
  const message = productName 
    ? language === "he"
      ? `שלום! אני מעוניין לרכוש את ${productName}. האם תוכל לספק לי מידע נוסף?`
      : `Hi! I'm interested in purchasing the ${productName}. Can you provide more information?`
    : language === "he"
      ? "שלום! אני מעוניין במוצרי Flipper Zero שלכם. האם תוכל לעזור לי?"
      : "Hi! I'm interested in your Flipper Zero products. Can you help me?";
  
  // Encode the message for use in URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`whatsapp-float ${className}`}
      aria-label={language === "he" ? "צור קשר בוואטסאפ" : "Contact via WhatsApp"}
      dir={dir}
    >
      <MessageSquare className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
