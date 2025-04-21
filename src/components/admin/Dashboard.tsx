
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { t, dir, language } = useLanguage();
  const isMobile = useIsMobile();
  
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
  
  // For mobile, show less data points
  const mobileVisitorStats = isMobile 
    ? visitorStats.slice(visitorStats.length - 5) 
    : visitorStats;
  
  return (
    <div className="space-y-6" dir={dir}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-heading font-bold techno-header">{t("admin.dashboard")}</h1>
        <p className="text-sm text-gray-400">{t("admin.welcomeBack")}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-400">
              {t("admin.totalProducts")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">{totalProducts}</div>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1">
              {inStockProducts} {t("admin.productsInStock")}, {outOfStockProducts} {t("admin.productsOutOfStock")}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-400">
              {t("admin.totalCategories")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">{totalCategories}</div>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1">
              Devices, Accessories, Bundles
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-400">
              {t("admin.totalVisitors")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">1,130</div>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1">
              +12% {t("admin.fromLastWeek")}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-flipper-dark border-flipper-purple/30">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-400">
              {t("admin.whatsappInquiries")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">28</div>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1">
              21 {t("admin.convertedToSales")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Visitor Chart */}
      <Card className="bg-flipper-dark border-flipper-purple/30">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">{t("admin.visitorTrends")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60 md:h-80">
            {/* Simple chart implementation */}
            <div className="flex h-48 md:h-64 items-end gap-1 md:gap-2">
              {mobileVisitorStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-flipper-purple rounded-t-sm hover:bg-flipper-cyan transition-colors"
                    style={{ 
                      height: `${(stat.visitors / maxVisitors) * 100}%`,
                    }}
                  ></div>
                  <div className="mt-2 text-[9px] md:text-xs truncate max-w-full">{stat.date}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Most Viewed Products */}
      <Card className="bg-flipper-dark border-flipper-purple/30">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">{t("admin.mostViewedProducts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {products.slice(0, isMobile ? 3 : 5).map((product) => (
              <div key={product.id} className="flex items-center gap-2 md:gap-4 p-2 hover:bg-flipper-purple/10 rounded-md transition-colors">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded overflow-hidden bg-flipper-dark/50 flex-shrink-0">
                  <img src={product.images[0]} alt={product.name[language]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base truncate">{product.name[language]}</h3>
                  <p className="text-xs md:text-sm text-gray-400 truncate">{product.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-sm md:text-base">${product.price.toFixed(2)}</p>
                  <p className={`text-[10px] md:text-xs ${product.inStock ? 'text-flipper-success' : 'text-flipper-danger'}`}>
                    {product.inStock ? t("inStock") : t("outOfStock")}
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
