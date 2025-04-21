
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";

const Dashboard = () => {
  // Calculate dashboard stats
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const totalCategories = new Set(products.map(p => p.category)).size;
  
  // Mock visitor data
  const visitorStats = [
    { date: 'Apr 14', visitors: 120 },
    { date: 'Apr 15', visitors: 145 },
    { date: 'Apr 16', visitors: 132 },
    { date: 'Apr 17', visitors: 189 },
    { date: 'Apr 18', visitors: 201 },
    { date: 'Apr 19', visitors: 178 },
    { date: 'Apr 20', visitors: 165 },
  ];
  
  // Find max visitors for scaling the chart
  const maxVisitors = Math.max(...visitorStats.map(stat => stat.visitors));
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold techno-header">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Admin</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProducts}</div>
            <p className="text-xs text-gray-400 mt-1">
              {inStockProducts} in stock, {outOfStockProducts} out of stock
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCategories}</div>
            <p className="text-xs text-gray-400 mt-1">
              Devices, Accessories, Bundles
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,130</div>
            <p className="text-xs text-gray-400 mt-1">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              WhatsApp Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28</div>
            <p className="text-xs text-gray-400 mt-1">
              21 converted to sales
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Visitor Chart */}
      <Card className="bg-flipper-dark border-flipper-purple/30">
        <CardHeader>
          <CardTitle>Visitor Trends - Last 7 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {/* Simple chart implementation */}
            <div className="flex h-64 items-end gap-2">
              {visitorStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-flipper-purple rounded-t-sm hover:bg-flipper-cyan transition-colors"
                    style={{ 
                      height: `${(stat.visitors / maxVisitors) * 100}%`,
                    }}
                  ></div>
                  <div className="mt-2 text-xs">{stat.date}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Most Viewed Products */}
      <Card className="bg-flipper-dark border-flipper-purple/30">
        <CardHeader>
          <CardTitle>Most Viewed Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-2 hover:bg-flipper-purple/10 rounded-md transition-colors">
                <div className="w-12 h-12 rounded overflow-hidden bg-flipper-dark/50">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono">${product.price.toFixed(2)}</p>
                  <p className={`text-xs ${product.inStock ? 'text-flipper-success' : 'text-flipper-danger'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
