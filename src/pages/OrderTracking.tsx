import { Check, ChefHat, Clock3, PackageCheck, ShoppingBag, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext, OrderStatus } from '../context/AppContext';

const steps: { status: OrderStatus; title: string; description: string; icon: typeof Check }[] = [
  { status: 'received', title: 'Pesanan diterima', description: 'Pesanan Anda sudah masuk ke sistem kami.', icon: ShoppingBag },
  { status: 'confirmed', title: 'Pesanan dikonfirmasi', description: 'Pembayaran dan detail pesanan telah dikonfirmasi.', icon: Check },
  { status: 'preparing', title: 'Sedang disiapkan', description: 'Chef sedang menyiapkan hidangan Anda.', icon: ChefHat },
  { status: 'ready', title: 'Siap diambil / dikirim', description: 'Pesanan sudah selesai dan siap dinikmati.', icon: PackageCheck },
  { status: 'completed', title: 'Pesanan selesai', description: 'Terima kasih telah memesan di Kedai Prasmar.', icon: Truck },
];

export default function OrderTracking() {
  const { currentOrder } = useAppContext();
  const currentIndex = currentOrder ? steps.findIndex((step) => step.status === currentOrder.status) : -1;

  if (!currentOrder) {
    return (
      <div className="min-h-[65vh] bg-[#111827] px-4 py-20 text-center text-white">
        <Clock3 className="mx-auto mb-5 text-emerald-300" size={52} />
        <h1 className="mb-3 text-3xl font-bold">Belum ada pesanan aktif</h1>
        <p className="mx-auto mb-8 max-w-md text-slate-300">Pesanan yang sudah dibayar akan muncul di halaman pelacakan ini.</p>
        <Link to="/menu" className="inline-flex rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500">Pesan Sekarang</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Live Order Tracking</p>
            <h1 className="text-3xl font-bold sm:text-4xl">Lacak Pesanan Anda</h1>
            <p className="mt-2 text-slate-300">Order #{currentOrder.id} • diperbarui otomatis setiap beberapa detik</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Status: <strong>{steps[currentIndex]?.title}</strong>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-3xl border border-white/10 bg-[#1f2937] p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Progress Pesanan</h2>
              <span className="flex items-center gap-2 text-xs text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> LIVE</span>
            </div>
            <div className="space-y-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const active = index <= currentIndex;
                return (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${active ? 'border-emerald-300 bg-emerald-500 text-white' : 'border-white/15 bg-white/5 text-slate-500'}`}>
                        <Icon size={19} />
                      </div>
                      {index < steps.length - 1 && <div className={`mt-2 h-8 w-0.5 ${index < currentIndex ? 'bg-emerald-400' : 'bg-white/10'}`} />}
                    </div>
                    <div className="pt-1">
                      <h3 className={active ? 'font-semibold text-white' : 'font-semibold text-slate-500'}>{step.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-[#1f2937] p-5 shadow-2xl sm:p-7">
            <h2 className="mb-5 text-xl font-semibold">Ringkasan</h2>
            <div className="space-y-3 border-b border-white/10 pb-5">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-300">{item.name} × {item.quantity}</span>
                  <span className="text-white">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-5 text-lg font-bold">
              <span>Total</span>
              <span className="text-emerald-300">Rp {currentOrder.total.toLocaleString('id-ID')}</span>
            </div>
            <p className="mt-4 text-xs text-slate-400">Pembayaran: {currentOrder.paymentMethod.toUpperCase()}</p>
            <Link to="/menu" className="mt-6 block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10">Pesan Lagi</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
