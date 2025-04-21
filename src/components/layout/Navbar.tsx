
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const { t, dir } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 bg-flipper-dark/90 backdrop-blur-md border-b border-flipper-purple/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Site Title */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-flipper-purple rounded-md flex items-center justify-center text-white font-bold text-xl">
              F0
            </div>
            <span className="text-xl font-heading font-bold hidden sm:inline-block">
              Flipper Zero Shop
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" dir={dir}>
            <Link 
              to="/" 
              className="text-gray-200 hover:text-flipper-purple transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link 
              to="/products" 
              className="text-gray-200 hover:text-flipper-purple transition-colors"
            >
              {t("nav.products")}
            </Link>
            <Link 
              to="/categories/device" 
              className="text-gray-200 hover:text-flipper-purple transition-colors"
            >
              {t("nav.devices")}
            </Link>
            <Link 
              to="/categories/accessory" 
              className="text-gray-200 hover:text-flipper-purple transition-colors"
            >
              {t("nav.accessories")}
            </Link>
            <Link 
              to="/categories/bundle" 
              className="text-gray-200 hover:text-flipper-purple transition-colors"
            >
              {t("nav.bundles")}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-200 hover:text-flipper-purple">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-flipper-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link to="/admin" className="hidden sm:block">
              <Button variant="outline" className="border-flipper-purple text-flipper-purple hover:bg-flipper-purple hover:text-white">
                {t("nav.admin")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
