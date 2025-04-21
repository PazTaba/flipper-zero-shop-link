
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language, t } = useLanguage();
  const phoneNumber = "972547564251";
  
  return (
    <footer className="bg-flipper-dark border-t border-flipper-purple/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-flipper-purple rounded-md flex items-center justify-center text-white font-bold text-xl">
                F0
              </div>
              <span className="text-xl font-heading font-bold">
                {t("footer.company")}
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              {t("footer.subtitle")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-flipper-purple transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-flipper-purple transition-colors">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link to="/categories/device" className="text-gray-400 hover:text-flipper-purple transition-colors">
                  {t("nav.devices")}
                </Link>
              </li>
              <li>
                <Link to="/categories/accessory" className="text-gray-400 hover:text-flipper-purple transition-colors">
                  {t("nav.accessories")}
                </Link>
              </li>
              <li>
                <Link to="/categories/bundle" className="text-gray-400 hover:text-flipper-purple transition-colors">
                  {t("nav.bundles")}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-flipper-purple transition-colors">
                  {t("admin.portal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t("footer.email")}</li>
              <li>{t("footer.whatsapp")}</li>
              <li>{t("footer.hours")}</li>
            </ul>
            <div className="mt-4">
              <a 
                href={`https://wa.me/${phoneNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-tech inline-flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                {t("footer.contact.cta")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-flipper-purple/20 mt-8 pt-6 text-gray-400 text-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>{t("footer.copyright")}</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link to="/privacy" className="hover:text-flipper-purple transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link to="/terms" className="hover:text-flipper-purple transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
