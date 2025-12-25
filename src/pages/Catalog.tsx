import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Catalog } from '@/types';
import { catalogService } from '@/services/catalogService';

const CatalogPage = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await catalogService.getAll();
        setCatalogs(data.filter(c => !c.isDeleted));
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-smocked-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-smocked-mint to-smocked-sky py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Fabric Collection
            </h1>
            <p className="text-lg text-gray-700 font-body max-w-2xl mx-auto">
              Premium cotton, silk, and fine fabrics for perfect smocked dresses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : catalogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalogs.map((catalog, index) => (
                <motion.div
                  key={(catalog as any)._id || catalog.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-smocked-mint to-smocked-sky">
                    <img
                      src={catalog.imageUrl || '/placeholder-fabric.jpg'}
                      alt={catalog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold text-gray-800 mb-2">
                      {catalog.title}
                    </h3>
                    <p className="text-gray-600 font-body mb-4 line-clamp-3">
                      {catalog.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-primary-600 font-display">
                          {catalog.price ? `$${catalog.price}` : 'Contact'}
                        </span>
                        <p className="text-sm text-gray-500 font-body mt-1">
                          {catalog.stock !== null ? `${catalog.stock} yards` : 'In stock'}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition shadow-md font-body font-semibold"
                      >
                        Order
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🧵</div>
              <h3 className="font-display text-2xl font-semibold text-gray-800 mb-2">
                No fabrics available
              </h3>
              <p className="text-gray-600 font-body">
                Please check back later
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-8 text-center">
              Why choose our fabrics?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-smocked-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  100% Natural
                </h3>
                <p className="text-gray-600 font-body text-sm">
                  Natural cotton and silk fabrics, safe for sensitive skin
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-smocked-peach rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Diverse Colors
                </h3>
                <p className="text-gray-600 font-body text-sm">
                  Hundreds of colors and patterns to choose from
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-smocked-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Premium Quality
                </h3>
                <p className="text-gray-600 font-body text-sm">
                  Durable fabrics that stay beautiful over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
