import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { fetchProducts } from "@/lib/supabaseDb";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const allProducts = await fetchProducts();
        setProducts(allProducts);
      } catch (e: any) {
        setError(e.message || "Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const totalProducts = products.length;
  const inStockProducts = products.filter((product) => product.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Total Products</h2>
            <p className="text-3xl">{totalProducts}</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">In Stock</h2>
            <p className="text-3xl">{inStockProducts}</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Out of Stock</h2>
            <p className="text-3xl">{outOfStockProducts}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
