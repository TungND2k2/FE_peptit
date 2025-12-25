import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react';
import { Product } from '@/types';
import { productService } from '@/services/productService';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="font-display text-2xl font-semibold text-gray-800 mb-2">
            Product not found
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="text-primary-600 hover:underline font-body"
          >
            Back to product list
          </button>
        </div>
      </div>
    );
  }

  const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean);
  const isDeleted = (product as any).isDeleted || false;
  const isActive = product.isActive !== undefined ? product.isActive : !isDeleted;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition mb-6 font-body"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 shadow-2xl">
              <img
                src={allImages[selectedImage] || '/placeholder-dress.jpg'}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {!isActive && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-3xl font-display font-bold">
                    Out of Stock
                  </span>
                </div>
              )}
              
              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-body font-semibold shadow-lg">
                  {selectedImage + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? 'ring-4 ring-primary-500 shadow-xl scale-105'
                        : 'ring-2 ring-gray-200 hover:ring-primary-300 hover:shadow-lg'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-primary-500/10"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-display text-4xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 font-body text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-primary-600 font-display">
                  {product.price ? `$${product.price}` : 'Contact for price'}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-body mt-2">
                {product.stock !== null ? `Stock: ${product.stock} items` : 'In stock'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="font-body font-semibold text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-display font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                  disabled={product.stock !== null && quantity >= product.stock}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isActive}
                className="w-full bg-primary-600 text-white py-4 rounded-full font-body font-semibold text-lg shadow-lg hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{isActive ? 'Add to Cart' : 'Out of Stock'}</span>
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border-2 border-primary-600 text-primary-600 py-3 rounded-full font-body font-semibold hover:bg-primary-50 transition flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-full font-body font-semibold hover:bg-gray-50 transition flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>

            {/* Product Details */}
            {product.attributes && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="font-display text-xl font-semibold text-gray-800 mb-4">
                  Product Details
                </h3>
                <div className="space-y-2 text-gray-600 font-body">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold capitalize">{key}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
