import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useAppContext();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-300 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-stone-500 mb-8 text-center max-w-md">Anda belum menambahkan hidangan apapun ke dalam keranjang. Yuk jelajahi menu kami!</p>
        <Link to="/menu" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors">
          Lihat Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Keranjang Belanja</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id} 
                className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex gap-4 items-center"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800">{item.name}</h3>
                  <p className="text-emerald-600 font-medium">Rp {item.price.toLocaleString('id-ID')}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3 bg-stone-50 rounded-lg p-1 border border-stone-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-white rounded-md shadow-sm transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-white rounded-md shadow-sm transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-2 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 sticky top-28">
              <h2 className="text-xl font-bold text-stone-800 mb-6">Ringkasan</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Total Item</span>
                  <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between font-bold text-lg text-stone-800">
                  <span>Total Pembayaran</span>
                  <span className="text-emerald-600">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center shadow-lg shadow-emerald-900/20"
              >
                Lanjut Pembayaran <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
