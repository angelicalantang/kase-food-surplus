import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Award, ShoppingBag, Coins, Gift } from 'lucide-react';

export default function ProfilePage({ userStats, savedCount, currentUser, onOpenMap, orderHistory = [], onUpdateOrderStatus, onRedeemVoucher, userVouchers = [] }) {
  
  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header Kartu Profil & Gelar Pahlawan */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-soft border border-black/[0.04] flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500/10 to-transparent w-48 h-full pointer-events-none"></div>

        <div className="w-24 h-24 rounded-full bg-emerald-500 text-white font-black text-3xl flex items-center justify-center shadow-lg shrink-0">
          {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{currentUser?.name || 'Rescue Hero'}</h1>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider self-center sm:self-auto flex items-center gap-1 shadow-xs">
              <Award size={12} className="text-emerald-600" />
              <span>{userStats.ecoTitle || 'Food Guardian (Lv. 2)'}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-1.5">
            <Mail size={14} className="text-gray-400" />
            <span>{currentUser?.email || 'hero@kase.id'}</span>
          </p>

          {/* Saldo Poin Reward */}
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
            <div className="bg-amber-50 border border-amber-200/60 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xs">
              <Coins size={18} className="text-amber-500" />
              <div className="text-left">
                <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider block">Saldo Eco-Points</span>
                <span className="text-sm font-black text-amber-900">{userStats.ecoPoints || 0} Poin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistik 3 Kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-soft border border-black/[0.04] space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Makanan Diselamatkan</span>
          <div className="text-xl font-black text-gray-900">{userStats.mealsSaved} Porsi</div>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-soft border border-black/[0.04] space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Limbah Dicegah</span>
          <div className="text-xl font-black text-emerald-600">{userStats.wastePreventedKg} kg</div>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-soft border border-black/[0.04] space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hemat Biaya</span>
          <div className="text-xl font-black text-amber-600">Rp {(userStats.moneySavedRp || 0).toLocaleString('id-ID')}</div>
        </div>
      </div>

      {/* Katalog Tukar Poin dengan Voucher Diskon */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-soft border border-black/[0.04] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-gray-900">Tukar Eco-Points & Voucher</h3>
            <p className="text-xs text-gray-500">Gunakan poin dari aksi penyelamatanmu untuk mendapatkan diskon belanja!</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Gift size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Voucher 1 */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-3xl shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Gift size={100} />
            </div>
            <div>
              <span className="bg-white/20 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Diskon Makanan</span>
              <h4 className="text-base font-black mt-2">Voucher Potongan Rp 10.000</h4>
              <p className="text-xs text-emerald-100 mt-1">Berlaku untuk semua merchant makanan surplus.</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs font-black bg-white/10 px-3 py-1 rounded-xl">300 Poin</span>
              <button
                onClick={() => onRedeemVoucher('Voucher Potongan Rp 10.000', 300, 'fixed', 10000)}
                className="bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-extrabold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Tukar Voucher
              </button>
            </div>
          </div>

          {/* Voucher 2 */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-3xl shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Gift size={100} />
            </div>
            <div>
              <span className="bg-white/20 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Diskon Spesial</span>
              <h4 className="text-base font-black mt-2">Voucher Diskon 20%</h4>
              <p className="text-xs text-amber-100 mt-1">Maksimal potongan harga hingga Rp 25.000.</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs font-black bg-white/10 px-3 py-1 rounded-xl">500 Poin</span>
              <button
                onClick={() => onRedeemVoucher('Voucher Diskon 20%', 500, 'percentage', 20)}
                className="bg-white text-amber-800 hover:bg-amber-50 text-xs font-extrabold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Tukar Voucher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}