import { useState, useMemo } from "react";
import { type Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { Filter, ArrowDown, ArrowUp, SortAsc, SortDesc } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

type SortOption = "newest" | "price-asc" | "price-desc";

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filters, setFilters] = useState({
    category: {
      device: false,
      accessory: false,
      bundle: false
    },
    availability: {
      inStock: false
    }
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  // Handle filter changes
  const handleCategoryChange = (category: "device" | "accessory" | "bundle") => {
    setFilters({
      ...filters,
      category: {
        ...filters.category,
        [category]: !filters.category[category]
      }
    });
  };

  const handleAvailabilityChange = () => {
    setFilters({
      ...filters,
      availability: {
        inStock: !filters.availability.inStock
      }
    });
  };

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    // First apply filters
    let result = [...products];
    
    // Category filter
    const selectedCategories = Object.entries(filters.category)
      .filter(([_, isChecked]) => isChecked)
      .map(([category]) => category);
      
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Availability filter
    if (filters.availability.inStock) {
      result = result.filter(product => product.inStock);
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // For this mock data, we'll keep the original order for "newest"
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
      
      {/* Filters and Sort Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 md:w-auto w-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-4 w-4" />
                    <span>Newest</span>
                  </div>
                </SelectItem>
                <SelectItem value="price-asc">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    <span>Price: Low to High</span>
                  </div>
                </SelectItem>
                <SelectItem value="price-desc">
                  <div className="flex items-center gap-2">
                    <SortDesc className="h-4 w-4" />
                    <span>Price: High to Low</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Filter Panels */}
        {showFilters && (
          <div className="bg-flipper-dark/50 border border-flipper-purple/20 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filters */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="category-device" 
                      checked={filters.category.device}
                      onCheckedChange={() => handleCategoryChange("device")}
                    />
                    <Label htmlFor="category-device">Devices</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="category-accessory" 
                      checked={filters.category.accessory}
                      onCheckedChange={() => handleCategoryChange("accessory")}
                    />
                    <Label htmlFor="category-accessory">Accessories</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="category-bundle" 
                      checked={filters.category.bundle}
                      onCheckedChange={() => handleCategoryChange("bundle")}
                    />
                    <Label htmlFor="category-bundle">Bundles</Label>
                  </div>
                </div>
              </div>
              
              {/* Availability Filters */}
              <div>
                <h3 className="font-semibold mb-3">Availability</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="availability-instock" 
                    checked={filters.availability.inStock}
                    onCheckedChange={handleAvailabilityChange}
                  />
                  <Label htmlFor="availability-instock">In Stock Only</Label>
                </div>
              </div>
              
              {/* Price Range Filters */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price-min">Min ($)</Label>
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
                    <Label htmlFor="price-max">Max ($)</Label>
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
        
        {/* Results Count */}
        <div className="text-sm text-gray-400 mb-4">
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </div>
      </div>
      
      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
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
