
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Fetch all products (public, for guests and admin)
export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Add a new product (admin only)
export async function addProduct(product: Omit<Database["public"]["Tables"]["products"]["Insert"], "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Update a product (admin only)
export async function updateProduct(id: string, updates: Partial<Database["public"]["Tables"]["products"]["Update"]>) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
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
