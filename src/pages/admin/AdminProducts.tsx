
import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
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
  }

  function handleAdd() {
    setEditingProduct(null);
    setShowForm(true);
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingProduct(null);
  }

  async function handleFormSave(data: any) {
    setLoading(true);
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, data);
        setProductsList((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updated : p))
        );
      } else {
        const inserted = await addProduct(data);
        setProductsList((prev) => [inserted, ...prev]);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId: string) {
    setLoading(true);
    try {
      await deleteProduct(productId);
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
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
              inStock: editingProduct.inStock
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
