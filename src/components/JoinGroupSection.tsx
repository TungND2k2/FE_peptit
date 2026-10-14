import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { IMAGES, LINKS } from '@/config/site';

const JoinGroupSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-gradient-to-br from-smocked-rose to-smocked-cream rounded-3xl shadow-soft p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        <a
          href={LINKS.joinGroup}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-3 rounded-2xl shadow-md flex-shrink-0 hover:shadow-lg transition"
        >
          <img
            src={IMAGES.joinGroupQr}
            alt={`QR code to join ${LINKS.joinGroupName} on Facebook`}
            className="w-44 h-44 md:w-52 md:h-52"
          />
        </a>
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-primary-600 font-body font-semibold mb-3">
            <Users className="w-5 h-5" />
            <span>{LINKS.joinGroupName}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join Our Facebook Group
          </h2>
          <p className="text-gray-600 font-body text-lg mb-6">
            Scan the QR code to be the first to see new collections, wholesale offers and restocks.
          </p>
          <a
            href={LINKS.joinGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-body font-semibold shadow-lg hover:bg-primary-700 transition"
          >
            Join the Group
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default JoinGroupSection;
