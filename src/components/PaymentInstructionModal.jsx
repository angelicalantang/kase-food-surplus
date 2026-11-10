import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Wallet, Banknote, CheckCircle2, ShieldCheck, Loader2, ExternalLink } from 'lucide-react';

export default function PaymentInstructionModal({ food, portions, paymentMethod, deliveryMethod, onClose, onSuccess }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const totalPrice = food.kasePrice * portions;

  const handleVerifyPayment = () => {
    setIsVerifying(true);

    // JIKA PILIH KURIR INSTAN: Otomatis direct ke aplikasi Gojek / Grab
    if (deliveryMethod === 'instant') {
      setTimeout(() => {
        setIsVerifying(false);
        // Coba buka aplikasi Gojek di HP, jika di laptop akan fallback ke website Gojek
        window.location.href = 'gojek://gosend'; 
        setTimeout(() => {
          // Fallback jika app tidak terbuka (misal di laptop)
          window.open('https://www.gojek.com/gosend/', '_blank');
        }, 1000);
        onSuccess();
      }, 1000);
      return;
    }

    // Simulasi verifikasi standar untuk Pickup / Cash / E-Wallet
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

        {/* Body Konten */}
        <div className="p-5 space-y-4 overflow-y-auto text-center flex-1">
          
          {/* Total Tagihan */}
          <div className="bg-[#F4F5F8] p-3 rounded-2xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Tagihan Rescue</span>
            <h3 className="text-xl font-black text-gray-900 mt-0.5">Rp {totalPrice.toLocaleString('id-ID')}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
              {deliveryMethod === 'pickup' ? '📦 Ambil Sendiri ke Toko' : '🏍️ Diantar via Kurir Instan (Ojol)'}
            </span>
          </div>

          {/* QRIS - Gambar QR Code Nyata dari Online CDN */}
          {paymentMethod === 'qris' && (
            <div className="space-y-3">
              <div className="bg-white p-3 border-2 border-dashed border-emerald-400 rounded-3xl inline-block shadow-md bg-emerald-50/20">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KASE-FOOD-RESCUE-PAYMENT" 
                  alt="QRIS Pembayaran KASE" 
                  className="w-44 h-44 object-contain rounded-2xl mx-auto shadow-sm border border-gray-100"
                />
              </div>
              <p className="text-xs text-gray-500 px-2 font-medium">
                Buka aplikasi m-banking atau e-wallet (BCA, GoPay, OVO, DANA) lalu scan QR Code di atas.
              </p>
            </div>
          )}

          {paymentMethod === 'ewallet' && (
            <div className="space-y-3 py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Wallet size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">Pembayaran E-Wallet Instan</h4>
                <p className="text-xs text-gray-500 px-4">
                  Klik tombol konfirmasi di bawah untuk simulasi pemotongan saldo e-wallet Anda.
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
                  <p className="text-[11px] text-amber-700">Tunjukkan bukti pesanan saat tiba di lokasi merchant.</p>
                </div>
              </div>
            </div>
          )}

          {deliveryMethod === 'instant' && (
            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-700 font-medium">
              💡 Setelah diklik, sistem akan otomatis mengarahkan ke aplikasi GoSend / Ojol untuk jemput makanan.
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Transaksi Terverifikasi KASE Rescue</span>
          </div>

        </div>

        {/* Footer Tombol Konfirmasi */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 backdrop-blur shrink-0">
          <button
            onClick={handleVerifyPayment}
            disabled={isVerifying}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isVerifying ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memproses Pembayaran & Ojol...</span>
              </>
            ) : (
              <>
                {deliveryMethod === 'instant' ? <ExternalLink size={16} /> : <CheckCircle2 size={16} />}
                <span>
                  {deliveryMethod === 'instant' ? 'Bayar & Panggil Kurir GoSend' : 'Saya Sudah Membayar / Konfirmasi'}
                </span>
              </>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}