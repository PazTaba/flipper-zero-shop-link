
import { fetchProducts } from "@/lib/supabaseDb";

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

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await fetchProducts();
  return allProducts.filter(product => product.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const allProducts = await fetchProducts();
  return allProducts.find(product => product.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const allProducts = await fetchProducts();
  return allProducts.find(product => product.id === id);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  if (!product.relatedProducts || product.relatedProducts.length === 0) {
    return [];
  }
  
  const allProducts = await fetchProducts();
  return allProducts.filter(p => product.relatedProducts?.includes(p.id));
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await fetchProducts();
  return allProducts.filter(p => p.category === category);
}
