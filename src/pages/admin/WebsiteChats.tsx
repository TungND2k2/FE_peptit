import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Monitor, Smartphone } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { ChatClick } from '@/types';
import { chatClickService } from '@/services/chatClickService';

const RANGES = [7, 30, 90];

const CHANNEL_STYLE = {
  whatsapp: { label: 'WhatsApp', className: 'bg-green-100 text-green-700' },
  messenger: { label: 'Messenger', className: 'bg-blue-100 text-blue-700' },
};

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Us',
  '/faq': 'FAQ',
  '/products': 'Smocked Dresses',
  '/catalog': 'Fabrics',
  '/accessories': 'Accessories',
  '/blog': 'Blog',
};
const pageName = (click: ChatClick) => click.item || PAGE_NAMES[click.page] || click.page;

// "America/New_York" -> "New York"; good enough to tell roughly where a visitor is
const placeOf = (timezone?: string) => (timezone ? timezone.split('/').pop()!.replace(/_/g, ' ') : '—');

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

const topCounts = (values: string[], limit = 5) => {
  const counts = new Map<string, number>();
  values.forEach((v) => counts.set(v, (counts.get(v) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
};

const TopList = ({ title, rows, total }: { title: string; rows: [string, number][]; total: number }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">{title}</h2>
    {rows.length === 0 ? (
      <p className="text-sm text-gray-500 font-body">No data yet</p>
    ) : (
      <ul className="space-y-3">
        {rows.map(([label, count]) => (
          <li key={label}>
            <div className="flex justify-between text-sm font-body mb-1">
              <span className="text-gray-700 truncate pr-4">{label}</span>
              <span className="text-gray-900 font-semibold">{count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100">
              <div className="h-1.5 rounded-full bg-primary-500" style={{ width: `${(count / total) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const WebsiteChats = () => {
  const [days, setDays] = useState(30);
  const [clicks, setClicks] = useState<ChatClick[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    chatClickService
      .getAll(days)
      .then(setClicks)
      .catch((error) => console.error('Error fetching chat clicks:', error))
      .finally(() => setLoading(false));
  }, [days]);

  const stats = useMemo(() => {
    const whatsapp = clicks.filter((c) => c.channel === 'whatsapp').length;
    const mobile = clicks.filter((c) => c.device === 'mobile').length;
    return {
      total: clicks.length,
      whatsapp,
      messenger: clicks.length - whatsapp,
      mobileShare: clicks.length ? Math.round((mobile / clicks.length) * 100) : 0,
      topPages: topCounts(clicks.map(pageName)),
      topSources: topCounts(clicks.map((c) => c.referrer || 'Direct / unknown')),
    };
  }, [clicks]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Website Chats</h1>
            <p className="text-gray-600 font-body">
              Every click on a WhatsApp or Messenger button on the website (anonymous, no customer login)
            </p>
          </div>
          <div className="flex bg-white rounded-xl shadow p-1">
            {RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setDays(range)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition ${
                  days === range ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range} days
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Chat clicks', value: stats.total },
            { label: 'WhatsApp', value: stats.whatsapp },
            { label: 'Messenger', value: stats.messenger },
            { label: 'From mobile', value: `${stats.mobileShare}%` },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-sm text-gray-500 font-body">{card.label}</div>
              <div className="font-display text-3xl font-bold text-gray-900 mt-1">{loading ? '…' : card.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopList title="Most chatted pages & items" rows={stats.topPages} total={stats.total} />
          <TopList title="Where visitors came from" rows={stats.topSources} total={stats.total} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Time', 'Channel', 'Page / item', 'Came from', 'Device', 'Location'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-body whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!loading && clicks.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-body">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      No chat clicks in the last {days} days
                    </td>
                  </tr>
                )}
                {clicks.map((click) => (
                  <tr key={click._id} className="hover:bg-gray-50 font-body text-sm">
                    <td className="px-6 py-3 whitespace-nowrap text-gray-700">{formatTime(click.createdAt)}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${CHANNEL_STYLE[click.channel].className}`}>
                        {CHANNEL_STYLE[click.channel].label}
                      </span>
                    </td>
                    <td className="px-6 py-3 max-w-xs">
                      <Link to={click.page} target="_blank" className="text-primary-600 hover:underline">
                        {pageName(click)}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{click.referrer || 'Direct'}</td>
                    <td className="px-6 py-3 text-gray-500">
                      {click.device === 'mobile' ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                    </td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap" title={click.timezone}>
                      {placeOf(click.timezone)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WebsiteChats;
