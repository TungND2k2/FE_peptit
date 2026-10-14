import { CONTACT } from '@/config/site';

export interface FaqItem {
  question: string;
  // Paragraphs; a string[] entry renders as a bullet list
  answer: (string | string[])[];
  note?: string;
  link?: { label: string; href: string };
}

export const FAQS: FaqItem[] = [
  {
    question: 'What makes Peptit Elegance’s smocked and hand-embroidered dresses special?',
    answer: [
      'Every dress at Peptit Elegance is carefully handmade, ensuring each piece carries its own unique story and charm. No two dresses are identical because every stitch reflects the individuality and craftsmanship of our skilled artisans.',
    ],
  },
  {
    question: 'What are your order policies?',
    answer: ['For detailed information about our order policies, please contact our team.'],
    link: { label: 'Ask us on WhatsApp', href: CONTACT.whatsappUrl },
  },
  {
    question: 'How do I place an order?',
    answer: ['Placing an order is simple! Message us and we will walk you through it step by step.'],
    link: { label: 'Start on WhatsApp', href: CONTACT.whatsappUrl },
  },
  {
    question: 'What is the minimum order quantity?',
    answer: [
      'For all types of clothing:',
      ['Minimum order quantity: 100 pieces or sets', 'Minimum per design: 20 pieces', 'Available in 5–6 sizes only'],
      'For handmade accessories:',
      ['Minimum order quantity: 100 pieces per order', 'Minimum per design: 20 pieces'],
    ],
  },
  {
    question: 'Do I get a discount for large orders?',
    answer: [
      'Yes! Discounts apply for bulk orders as follows:',
      ['500 – 999 pieces: 2% OFF', '1,000 – 1,499 pieces: 3% OFF', '1,500 – 2,499 pieces: 4% OFF', '2,500 pieces or more: 5% OFF'],
    ],
    note: 'This discount policy has been effective since November 1, 2021.',
  },
  {
    question: 'How much does a sample cost?',
    answer: [
      [
        'Sample cost: $49 per piece',
        'Sample cost deduction: subtracted from the total cost when placing a wholesale order',
      ],
    ],
  },
  {
    question: 'What is the production time for wholesale orders?',
    answer: [
      [
        'Less than 50 pieces: ~3–4 weeks',
        '50–100 pieces: ~4 weeks',
        '100–500 pieces: ~6 weeks',
        '500–1,000 pieces: ~6–8 weeks',
        'More than 1,000 pieces: to be confirmed',
      ],
    ],
  },
  {
    question: 'What is the production time for sample orders?',
    answer: [
      [
        '1–10 pieces: ~14 working days after payment',
        '11–20 pieces: ~14–21 working days after payment',
        '21–30 pieces: ~21–28 working days after payment',
      ],
    ],
    note: 'Geometric dress samples may take 3–5 extra days. Production time starts after confirming all order details and receiving payment.',
  },
  {
    question: 'How long is the shipping time?',
    answer: [['UPS or FedEx: ~5 working days', 'Air Freight: ~7–10 working days', 'Sea Freight: ~35–40 working days']],
  },
  {
    question: 'Do I need to confirm receiving shipments?',
    answer: [
      'Yes, you must confirm receipt of shipments via email within 10 days of delivery. If we do not receive confirmation or notice within 10 days, we will assume that the shipment has been delivered successfully, and we will no longer hold responsibility for it.',
    ],
  },
];
