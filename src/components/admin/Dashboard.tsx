import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/supabaseDb";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer, 
  LabelList,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Activity, Database, Eye, TrendingUp, PieChart as PieChartIcon } from "lucide-react";

const AdminDashboard = () => {
  const { data: analytics, isLoading: isLoadingAnalytics } = useAnalytics();
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const totalProducts = products.length;
  const inStockProducts = products.filter((product) => product.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;

  // Stock status data for pie chart with eye-friendly colors
  const stockStatusData = [
    { name: 'In Stock', value: inStockProducts, color: '#60a5fa' },
    { name: 'Out of Stock', value: outOfStockProducts, color: '#f97316' }
  ];

  // Enhanced page views data with more styling and eye-friendly colors
  const pageViewsData = analytics?.pageViews.map(view => ({
    date: new Date(view.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: view.view_count,
    fill: `rgba(96, 165, 250, ${0.4 + (view.view_count / Math.max(...analytics.pageViews.map(v => v.view_count))) * 0.5})`
  })) || [];

  const totalPageViews = analytics?.pageViews.reduce((sum, view) => sum + view.view_count, 0) || 0;
  const todayPageViews = analytics?.pageViews.find(view => {
    const viewDate = new Date(view.day);
    const today = new Date();
    return (
      viewDate.getDate() === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  })?.view_count || 0;

  // Process interaction data to be more complete with eye-friendly colors
  const interactionTypes = ['view', 'detail_view', 'add_to_cart'];
  const interactionColors = {
    view: '#64748b',      // Slate blue - more muted and easy on the eyes
    detail_view: '#60a5fa', // Light blue - good contrast but not harsh
    add_to_cart: '#f97316'  // Softer orange - warmer and less straining
  };
  
  // Get all unique dates
  const allDates = analytics?.productInteractions.map(i => 
    new Date(i.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  ) || [];
  const uniqueDates = [...new Set(allDates)];
  
  // Create a consistent dataset with all interaction types for each date
  const interactionsData = uniqueDates.map(date => {
    const dataPoint = { date };
    
    interactionTypes.forEach(type => {
      const interaction = analytics?.productInteractions.find(i => 
        new Date(i.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === date && 
        i.interaction_type === type
      );
      dataPoint[type] = interaction ? interaction.interaction_count : 0;
    });
    
    return dataPoint;
  });

  // Sort the data by date
  interactionsData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  if (isLoadingAnalytics || isLoadingProducts) {
    return <p className="p-4">Loading analytics...</p>;
  }

  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.name === 'views' ? 'views' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Product stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-700">{totalProducts}</div>
            <p className="text-xs text-gray-500 mt-1">Total products in inventory</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-blue-600">{inStockProducts}</div>
            <p className="text-xs text-gray-500 mt-1">{((inStockProducts / totalProducts) * 100).toFixed(1)}% of total inventory</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-orange-500">{outOfStockProducts}</div>
            <p className="text-xs text-gray-500 mt-1">{((outOfStockProducts / totalProducts) * 100).toFixed(1)}% of total inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Status Pie Chart and Page Views */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium flex items-center">
              <PieChartIcon className="h-4 w-4 mr-2 text-blue-500" />
              Stock Status
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {stockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} products`, '']} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{todayPageViews}</div>
                <div className="text-xs text-gray-500">Today's Views</div>
              </div>
              <div className="bg-gray-50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-blue-700">{totalPageViews}</div>
                <div className="text-xs text-gray-500">Total Views</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="h-4 w-4 mr-2 text-blue-500" />
              Page Views (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={pageViewsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="views" 
                  name="Page Views"
                  radius={[4, 4, 0, 0]}
                >
                  {pageViewsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList 
                    dataKey="views" 
                    position="top" 
                    style={{ fontSize: '11px', fill: '#666' }}
                    formatter={(value) => value > 0 ? value : ''}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-green-500" />
              Product Interactions (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={interactionsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                
                {interactionTypes.map((type) => (
                  <Line
                    key={type}
                    type="monotone"
                    dataKey={type}
                    name={type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    stroke={interactionColors[type]}
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Bar Chart for Interactions */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-yellow-500" />
              Detailed Interaction Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={interactionsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                
                {interactionTypes.map((type) => (
                  <Bar
                    key={type}
                    dataKey={type}
                    name={type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    fill={interactionColors[type]}
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  >
                    <LabelList 
                      dataKey={type} 
                      position="top" 
                      style={{ fontSize: '11px', fill: '#666' }}
                      formatter={(value) => value > 0 ? value : ''}
                    />
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;