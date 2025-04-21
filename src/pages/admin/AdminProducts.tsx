import { useState } from "react";
import { products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit, Trash2, Plus, Image } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AdminProductForm from "@/components/admin/AdminProductForm";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "@/lib/supabaseDb";
import { useEffect } from "react";

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
      .then((data) => setProductsList(data as any))
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
          <Plus className="h-4 w-4 mr-2" />
          {t("admin.addProduct")}
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Input
            placeholder={t("admin.searchProducts")}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-flipper-dark/70 border-flipper-purple/30 pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
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
      <div className="border border-flipper-purple/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-flipper-dark/80 hover:bg-flipper-dark/90">
              <TableHead className="w-[80px]">{t("admin.image")}</TableHead>
              <TableHead>{t("admin.name")}</TableHead>
              <TableHead>{t("admin.price")}</TableHead>
              <TableHead>{t("admin.category")}</TableHead>
              <TableHead>{t("admin.status")}</TableHead>
              <TableHead className={`${dir === "rtl" ? "text-left" : "text-right"}`}>{t("admin.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map(product => (
              <TableRow key={product.id} className="hover:bg-flipper-purple/5">
                <TableCell>
                  <div className="w-12 h-12 rounded overflow-hidden bg-flipper-dark/50">
                    <img src={product.images[0]} alt={product.name[language]} className="w-full h-full object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name[language]}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="capitalize">{t(`nav.${product.category}s`)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.inStock
                      ? "bg-flipper-success/10 text-flipper-success"
                      : "bg-flipper-danger/10 text-flipper-danger"
                  }`}>
                    {product.inStock ? t("admin.productInStock") : t("admin.productOutOfStock")}
                  </span>
                </TableCell>
                <TableCell className={`${dir === "rtl" ? "text-left" : "text-right"}`}>
                  <div className={`flex ${dir === "rtl" ? "justify-start" : "justify-end"} gap-2`}>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-flipper-purple">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-flipper-purple" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-flipper-danger" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
