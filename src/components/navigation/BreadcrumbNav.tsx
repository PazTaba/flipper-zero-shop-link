// src/components/navigation/BreadcrumbNav.tsx
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

// Define the BreadcrumbProps interface
interface BreadcrumbNavProps {
    customItems?: Array<{
        label: string;
        path?: string;
    }>;
    product?: {
        name: {
            en: string;
            he: string;
        };
        category?: "device" | "accessory" | "bundle";
        slug?: string;
    };
}

const BreadcrumbNav = ({ customItems, product }: BreadcrumbNavProps) => {
    const location = useLocation();
    const { language, t, dir } = useLanguage();

    // Generate breadcrumb items based on the URL path
    const items = useMemo(() => {
        // If custom items are provided, use those
        if (customItems && customItems.length > 0) {
            return customItems;
        }

        const paths = location.pathname.split('/').filter(Boolean);
        const result = [];

        // Handle product pages
        if (paths.includes('products') && product) {
            if (paths.length >= 2) {
                result.push({
                    label: t('nav.products'),
                    path: '/products'
                });

                // If there's a category, add it
                if (product.category) {
                    result.push({
                        label: t(`nav.${product.category}s`),
                        path: `/categories/${product.category}`
                    });
                }

                // Add the product name
                if (product.name) {
                    result.push({
                        label: product.name[language]
                    });
                }
            }
        }
        // Handle category pages
        else if (paths.includes('categories') && paths.length >= 2) {
            result.push({
                label: t('nav.products'),
                path: '/products'
            });

            const category = paths[1];
            result.push({
                label: t(`nav.${category}s`)
            });
        }
        // Handle other pages
        else {
            paths.forEach((path, i) => {
                // Skip 'products' as the first item since we handle it specially
                if (i === 0 && path === 'products') {
                    result.push({
                        label: t('nav.products')
                    });
                }
                // Allow customizing labels for common routes
                else if (path === 'cart') {
                    result.push({
                        label: t('nav.cart')
                    });
                }
                else if (path === 'admin') {
                    result.push({
                        label: t('admin.portal')
                    });
                }
                // Handle admin subpages
                else if (paths[0] === 'admin' && i > 0) {
                    result.push({
                        label: t(`admin.${path}`)
                    });
                }
                // Handle other paths
                else if (path !== 'products') {
                    result.push({
                        label: path.charAt(0).toUpperCase() + path.slice(1)
                    });
                }
            });
        }

        return result;
    }, [location.pathname, customItems, product, language, t]);

    // Don't show breadcrumbs on the home page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <div className="mx-auto w-full px-4 py-2 md:px-6 lg:px-8" dir={dir}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/" aria-label="Home">
                                <Home className="h-4 w-4" />
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    {items.map((item, i) => (
                        <BreadcrumbItem key={i}>
                            {i < items.length - 1 && item.path ? (
                                <BreadcrumbLink asChild>
                                    <Link to={item.path}>{item.label}</Link>
                                </BreadcrumbLink>
                            ) : (
                                <span className="text-muted-foreground">{item.label}</span>
                            )}

                            {i < items.length - 1 && <BreadcrumbSeparator />}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbNav;