
import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import AdminProductForm from "@/components/admin/AdminProductForm";
import AdminProductList from "@/components/admin/AdminProductList";
import AdminProductSearch from "@/components/admin/AdminProductSearch";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "@/lib/supabaseDb";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t, dir, language } = useLanguage();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => setProductsList(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = productsList.filter(product =>
    product.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
    setFormError(null);
  }

  function handleAdd() {
    setEditingProduct(null);
    setShowForm(true);
    setFormError(null);
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingProduct(null);
    setFormError(null);
  }

  async function handleFormSave(data: any) {
    setLoading(true);
    setFormError(null);
    try {
      if (editingProduct) {
        // Include featured status in the update
        const updated = await updateProduct(editingProduct.id, { 
          ...data, 
          slug: editingProduct.slug,
          featured: data.featured
        });
        setProductsList((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updated : p))
        );
        toast({
          title: t("admin.productUpdated"),
          description: data.name[language],
        });
      } else {
        let slug = data.slug;
        if (!slug || typeof slug !== "string" || slug.trim() === "") {
          slug = data.name?.en
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "")
            .substring(0, 48) || "product-" + Math.random().toString(36).slice(2, 10);
        }
        // Include featured status when adding a new product
        const inserted = await addProduct({ 
          ...data, 
          slug,
          featured: data.featured || false
        });
        setProductsList((prev) => [inserted, ...prev]);
        toast({
          title: t("admin.productAdded"),
          description: data.name[language],
        });
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (err: any) {
      console.error("Error saving product:", err);
      let errorMsg: string;
      if (typeof err === "object" && err !== null && "message" in err) {
        errorMsg = err.message;
      } else if (typeof err === "string") {
        errorMsg = err;
      } else {
        errorMsg = "An unknown error occurred.";
      }
      setFormError(errorMsg);
      toast({
        title: t("admin.errorSaving"),
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId: string) {
    setLoading(true);
    setFormError(null);
    try {
      await deleteProduct(productId);
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
      toast({
        title: t("admin.productDeleted"),
      });
    } catch (err: any) {
      console.error("Error deleting product:", err);
      let errorMsg = (typeof err === "object" && err !== null && "message" in err) ? err.message : "Unknown error";
      setFormError(errorMsg);
      toast({
        title: t("admin.errorDeleting"),
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6" dir={dir}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold techno-header">{t("admin.products")}</h1>
        <Button className="btn-tech" onClick={handleAdd}>
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
            {t("admin.addProduct")}
          </span>
        </Button>
      </div>
      <div className="flex gap-4">
        <AdminProductSearch value={searchTerm} onChange={setSearchTerm} />
      </div>
      {formError && <div className="text-red-500 bg-red-50 border border-red-200 rounded p-2">{formError}</div>}
      {showForm && (
        <div className="p-4 bg-flipper-dark/80 border border-flipper-purple/30 rounded-lg">
          <AdminProductForm
            initialData={editingProduct ? {
              ...editingProduct,
              name: editingProduct.name,
              description: editingProduct.description,
              shortDescription: editingProduct.shortDescription,
              price: editingProduct.price,
              images: editingProduct.images,
              category: editingProduct.category,
              inStock: editingProduct.inStock,
              featured: editingProduct.featured || false, // Add featured field
              slug: editingProduct.slug
            } : undefined}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        </div>
      )}
      <AdminProductList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        dir={dir}
      />
    </div>
  );
};

export default AdminProducts;
