import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [googleAuthStep, setGoogleAuthStep] = useState<'none' | 'select' | 'email' | 'password'>('none');
  const [googleEmail, setGoogleEmail] = useState('');
  const { login } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    onClose();
  };

  const handleGoogleLogin = () => {
    setGoogleAuthStep('select');
  };

  const selectGoogleAccount = () => {
    // Simulate logging in with selected Google account
    login();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative min-h-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <AnimatePresence mode="wait">
          {googleAuthStep === 'select' ? (
            <motion.div
              key="google-chooser"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              <button 
                onClick={() => setGoogleAuthStep('none')}
                className="mb-6 text-stone-500 hover:text-stone-800 flex items-center text-sm font-medium transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" /> Kembali
              </button>
              
              <div className="text-center mb-8">
                <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <h2 className="text-2xl font-semibold text-stone-800 mb-2">Pilih akun</h2>
                <p className="text-stone-500 text-sm">untuk melanjutkan ke Kedai Prasmar</p>
              </div>

              <div className="space-y-2">
                <button onClick={selectGoogleAccount} className="w-full flex items-center p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-200">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Budi" alt="Budi" className="w-10 h-10 rounded-full bg-emerald-100 mr-4" />
                  <div className="text-left">
                    <div className="font-medium text-stone-800 text-sm">Budi Santoso</div>
                    <div className="text-xs text-stone-500">budi.santoso@gmail.com</div>
                  </div>
                </button>
                <button onClick={selectGoogleAccount} className="w-full flex items-center p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-200">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Siti" alt="Siti" className="w-10 h-10 rounded-full bg-amber-100 mr-4" />
                  <div className="text-left">
                    <div className="font-medium text-stone-800 text-sm">Siti Aminah</div>
                    <div className="text-xs text-stone-500">siti.aminah@gmail.com</div>
                  </div>
                </button>
                <div className="border-t border-stone-100 my-2"></div>
                <button onClick={() => setGoogleAuthStep('email')} className="w-full flex items-center p-3 hover:bg-stone-50 rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-stone-600 bg-stone-100 mr-4">
                    <UserIcon size={18} />
                  </div>
                  <div className="text-left font-medium text-stone-700 text-sm">
                    Gunakan akun lain
                  </div>
                </button>
              </div>
            </motion.div>
          ) : googleAuthStep === 'email' ? (
            <motion.div
              key="google-email"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              <button 
                onClick={() => setGoogleAuthStep('select')}
                className="mb-6 text-stone-500 hover:text-stone-800 flex items-center text-sm font-medium transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" /> Kembali
              </button>
              
              <div className="text-center mb-8">
                <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <h2 className="text-2xl font-semibold text-stone-800 mb-2">Login</h2>
                <p className="text-stone-500 text-sm">Gunakan Akun Google Anda</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setGoogleAuthStep('password'); }} className="space-y-6">
                <div>
                  <input 
                    type="email" 
                    required 
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full bg-transparent border border-stone-300 rounded-lg py-3.5 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    placeholder="Email atau nomor telepon" 
                  />
                  <div className="mt-2 text-left">
                    <button type="button" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Lupa email?</button>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button type="button" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Buat akun
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Selanjutnya
                  </button>
                </div>
              </form>
            </motion.div>
          ) : googleAuthStep === 'password' ? (
            <motion.div
              key="google-password"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              <button 
                onClick={() => setGoogleAuthStep('email')}
                className="mb-6 text-stone-500 hover:text-stone-800 flex items-center text-sm font-medium transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" /> Kembali
              </button>
              
              <div className="text-center mb-8">
                <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <h2 className="text-2xl font-semibold text-stone-800 mb-2">Selamat datang</h2>
                <div className="inline-flex items-center space-x-2 border border-stone-200 rounded-full py-1 px-3 mt-1">
                  <UserIcon size={14} className="text-stone-500" />
                  <span className="text-sm font-medium text-stone-700">{googleEmail}</span>
                </div>
              </div>

              <form onSubmit={selectGoogleAccount} className="space-y-6">
                <div>
                  <input 
                    type="password" 
                    required 
                    autoFocus
                    className="w-full bg-transparent border border-stone-300 rounded-lg py-3.5 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    placeholder="Masukkan sandi Anda" 
                  />
                  <div className="mt-2 text-left flex items-center">
                    <input type="checkbox" id="show-pwd" className="mr-2" />
                    <label htmlFor="show-pwd" className="text-stone-600 text-sm">Tampilkan sandi</label>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button type="button" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Lupa sandi?
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Selanjutnya
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="main-auth"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-2">
                  {isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}
                </h2>
                <p className="text-stone-500 text-sm">
                  {isLogin ? 'Masuk untuk melanjutkan pesanan Anda' : 'Daftar untuk menikmati berbagai fitur menarik'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs font-medium text-stone-600 mb-1.5 ml-1">Nama Lengkap</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                        <UserIcon size={18} />
                      </div>
                      <input type="text" required className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Nama Anda" />
                    </div>
                  </motion.div>
                )}
                
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5 ml-1">Alamat Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                      <Mail size={18} />
                    </div>
                    <input type="email" required className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="email@contoh.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5 ml-1">Kata Sandi</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                      <Lock size={18} />
                    </div>
                    <input type="password" required className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="••••••••" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-900/20 mt-2 relative overflow-hidden group">
                  <span className="relative z-10">{isLogin ? 'Masuk Akun' : 'Daftar Akun'}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                </button>
              </form>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-stone-400">Atau masuk dengan</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center py-2.5 border border-stone-200 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all group">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-medium text-stone-700">Google</span>
                </button>
                <button type="button" onClick={() => { login(); onClose(); }} className="flex items-center justify-center py-2.5 border border-stone-200 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all group">
                  <svg className="w-5 h-5 mr-2 text-[#1877F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-stone-700">Facebook</span>
                </button>
              </div>

              <div className="text-center text-sm text-stone-600">
                {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
                <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                  {isLogin ? "Daftar sekarang" : "Masuk di sini"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}