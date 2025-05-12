// src/components/layout/ModernNavbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ShoppingCart, Search, ChevronDown,
  Globe, Home, Package, Cpu, Layers, Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, icon, children, className, onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href ||
    (href !== '/' && location.pathname.startsWith(href));

  return (
    <Link
      to={href}
      className={cn(
        "nav-link group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300",
        isActive
          ? "text-flipper-purple bg-flipper-purple/10 font-medium"
          : "text-gray-200 hover:text-flipper-purple hover:bg-flipper-purple/5",
        className
      )}
      onClick={onClick}
    >
      <span className="text-flipper-purple/70 group-hover:text-flipper-purple transition-colors">
        {icon}
      </span>
      <span>{children}</span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-flipper-purple"
          layoutId="navbar-indicator"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
};

// Mega menu component for products
const ProductsMegaMenu = ({ onItemClick }: { onItemClick?: () => void }) => {
  const { t } = useLanguage();

  return (
    <NavigationMenuContent className="w-[400px] sm:w-[500px] lg:w-[600px] p-4 md:p-6 bg-flipper-dark border border-flipper-purple/20 rounded-xl shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-flipper-purple mb-2">{t("nav.categories")}</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/categories/device"
                className="group flex items-center gap-2 p-2 rounded-md hover:bg-flipper-purple/10 transition-all duration-300"
                onClick={onItemClick}
              >
                <Cpu className="h-4 w-4 text-flipper-purple/70 group-hover:text-flipper-purple transition-colors" />
                <span className="group-hover:text-flipper-purple">{t("nav.devices")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/categories/accessory"
                className="group flex items-center gap-2 p-2 rounded-md hover:bg-flipper-purple/10 transition-all duration-300"
                onClick={onItemClick}
              >
                <Zap className="h-4 w-4 text-flipper-purple/70 group-hover:text-flipper-purple transition-colors" />
                <span className="group-hover:text-flipper-purple">{t("nav.accessories")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/categories/bundle"
                className="group flex items-center gap-2 p-2 rounded-md hover:bg-flipper-purple/10 transition-all duration-300"
                onClick={onItemClick}
              >
                <Layers className="h-4 w-4 text-flipper-purple/70 group-hover:text-flipper-purple transition-colors" />
                <span className="group-hover:text-flipper-purple">{t("nav.bundles")}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-flipper-purple mb-2">{t("nav.featuredProducts")}</h3>
          <div className="grid grid-cols-1 gap-3">
            <Link
              to="/products/flipper-zero"
              className="group flex items-center gap-3 p-2 rounded-md hover:bg-flipper-purple/10 transition-all duration-300"
              onClick={onItemClick}
            >
              <div className="w-10 h-10 rounded-md overflow-hidden bg-flipper-darker/80 border border-flipper-purple/30 flex-shrink-0">
                <img
                  src="/flipper-zero-thumb.jpg"
                  alt="Flipper Zero"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/100?text=F0';
                  }}
                />
              </div>
              <div>
                <span className="block group-hover:text-flipper-purple font-medium">Flipper Zero</span>
                <span className="text-xs text-gray-400">₪1350</span>
              </div>
            </Link>
            <Link
              to="/products/wifi-devboard"
              className="group flex items-center gap-3 p-2 rounded-md hover:bg-flipper-purple/10 transition-all duration-300"
              onClick={onItemClick}
            >
              <div className="w-10 h-10 rounded-md overflow-hidden bg-flipper-darker/80 border border-flipper-purple/30 flex-shrink-0">
                <img
                  src="/wifi-devboard-thumb.jpg"
                  alt="WiFi DevBoard"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/100?text=WiFi';
                  }}
                />
              </div>
              <div>
                <span className="block group-hover:text-flipper-purple font-medium">WiFi DevBoard</span>
                <span className="text-xs text-gray-400">₪115</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-flipper-purple/10">
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-flipper-purple text-sm hover:text-flipper-cyan transition-colors"
          onClick={onItemClick}
        >
          <span>{t("nav.viewAllProducts")}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </NavigationMenuContent>
  );
};

