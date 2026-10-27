import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Wallet, Banknote, Bike, ShoppingBag, Copy, Check, ArrowRight } from 'lucide-react';
import PaymentInstructionModal from './PaymentInstructionModal'; // <-- Impor modal instruksi pembayaran

export default function CheckoutModal({ food, portions, onClose, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [copied, setCopied] = useState(false);
  const [isInstructionOpen, setIsInstructionOpen] = useState(false); // <-- State buka modal pembayaran

  const totalPrice = food.kasePrice * portions;
  const originalTotalPrice = food.originalPrice * portions;
  const saving = originalTotalPrice - totalPrice;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(food.providerAddress || food.provider);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToPayment = () => {
    // Membuka modal instruksi pembayaran alih-alih langsung sukses
    setIsInstructionOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsInstructionOpen(false);
    onConfirm({ paymentMethod, deliveryMethod });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header Modal */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Checkout Rescue</span>
              <h2 className="text-lg font-black text-gray-900">Konfirmasi Penyelamatan</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 space-y-6 overflow-y-auto">
            
            {/* Ringkasan Makanan */}
            <div className="flex items-center gap-4 bg-[#F4F5F8] p-4 rounded-2xl">
              <img src={food.image} alt={food.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{food.provider}</span>
                <h4 className="text-xs font-bold text-gray-900 truncate">{food.name}</h4>
                <p className="text-xs font-semibold text-emerald-600 mt-0.5">{portions} Porsi • Rp {totalPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>

            {/* Metode Pengantaran */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Metode Pengantaran</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                    deliveryMethod === 'pickup' 
                      ? 'border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-500/20' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <ShoppingBag size={20} className={deliveryMethod === 'pickup' ? 'text-emerald-600' : 'text-gray-400'} />
                  <div>
                    <div className="text-xs font-bold text-gray-900">Ambil Sendiri</div>
                    <div className="text-[10px] text-gray-500">Datang langsung ke toko</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('instant')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                    deliveryMethod === 'instant' 
                      ? 'border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-500/20' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Bike size={20} className={deliveryMethod === 'instant' ? 'text-emerald-600' : 'text-gray-400'} />
                  <div>
                    <div className="text-xs font-bold text-gray-900">Kurir Instan</div>
                    <div className="text-[10px] text-gray-500">Gojek / GrabExpress</div>
                  </div>
                </button>
              </div>

              {/* Info alamat toko jika pilih kurir instan */}
              {deliveryMethod === 'instant' && (
                <div className="bg-amber-50 border border-amber-200/60 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="block font-bold text-amber-900 text-[11px]">Alamat Toko (Tujuan Pick-up Kurir):</span>
                    <span className="text-amber-700 text-[10px]">{food.providerAddress || `Jl. Menuju ${food.provider}, No. 45`}</span>
                  </div>
                  <button 
                    onClick={handleCopyAddress}
                    className="bg-white hover:bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl font-bold text-[10px] shadow-sm flex items-center gap-1 transition-all shrink-0 cursor-pointer"
                  >
                    {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copied ? 'Disalin!' : 'Salin Alamat'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Metode Pembayaran */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Metode Pembayaran</label>
              <div className="space-y-2">
                {[
                  { id: 'qris', name: 'QRIS (Instant QR Code)', desc: 'Scan dengan BCA, GoPay, OVO, DANA, dll', icon: QrCode },
                  { id: 'ewallet', name: 'E-Wallet Langsung', desc: 'GoPay / OVO / ShopeePay', icon: Wallet },
                  { id: 'cash', name: 'Cash (Bayar di Tempat)', desc: 'Bayar tunai saat mengambil makanan di toko', icon: Banknote }
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                        paymentMethod === item.id 
                          ? 'border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-500/20' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${paymentMethod === item.id ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">{item.name}</div>
                          <div className="text-[10px] text-gray-500">{item.desc}</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === item.id ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
                        {paymentMethod === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rincian Harga */}
            <div className="bg-[#F4F5F8] p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({portions} porsi)</span>
                <span>Rp {originalTotalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Diskon Food Rescue</span>
                <span>- Rp {saving.toLocaleString('id-ID')}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-extrabold text-sm text-gray-900">
                <span>Total Pembayaran</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

          </div>

          {/* Footer Tombol Lanjut Pembayaran */}
          <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-1/3 py-3 rounded-2xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-100 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleProceedToPayment}
              className="w-2/3 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      </div>

      {/* Modal Instruksi Pembayaran */}
      <AnimatePresence>
        {isInstructionOpen && (
          <PaymentInstructionModal 
            food={food}
            portions={portions}
            paymentMethod={paymentMethod}
            deliveryMethod={deliveryMethod}
            onClose={() => setIsInstructionOpen(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}