
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
  // In the future, we can add a featured flag to the database
  // For now, returning an empty array since featured is not in DB yet
  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // This will be implemented when needed
  return undefined;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // This will be implemented when needed
  return undefined;
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  // This will be implemented when needed
  return [];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // This will be implemented when needed
  return [];
}
