import { MapPin, Phone, Clock, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-stone-300 pt-16 pb-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 items-start">
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-emerald-600/50"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-serif font-bold text-lg">KP</span>
              </motion.div>
              <div>
                <span className="font-serif font-bold text-2xl text-white tracking-tight group-hover:text-emerald-400 transition-colors">Kedai Prasmar</span>
                <p className="text-stone-400 leading-relaxed mt-2 max-w-md group-hover:text-stone-300 transition-colors">Menghadirkan harmoni cita rasa Nusantara dengan sentuhan alam. Nikmati hidangan berkualitas dengan suasana yang nyaman dan menenangkan.</p>
              </div>
            </Link>

            <div className="mt-6 flex items-center space-x-3">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Twitter, href: "https://twitter.com" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center hover:from-emerald-600 hover:to-emerald-700 text-stone-400 hover:text-white transition-all shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-3">
              {[
                { name: 'Beranda', path: '/' },
                { name: 'Menu Kami', path: '/menu' },
                { name: 'Lokasi & Kontak', path: '/location' },
                { name: 'Asisten AI', path: '/chat-ai' }
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={item.path} 
                    className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 mb-4">
              {[
                { icon: MapPin, text: "Jl. Talas V No.153\nPondok Cabe Ilir" },
                { icon: Phone, text: "0821 1298 8475" },
                { icon: Clock, text: "10.00 - 23.00 WIB" }
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-start hover:text-emerald-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <item.icon size={20} className="mr-3 text-emerald-500 shrink-0 mt-1" />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              className="pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="newsletter" className="sr-only">Newsletter</label>
              <div className="flex items-center space-x-2">
                <motion.input 
                  id="newsletter" 
                  type="email" 
                  placeholder="Email Anda" 
                  className="w-full px-3 py-2 rounded-lg bg-stone-800/50 placeholder:text-stone-400 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  whileFocus={{ scale: 1.05 }}
                />
                <motion.button 
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight size={16} />
                </motion.button>
              </div>
              <p className="text-xs text-stone-500 mt-2">Dapatkan info promo dan menu terbaru. Kami tidak akan membagikan email Anda.</p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-stone-800 pt-8 text-center text-sm text-stone-500 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} Kedai Prasmar. All rights reserved.</p>
          <p>Designed with care • <motion.span 
            className="text-emerald-400 inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️ Kedai Prasmar
          </motion.span></p>
        </motion.div>
      </div>
    </footer>
  );
}
