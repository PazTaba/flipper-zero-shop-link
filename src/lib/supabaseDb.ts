
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Product, MultilangText } from "@/data/products";
import type { Json } from "@/integrations/supabase/types";

// Convert database product to application Product format
function dbProductToAppProduct(dbProduct: Database["public"]["Tables"]["products"]["Row"]): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name as unknown as MultilangText,
    slug: dbProduct.id, // Using ID as slug for now
    description: dbProduct.description as unknown as MultilangText,
    shortDescription: dbProduct.short_description as unknown as MultilangText || { en: "", he: "" },
    price: Number(dbProduct.price),
    images: dbProduct.images,
    category: dbProduct.category as "device" | "accessory" | "bundle",
    inStock: dbProduct.in_stock ?? true,
    featured: false, // Default value
    specifications: {} // Default empty specifications
  };
}

// Convert application Product format to database product format
function appProductToDbProduct(product: Partial<Product>): Partial<Database["public"]["Tables"]["products"]["Insert"]> {
  const dbProduct: Partial<Database["public"]["Tables"]["products"]["Insert"]> = {};
  
  if (product.id !== undefined) dbProduct.id = product.id;
  if (product.name !== undefined) dbProduct.name = product.name as unknown as Json;
  if (product.description !== undefined) dbProduct.description = product.description as unknown as Json;
  if (product.shortDescription !== undefined) dbProduct.short_description = product.shortDescription as unknown as Json;
  if (product.price !== undefined) dbProduct.price = product.price;
  if (product.images !== undefined) dbProduct.images = product.images;
  if (product.category !== undefined) dbProduct.category = product.category;
  if (product.inStock !== undefined) dbProduct.in_stock = product.inStock;
  
  return dbProduct;
}

// Fetch all products (public, for guests and admin)
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(dbProductToAppProduct);
}

// Add a new product (admin only)
export async function addProduct(product: Omit<Product, "id" | "slug" | "featured" | "specifications">): Promise<Product> {
  const dbProduct = appProductToDbProduct(product);
  const { data, error } = await supabase
    .from("products")
    .insert(dbProduct)
    .select()
    .single();
  if (error) throw error;
  return dbProductToAppProduct(data);
}

// Update a product (admin only)
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const dbUpdates = appProductToDbProduct(updates);
  // Ensure we're not sending an empty object
  if (Object.keys(dbUpdates).length === 0) {
    throw new Error("No updates provided");
  }
  
  const { data, error } = await supabase
    .from("products")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return dbProductToAppProduct(data);
}

// Delete a product (admin only)
export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return;
}

// Orders
export async function saveOrder(order: Omit<Database["public"]["Tables"]["orders"]["Insert"], "id" | "created_at" | "updated_at" | "status">) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();
  if (error) throw error;
  return data;
}
