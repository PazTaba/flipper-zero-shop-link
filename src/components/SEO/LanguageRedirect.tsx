// src/components/SEO/LanguageRedirect.tsx
import { useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * This component handles language-prefixed URLs for SEO purposes.
 * It acts as a middleware for routes to:
 * 1. Detect language from URL (/en/products, /he/products)
 * 2. Set the application language based on URL parameter
 * 3. Remove the language prefix from the URL for internal routing
 */
const LanguageRedirect = () => {
  const { lang } = useParams<{ lang?: string }>();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If URL contains a valid language code, set it as the active language
    if (lang) {
      if (lang === 'en' || lang === 'he') {
        // Only set language if it's different to avoid infinite redirects
        if (language !== lang) {
          setLanguage(lang);
        }
        
        // Remove the language part from the URL for internal routing
        // E.g., /en/products -> /products
        const newPath = location.pathname.replace(`/${lang}`, '');
        navigate(newPath || '/', { replace: true });
      } else {
        // If the lang parameter exists but isn't valid, redirect to 404
        navigate('/not-found', { replace: true });
      }
    }
  }, [lang, language, setLanguage, navigate, location.pathname]);
  
  // Render the child routes
  return <Outlet />;
};

export default LanguageRedirect;