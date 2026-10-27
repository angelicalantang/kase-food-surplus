import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, QrCode, Wallet, Banknote, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

export default function PaymentInstructionModal({ food, portions, paymentMethod, deliveryMethod, onClose, onSuccess }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const totalPrice = food.kasePrice * portions;

  const handleVerifyPayment = () => {
    setIsVerifying(true);
    // Simulasi jeda verifikasi pembayaran bank/gateway (1.5 detik)
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
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
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Konten Instruksi */}
        <div className="p-6 space-y-6 overflow-y-auto text-center">
          
          {/* Total Tagihan */}
          <div className="bg-[#F4F5F8] p-4 rounded-2xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Tagihan Rescue</span>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">Rp {totalPrice.toLocaleString('id-ID')}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
              {deliveryMethod === 'pickup' ? '📦 Ambil Sendiri ke Toko' : '🏍️ Diantar via Kurir Instan'}
            </span>
          </div>

          {/* Konten Berdasarkan Metode Pembayaran */}
          {paymentMethod === 'qris' && (
            <div className="space-y-4">
              <div className="bg-white p-4 border-2 border-dashed border-gray-200 rounded-3xl inline-block shadow-sm">
                {/* Mockup QR Code */}
                <div className="w-48 h-48 bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-white p-4 relative overflow-hidden group">
                  <QrCode size={96} className="text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold mt-2 text-gray-300">KASE SECURE QRIS</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 px-4">
                Buka aplikasi m-banking atau e-wallet (BCA, GoPay, OVO, DANA) lalu scan QR code di atas.
              </p>
            </div>
          )}

          {paymentMethod === 'ewallet' && (
            <div className="space-y-4 py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Wallet size={32} />
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
            <div className="space-y-4 py-2 text-left bg-amber-50/60 border border-amber-200/60 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Banknote size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Bayar Tunai di Kasir Toko</h4>
                  <p className="text-[11px] text-amber-700">Tunjukkan kode pesanan saat tiba di merchant.</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Transaksi Aman & Terverifikasi KASE Rescue</span>
          </div>

        </div>

        {/* Footer Tombol Konfirmasi */}
        <div className="p-5 border-t border-gray-100 bg-gray-50/50">
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