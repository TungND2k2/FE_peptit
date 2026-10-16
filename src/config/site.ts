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

// Every chat started from the site is prefilled with a short message naming the site, so website
// leads stand out in WhatsApp/Messenger (and keyword auto-replies can match on it). The page the
// visitor was on is recorded separately by chat click tracking, shown in Admin → Website Chats.
export const SITE_NAME = 'peptitelegance.com';
const DEFAULT_MESSAGE = `Hi! I'm messaging from ${SITE_NAME} 👋`;

export const whatsappLink = (message: string = DEFAULT_MESSAGE) =>
  `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;

// `ref` is passed to the Page's webhook (useful for chatbots); `text` prefills the message box
export const messengerLink = (message: string = DEFAULT_MESSAGE) =>
  `${CONTACT.messengerUrl}?ref=website&text=${encodeURIComponent(message)}`;

export const inquiryUrl = (itemName: string) =>
  whatsappLink(`Hi! I found "${itemName}" on ${SITE_NAME}. Could you share pricing and availability?`);
