import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Star, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product, Blog, Testimonial } from '@/types';
import { productService } from '@/services/productService';
import { blogService } from '@/services/blogService';
import { testimonialService } from '@/services/testimonialService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, blogs, testimonialsData] = await Promise.all([
          productService.getAll(),
          blogService.getAll(),
          testimonialService.getAll(),
        ]);
        setFeaturedProducts(products.filter(p => !p.isDeleted).slice(0, 8));
        setLatestBlogs(blogs.filter(b => b.isPublished && !b.isDeleted).slice(0, 3));
        
        // Get latest 3 testimonials sorted by createdAt
        const sortedTestimonials = testimonialsData
          .filter(t => !t.isDeleted)
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // descending order (newest first)
          })
          .slice(0, 3);
        setTestimonials(sortedTestimonials);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-smocked-peach rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-smocked-mint rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary-600" />
                <span className="text-primary-600 font-body font-semibold">
                  Premium Handcrafted
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-800 mb-6">
                Beautiful Smocked Dresses
                <br />
                <span className="text-primary-600">For Your Little Ones</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 font-body mb-8 leading-relaxed">
                Every stitch is meticulously handcrafted, bringing you premium quality
                smocked dresses made with love for your precious children
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-600 text-white px-8 py-4 rounded-full font-body font-semibold shadow-lg hover:bg-primary-700 transition flex items-center space-x-2"
                  >
                    <span>Explore Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/catalog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-600 px-8 py-4 rounded-full font-body font-semibold shadow-lg hover:shadow-xl transition border-2 border-primary-600"
                  >
                    View Fabric Collection
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-1/4 animate-bounce">
          <Heart className="w-8 h-8 text-primary-400 fill-current opacity-30" />
        </div>
        <div className="absolute bottom-20 right-1/4 animate-bounce delay-500">
          <Star className="w-10 h-10 text-primary-400 fill-current opacity-30" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-smocked-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Meticulously Handcrafted
              </h3>
              <p className="text-gray-600 font-body">
                Each piece is handcrafted with meticulous care and dedication
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-smocked-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Premium Materials
              </h3>
              <p className="text-gray-600 font-body">
                Natural cotton and silk fabrics, safe for baby's delicate skin
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-smocked-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Unique Designs
              </h3>
              <p className="text-gray-600 font-body">
                Beautiful and stylish smocked dress patterns
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">
              Our most beloved smocked dresses
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={(product as any)._id || product.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-body font-semibold shadow-lg hover:bg-primary-700 transition"
              >
                View All Products
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {latestBlogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                News & Articles
              </h2>
              <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">
                Discover stories and insights about smocked dresses
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-glow transition overflow-hidden"
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="aspect-[16/9] bg-gray-50">
                      {blog.thumbnailUrl && (
                        <img
                          src={blog.thumbnailUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-primary-600 px-3 py-1 rounded-full font-body"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-gray-800 mb-2 hover:text-primary-600 transition line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-body mb-4">
                        Bởi {blog.author}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 px-8 py-3 rounded-full font-body font-semibold shadow-lg hover:shadow-xl transition border-2 border-primary-600"
                >
                  View All Posts
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Customer Reviews
              </h2>
              <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
                See what our happy customers have to say about their experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={(testimonial as any)._id || testimonial.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={testimonial.imageUrl}
                      alt="Customer review"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Create Unique Dresses
            </h2>
            <p className="text-xl font-body mb-8 max-w-2xl mx-auto opacity-90">
              Explore our fabric and accessory collection to create your own beautiful smocked dresses
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 px-8 py-4 rounded-full font-body font-semibold shadow-lg hover:shadow-xl transition"
                >
                  View Fabrics
                </motion.button>
              </Link>
              <Link to="/accessories">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-body font-semibold hover:bg-white hover:text-primary-600 transition"
                >
                  View Accessories
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
