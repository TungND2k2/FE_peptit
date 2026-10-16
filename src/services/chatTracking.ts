import { API_BASE_URL } from './api';

// Anonymous click tracking for WhatsApp/Messenger links, reported in Admin → Website Chats.
// Stores no cookie or visitor id: only where the current visit started, kept for the tab session.

const VISIT_KEY = 'peptit-visit';

interface Visit {
  referrer?: string;
  landingPage: string;
}

const readVisit = (): Visit | null => {
  try {
    const raw = sessionStorage.getItem(VISIT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Remember the external site and first page of this visit (once per tab session)
const rememberVisit = () => {
  if (readVisit()) return;
  let referrer: string | undefined;
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    // l.instagram.com, lm.facebook.com, m.facebook.com... are link shims of the same site
    if (ref && ref.host !== window.location.host) referrer = ref.host.replace(/^(www|l|lm|m)\./, '');
  } catch {
    // malformed referrer
  }
  try {
    sessionStorage.setItem(VISIT_KEY, JSON.stringify({ referrer, landingPage: window.location.pathname }));
  } catch {
    // storage unavailable (private mode); referrer is just not recorded
  }
};

const channelOf = (href: string) =>
  href.includes('wa.me') ? 'whatsapp' : href.includes('m.me') ? 'messenger' : null;

const report = (channel: string, item?: string) => {
  const visit = readVisit();
  const body = JSON.stringify({
    channel,
    page: window.location.pathname,
    item,
    referrer: visit?.referrer,
    landingPage: visit?.landingPage,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    device: window.matchMedia('(pointer: coarse)').matches ? 'mobile' : 'desktop',
  });
  // keepalive lets the request finish even if the click navigates away
  fetch(`${API_BASE_URL.replace(/\/$/, '')}/chat-clicks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // tracking must never get in the way of the chat
  });
};

// One delegated listener covers every chat link on the site; links for a specific item
// carry data-chat-item="<name>"
export const installChatTracking = () => {
  rememberVisit();
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const channel = channelOf(link.href);
    if (channel) report(channel, link.dataset.chatItem);
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
};
