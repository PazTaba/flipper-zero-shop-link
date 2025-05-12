// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import {
  Home, Package, Cpu, Zap, Layers, ShoppingCart,
  Settings, Globe, MessageSquare, Facebook, Instagram,
  Twitter, ChevronRight, Clock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  external?: boolean;
}

const FooterLink = ({ href, children, icon, external = false }: FooterLinkProps) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-flipper-purple transition-colors flex items-center gap-2 py-1"
      >
        {icon && <span className="text-flipper-purple/70">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="text-gray-400 hover:text-flipper-purple transition-colors flex items-center gap-2 py-1 group"
    >
      {icon && <span className="text-flipper-purple/70">{icon}</span>}
      <span>{children}</span>
      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    </Link>
  );
};

const SocialButton = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full bg-flipper-darker border border-flipper-purple/20 flex items-center justify-center text-gray-400 hover:text-flipper-purple hover:border-flipper-purple/50 transition-all duration-300"
    >
      {icon}
    </a>
  );
};

const Footer = () => {
  const { t, dir, language, setLanguage } = useLanguage();

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-flipper-dark border-t border-flipper-purple/10 py-12 md:py-16 overflow-hidden" dir={dir}>
      <div className="absolute inset-0 z-0 overflow-hidden opacity-5">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-flipper-purple blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-flipper-cyan blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Company & Newsletter */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 bg-flipper-purple rounded-md"></div>
                <div className="absolute inset-0 bg-flipper-purple rounded-md animate-pulse opacity-40"></div>
                <span className="relative text-white font-bold text-lg z-10">
                  F0
                </span>
              </div>
              <span className="text-lg font-heading font-bold text-white">
                {language === "he" ? "פליפר זירו" : "Flipper Zero"}
              </span>
            </div>

            <p className="text-gray-400 mb-6">
              {t("footer.subtitle")}
            </p>

            <div className="mb-8">
              <h3 className="text-white font-medium mb-3">{t("footer.newsletter")}</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="bg-flipper-darker border-flipper-purple/20 text-gray-300 focus-visible:ring-flipper-purple"
                />
                <Button
                  className="bg-flipper-purple hover:bg-flipper-purple/90 text-white"
                >
                  {t("footer.subscribe")}
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <SocialButton
                href="https://facebook.com/flipperzero"
                icon={<Facebook className="h-4 w-4" />}
              />
              <SocialButton
                href="https://instagram.com/flipper_zero"
                icon={<Instagram className="h-4 w-4" />}
              />
              <SocialButton
                href="https://twitter.com/flipper_zero"
                icon={<Twitter className="h-4 w-4" />}
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-white font-medium mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-1">
              <li>
                <FooterLink href="/" icon={<Home className="h-4 w-4" />}>
                  {t("nav.home")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/products" icon={<Package className="h-4 w-4" />}>
                  {t("nav.products")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/categories/device" icon={<Cpu className="h-4 w-4" />}>
                  {t("nav.devices")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/categories/accessory" icon={<Zap className="h-4 w-4" />}>
                  {t("nav.accessories")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/categories/bundle" icon={<Layers className="h-4 w-4" />}>
                  {t("nav.bundles")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/cart" icon={<ShoppingCart className="h-4 w-4" />}>
                  {t("nav.cart")}
                </FooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-white font-medium mb-4">{t("footer.support")}</h3>
            <ul className="space-y-1">
              <li>
                <FooterLink href="/faq">
                  {t("footer.faq")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/shipping">
                  {t("footer.shipping")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/returns">
                  {t("footer.returns")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/warranty">
                  {t("footer.warranty")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">
                  {t("footer.privacy")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">
                  {t("footer.terms")}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/contact" icon={<MessageSquare className="h-4 w-4" />}>
                  {t("footer.contact")}
                </FooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-white font-medium mb-4">{t("footer.contactInfo")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-flipper-purple">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <a
                  href="https://wa.me/972549512744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-flipper-purple transition-colors"
                >
                  {t("footer.whatsapp")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-flipper-purple">
                  <Clock className="h-4 w-4" />
                </span>
                <span className="text-gray-400">
                  {t("footer.businessHours")}
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-white font-medium mb-3">{t("footer.language")}</h3>
              <div className="flex items-center gap-3">
                <button
                  className={cn(
                    "px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors",
                    language === "en"
                      ? "bg-flipper-purple/10 text-flipper-purple font-medium"
                      : "text-gray-400 hover:text-white"
                  )}
                  onClick={() => {
                    setLanguage("en");
                  }}
                >
                  <Globe className="h-4 w-4" />
                  <span>English</span>
                </button>
                <button
                  className={cn(
                    "px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors",
                    language === "he"
                      ? "bg-flipper-purple/10 text-flipper-purple font-medium"
                      : "text-gray-400 hover:text-white"
                  )}
                  onClick={() => {
                    setLanguage("he");
                  }}
                >
                  <Globe className="h-4 w-4" />
                  <span>עברית</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 pt-6 border-t border-flipper-purple/10 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {t("footer.company")}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;