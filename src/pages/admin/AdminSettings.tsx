
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; 
import { Product } from "@/data/products";
import { fetchProducts, updateProduct } from "@/lib/supabaseDb";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminSettings = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [toast]);
  
  const toggleFeatured = async (product: Product) => {
    setSaving(true);
    try {
      const updated = await updateProduct(product.id, {
        ...product,
        featured: !product.featured
      });
      
      // Update the products list
      setProducts(products.map(p => p.id === product.id ? updated : p));
      
      toast({
        title: updated.featured ? t("admin.productFeatured") || "Product Featured" : t("admin.productUnfeatured") || "Product Unfeatured",
        description: product.name[language]
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6 text-flipper-purple" />
        <h1 className="text-3xl font-heading techno-header">
          {t("admin.settings") || "Settings"}
        </h1>
      </div>
      
      <div className="p-4 bg-flipper-dark/80 border border-flipper-purple/30 rounded-lg">
        <h2 className="text-xl mb-4 font-bold flex items-center gap-2">
          <Star className="h-5 w-5 text-flipper-cyan" />
          {t("admin.featuredProducts") || "Featured Products"}
        </h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-flipper-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.featured") || "Featured"}</TableHead>
                  <TableHead>{t("admin.product") || "Product"}</TableHead>
                  <TableHead>{t("admin.category") || "Category"}</TableHead>
                  <TableHead>{t("admin.price") || "Price"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox 
                        checked={product.featured}
                        disabled={saving}
                        onCheckedChange={() => toggleFeatured(product)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {product.images && product.images.length > 0 && (
                          <img src={product.images[0]} alt={product.name[language]} 
                               className="h-10 w-10 object-cover rounded" />
                        )}
                        <span>{product.name[language]}</span>
                      </div>
                    </TableCell>
                    <TableCell>{t(`nav.${product.category}`) || product.category}</TableCell>
                    <TableCell>₪{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
