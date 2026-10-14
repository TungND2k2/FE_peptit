import { MessageCircle } from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQS } from '@/data/faq';
import { CONTACT } from '@/config/site';

const FAQ = () => (
  <div className="bg-white">
    <section className="bg-gradient-to-b from-smocked-rose/60 to-white pt-16 pb-10">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block text-primary-600 font-body font-semibold tracking-widest uppercase text-sm mb-3">
          Help Center
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">
          Everything you need to know about ordering, samples, production and shipping.
        </p>
      </div>
    </section>

    <section className="pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <FaqAccordion items={FAQS} />

        <div className="mt-12 text-center bg-smocked-cream/60 rounded-3xl px-6 py-10">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Still have questions?</h2>
          <p className="text-gray-600 font-body mb-6">Our team usually replies within a few hours.</p>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-7 py-3 rounded-full font-body font-semibold shadow-lg hover:bg-primary-700 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default FAQ;
