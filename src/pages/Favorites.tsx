import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart } = useAppContext();

  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-red-50 text-red-300 rounded-full flex items-center justify-center mb-6">
          <Heart size={48} />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Belum Ada Favorit</h2>
        <p className="text-stone-500 mb-8 text-center max-w-md">Simpan menu favorit Anda dengan menekan ikon hati pada halaman menu.</p>
        <Link to="/menu" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors">
          Jelajahi Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-4">
            Favorit Saya
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" size={40} /> Menu Pilihan Anda
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-400 to-pink-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {favorites.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300 border border-stone-200/50 flex flex-col hover:border-red-300/50"
                whileHover={{ y: -8 }}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-red-50 to-pink-50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 right-4">
                    <motion.button 
                      onClick={() => toggleFavorite(item)}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md text-red-500 hover:scale-110 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart size={20} fill="currentColor" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-stone-800 mb-2 group-hover:text-red-600 transition-colors">{item.name}</h3>
                  <p className="text-sm text-stone-600 mb-6 leading-relaxed flex-grow">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-200/50">
                    <span className="font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent text-lg">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <motion.button 
                      onClick={() => addToCart(item)}
                      className="bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={16} className="mr-1" /> Keranjang
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
