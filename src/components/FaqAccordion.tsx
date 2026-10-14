import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FaqItem } from '@/data/faq';

const FaqAccordion = ({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) => {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-primary-100 border-y border-primary-100">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-6 py-5 text-left group"
            >
              <span className="flex gap-4">
                <span className="font-display text-primary-400 text-lg leading-7 w-6 flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-lg md:text-xl font-semibold text-gray-800 group-hover:text-primary-600 transition leading-7">
                  {item.question}
                </span>
              </span>
              <ChevronDown
                className={`w-5 h-5 mt-1 flex-shrink-0 text-primary-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pl-10 pr-2 pb-6 space-y-3 font-body text-gray-600 leading-relaxed">
                    {item.answer.map((block, i) =>
                      Array.isArray(block) ? (
                        <ul key={i} className="space-y-1.5">
                          {block.map((line) => (
                            <li key={line} className="flex gap-3">
                              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}>{block}</p>
                      )
                    )}
                    {item.note && (
                      <p className="text-sm bg-smocked-cream/70 border-l-2 border-primary-300 px-4 py-2 rounded-r-lg">
                        <span className="font-semibold">Note:</span> {item.note}
                      </p>
                    )}
                    {item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-4"
                      >
                        {item.link.label}
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
