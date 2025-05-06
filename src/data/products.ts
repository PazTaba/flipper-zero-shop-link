import { fetchProducts, getProductsByCategory, getFeaturedProducts } from "@/lib/supabaseDb";

export interface MultilangText {
  en: string;
  he: string;
}

export interface Product {
  id: string;
  name: MultilangText;
  slug: string;
  description: MultilangText;
  shortDescription: MultilangText;
  price: number;
  images: string[];
  category: "device" | "accessory" | "bundle";
  inStock: boolean;
  featured: boolean;
  specifications: {
    [key: string]: string | string[];
  };
  relatedProducts?: string[];
}

// Export the functions from supabaseDb
export { getFeaturedProducts, getProductBySlug, getProductById, getRelatedProducts, getProductsByCategory };

// These functions are moved to supabaseDb.ts but we need to keep them here for backward compatibility
async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const allProducts = await fetchProducts();
  return allProducts.find(product => product.slug === slug);
}

async function getProductById(id: string): Promise<Product | undefined> {
  const allProducts = await fetchProducts();
  return allProducts.find(product => product.id === id);
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
  if (!product.relatedProducts || product.relatedProducts.length === 0) {
    return [];
  }
  
  const allProducts = await fetchProducts();
  return allProducts.filter(p => product.relatedProducts?.includes(p.id));
}
