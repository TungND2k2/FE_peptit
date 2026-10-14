import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '@/config/site';
import { STATS } from '@/data/company';

// Workshop photos are warm-tinted so they sit with the pastel palette
const photoTone = 'saturate-[1.05] brightness-[1.04] sepia-[0.12]';

// Home page teaser; the full story lives on /about
const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <span className="inline-block text-primary-600 font-body font-semibold tracking-widest uppercase text-sm mb-3">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-5 leading-tight">
            The Art of
            <br />
            Hand&#8209;Smocking
          </h2>
          <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
            At Peptit Elegance, we bring traditional hand-smocking and thoughtful craftsmanship to children's
            clothing brands worldwide.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-9 max-w-md">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary-200 pl-4">
                <div className="font-display text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="font-body text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 border-2 border-gray-800 text-gray-800 px-7 py-3 rounded-full font-body font-semibold tracking-wide uppercase text-sm hover:bg-gray-800 hover:text-white transition"
          >
            Discover Our Story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 lg:order-2 relative pb-16 pl-10 sm:pl-20"
        >
          <div className="absolute -top-6 -right-2 w-2/3 h-3/4 rounded-[2rem] bg-smocked-rose" />
          {/* The artisan's face sits in the upper right of the photo; the small image overlaps bottom-left so it stays visible */}
          <Link to="/about" className="relative block overflow-hidden rounded-[2rem] shadow-xl">
            <img
              src={IMAGES.aboutBanner}
              alt="Peptit Elegance artisan at work"
              loading="lazy"
              className={`w-full aspect-[4/3] object-cover object-[70%_20%] hover:scale-105 transition-transform duration-700 ${photoTone}`}
            />
          </Link>
          <div className="absolute bottom-0 left-0 w-[55%] overflow-hidden rounded-3xl border-[6px] border-white shadow-xl">
            <img
              src={IMAGES.aboutThreads}
              alt="Embroidery threads in the Peptit Elegance workshop"
              loading="lazy"
              className={`w-full aspect-[4/3] object-cover ${photoTone}`}
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
