import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Search, Heart, Plus, ShoppingBag } from 'lucide-react';
import { menuData } from '../data/menu';
import { useAppContext } from '../context/AppContext';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'Makanan' | 'Minuman' | 'Cemilan'>('Makanan');
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchQuery = queryParams.get('search') || '';

  const { addToCart, toggleFavorite, isFavorite } = useAppContext();

  const tabs = ['Makanan', 'Minuman', 'Cemilan'] as const;

  const [sortOption, setSortOption] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Recompute filtered menu with local search, category tab, favorites and sorting
  const getFallbackImage = (category: string) => {
    const categoryColor = category === 'Minuman' ? '#0f766e' : category === 'Cemilan' ? '#f59e0b' : '#10b981';
    const label = category === 'Minuman' ? 'Minuman' : category === 'Cemilan' ? 'Cemilan' : 'Makanan';
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
        <defs>
          <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0%' stop-color='#ecfdf5'/>
            <stop offset='100%' stop-color='#fef3c7'/>
          </linearGradient>
        </defs>
        <rect width='800' height='600' fill='url(#g)'/>
        <rect x='150' y='120' width='500' height='360' rx='32' fill='white' opacity='0.28'/>
        <circle cx='260' cy='200' r='90' fill='${categoryColor}' opacity='0.20'/>
        <circle cx='530' cy='250' r='120' fill='${categoryColor}' opacity='0.18'/>
        <path d='M215 360 C280 285, 350 280, 395 360 C440 440, 515 440, 580 360' fill='none' stroke='${categoryColor}' stroke-width='22' stroke-linecap='round'/>
        <path d='M190 390 L610 390' stroke='${categoryColor}' stroke-width='14' stroke-linecap='round' opacity='0.55'/>
        <text x='400' y='490' text-anchor='middle' font-size='44' font-family='Arial, sans-serif' font-weight='700' fill='#14532d'>${label}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const filteredAndSorted = useMemo(() => {
    let filtered = menuData.slice();

    // Apply search if any
    if (localSearch && localSearch.trim() !== '') {
      const q = localSearch.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    } else {
      // If no search, filter by active tab
      filtered = filtered.filter(item => item.category === activeTab);
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(item => isFavorite(item.id));
    }

    // Sorting
    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeTab, localSearch, showFavoritesOnly, sortOption, isFavorite]);

  return (
    <div className="min-h-screen bg-stone-50 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            Menu Pilihan
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-800 mb-4">
            {localSearch && localSearch.trim() !== '' ? `Hasil Pencarian: "${localSearch}"` : 'Jelajahi Menu Kami'}
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full mb-4" />
          <p className="text-md md:text-lg text-stone-600 max-w-2xl mx-auto">
            Temukan berbagai pilihan hidangan lezat yang disiapkan dengan bahan-bahan segar dan resep khas kami.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="flex-1">
            <label htmlFor="menu-search" className="sr-only">Cari menu</label>
            <div className="relative">
              <input
                id="menu-search"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Cari nama, deskripsi, atau tag..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Cari menu"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                <Search size={18} />
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <label htmlFor="sort" className="sr-only">Urutkan</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="py-3 px-4 rounded-xl border border-stone-200 bg-white text-stone-700 focus:outline-none"
              aria-label="Urutkan menu"
            >
              <option value="recommended">Rekomendasi</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>

            <button
              onClick={() => setShowFavoritesOnly(prev => !prev)}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border ${showFavoritesOnly ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-stone-200 text-stone-700'}`}
              aria-pressed={showFavoritesOnly}
            >
              <Heart size={16} />
              <span className="text-sm">Favorit</span>
            </button>

            {/* Tabs (Only show if no local search) */}
            {!localSearch && (
              <div className="hidden md:block ml-2">
                <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-stone-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeTab === tab ? 'bg-emerald-600 text-white' : 'text-stone-600 hover:text-emerald-600'
                      }`}
                      aria-pressed={activeTab === tab}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, delay: idx * 0.03 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-200/50 flex flex-col h-full"
                  whileHover={{ y: -6 }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-50 to-amber-50">
                    <img
                      src={item.image || getFallbackImage(item.category)}
                      alt={item.name}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = getFallbackImage(item.category);
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge & Heart */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-emerald-700 text-xs font-semibold">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => { e.preventDefault(); toggleFavorite(item); }}
                        className={`w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm ${isFavorite(item.id) ? 'text-red-500' : 'text-stone-400 hover:text-red-500'}`}
                        aria-label={isFavorite(item.id) ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                      >
                        <Heart size={18} fill={isFavorite(item.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="font-semibold text-base md:text-lg text-stone-800 mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-stone-600 mb-4 line-clamp-3">{item.description}</p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                      <span className="font-bold text-stone-800 text-base md:text-lg">Rp {item.price.toLocaleString('id-ID')}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                        aria-label="Tambah ke keranjang"
                      >
                        <Plus size={16} />
                        <span className="text-sm">Tambah</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone-100 mb-6">
                  <Search size={40} className="text-stone-400" />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">Menu tidak ditemukan</h3>
                <p className="text-stone-600">Maaf, kami tidak dapat menemukan menu yang cocok dengan pencarian "{localSearch}".</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
