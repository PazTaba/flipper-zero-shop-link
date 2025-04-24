
import { useState, useMemo } from "react";
import { type Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { Filter, ArrowDown, SortAsc, SortDesc } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";


interface ProductGridProps {
  products: Product[];
  title?: string;
}

type SortOption = "newest" | "price-asc" | "price-desc";

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const { language } = useLanguage();
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filters, setFilters] = useState({
    category: {
      device: false,
      accessory: false,
      bundle: false,
    },
    availability: {
      inStock: false,
    },
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category: "device" | "accessory" | "bundle") => {
    setFilters({
      ...filters,
      category: {
        ...filters.category,
        [category]: !filters.category[category],
      },
    });
  };

  const handleAvailabilityChange = () => {
    setFilters({
      ...filters,
      availability: {
        inStock: !filters.availability.inStock,
      },
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    const selectedCategories = Object.entries(filters.category)
      .filter(([_, isChecked]) => isChecked)
      .map(([category]) => category);

    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    if (filters.availability.inStock) {
      result = result.filter((product) => product.inStock);
    }

    result = result.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        break;
    }

    return result;
  }, [products, filters, sortBy, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-heading font-bold mb-8 techno-header">
          {title}
        </h2>
      )}

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 md:w-auto w-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? (language === "he" ? "הסתר סינון" : "Hide Filters") : (language === "he" ? "הצג סינון" : "Show Filters")}
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {language === "he" ? "מיין לפי:" : "Sort by:"}
            </span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === "he" ? "מיין לפי" : "Sort by"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-4 w-4" />
                    <span>{language === "he" ? "החדשים ביותר" : "Newest"}</span>
                  </div>
                </SelectItem>
                <SelectItem value="price-asc">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    <span>{language === "he" ? "מחיר: מהנמוך לגבוה" : "Price: Low to High"}</span>
                  </div>
                </SelectItem>
                <SelectItem value="price-desc">
                  <div className="flex items-center gap-2">
                    <SortDesc className="h-4 w-4" />
                    <span>{language === "he" ? "מחיר: מהגבוה לנמוך" : "Price: High to Low"}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showFilters && (
          <div className="bg-flipper-dark/50 border border-flipper-purple/20 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">{language === "he" ? "קטגוריה" : "Category"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="category-device"
                      checked={filters.category.device}
                      onCheckedChange={() => handleCategoryChange("device")}
                    />
                    <Label htmlFor="category-device">{language === "he" ? "מכשירים" : "Devices"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="category-accessory"
                      checked={filters.category.accessory}
                      onCheckedChange={() => handleCategoryChange("accessory")}
                    />
                    <Label htmlFor="category-accessory">{language === "he" ? "אביזרים" : "Accessories"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="category-bundle"
                      checked={filters.category.bundle}
                      onCheckedChange={() => handleCategoryChange("bundle")}
                    />
                    <Label htmlFor="category-bundle">{language === "he" ? "חבילות" : "Bundles"}</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">{language === "he" ? "זמינות" : "Availability"}</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability-instock"
                    checked={filters.availability.inStock}
                    onCheckedChange={handleAvailabilityChange}
                  />
                  <Label htmlFor="availability-instock">{language === "he" ? "רק מוצרים במלאי" : "In Stock Only"}</Label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">{language === "he" ? "טווח מחירים" : "Price Range"}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price-min">{language === "he" ? "מינימום (₪)" : "Min (₪)"}</Label>
                    <input
                      id="price-min"
                      type="number"
                      min="0"
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-full bg-flipper-dark border border-flipper-purple/30 rounded p-2 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price-max">{language === "he" ? "מקסימום (₪)" : "Max (₪)"}</Label>
                    <input
                      id="price-max"
                      type="number"
                      min={priceRange.min}
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full bg-flipper-dark border border-flipper-purple/30 rounded p-2 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-400 mb-4">
          {language === "he"
            ? `מציג ${filteredAndSortedProducts.length} מתוך ${products.length} מוצרים`
            : `Showing ${filteredAndSortedProducts.length} of ${products.length} products`}
        </div>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">
            {language === "he" ? "לא נמצאו מוצרים" : "No products found"}
          </h3>
          <p className="text-gray-400">
            {language === "he"
              ? "נסה לשנות את הסינונים כדי למצוא את מה שאתה מחפש."
              : "Try adjusting your filters to find what you're looking for."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;