import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle2, Bike, Store, ArrowRight, QrCode } from 'lucide-react';

export default function OrdersPage({ orderHistory = [], onUpdateOrderStatus, onBrowseClick }) {
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pesanan Selesai':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Dalam Perjalanan Kurir':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      default:
        return 'bg-blue-100 text-blue-700 border border-blue-200'; // Menunggu Pickup
    }
  };

  const activeOrders = orderHistory.filter(order => order.status !== 'Pesanan Selesai');
  const pastOrders = orderHistory.filter(order => order.status === 'Pesanan Selesai');

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header Halaman */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-soft border border-black/[0.04] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Aktivitas Rescue</span>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">Daftar Pesanan & Riwayat</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
          <ShoppingBag size={24} />
        </div>
      </div>

      {/* Pesanan Aktif (Sedang Berjalan) */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-gray-900 px-2 uppercase tracking-wide flex items-center gap-2">
          <Clock size={16} className="text-emerald-600" />
          <span>Pesanan Aktif ({activeOrders.length})</span>
        </h3>

        {activeOrders.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.map(order => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[2.5rem] shadow-soft border-2 border-emerald-500/20 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-600 text-white font-black text-xs px-3.5 py-1.5 rounded-xl tracking-wider shadow-sm">
                      {order.orderCode}
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400">{order.date}</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-gray-900">{order.foodName}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Store size={14} className="text-gray-400" />
                      <span>{order.provider}</span> • <span className="font-semibold text-emerald-600">{order.portions} Porsi</span>
                    </p>
                    <p className="text-[11px] text-gray-500 pt-1">
                      Metode: <span className="font-bold text-gray-700">{order.paymentMethod}</span> ({order.deliveryMethod === 'pickup' ? 'Ambil Sendiri' : 'Kurir Instan'})
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Bayar</span>
                      <div className="text-base font-black text-gray-900">Rp {order.totalPrice.toLocaleString('id-ID')}</div>
                    </div>

                    {/* Tombol simulasi partner mengubah status / selesai */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'Pesanan Selesai')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={14} />
                        <span>Selesaikan Pesanan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-8 text-center space-y-3 shadow-soft border border-black/[0.04]">
            <p className="text-xs font-bold text-gray-500">Tidak ada pesanan aktif saat ini.</p>
          </div>
        )}
      </div>

      {/* Riwayat Selesai (Past Orders) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-black text-gray-900 px-2 uppercase tracking-wide flex items-center gap-2">
          <CheckCircle2 size={16} className="text-gray-400" />
          <span>Riwayat Selesai ({pastOrders.length})</span>
        </h3>

        {pastOrders.length > 0 ? (
          <div className="space-y-3">
            {pastOrders.map(order => (
              <div 
                key={order.id}
                className="bg-white p-5 rounded-3xl shadow-soft border border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-80"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-900">{order.foodName}</span>
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-lg">
                      {order.orderCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{order.provider} • Rp {order.totalPrice.toLocaleString('id-ID')}</p>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full self-start sm:self-auto">
                  Selesai Diselamatkan
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-10 text-center space-y-4 shadow-soft border border-black/[0.04]">
            <ShoppingBag size={36} className="mx-auto text-gray-300" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-gray-800">Belum ada riwayat pesanan selesai.</h4>
              <p className="text-[11px] text-gray-400">Yuk cari makanan surplus terdekat dan selamatkan sekarang!</p>
            </div>
            <button
              onClick={onBrowseClick}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Jelajahi Makanan</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}