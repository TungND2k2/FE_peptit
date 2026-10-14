import { IMAGES } from '@/config/site';
import { MARKETS } from '@/data/company';

// Maps generated from Natural Earth (public domain); colours match MARKETS
const MarketsMap = () => (
  <div className="rounded-3xl border border-primary-100 bg-white p-5 md:p-8 shadow-soft">
    <div className="relative">
      <img
        src={IMAGES.marketsMap}
        alt="World map highlighting the United States, United Kingdom and Ireland"
        loading="lazy"
        className="w-full h-auto"
      />
      {/* UK and Ireland are too small at world scale, so they get a zoomed inset */}
      <figure className="mx-auto mt-4 w-40 sm:mt-0 sm:mx-0 sm:absolute sm:left-0 sm:bottom-0 sm:w-[19%] rounded-2xl border border-gray-200 bg-white p-2 shadow-md">
        <img src={IMAGES.marketsMapUkIe} alt="United Kingdom and Ireland" loading="lazy" className="w-full h-auto" />
        <figcaption className="text-center font-body text-xs font-semibold text-gray-600 pb-0.5">
          UK &amp; Ireland
        </figcaption>
      </figure>
    </div>
    <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
      {MARKETS.map((market) => (
        <span key={market.code} className="inline-flex items-center gap-2 font-body text-sm text-gray-700">
          <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: market.color }} />
          {market.name}
        </span>
      ))}
    </div>
  </div>
);

export default MarketsMap;
