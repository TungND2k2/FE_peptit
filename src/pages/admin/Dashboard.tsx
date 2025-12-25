import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, FolderTree, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import { blogService } from '@/services/blogService';
import { accessoryService } from '@/services/accessoryService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    blogs: 0,
    accessories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, categories, blogs, accessories] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
          blogService.getAll(),
          accessoryService.getAll(),
        ]);
        
        setStats({
          products: products.filter(p => !p.isDeleted).length,
          categories: categories.length,
          blogs: blogs.filter(b => !b.isDeleted).length,
          accessories: accessories.filter(a => !a.isDeleted).length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    {
      icon: Package,
      label: 'Products',
      value: stats.products,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: FolderTree,
      label: 'Categories',
      value: stats.categories,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: BookOpen,
      label: 'Blogs',
      value: stats.blogs,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: Sparkles,
      label: 'Accessories',
      value: stats.accessories,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 font-body">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600 font-body text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 font-display">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl font-body font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Add New Product
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-body font-semibold hover:bg-gray-200 transition-all"
            >
              Create Blog Post
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-body font-semibold hover:bg-gray-200 transition-all"
            >
              Manage Categories
            </motion.button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
