import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Location() {
  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            Kunjungi Kami
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-800 mb-6">Lokasi Kedai Prasmar</h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full mb-6" />
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Kunjungi Kedai Prasmar dan rasakan langsung suasana alam yang menenangkan sambil menikmati hidangan spesial kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 border border-stone-200/50 hover:border-emerald-300/50 flex flex-col items-center text-center group transition-all duration-300"
            >
              <motion.div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <MapPin size={32} />
              </motion.div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Alamat</h3>
              <p className="text-stone-600 leading-relaxed">
                Jl. Talas V No.153<br/>
                Pondok Cabe Ilir<br/>
                Tangerang Selatan, 15418
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 border border-stone-200/50 hover:border-emerald-300/50 flex flex-col items-center text-center group transition-all duration-300"
            >
              <motion.div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <Clock size={32} />
              </motion.div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Jam Operasional</h3>
              <p className="text-stone-600 leading-relaxed">
                Senin - Minggu<br/>
                <span className="font-semibold text-emerald-600">10.00 - 23.00 WIB</span>
              </p>
            </motion.div>

            <motion.a 
              href="https://wa.me/6282112988475"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 border border-stone-200/50 hover:border-emerald-300/50 flex flex-col items-center text-center group transition-all duration-300 block"
            >
              <motion.div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Phone size={32} />
              </motion.div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Hubungi Kami</h3>
              <p className="text-stone-600 leading-relaxed text-lg font-semibold group-hover:text-emerald-600 transition-colors">
                0821 1298 8475
              </p>
              <span className="text-xs text-stone-400 mt-3">Klik untuk chat via WhatsApp</span>
            </motion.a>
          </div>

          {/* Map Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white p-4 rounded-3xl shadow-sm border border-stone-200/50 hover:shadow-2xl hover:shadow-emerald-900/10 relative overflow-hidden min-h-[500px] group transition-all duration-300"
          >
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Jl.+Talas+V+No.153,+Pd.+Cabe+Ilir,+Kec.+Pamulang,+Kota+Tangerang+Selatan,+Banten+15418" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-4 rounded-2xl overflow-hidden bg-stone-200 flex flex-col items-center justify-center group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[url('/images/map.jpg')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"></div>
              <motion.div 
                className="relative z-10 text-center p-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-sm"
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin size={48} className="mx-auto text-emerald-600 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">Kedai Prasmar</h3>
                <p className="text-stone-600 mb-6 text-sm leading-relaxed">Jl. Talas V No.153<br/>Pondok Cabe Ilir</p>
                <motion.div 
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 group-hover:shadow-lg text-white rounded-xl font-medium flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Navigation size={18} className="mr-2" /> Buka di Maps
                </motion.div>
              </motion.div>
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
