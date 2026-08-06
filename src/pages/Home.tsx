import { motion } from 'framer-motion';
import { Leaf, Award, Flame, Sparkles, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        {/* Background with decorative elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/70 to-stone-900/60" />
          
          {/* Animated light rays */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5 }}
              />
            ))}
          </div>
        </div>

        {/* Decorative blur circles */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Main Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Badge */}
            <motion.span 
              className="inline-flex items-center px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-amber-500/30 text-emerald-100 border border-emerald-400/50 backdrop-blur-md text-sm font-semibold mb-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={16} className="mr-2" /> Pengalaman Kuliner Premium
            </motion.span>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Nikmati Cita Rasa <br/>
              <motion.span 
                className="bg-gradient-to-r from-emerald-300 via-amber-300 to-red-300 bg-clip-text text-transparent italic"
              >
                Alam Nusantara
                <motion.span
                  className="absolute -right-6 -top-3 text-2xl inline-block"
                  animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔥
                </motion.span>
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl text-stone-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Kedai Prasmar menghadirkan pengalaman kuliner otentik dengan bahan-bahan segar pilihan dari petani lokal, disajikan dalam suasana yang menenangkan jiwa.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Link to="/menu" className="group relative">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  Eksplorasi Menu Kami
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/location" className="group">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 text-lg font-semibold text-emerald-600 bg-white/95 backdrop-blur-sm rounded-full hover:shadow-2xl transition-all duration-300 border-2 border-white flex items-center gap-2"
                >
                  Kunjungi Kami
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-8 h-14 border-2 border-white/60 rounded-full flex items-start justify-center p-3"
            animate={{ borderColor: ['rgba(255,255,255,0.6)', 'rgba(16,185,129,0.8)', 'rgba(255,255,255,0.6)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-2.5 bg-emerald-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-stone-50 to-transparent z-10" />
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            Mengapa Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Mengapa Memilih Kedai Prasmar?
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Leaf size={40} />, 
              title: "Bahan Alami Pilihan", 
              desc: "Bahan-bahan segar langsung dari petani lokal terpercaya",
              color: "emerald",
              gradient: "from-emerald-500 to-emerald-600"
            },
            { 
              icon: <Flame size={40} />, 
              title: "Resep Warisan Autentik", 
              desc: "Resep turun-temurun menjaga keaslian cita rasa Nusantara",
              color: "amber",
              gradient: "from-amber-500 to-red-600"
            },
            { 
              icon: <Award size={40} />, 
              title: "Suasana Premium", 
              desc: "Desain modern menciptakan pengalaman bersantap tak terlupakan",
              color: "purple",
              gradient: "from-purple-500 to-pink-600"
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group"
            >
              <motion.div 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-stone-200/50 text-center h-full shadow-lg hover:shadow-3xl transition-all duration-500 hover:border-emerald-300/50 relative overflow-hidden"
              >
                {/* Icon Container */}
                <motion.div 
                  className={`w-20 h-20 mx-auto bg-gradient-to-br ${
                    feature.color === 'emerald' ? 'from-emerald-500/30 to-emerald-600/10 text-emerald-600' : 
                    feature.color === 'amber' ? 'from-amber-500/30 to-red-600/10 text-amber-600' :
                    'from-purple-500/30 to-pink-600/10 text-purple-600'
                  } rounded-3xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-300`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-stone-800 mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            Testimoni Pelanggan
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="text-lg text-stone-600">
            Pengalaman kuliner berkesan dari ribuan pelanggan yang mempercayai Kedai Prasmar
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Siti Nurhaliza",
              role: "Designer",
              testimonial: "Suasananya sangat nyaman dan makanannya luar biasa lezat!",
              rating: 5,
              image: "https://api.dicebear.com/7.x/notionists/svg?seed=1"
            },
            {
              name: "Budi Santoso",
              role: "Entrepreneur",
              testimonial: "Tempat sempurna untuk meeting bisnis dengan makanan autentik.",
              rating: 5,
              image: "https://api.dicebear.com/7.x/notionists/svg?seed=2"
            },
            {
              name: "Rina Wijaya",
              role: "Food Blogger",
              testimonial: "Setiap hidangan adalah karya seni dengan cita rasa menggugah!",
              rating: 5,
              image: "https://api.dicebear.com/7.x/notionists/svg?seed=3"
            }
          ].map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group"
            >
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 h-full border border-stone-200/50 shadow-lg hover:shadow-3xl transition-all duration-300 hover:border-emerald-300/50 flex flex-col relative overflow-hidden"
              >
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-stone-700 leading-relaxed mb-6 flex-grow italic">
                  "{testimonial.testimonial}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-stone-200/50">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-emerald-200"
                  />
                  <div>
                    <p className="font-bold text-stone-800">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== STORY SECTION ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            Cerita Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
            Perjalanan Kedai Prasmar
          </h2>
        </motion.div>

        {/* Story Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-stone-700 leading-relaxed text-lg mb-6">
              Kedai Prasmar lahir dari passion untuk menghadirkan cita rasa autentik Nusantara yang telah dilupakan. Dimulai dari dapur kecil dengan resep turun-temurun, kami berkembang menjadi restoran yang dipercaya ribuan pelanggan setia.
            </p>
            <p className="text-stone-700 leading-relaxed text-lg">
              Setiap hidangan dimasak dengan cinta dan menggunakan bahan-bahan terbaik pilihan. Kami percaya bahwa makanan bukan hanya untuk mengenyangkan perut, tetapi juga untuk menyentuh hati dan jiwa setiap pengunjung.
            </p>
          </motion.div>

          {/* Right: Image Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.img
                          src="https://images.unsplash.com/photo-1504674900952-b8986cbdf675?w=1200&q=80&auto=format&fit=crop"
              alt="Perjalanan Kedai Prasmar"
              className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Stats Overlay */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { number: "1000+", label: "Pelanggan Setia" },
                { number: "50+", label: "Menu Pilihan" },
                { number: "10+", label: "Tahun Berpengalaman" },
                { number: "5★", label: "Rating Kepuasan" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-stone-200/50"
                >
                  <p className="text-xl font-bold text-emerald-600">{stat.number}</p>
                  <p className="text-sm text-stone-600 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-amber-600/10 to-red-600/10 -z-10" />
        
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6">
            Siap untuk Pengalaman Kuliner Terbaik?
          </h2>
          <p className="text-xl text-stone-600 mb-8">
            Jangan lewatkan kesempatan untuk menikmati hidangan istimewa Kedai Prasmar. Kunjungi kami sekarang!
          </p>
          
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full shadow-lg hover:shadow-2xl"
              >
                Lihat Menu Sekarang
              </motion.button>
            </Link>
            <Link to="/location">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 text-lg font-semibold text-emerald-600 bg-white border-2 border-emerald-600 rounded-full hover:bg-emerald-50"
              >
                Temukan Lokasi Kami
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
