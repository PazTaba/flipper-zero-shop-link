
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppButtonProps {
  productName?: string;
  className?: string;
}

const WhatsAppButton = ({ productName, className = "" }: WhatsAppButtonProps) => {
  const { dir } = useLanguage();
  const phoneNumber = "11234567890"; // Replace with your actual WhatsApp business number
  
  // Create message text based on whether a product name was provided
  const message = productName 
    ? `Hi! I'm interested in purchasing the ${productName}. Can you provide more information?` 
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
      aria-label="Contact via WhatsApp"
      dir={dir}
    >
      <MessageSquare className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
