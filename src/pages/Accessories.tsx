import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Scissors, Sparkles } from 'lucide-react';
import { Accessory } from '@/types';
import { accessoryService } from '@/services/accessoryService';

const Accessories = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await accessoryService.getAll();
        setAccessories(data.filter(a => !a.isDeleted));
      } catch (error) {
        console.error('Error fetching accessories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAccessories = accessories.filter((accessory) => {
    if (selectedType === 'all') return true;
    return accessory.type === selectedType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'button':
        return <Package className="w-6 h-6" />;
      case 'thread':
        return <Scissors className="w-6 h-6" />;
      case 'lace':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'button':
        return 'Button';
      case 'thread':
        return 'Thread';
      case 'lace':
        return 'Lace';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-smocked-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-smocked-peach to-smocked-mint py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Accessories
            </h1>
            <p className="text-lg text-gray-700 font-body max-w-2xl mx-auto">
              Premium buttons, threads, and laces for smocked dresses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-3 rounded-full font-body font-semibold transition flex items-center space-x-2 ${
                selectedType === 'all'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>All</span>
            </button>
            <button
              onClick={() => setSelectedType('button')}
              className={`px-6 py-3 rounded-full font-body font-semibold transition flex items-center space-x-2 ${
                selectedType === 'button'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Buttons</span>
            </button>
            <button
              onClick={() => setSelectedType('thread')}
              className={`px-6 py-3 rounded-full font-body font-semibold transition flex items-center space-x-2 ${
                selectedType === 'thread'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Scissors className="w-5 h-5" />
              <span>Threads</span>
            </button>
            <button
              onClick={() => setSelectedType('lace')}
              className={`px-6 py-3 rounded-full font-body font-semibold transition flex items-center space-x-2 ${
                selectedType === 'lace'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Laces</span>
            </button>
          </div>
        </div>
      </section>

      {/* Accessories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600 font-body">
              Showing <span className="font-semibold">{filteredAccessories.length}</span> accessories
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredAccessories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredAccessories.map((accessory, index) => (
                <motion.div
                  key={(accessory as any)._id || accessory.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-smocked-peach to-smocked-mint">
                    <img
                      src={accessory.imageUrl || '/placeholder-accessory.jpg'}
                      alt={accessory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      {getTypeIcon(accessory.type)}
                      <span className="text-sm font-body font-semibold text-gray-700">
                        {getTypeName(accessory.type)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {accessory.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-body mb-3 line-clamp-2">
                      {accessory.description}
                    </p>

                    {/* Attributes */}
                    <div className="space-y-1 mb-3 text-xs text-gray-500 font-body">
                      {accessory.material && (
                        <p>Material: <span className="font-semibold">{accessory.material}</span></p>
                      )}
                      {accessory.color && (
                        <p>Color: <span className="font-semibold">{accessory.color}</span></p>
                      )}
                      {accessory.width && (
                        <p>Size: <span className="font-semibold">{accessory.width}mm</span></p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary-600 font-display">
                          {accessory.price ? `$${accessory.price}` : 'Contact'}
                        </span>
                        <p className="text-xs text-gray-500 font-body mt-1">
                          {accessory.stock !== null ? `${accessory.stock} in stock` : 'In stock'}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition shadow-md text-sm font-body font-semibold"
                      >
                        Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="font-display text-2xl font-semibold text-gray-800 mb-2">
                No accessories found
              </h3>
              <p className="text-gray-600 font-body">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Accessories;
