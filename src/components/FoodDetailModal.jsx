import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Store, ShieldCheck, Ticket, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FoodDetailModal({ 
  food, 
  onClose, 
  onClaim, 
  isSuccess, 
  onOpenMap, 
  userVouchers = [] 
}) {
  const [portions, setPortions] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [selectedVoucherId, setSelectedVoucherId] = useState('');

  // 1. Hitung harga dasar sebelum diskon
  const baseTotalPrice = food.kasePrice * portions;

  // 2. Cari voucher yang dipilih user
  const selectedVoucher = userVouchers.find(v => v.id.toString() === selectedVoucherId);

  // 3. Hitung besaran potongan diskon
  let discountAmount = 0;
  if (selectedVoucher) {
    if (selectedVoucher.discountType === 'fixed') {
      discountAmount = selectedVoucher.discountValue;
    } else if (selectedVoucher.discountType === 'percentage') {
      discountAmount = (baseTotalPrice * selectedVoucher.discountValue) / 100;
    }
  }

  // Total bayar akhir setelah diskon
  const finalTotalPrice = Math.max(0, baseTotalPrice - discountAmount);

  // Submit Klaim / Bayar
  const handleSubmitClaim = (e) => {
    e.preventDefault();
    onClaim(portions, {
      deliveryMethod,
      paymentMethod,
      appliedVoucher: selectedVoucher ? selectedVoucher.name : null,
      finalTotalPrice
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl my-8 relative"
      >
        {/* Tombol Close Modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/80 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Tampilan Sukses Checkout */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">Pesanan Berhasil Diselamatkan!</h3>
              <p className="text-xs text-gray-500">
                Terima kasih telah berkontribusi mengurangi limbah makanan. Cek status dan kode rescue milikmu di halaman Pesanan.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lihat Pesanan Saya</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            {/* Header / Gambar Makanan */}
            <div className="relative h-48 sm:h-56">
              <img
                src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="bg-emerald-500/90 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                    {food.category || 'Surplus'}
                  </span>
                  <h2 className="text-xl font-black">{food.name}</h2>
                </div>
              </div>
            </div>

            {/* Form Checkout */}
            <form onSubmit={handleSubmitClaim} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Detail Toko / Provider */}
              <div className="flex items-center justify-between p-3.5 bg-[#F4F5F8] rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <Store size={18} className="text-emerald-600" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{food.provider}</h4>
                    <p className="text-[10px] text-gray-500">{food.distance || 'Terdekat'}</p>
                  </div>
                </div>
                {onOpenMap && (
                  <button
                    type="button"
                    onClick={() => onOpenMap(food)}
                    className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin size={12} />
                    <span>Peta</span>
                  </button>
                )}
              </div>

              {/* Pilihan Jumlah Porsi */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">Jumlah Porsi</span>
                <div className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPortions(prev => Math.max(1, prev - 1))}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-black w-6 text-center">{portions}</span>
                  <button
                    type="button"
                    onClick={() => setPortions(prev => Math.min(food.portionsLeft || 10, prev + 1))}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Metode Pengambilan / Pengiriman */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Metode Pengambilan</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      deliveryMethod === 'pickup'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Ambil Sendiri (Pickup)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('instant')}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      deliveryMethod === 'instant'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Kurir Instan
                  </button>
                </div>
              </div>

              {/* Pilihan Metode Pembayaran */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#F4F5F8] border border-gray-200 text-xs font-semibold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="QRIS">QRIS / Instant E-Wallet</option>
                  <option value="GoPay / OVO">GoPay / OVO / ShopeePay</option>
                  <option value="Transfer Bank">Transfer Bank (BCA / Mandiri)</option>
                  <option value="Tunai Saat Pickup">Bayar Tunai saat Ambil</option>
                </select>
              </div>

              {/* ========================================================= */}
              {/* VOUCHER DISKON SECTION                                    */}
              {/* ========================================================= */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Ticket size={15} className="text-emerald-600" />
                  <span>Voucher Diskon KASE</span>
                </label>

                {userVouchers.length > 0 ? (
                  <select
                    value={selectedVoucherId}
                    onChange={(e) => setSelectedVoucherId(e.target.value)}
                    className="w-full bg-[#F4F5F8] border border-gray-200 text-xs font-semibold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">-- Tanpa Voucher --</option>
                    {userVouchers.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.discountType === 'fixed' ? `Potongan Rp ${v.discountValue.toLocaleString('id-ID')}` : `Diskon ${v.discountValue}%`})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-[11px] text-gray-400 italic bg-gray-50 p-3 rounded-2xl">
                    Belum ada voucher. Tukarkan Eco-Points kamu di menu Profil!
                  </p>
                )}
              </div>

              {/* Ringkasan Total Biaya & Diskon */}
              <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({portions} porsi)</span>
                  <span>Rp {baseTotalPrice.toLocaleString('id-ID')}</span>
                </div>
                {selectedVoucher && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Diskon ({selectedVoucher.name})</span>
                    <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-gray-900 text-sm pt-2 border-t border-gray-200">
                  <span>Total Bayar</span>
                  <span className="text-emerald-600">Rp {finalTotalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Tombol Konfirmasi Bayar */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} />
                <span>Konfirmasi & Selamatkan Makanan</span>
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}