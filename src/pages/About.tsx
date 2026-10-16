import { motion } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import { IMAGES, LINKS, whatsappLink } from '@/config/site';
import { STATS, TECHNIQUES } from '@/data/company';
import MarketsMap from '@/components/MarketsMap';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const About = () => (
  <div className="bg-white">
    {/* Banner */}
    <section className="relative h-[60vh] min-h-[420px] max-h-[640px] overflow-hidden">
      <img
        src={IMAGES.aboutBanner}
        alt="Peptit Elegance artisan at work"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12 md:pb-16">
        <motion.div {...fadeUp} className="max-w-2xl text-white">
          <span className="inline-block font-body font-semibold tracking-widest uppercase text-sm mb-3 text-primary-200">
            Our Story
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-tight">The Art of Hand&#8209;Smocking</h1>
          <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed">
            At Peptit Elegance, we bring traditional hand-smocking and thoughtful craftsmanship to children's
            clothing brands worldwide.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Who we are + stats */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.p {...fadeUp} className="font-display text-2xl md:text-3xl text-gray-800 leading-relaxed text-center">
          Peptit Elegance is a Vietnam-based children's clothing manufacturer specializing in traditional
          hand-smocked garments and custom-designed collections. Established in 2015, we produce over 10,000 pieces
          per month, serving boutique owners and children's fashion brands across the UK, US and Ireland.
        </motion.p>

        <motion.div {...fadeUp} className="mt-12 grid grid-cols-3 rounded-3xl border border-primary-100 bg-smocked-cream/40">
          {STATS.map((stat, i) => (
            <div key={stat.label} className={`px-4 py-8 text-center ${i > 0 ? 'border-l border-primary-100' : ''}`}>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary-600">{stat.value}</div>
              <div className="mt-2 font-body text-sm md:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="mt-14 text-center">
          <h2 className="font-body text-sm font-semibold tracking-widest uppercase text-gray-500 mb-4">
            Where our garments go
          </h2>
          <MarketsMap />
        </motion.div>
      </div>
    </section>

    {/* Craftsmanship */}
    <section className="py-16 md:py-24 bg-smocked-rose/30">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...fadeUp} className="overflow-hidden rounded-3xl shadow-soft">
          <img
            src={IMAGES.aboutThreads}
            alt="Embroidery threads in our workshop"
            loading="lazy"
            className="w-full aspect-[4/3] object-cover"
          />
        </motion.div>
        <motion.div {...fadeUp}>
          <span className="inline-block text-primary-600 font-body font-semibold tracking-widest uppercase text-sm mb-3">
            Our Craft
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-5">Made by Hand, Made to Last</h2>
          <p className="text-gray-600 font-body text-lg leading-relaxed mb-6">
            Our strength lies in craftsmanship-intensive techniques. We specialize in garments that demand precision,
            patience and meticulous attention to detail, helping brands bring distinctive designs to life with the
            craftsmanship they deserve.
          </p>
          <div className="flex flex-wrap gap-2">
            {TECHNIQUES.map((technique) => (
              <span key={technique} className="bg-white text-gray-700 font-body text-sm px-4 py-2 rounded-full shadow-sm">
                {technique}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Emerging brands */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...fadeUp} className="lg:order-2 overflow-hidden rounded-3xl shadow-soft">
          <img
            src={IMAGES.aboutWorkshop}
            alt="Our pattern-making team at work"
            loading="lazy"
            className="w-full aspect-[4/3] object-cover object-top"
          />
        </motion.div>
        <motion.div {...fadeUp} className="lg:order-1">
          <span className="inline-block text-primary-600 font-body font-semibold tracking-widest uppercase text-sm mb-3">
            Partnership
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-5">Supporting Emerging Brands</h2>
          <p className="text-gray-600 font-body text-lg leading-relaxed">
            We welcome startups and emerging children's fashion brands with flexible order quantities for their
            initial collections. Whether you're launching your first boutique collection or expanding an existing
            brand, we aim to provide the craftsmanship and production support you need to get started.
          </p>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 text-white text-center px-6 py-14 shadow-xl"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Interested in working with us?</h2>
          <p className="font-body text-lg text-white/90 max-w-xl mx-auto mb-8">
            Tell us about your project and our team will get back to you with options, samples and pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-7 py-3 rounded-full font-body font-semibold shadow-lg hover:shadow-xl transition"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <a
              href={LINKS.joinGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-7 py-3 rounded-full font-body font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              <Users className="w-5 h-5" />
              Join our Facebook group
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default About;
