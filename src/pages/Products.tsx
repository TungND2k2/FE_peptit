import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
        ]);
        setProducts(productsData.filter(p => !p.isDeleted));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryId = (selectedCategory as any);
    const productCategoryId = (product as any).idCategory || product.idCategory;
    const matchesCategory =
      selectedCategory === 'all' || productCategoryId === categoryId;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                Smocked Dresses
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-6"></div>
            </motion.div>
            <p className="text-xl text-gray-600 font-body leading-relaxed">
              Timeless elegance in every stitch. Discover our premium handcrafted collection.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white" preserveAspectRatio="none" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0V48Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg w-full">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your perfect dress..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none font-body text-base transition-all"
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-body font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>

            {/* Categories (Desktop) */}
            <div className="hidden lg:flex flex-wrap gap-3 items-center">
              <span className="text-sm font-semibold text-gray-500 font-body mr-2">Filter:</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2.5 rounded-xl font-body font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Dresses
              </button>
              {categories.map((category) => {
                const categoryId = (category as any)._id || category.id;
                return (
                  <button
                    key={categoryId}
                    onClick={() => setSelectedCategory(categoryId)}
                    className={`px-6 py-2.5 rounded-xl font-body font-medium transition-all ${
                      selectedCategory === categoryId
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 pt-6 border-t border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-gray-900">Categories</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setShowFilters(false);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-body font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  All Dresses
                </button>
                {categories.map((category) => {
                  const categoryId = (category as any)._id || category.id;
                  return (
                    <button
                      key={categoryId}
                      onClick={() => {
                        setSelectedCategory(categoryId);
                        setShowFilters(false);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-body font-medium transition-all ${
                        selectedCategory === categoryId
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {category.title}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Results count */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <p className="text-gray-600 font-body text-lg">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'dress' : 'dresses'} found
              </p>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-3xl h-[480px] animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={(product as any)._id || product.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="inline-block p-6 bg-gray-50 rounded-full mb-6">
                <Search className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-gray-800 mb-3">
                No dresses found
              </h3>
              <p className="text-gray-500 font-body text-lg mb-8">
                We couldn't find any dresses matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-body font-semibold hover:shadow-xl transition-all"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