const Navbar = () => {
  const { t, dir, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-flipper-dark/90 backdrop-blur-md border-b border-flipper-purple/20 py-2"
          : "bg-transparent py-4"
      )}
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Site Title */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-flipper-purple rounded-md"></div>
              <div className="absolute inset-0 bg-flipper-purple rounded-md animate-pulse opacity-40"></div>
              <span className="relative text-white font-bold text-xl z-10">
                F0
              </span>
            </div>
            <span className={cn(
              "text-xl font-heading font-bold hidden sm:inline-block transition-all",
              scrolled ? "text-white" : "text-white"
            )}>
              {language === "he" ? "פליפר זירו" : "Flipper Zero"}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu dir={dir}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink href="/" icon={<Home className="h-4 w-4" />}>
                    {t("nav.home")}
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "nav-link group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300",
                    "text-gray-200 hover:text-flipper-purple hover:bg-flipper-purple/5",
                    "focus:bg-flipper-purple/10 focus:text-flipper-purple data-[state=open]:bg-flipper-purple/10 data-[state=open]:text-flipper-purple"
                  )}>
                    <Package className="h-4 w-4 text-flipper-purple/70 group-hover:text-flipper-purple transition-colors" />
                    <span>{t("nav.products")}</span>
                  </NavigationMenuTrigger>
                  <ProductsMegaMenu />
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink href="/categories/device" icon={<Cpu className="h-4 w-4" />}>
                    {t("nav.devices")}
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink href="/categories/accessory" icon={<Zap className="h-4 w-4" />}>
                    {t("nav.accessories")}
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink href="/categories/bundle" icon={<Layers className="h-4 w-4" />}>
                    {t("nav.bundles")}
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-200 hover:text-flipper-purple hover:bg-flipper-purple/5 rounded-md"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart Button */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-200 hover:text-flipper-purple hover:bg-flipper-purple/5 rounded-md"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-flipper-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Admin Link */}
            <Link to="/admin" className="hidden sm:block">
              <Button
                variant="outline"
                className="border-flipper-purple text-flipper-purple hover:bg-flipper-purple hover:text-white"
              >
                {t("nav.admin")}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-200 hover:text-flipper-purple hover:bg-flipper-purple/5 rounded-md"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={dir === "rtl" ? "right" : "left"}
                className="w-[280px] border-flipper-purple/20 bg-flipper-dark"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b border-flipper-purple/10 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-flipper-purple rounded-md flex items-center justify-center text-white font-bold text-lg">
                        F0
                      </div>
                      <span className="text-lg font-heading font-bold text-white">
                        {language === "he" ? "פליפר זירו" : "Flipper Zero"}
                      </span>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-gray-300 hover:text-flipper-purple">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  <nav className="flex flex-col gap-2 flex-1">
                    <NavLink
                      href="/"
                      icon={<Home className="h-5 w-5" />}
                      onClick={closeMobileMenu}
                    >
                      {t("nav.home")}
                    </NavLink>
                    <NavLink
                      href="/products"
                      icon={<Package className="h-5 w-5" />}
                      onClick={closeMobileMenu}
                    >
                      {t("nav.products")}
                    </NavLink>
                    <NavLink
                      href="/categories/device"
                      icon={<Cpu className="h-5 w-5" />}
                      onClick={closeMobileMenu}
                    >
                      {t("nav.devices")}
                    </NavLink>
                    <NavLink
                      href="/categories/accessory"
                      icon={<Zap className="h-5 w-5" />}
                      onClick={closeMobileMenu}
                    >
                      {t("nav.accessories")}
                    </NavLink>
                    <NavLink
                      href="/categories/bundle"
                      icon={<Layers className="h-5 w-5" />}
                      onClick={closeMobileMenu}
                    >
                      {t("nav.bundles")}
                    </NavLink>
                  </nav>

                  <div className="mt-auto py-4 border-t border-flipper-purple/10">
                    <div className="flex flex-col gap-2">
                      <Link to="/cart">
                        <Button
                          variant="outline"
                          className="w-full border-flipper-purple/30 text-gray-200 hover:bg-flipper-purple/10 hover:text-flipper-purple justify-start"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 text-flipper-purple/70" />
                          <span>
                            {t("nav.cart")}
                            {cartCount > 0 && ` (${cartCount})`}
                          </span>
                        </Button>
                      </Link>

                      <Link to="/admin">
                        <Button
                          variant="outline"
                          className="w-full border-flipper-purple text-flipper-purple hover:bg-flipper-purple/10"
                        >
                          {t("nav.admin")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;