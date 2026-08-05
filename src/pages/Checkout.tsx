import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Building2, QrCode, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cartTotal, cart } = useAppContext();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tax = cartTotal * 0.11;
  const total = cartTotal + tax;

  const handlePayment = () => {
    if (!paymentMethod) return;
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        // Here you would clear cart in a real app
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Keranjang Kosong</h2>
        <button onClick={() => navigate('/menu')} className="text-emerald-600 hover:underline">Kembali ke Menu</button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Pembayaran Berhasil!</h2>
        <p className="text-stone-600 mb-8 max-w-md">
          Terima kasih atas pesanan Anda. Pesanan sedang diproses dan akan segera disiapkan.
        </p>
        <div className="animate-pulse text-sm text-stone-400">Mengalihkan ke dashboard...</div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Pilih Metode Pembayaran</h1>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-stone-100 bg-stone-50/50">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cart.length} item)</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Pajak (11%)</span>
                <span>Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-lg text-emerald-700">
                <span>Total Pembayaran</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Metode Pembayaran</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'qris', name: 'QRIS', icon: <QrCode size={24} />, desc: 'Scan dengan e-wallet/banking' },
                { id: 'transfer', name: 'Transfer Bank', icon: <Building2 size={24} />, desc: 'BCA, Mandiri, BNI, BRI' },
                { id: 'ewallet', name: 'E-Wallet', icon: <Wallet size={24} />, desc: 'GoPay, OVO, Dana, ShopeePay' },
                { id: 'card', name: 'Kartu Kredit/Debit', icon: <CreditCard size={24} />, desc: 'Visa, Mastercard' },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start space-x-4 ${
                    paymentMethod === method.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-stone-100 hover:border-emerald-200 bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${paymentMethod === method.id ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-600'}`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800">{method.name}</h3>
                    <p className="text-xs text-stone-500 mt-1">{method.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={!paymentMethod || isProcessing}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          ) : (
            `Bayar Rp ${total.toLocaleString('id-ID')}`
          )}
        </button>

      </div>
    </div>
  );
}
