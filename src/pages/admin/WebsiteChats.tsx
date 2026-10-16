import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, Monitor, Smartphone } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { ChatClick } from '@/types';
import { chatClickService, ChatClickPage, ChatClickSummary } from '@/services/chatClickService';

const RANGES = [7, 30, 90];
const PAGE_SIZE = 20;

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
const pageLabel = (value: string) => PAGE_NAMES[value] || value;

// "America/New_York" -> "New York"; good enough to tell roughly where a visitor is
const placeOf = (timezone?: string) => (timezone ? timezone.split('/').pop()!.replace(/_/g, ' ') : '—');

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

// Page numbers to show around the current page, with gaps as null: 1 … 4 5 6 … 12
const pageWindow = (current: number, last: number): (number | null)[] => {
  const pages = new Set([1, last, current - 1, current, current + 1].filter((p) => p >= 1 && p <= last));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? [null, p] : [p]));
};

const TopList = ({ title, rows, total }: { title: string; rows: { label: string; count: number }[]; total: number }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">{title}</h2>
    {rows.length === 0 ? (
      <p className="text-sm text-gray-500 font-body">No data yet</p>
    ) : (
      <ul className="space-y-3">
        {rows.map(({ label, count }) => (
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
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState<ChatClickSummary | null>(null);
  const [log, setLog] = useState<ChatClickPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chatClickService
      .getSummary(days)
      .then(setSummary)
      .catch((error) => console.error('Error fetching chat summary:', error));
  }, [days]);

  useEffect(() => {
    setLoading(true);
    chatClickService
      .getPage(days, page, PAGE_SIZE)
      .then(setLog)
      .catch((error) => console.error('Error fetching chat clicks:', error))
      .finally(() => setLoading(false));
  }, [days, page]);

  const changeRange = (range: number) => {
    setDays(range);
    setPage(1);
  };

  const total = summary?.total ?? 0;
  const lastPage = Math.max(Math.ceil((log?.total ?? 0) / PAGE_SIZE), 1);
  const from = log && log.total ? (log.page - 1) * log.pageSize + 1 : 0;
  const to = log ? Math.min(log.page * log.pageSize, log.total) : 0;

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
                onClick={() => changeRange(range)}
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
            { label: 'Chat clicks', value: total },
            { label: 'WhatsApp', value: summary?.whatsapp ?? 0 },
            { label: 'Messenger', value: summary?.messenger ?? 0 },
            { label: 'From mobile', value: `${total ? Math.round(((summary?.mobile ?? 0) / total) * 100) : 0}%` },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-sm text-gray-500 font-body">{card.label}</div>
              <div className="font-display text-3xl font-bold text-gray-900 mt-1">{summary ? card.value : '…'}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopList
            title="Most chatted pages & items"
            rows={(summary?.topPages ?? []).map((r) => ({ label: pageLabel(r.label), count: r.count }))}
            total={total}
          />
          <TopList
            title="Where visitors came from"
            rows={(summary?.topSources ?? []).map((r) => ({ label: r.label || 'Direct / unknown', count: r.count }))}
            total={total}
          />
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
              <tbody className={`divide-y divide-gray-100 transition-opacity ${loading ? 'opacity-50' : ''}`}>
                {!loading && log?.items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-body">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      No chat clicks in the last {days} days
                    </td>
                  </tr>
                )}
                {log?.items.map((click: ChatClick) => (
                  <tr key={click._id} className="hover:bg-gray-50 font-body text-sm">
                    <td className="px-6 py-3 whitespace-nowrap text-gray-700">{formatTime(click.createdAt)}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${CHANNEL_STYLE[click.channel].className}`}>
                        {CHANNEL_STYLE[click.channel].label}
                      </span>
                    </td>
                    <td className="px-6 py-3 max-w-xs">
                      <Link to={click.page} target="_blank" className="text-primary-600 hover:underline">
                        {click.item || pageLabel(click.page)}
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

          {log && log.total > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 font-body text-sm">
              <span className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{from}–{to}</span> of{' '}
                <span className="font-semibold text-gray-900">{log.total}</span>
              </span>
              {lastPage > 1 && (
                <nav className="flex items-center gap-1" aria-label="Pagination">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {pageWindow(page, lastPage).map((p, i) =>
                    p === null ? (
                      <span key={`gap-${i}`} className="px-2 text-gray-400">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={`min-w-[2.25rem] h-9 rounded-lg font-semibold transition ${
                          p === page ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === lastPage}
                    aria-label="Next page"
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default WebsiteChats;
