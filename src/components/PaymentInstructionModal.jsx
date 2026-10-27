import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Wallet, Banknote, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

export default function PaymentInstructionModal({ food, portions, paymentMethod, deliveryMethod, onClose, onSuccess }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const totalPrice = food.kasePrice * portions;

  const handleVerifyPayment = () => {
    setIsVerifying(true);
    // Simulasi jeda verifikasi pembayaran (1.5 detik)
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess(); // Memicu transisi ke layar sukses setelah tombol diklik
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Selesaikan Pembayaran</span>
            <h2 className="text-base font-black text-gray-900">
              {paymentMethod === 'qris' && 'Scan QRIS Pembayaran'}
              {paymentMethod === 'ewallet' && 'Konfirmasi E-Wallet'}
              {paymentMethod === 'cash' && 'Instruksi Bayar Tunai (Cash)'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body Konten Instruksi */}
        <div className="p-5 space-y-4 overflow-y-auto text-center flex-1">
          
          {/* Total Tagihan */}
          <div className="bg-[#F4F5F8] p-3 rounded-2xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Tagihan Rescue</span>
            <h3 className="text-xl font-black text-gray-900 mt-0.5">Rp {totalPrice.toLocaleString('id-ID')}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
              {deliveryMethod === 'pickup' ? '📦 Ambil Sendiri ke Toko' : '🏍️ Diantar via Kurir Instan'}
            </span>
          </div>

          {/* Konten Berdasarkan Metode Pembayaran */}
          {paymentMethod === 'qris' && (
            <div className="space-y-3">
              <div className="bg-white p-3 border-2 border-dashed border-emerald-300 rounded-3xl inline-block shadow-sm bg-emerald-50/20">
                <img 
                  src="/qris.png" 
                  alt="QRIS KASE Rescue" 
                  className="w-40 h-40 object-contain rounded-2xl mx-auto shadow-sm"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none' }} className="w-40 h-40 bg-gray-900 rounded-2xl flex-col items-center justify-center text-white p-3 mx-auto text-center">
                  <span className="text-xs text-amber-400 font-bold mb-1">qris.png Belum Ada</span>
                  <span className="text-[10px] text-gray-300">Masukkan file qris.png ke folder public.</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 px-2">
                Buka aplikasi m-banking atau e-wallet lalu scan QR code di atas.
              </p>
            </div>
          )}

          {paymentMethod === 'ewallet' && (
            <div className="space-y-3 py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Wallet size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">Hubungkan ke Aplikasi E-Wallet</h4>
                <p className="text-xs text-gray-500 px-4">
                  Klik tombol konfirmasi di bawah untuk memproses pembayaran otomatis saldo e-wallet Anda.
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'cash' && (
            <div className="space-y-3 py-1 text-left bg-amber-50/60 border border-amber-200/60 p-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Banknote size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Bayar Tunai di Kasir Toko</h4>
                  <p className="text-[11px] text-amber-700">Tunjukkan kode pesanan saat tiba di merchant.</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Transaksi Aman & Terverifikasi KASE Rescue</span>
          </div>

        </div>

        {/* Footer Tombol Konfirmasi (Sticky di bawah, dijamin nampak) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 backdrop-blur shrink-0">
          <button
            onClick={handleVerifyPayment}
            disabled={isVerifying}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isVerifying ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memverifikasi Pembayaran...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>Saya Sudah Membayar / Konfirmasi</span>
              </>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}