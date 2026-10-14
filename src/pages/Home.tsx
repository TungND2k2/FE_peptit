import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import AboutSection from '@/components/AboutSection';
import JoinGroupSection from '@/components/JoinGroupSection';
import FaqAccordion from '@/components/FaqAccordion';
import { Product, Blog, Testimonial } from '@/types';
import { productService } from '@/services/productService';
import { blogService } from '@/services/blogService';
import { testimonialService } from '@/services/testimonialService';
import { CONTACT, IMAGES } from '@/config/site';
import { WHOLESALE_STEPS } from '@/data/company';
import { FAQS } from '@/data/faq';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const quoteUrl = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(
  "Hi Peptit Elegance, I'd like to receive your wholesale catalog and pricing."
)}`;

// MOQ, samples, production time, shipping
const FAQ_TEASER = [3, 5, 6, 8].map((i) => FAQS[i]);

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <motion.div {...fadeUp} className="text-center mb-12">
    <span className="inline-block text-primary-600 font-body font-semibold tracking-widest uppercase text-sm mb-3">
      {eyebrow}
    </span>
    <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h2>
    {subtitle && <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </motion.div>
);

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
      <section className="relative overflow-hidden bg-gradient-to-br from-smocked-rose via-white to-smocked-cream">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-smocked-lavender/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-smocked-peach/50 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 pt-12 pb-10 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 mb-5 px-4 py-1.5 rounded-full bg-white/80 shadow-sm">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-primary-600 font-body font-semibold text-xs sm:text-sm tracking-wide">
                  Premium Handcrafted · Wholesale since 2015
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.25rem] font-bold text-gray-800 mb-6 leading-[1.12]">
                Beautiful Smocked Dresses{' '}
                <span className="text-primary-600 block">For Your Little Ones</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-body mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Every stitch is meticulously handcrafted. Hand-smocked and hand-embroidered children's wear for
                boutiques and brands, from 20 pieces per design.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-body font-semibold shadow-lg shadow-primary-600/25 hover:bg-primary-700 hover:-translate-y-0.5 transition"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={quoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition border border-gray-200"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  Request Catalog
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <img
                src={IMAGES.hero}
                alt="Hand-smocked dresses by Peptit Elegance"
                className="w-full h-auto drop-shadow-[0_25px_35px_rgba(190,18,60,0.15)]"
              />
            </motion.div>
          </div>
        </div>
      </section>


      <AboutSection />

      {/* How wholesale works */}
      <section className="py-16 md:py-20 bg-smocked-cream/40">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Wholesale" title="How It Works" subtitle="From first sample to delivery, in four simple steps" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {WHOLESALE_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white rounded-3xl p-5 sm:p-7 shadow-soft"
              >
                <span className="font-display text-4xl sm:text-5xl font-bold text-primary-100 absolute top-3 right-4 sm:top-4 sm:right-6">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-gray-800 mb-2 pr-8 relative">{step.title}</h3>
                <p className="text-gray-600 font-body text-sm sm:text-base relative">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Collection" title="Featured Products" subtitle="Our most beloved smocked dresses" />

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl aspect-[3/4] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={(product as any)._id || product.id || index}
                  {...fadeUp}
                  transition={{ delay: (index % 4) * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full font-body font-semibold shadow-lg hover:bg-primary-700 transition"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-smocked-rose/30">
          <div className="container mx-auto px-4">
            <SectionHeading
              eyebrow="Testimonials"
              title="Customer Reviews"
              subtitle="See what our happy customers have to say about their experience"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={(testimonial as any)._id || testimonial.id || index}
                  {...fadeUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={testimonial.imageUrl}
                      alt="Customer review"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ teaser */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" />
          <FaqAccordion items={FAQ_TEASER} defaultOpen={null} />
          <div className="text-center mt-8">
            <Link to="/faq" className="inline-flex items-center gap-2 font-body font-semibold text-primary-600 hover:text-primary-700">
              See all questions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {latestBlogs.length > 0 && (
        <section className="py-16 md:py-20 bg-smocked-cream/30">
          <div className="container mx-auto px-4">
            <SectionHeading eyebrow="Journal" title="News & Articles" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id || index}
                  {...fadeUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-glow transition overflow-hidden"
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
                      {blog.thumbnailUrl && (
                        <img
                          src={blog.thumbnailUrl}
                          alt={blog.title}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-primary-50 text-primary-600 px-3 py-1 rounded-full font-body">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-gray-800 mb-2 hover:text-primary-600 transition line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-body">By {blog.author}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/blog" className="inline-flex items-center gap-2 font-body font-semibold text-primary-600 hover:text-primary-700">
                View all posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <JoinGroupSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center text-white">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Create Unique Dresses
            </h2>
            <p className="text-xl font-body mb-8 max-w-2xl mx-auto opacity-90">
              Explore our fabric and accessory collection to create your own beautiful smocked dresses
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/catalog"
                className="bg-white text-primary-600 px-8 py-4 rounded-full font-body font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                View Fabrics
              </Link>
              <Link
                to="/accessories"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-body font-semibold hover:bg-white hover:text-primary-600 transition"
              >
                View Accessories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
