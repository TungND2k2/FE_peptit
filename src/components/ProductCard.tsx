import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const productId = (product as any)._id || product.id;
  const isDeleted = (product as any).isDeleted || false;
  const isActive = product.isActive !== undefined ? product.isActive : !isDeleted;
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden group"
    >
      <Link to={`/products/${productId}`}>
        <div className="relative overflow-hidden aspect-[3/4] bg-gray-50">
          <img
            src={product.imageUrl || '/placeholder-dress.jpg'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Status badges */}
          {!isActive && (
            <div className="absolute top-3 left-3 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium font-body">
              Out of Stock
            </div>
          )}
          {product.stock !== null && product.stock < 5 && isActive && (
            <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium font-body">
              Low Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${productId}`}>
          <h3 className="font-body text-base font-medium text-gray-800 mb-2 hover:text-primary-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900 font-body">
            {product.price ? `$${product.price}` : 'Contact'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
