import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Heart, User, ShoppingBag, Menu as MenuIcon, X, Clock, MapPin, Phone } from 'lucide-react';
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
    { name: 'Beranda', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Lokasi', path: '/location' },
    { name: 'Asisten AI', path: '/chat-ai' },
    { name: 'Dashboard', path: '/dashboard' },
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
      <nav className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/5 to-emerald-50/0 pointer-events-none" animate={{ opacity: [0.85, 1, 0.85] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 mr-6 md:mr-14 group">
              <motion.div 
                className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-emerald-600/50"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-serif font-bold text-xl">KP</span>
              </motion.div>
              <motion.span 
                className="hidden sm:inline-block font-serif font-bold md:text-2xl text-emerald-900 tracking-tight group-hover:text-emerald-600 transition-colors"
                animate={{ letterSpacing: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Kedai Prasmar
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                      isActive ? 'text-emerald-900' : 'text-stone-600 hover:text-emerald-600'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navBubble"
                        className="absolute inset-0 bg-emerald-100/80 rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Icons */}
            <div className="ml-auto flex items-center gap-3 md:gap-5">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <motion.button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)} 
                  className="text-stone-600 hover:text-emerald-600 transition-colors relative p-2 hover:bg-emerald-50 rounded-full"
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
                  className="text-stone-600 hover:text-emerald-600 transition-colors relative p-2 hover:bg-emerald-50 rounded-full"
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
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-amber-50 hover:from-emerald-100 hover:to-amber-100 text-stone-700 hover:text-emerald-700 px-3 py-1.5 rounded-full transition-colors text-sm font-medium border border-emerald-200/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={18} />
                <span>{isLoggedIn ? 'Keluar' : 'Masuk Akun'}</span>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button 
                className="md:hidden text-stone-600 p-2 hover:bg-emerald-50 rounded-full" 
                onClick={() => setIsOpen(!isOpen)}
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
                className="md:hidden bg-white border-t border-stone-100 overflow-hidden z-50 fixed left-0 right-0 top-16"
              >
                <div className="px-4 py-5 space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-3 rounded-xl text-base font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button 
                    onClick={() => {
                      if (isLoggedIn) {
                        logout();
                      } else {
                        setIsAuthModalOpen(true);
                      }
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-4 rounded-xl text-base font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center"
                  >
                    <User size={18} className="mr-3" />
                    {isLoggedIn ? 'Keluar Akun' : 'Masuk Akun'}
                  </button>
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
