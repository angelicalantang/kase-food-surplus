import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, Plus, Package, DollarSign, Leaf, Star, 
  Clock, CheckCircle, Trash2, Edit3, AlertCircle, ShoppingBag, 
  Wallet, ArrowUpRight, History
} from 'lucide-react';

export default function ProviderPage({ 
  foodItems = [], 
  onOpenListModal, 
  onUpdateFood, 
  onDeleteFood, 
  currentUser, 
  orderHistory = [], 
  onUpdateOrderStatus 
}) {
  // State navigasi tab di sisi merchant ('inventory' atau 'financial')
  const [activeTab, setActiveTab] = useState('inventory');

  // State untuk edit porsi cepat
  const [editingId, setEditingId] = useState(null);
  const [tempPortions, setTempPortions] = useState(0);

  // State Simulasi Saldo & Riwayat Payout
  const [merchantBalance, setMerchantBalance] = useState({
    readyToWithdraw: 245000,
    inEscrow: 54000,
    totalWithdrawn: 1200000
  });

  const [payoutHistory, setPayoutHistory] = useState([
    { id: 1, date: '24 Okt 2026', amount: 450000, bank: 'BCA •••• 8821', status: 'Berhasil' },
    { id: 2, date: '10 Okt 2026', amount: 750000, bank: 'BCA •••• 8821', status: 'Berhasil' }
  ]);

  const myStoreName = currentUser?.name ? `Toko ${currentUser.name}` : "Bakery & Resto Berkah";
  const myFoodItems = foodItems;

  const totalPortionsSold = orderHistory.reduce((acc, order) => acc + (order.portions || 1), 12);
  const estimatedRevenue = orderHistory.reduce((acc, order) => acc + (order.totalPrice || 15000), 180000);
  const wastePrevented = (totalPortionsSold * 0.4).toFixed(1);

  const handleSavePortions = (id) => {
    const targetItem = foodItems.find(item => item.id === id);
    if (targetItem) {
      onUpdateFood({ ...targetItem, portionsLeft: parseInt(tempPortions) || 0 });
    }
    setEditingId(null);
  };

  const handleWithdraw = () => {
    if (merchantBalance.readyToWithdraw <= 0) {
      alert("Maaf, saldo siap cair kamu saat ini masih kosong.");
      return;
    }

    if (window.confirm(`Tarik saldo sebesar Rp ${merchantBalance.readyToWithdraw.toLocaleString('id-ID')} ke rekening terdaftar?`)) {
      const newPayout = {
        id: Date.now(),
        date: 'Hari ini',
        amount: merchantBalance.readyToWithdraw,
        bank: 'BCA •••• 8821',
        status: 'Diproses'
      };

      setPayoutHistory(prev => [newPayout, ...prev]);
      setMerchantBalance(prev => ({
        ...prev,
        totalWithdrawn: prev.totalWithdrawn + prev.readyToWithdraw,
        readyToWithdraw: 0
      }));
      alert("Permintaan penarikan dana berhasil diajukan! Dana akan masuk ke rekening dalam 1x24 jam. 💸");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* 1. HEADER TOKO & STATUS AKTIF */}
      <div className="bg-gradient-to-r from-[#1E293B] to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0">
            <Store size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{myStoreName}</h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-0.5 rounded-full text-xs font-bold">
                Mitra Aktif
              </span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm">
              Kelola inventaris makanan berlebih, pantau pesanan live, dan atur keuangan tokomu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto z-10">
          <button
            onClick={onOpenListModal}
            className="flex-1 md:flex-initial bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus size={18} />
            <span>+ Jual Surplus Baru</span>
          </button>
        </div>
      </div>

      {/* 2. RINGKASAN STATISTIK UTAMA (QUICK STATS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShoppingBag size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B]">{totalPortionsSold}</div>
            <div className="text-xs font-bold text-gray-400">Porsi Terjual</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#1E293B]">Rp {estimatedRevenue.toLocaleString('id-ID')}</div>
            <div className="text-xs font-bold text-gray-400">Pendapatan Surplus</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Leaf size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B]">{wastePrevented} kg</div>
            <div className="text-xs font-bold text-gray-400">Limbah Dicegah</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Star size={24} className="fill-purple-500 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B]">4.9</div>
            <div className="text-xs font-bold text-gray-400">Rating Toko</div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGASI TAB MENU MERCHANT (Inventaris & Keuangan) */}
      <div className="flex border-b border-gray-200 gap-8">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-4 font-black text-sm transition-all relative cursor-pointer ${
            activeTab === 'inventory' 
              ? 'text-amber-600 border-b-2 border-amber-500' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          📦 Manajemen Stok & Pesanan Live
        </button>
        <button
          onClick={() => setActiveTab('financial')}
          className={`pb-4 font-black text-sm transition-all relative cursor-pointer ${
            activeTab === 'financial' 
              ? 'text-amber-600 border-b-2 border-amber-500' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          💰 Keuangan & Pencairan Dana
        </button>
      </div>

      {/* KONTEN TAB 1: INVENTARIS & PESANAN LIVE */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri & Tengah: Daftar Makanan Aktif (2 Span) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black text-[#1E293B] flex items-center gap-2">
                <Package size={20} className="text-amber-500" />
                <span>Inventaris Makanan Surplus Aktif</span>
              </h2>
              <span className="text-xs font-bold text-gray-400">{myFoodItems.length} Menu Tayang</span>
            </div>

            <div className="space-y-4">
              {myFoodItems.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm shrink-0" />
                    <div>
                      <h3 className="font-black text-[#1E293B] text-base">{item.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="text-emerald-600 font-bold">Rp {item.kasePrice.toLocaleString('id-ID')}</span>
                        <span className="line-through text-gray-400">Rp {item.originalPrice.toLocaleString('id-ID')}</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded-md font-semibold text-gray-600">Sisa: {item.portionsLeft} porsi</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={tempPortions}
                          onChange={(e) => setTempPortions(e.target.value)}
                          className="w-16 px-2 py-1 border rounded-lg text-xs font-bold"
                          placeholder="Porsi"
                        />
                        <button 
                          onClick={() => handleSavePortions(item.id)}
                          className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Simpan
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setEditingId(item.id); setTempPortions(item.portionsLeft); }}
                        className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        title="Edit Porsi"
                      >
                        <Edit3 size={15} />
                        <span className="hidden sm:inline">Ubah Stok</span>
                      </button>
                    )}

                    <button 
                      onClick={() => handleDeleteFood(item.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors cursor-pointer"
                      title="Hapus Makanan"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Pesanan Masuk (Live dari Customer) */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black text-[#1E293B] flex items-center gap-2">
                <Clock size={20} className="text-amber-500" />
                <span>Pesanan Masuk (Live)</span>
              </h2>
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">
                {orderHistory.length} Pesanan
              </span>
            </div>

            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                        {order.orderCode}
                      </span>
                      <h4 className="font-black text-sm text-[#1E293B] mt-1">{order.buyerName}</h4>
                      <p className="text-xs text-gray-500">{order.foodName} ({order.portions} porsi)</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      order.status === 'Pesanan Selesai' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600 animate-pulse'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-50 text-xs">
                    <span className="text-gray-400">Rp {(order.totalPrice || 0).toLocaleString('id-ID')}</span>
                    {order.status !== 'Pesanan Selesai' && onUpdateOrderStatus && (
                      <button 
                        onClick={() => onUpdateOrderStatus(order.id, 'Pesanan Selesai')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <CheckCircle size={14} />
                        <span>Selesai Diambil</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 flex items-start gap-3 text-xs text-amber-800">
                <AlertCircle size={18} className="shrink-0 text-amber-600 mt-0.5" />
                <p>
                  Pesanan dari pelanggan akan otomatis muncul di sini secara real-time. Klik selesai saat pembeli mengambil makanannya!
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* KONTEN TAB 2: KEUANGAN & PENCAIRAN DANA */}
      {activeTab === 'financial' && (
        <div className="space-y-8">
          
          {/* Kartu Dompet Merchant */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-3xl text-white shadow-lg space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-emerald-100 text-xs font-bold mb-1">
                  <span>SALDO SIAP CAIR (READY)</span>
                  <Wallet size={20} />
                </div>
                <div className="text-3xl font-black">Rp {merchantBalance.readyToWithdraw.toLocaleString('id-ID')}</div>
              </div>
              <button
                onClick={handleWithdraw}
                className="w-full bg-white text-emerald-700 hover:bg-emerald-50 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ArrowUpRight size={16} />
                <span>Tarik Saldo ke Rekening</span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-gray-400 text-xs font-bold mb-1">DANA DALAM PROSES (ESCROW)</div>
                <div className="text-2xl font-black text-[#1E293B]">Rp {merchantBalance.inEscrow.toLocaleString('id-ID')}</div>
              </div>
              <p className="text-[11px] text-gray-400">
                Akan cair otomatis setelah pesanan diselesaikan oleh pelanggan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-gray-400 text-xs font-bold mb-1">TOTAL PENCAIRAN BERHASIL</div>
                <div className="text-2xl font-black text-[#1E293B]">Rp {merchantBalance.totalWithdrawn.toLocaleString('id-ID')}</div>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold">
                ✓ Rekening Utama: BCA •••• 8821
              </p>
            </div>

          </div>

          {/* Riwayat Pencairan Dana */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black text-[#1E293B] flex items-center gap-2">
                <History size={20} className="text-amber-500" />
                <span>Riwayat Pencairan Dana (Payouts)</span>
              </h2>
              <span className="text-xs font-bold text-gray-400">{payoutHistory.length} Transaksi Tercatat</span>
            </div>

            <div className="space-y-3">
              {payoutHistory.map((payout) => (
                <div key={payout.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-2xl gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-[#1E293B]">Pencairan ke {payout.bank}</h4>
                      <p className="text-xs text-gray-400">{payout.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-black text-sm text-emerald-600">+ Rp {payout.amount.toLocaleString('id-ID')}</span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">
                      {payout.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}