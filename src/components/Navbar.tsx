import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Heart, User, ShoppingBag, Menu as MenuIcon, X, Clock, MapPin, Phone, MessageSquare, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { cart, favorites, searchHistory, addSearchHistory, notifications, clearNotifications, isLoggedIn, login, logout } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Beranda', path: '/', icon: <Home size={16} /> },
    { name: 'Menu', path: '/menu', icon: <ShoppingBag size={16} /> },
    { name: 'Lokasi', path: '/location', icon: <MapPin size={16} /> },
    { name: 'Asisten AI', path: '/chat-ai', icon: <MessageSquare size={16} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Clock size={16} /> },
    { name: 'Pesanan', path: '/order-tracking', icon: <ShoppingBag size={16} /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addSearchHistory(searchQuery);
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs sm:text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center"><Clock size={14} className="mr-2" /> Buka: 10.00 - 23.00</span>
            <span className="flex items-center"><MapPin size={14} className="mr-2" /> Jl. Talas V No.153 Pondok Cabe Ilir</span>
          </div>
          <span className="flex items-center"><Phone size={14} className="mr-2" /> 0821 1298 8475</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#111827]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent pointer-events-none" animate={{ opacity: [0.85, 1, 0.85] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center h-16 md:h-20 min-w-0">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center space-x-2 mr-5 lg:mr-8 group whitespace-nowrap">
              <motion.div 
                className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-emerald-600/50"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-serif font-bold text-xl">KP</span>
              </motion.div>
              <motion.span 
                className="hidden sm:inline-block font-serif font-bold md:text-2xl text-white tracking-tight group-hover:text-emerald-300 transition-colors"
                animate={{ letterSpacing: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Kedai Prasmar
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2 min-w-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative whitespace-nowrap px-3 lg:px-3.5 py-2 text-xs lg:text-sm font-medium transition-colors rounded-full ${
                      isActive ? 'text-emerald-200' : 'text-white/70 hover:text-emerald-300'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navBubble"
                        className="absolute inset-0 bg-emerald-500/20 rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Icons */}
            <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:gap-3">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <motion.button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)} 
                  className="text-white/75 hover:text-emerald-300 transition-colors relative p-1.5 lg:p-2 hover:bg-white/10 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={22} />
                </motion.button>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-stone-100/50 overflow-hidden backdrop-blur-sm"
                    >
                      <form onSubmit={handleSearch} className="p-3 border-b border-stone-100">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Cari menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-stone-50 border-none rounded-xl py-2 px-4 pr-10 focus:ring-2 focus:ring-emerald-500 text-sm"
                            autoFocus
                          />
                          <motion.button 
                            type="submit" 
                            className="absolute right-3 top-2 text-stone-400 hover:text-emerald-600"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Search size={18} />
                          </motion.button>
                        </div>
                      </form>
                      {searchHistory.length > 0 && (
                        <div className="p-3">
                          <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Riwayat Pencarian</h4>
                          <ul className="space-y-1">
                            {searchHistory.map((history, idx) => (
                              <motion.li 
                                key={idx}
                                whileHover={{ x: 5 }}
                              >
                                <button
                                  onClick={() => {
                                    setSearchQuery(history);
                                    navigate(`/menu?search=${encodeURIComponent(history)}`);
                                    setIsSearchOpen(false);
                                  }}
                                  className="w-full text-left text-sm text-stone-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1.5 rounded-lg transition-colors flex items-center"
                                >
                                  <Clock size={14} className="mr-2 text-stone-400" />
                                  {history}
                                </button>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <div className="relative">
                <motion.button 
                  onClick={() => setShowNotifications(!showNotifications)} 
                  className="text-white/75 hover:text-emerald-300 transition-colors relative p-1.5 lg:p-2 hover:bg-white/10 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={notifications.length > 0 ? { y: [0, -3, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Bell size={22} />
                  {notifications.length > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      {notifications.length}
                    </motion.span>
                  )}
                </motion.button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-stone-100/50 overflow-hidden backdrop-blur-sm"
                    >
                      <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-amber-50">
                        <h3 className="font-semibold text-stone-800">Notifikasi</h3>
                        <motion.button 
                          onClick={clearNotifications} 
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          Tandai sudah dibaca
                        </motion.button>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-sm text-stone-500">Belum ada notifikasi baru.</div>
                        ) : (
                          notifications.map((notif, idx) => (
                            <motion.div 
                              key={idx} 
                              className="p-4 border-b border-stone-50 hover:bg-stone-50 text-sm text-stone-700 transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              {notif}
                            </motion.div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Favorites */}
              <Link to="/favorites" className="text-stone-600 hover:text-red-500 transition-colors relative p-2 hover:bg-red-50 rounded-full">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Heart size={22} />
                </motion.div>
                {favorites.length > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="text-stone-600 hover:text-emerald-600 transition-colors relative p-2 hover:bg-emerald-50 rounded-full">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <ShoppingBag size={22} />
                </motion.div>
                {cart.length > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </motion.span>
                )}
              </Link>

              {/* User / Login */}
              <motion.button 
                onClick={() => isLoggedIn ? logout() : setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-100 hover:text-white px-4 py-2 rounded-full transition-colors text-sm font-medium border border-emerald-400/40 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={18} />
                <span>{isLoggedIn ? 'Keluar' : 'Masuk Akun'}</span>
              </motion.button>

              {/* Chat Widget Toggle (mobile) */}
              <motion.button
                className="md:hidden text-stone-600 p-2 hover:bg-emerald-50 rounded-full"
                onClick={() => {
                  try { window.dispatchEvent(new Event('open-chat-drawer')); } catch {}
                }}
                title="Asisten AI"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={20} />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                className="md:hidden text-stone-600 p-2 hover:bg-emerald-50 rounded-full"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
              />

              {/* Panel */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="md:hidden bg-[#111827] border-t border-white/10 overflow-y-auto z-50 fixed inset-x-0 top-0 pt-16 h-[calc(100dvh-4rem)] min-h-[360px] w-full max-w-full overflow-x-hidden px-4 shadow-2xl"
              >
                <div className="mx-auto w-full max-w-md px-1 py-5">
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 px-2 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Navigasi</p>
                      <p className="text-lg font-semibold text-white">Kedai Prasmar</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full border border-white/10 p-2 text-white/80 hover:bg-white/10"
                      aria-label="Tutup menu navigasi"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : 'text-white/80 hover:bg-white/10 hover:text-emerald-200'
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
                        {link.icon}
                      </span>
                      {link.name}
                    </Link>
                  ))}

                  {/* Quick Chat button for mobile panel */}
                  <button
                    onClick={() => {
                      try { window.dispatchEvent(new Event('open-chat-drawer')); } catch {}
                      setIsOpen(false);
                    }}
                    className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-emerald-200"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-200">
                      <MessageSquare size={18} />
                    </span>
                    Asisten AI
                  </button>
                  <button 
                    onClick={() => {
                      if (isLoggedIn) {
                        logout();
                      } else {
                        setIsAuthModalOpen(true);
                      }
                      setIsOpen(false);
                    }}
                    className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-emerald-200"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
                      <User size={18} />
                    </span>
                    {isLoggedIn ? 'Keluar Akun' : 'Masuk Akun'}
                  </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
