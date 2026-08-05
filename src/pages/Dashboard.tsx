import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Receipt, Coffee, Folder, BarChart2, Users, Settings, 
  Calendar, Bell, ChevronDown, DollarSign, ShoppingCart, 
  TrendingUp, PieChart as PieChartIcon, ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const stats = [
    { title: 'Total Penjualan', value: 'Rp 0', icon: <DollarSign size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Total Transaksi', value: '0', icon: <ShoppingCart size={24} />, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Menu Terjual', value: '0', icon: <Coffee size={24} />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Omzet Bulan Ini', value: 'Rp 0', icon: <TrendingUp size={24} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const sidebarMenus = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Transaksi', icon: <Receipt size={20} /> },
    { name: 'Menu', icon: <Coffee size={20} /> },
    { name: 'Kategori', icon: <Folder size={20} /> },
    { name: 'Laporan', icon: <BarChart2 size={20} /> },
    { name: 'Pengguna', icon: <Users size={20} /> },
    { name: 'Pengaturan', icon: <Settings size={20} /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-stone-50 flex font-sans overflow-hidden">
      
      {/* Sidebar - Themed to match Kedai Prasmar */}
      <div className="hidden lg:flex w-64 bg-emerald-950 text-emerald-50 flex-col shrink-0 rounded-tr-3xl">
        <div className="p-6">
          <div className="text-xs font-bold tracking-wider text-emerald-400 mb-4 uppercase">Menu Admin</div>
          <div className="space-y-1.5">
            {sidebarMenus.map((item) => (
              <button 
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
                  activeMenu === item.name 
                    ? 'text-emerald-950 font-semibold shadow-md' 
                    : 'text-emerald-100/70 hover:text-white hover:bg-emerald-900/50'
                }`}
              >
                {activeMenu === item.name && (
                  <motion.div 
                    layoutId="activeSidebar" 
                    className="absolute inset-0 bg-emerald-400 rounded-2xl" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center">
                  <span className={`mr-3 transition-transform duration-300 ${activeMenu === item.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6">
          <div className="bg-emerald-900/50 rounded-2xl p-4 flex items-center space-x-3 border border-emerald-800/50 backdrop-blur-sm cursor-pointer hover:bg-emerald-800/50 transition-colors">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="Admin" className="w-10 h-10 rounded-full bg-emerald-100" />
            <div className="flex-1 overflow-hidden">
              <div className="text-white text-sm font-bold truncate">Admin Prasmar</div>
              <div className="text-emerald-400 text-xs truncate">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Dashboard Header */}
        <div className="px-6 lg:px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-800">
              {activeMenu === 'Dashboard' ? 'Dashboard Overview' : activeMenu}
            </h1>
            <p className="text-stone-500 mt-1">
              {activeMenu === 'Dashboard' && 'Pantau aktivitas dan performa Kedai Prasmar hari ini.'}
              {activeMenu === 'Transaksi' && 'Kelola dan pantau semua riwayat transaksi penjualan.'}
              {activeMenu === 'Menu' && 'Kelola daftar hidangan, minuman, dan cemilan.'}
              {activeMenu === 'Kategori' && 'Atur pengelompokan menu untuk memudahkan pencarian.'}
              {activeMenu === 'Laporan' && 'Analisis data penjualan dan performa bisnis.'}
              {activeMenu === 'Pengguna' && 'Kelola akses dan daftar pelanggan terdaftar.'}
              {activeMenu === 'Pengaturan' && 'Konfigurasi sistem dan detail informasi kedai.'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2.5 rounded-full shadow-sm border border-stone-100 flex items-center text-sm font-medium text-stone-600">
              <Calendar size={16} className="mr-2 text-emerald-600" />
              {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <button className="w-10 h-10 bg-white rounded-full shadow-sm border border-stone-100 flex items-center justify-center text-stone-500 hover:text-emerald-600 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <motion.div 
          key={activeMenu}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="px-6 lg:px-10 pb-10"
        >
          {activeMenu === 'Dashboard' && (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group"
                  >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-stone-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                        <p className="text-stone-500 text-sm font-medium mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-stone-800">{stat.value}</h3>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color} shadow-inner`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="relative z-10 mt-4 flex items-center text-xs font-medium text-stone-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mr-2"></span>
                      Menunggu transaksi pertama
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Middle Row: Chart & Top Menu */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                
                {/* Chart Area */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-bold text-lg text-stone-800">Grafik Penjualan</h3>
                      <p className="text-xs text-stone-500">7 Hari Terakhir</p>
                    </div>
                    <button className="text-sm text-stone-600 bg-stone-50 px-4 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 transition-colors flex items-center">
                      Minggu Ini <ChevronDown size={14} className="ml-2" />
                    </button>
                  </div>
                  
                  <div className="flex-1 min-h-[250px] relative flex flex-col justify-end">
                    {/* Background Grid */}
                    <div className="absolute inset-0 flex flex-col justify-between pb-6">
                      {[4,3,2,1,0].map(i => (
                        <div key={i} className="border-b border-stone-100 w-full relative h-full">
                          <span className="absolute -left-2 -top-2.5 text-[10px] text-stone-400 font-medium bg-white pr-2">{i}M</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Empty State Illustration */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pb-6">
                      <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-3">
                        <BarChart2 size={24} className="text-stone-300" />
                      </div>
                      <p className="text-stone-500 font-medium text-sm">Belum ada data grafik</p>
                      <p className="text-stone-400 text-xs mt-1">Lakukan transaksi untuk melihat tren.</p>
                    </div>

                    {/* X Axis */}
                    <div className="flex justify-between items-end h-6 text-[10px] font-medium text-stone-400 pl-4 relative z-10">
                      {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Ming'].map(day => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Top Menu Area */}
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-stone-800">Menu Terlaris</h3>
                    <button className="text-emerald-600 hover:text-emerald-700 p-1">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center text-center bg-stone-50/50 rounded-2xl border border-stone-100/50 p-6">
                    <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                      <Coffee size={32} className="text-stone-300" />
                    </div>
                    <h4 className="font-semibold text-stone-700 mb-1">Belum Ada Penjualan</h4>
                    <p className="text-xs text-stone-500">Menu favorit pelanggan akan muncul di sini.</p>
                  </div>
                </motion.div>

              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Payment Methods */}
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                  <h3 className="font-bold text-lg text-stone-800 mb-6">Metode Pembayaran</h3>
                  <div className="flex flex-col items-center justify-center h-48">
                    {/* Empty Donut Chart SVG */}
                    <svg className="w-32 h-32 mb-4" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f5f5f4" strokeWidth="15" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e7e5e4" strokeWidth="15" strokeDasharray="10 5" />
                    </svg>
                    <p className="text-stone-500 text-sm font-medium">Distribusi kosong</p>
                  </div>
                </motion.div>

                {/* Recent Transactions */}
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-stone-800">Transaksi Terbaru</h3>
                  </div>
                  <div className="flex flex-col items-center justify-center h-48 text-center bg-stone-50/50 rounded-2xl border border-stone-100/50 p-6">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                      <Receipt size={20} className="text-stone-300" />
                    </div>
                    <p className="text-stone-500 text-sm font-medium">Riwayat masih kosong</p>
                  </div>
                </motion.div>

                {/* Summary Box */}
                <motion.div variants={itemVariants} className="bg-emerald-600 text-white p-6 rounded-3xl shadow-lg shadow-emerald-900/20 relative overflow-hidden">
                  {/* Decorative background shapes */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-700 rounded-full blur-xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-6">Ringkasan Hari Ini</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-emerald-700/50 p-3 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center text-emerald-50 text-sm">
                          <ShoppingCart size={16} className="mr-3 text-emerald-300" /> Total Penjualan
                        </div>
                        <div className="font-bold">Rp 0</div>
                      </div>
                      <div className="flex justify-between items-center bg-emerald-700/50 p-3 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center text-emerald-50 text-sm">
                          <Receipt size={16} className="mr-3 text-emerald-300" /> Total Transaksi
                        </div>
                        <div className="font-bold">0</div>
                      </div>
                      <div className="flex justify-between items-center bg-emerald-700/50 p-3 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center text-emerald-50 text-sm">
                          <Coffee size={16} className="mr-3 text-emerald-300" /> Menu Terjual
                        </div>
                        <div className="font-bold">0</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </>
          )}

          {activeMenu === 'Transaksi' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-stone-800">Semua Transaksi</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100">Filter</button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700">Export</button>
                </div>
              </div>
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                  <Receipt size={32} className="text-stone-300" />
                </div>
                <h4 className="text-lg font-semibold text-stone-800 mb-2">Belum ada transaksi</h4>
                <p className="text-stone-500 max-w-sm">Data transaksi akan muncul di sini setelah pelanggan melakukan pesanan dan pembayaran.</p>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Menu' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-stone-800">Daftar Menu</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 flex items-center">
                  <span className="mr-2">+</span> Tambah Menu
                </button>
              </div>
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                  <Coffee size={32} className="text-stone-300" />
                </div>
                <h4 className="text-lg font-semibold text-stone-800 mb-2">Kelola Menu Anda</h4>
                <p className="text-stone-500 max-w-sm">Anda dapat menambah, mengubah harga, atau memperbarui ketersediaan menu di sini.</p>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Kategori' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-stone-800">Kategori Menu</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700">Tambah Kategori</button>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Makanan', 'Minuman', 'Cemilan'].map(cat => (
                  <div key={cat} className="p-4 border border-stone-200 rounded-2xl flex justify-between items-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <Folder size={20} />
                      </div>
                      <span className="font-medium text-stone-800">{cat}</span>
                    </div>
                    <ArrowRight size={16} className="text-stone-400" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeMenu === 'Laporan' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <h3 className="font-bold text-lg text-stone-800">Laporan Keuangan & Analisis</h3>
              </div>
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 size={32} className="text-stone-300" />
                </div>
                <h4 className="text-lg font-semibold text-stone-800 mb-2">Data Laporan Kosong</h4>
                <p className="text-stone-500 max-w-sm">Laporan komprehensif akan digenerate otomatis saat terdapat data transaksi yang cukup.</p>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Pengguna' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-stone-800">Manajemen Pengguna</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700">Undang Staff</button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center space-x-4">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="Admin" className="w-12 h-12 rounded-full bg-emerald-100" />
                    <div>
                      <div className="font-bold text-stone-800">Admin Prasmar</div>
                      <div className="text-sm text-stone-500">admin@kedaiprasmar.com</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wider">Super Admin</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Pengaturan' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden p-6 max-w-2xl">
              <h3 className="font-bold text-lg text-stone-800 mb-6">Pengaturan Kedai</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Nama Kedai</label>
                  <input type="text" defaultValue="Kedai Prasmar" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Alamat Lengkap</label>
                  <textarea defaultValue="Jl. Talas V No.153 Pondok Cabe Ilir, Tangerang Selatan" rows={3} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Jam Buka</label>
                    <input type="time" defaultValue="10:00" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Jam Tutup</label>
                    <input type="time" defaultValue="23:00" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div className="pt-4">
                  <button type="button" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 shadow-md">Simpan Perubahan</button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}