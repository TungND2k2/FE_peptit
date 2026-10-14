// Central place for contact links and static image paths.
// Images live in /public/images — replace the files there to update the site.

export const CONTACT = {
  phoneDisplay: '+84 877336320',
  whatsappUrl: 'https://wa.me/84877336320',
  messengerUrl: 'https://m.me/61567181037933',
  facebookUrl: 'https://web.facebook.com/people/Peptit-Elegance-Smock-Wholesales-Factory/61567181037933/',
  instagramUrl: 'https://www.instagram.com/peptelegance/profilecard/',
  email: 'peptitelegance@gmail.com',
  address: '41 Le Hong Phong, Phuong Doi Can, Ha Noi',
};

export const LINKS = {
  joinGroup: 'https://www.facebook.com/groups/3927997574111315',
  joinGroupName: 'Smock Wholesale VIP Group',
};

export const IMAGES = {
  hero: '/images/hero-dresses.webp',
  aboutBanner: '/images/about/about-banner.jpg',
  aboutThreads: '/images/about/threads.jpg',
  aboutWorkshop: '/images/about/workshop.jpg',
  marketsMap: '/images/about/markets-map.svg',
  marketsMapUkIe: '/images/about/markets-map-uk-ie.svg',
  joinGroupQr: '/images/qr-join-group.svg',
};

// WhatsApp chat link with a prefilled inquiry about an item
export const inquiryUrl = (itemName: string) =>
  `${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hi Peptit Elegance, I'm interested in "${itemName}". Could you share pricing and availability?`)}`;
