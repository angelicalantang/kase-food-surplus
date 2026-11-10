import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Store, Trash2, Package, DollarSign, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function MerchantDashboard({ onBack }) {
  // State daftar menu surplus milik merchant
  const [menuList, setMenuList] = useState([
    { id: 1, name: 'Paket Roti Bakery Sisa Hari Ini', originalPrice: 45000, kasePrice: 20000, portions: 5, status: 'Aktif' },
    { id: 2, name: 'Nasi Kotak Surplus Resto', originalPrice: 35000, kasePrice: 15000, portions: 3, status: 'Aktif' }
  ]);

  // State untuk form tambah menu baru
  const [showAddForm, setShowAddForm] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [origPrice, setOrigPrice] = useState('');
  const [kasePrice, setKasePrice] = useState('');
  const [portions, setPortions] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddMenu = (e) => {
    e.preventDefault();
    if (!foodName || !origPrice || !kasePrice || !portions) return;

    const newItem = {
      id: Date.now(),
      name: foodName,
      originalPrice: Number(origPrice),
      kasePrice: Number(kasePrice),
      portions: Number(portions),
      status: 'Aktif'
    };

    setMenuList([newItem, ...menuList]);
    setFoodName('');
    setOrigPrice('');
    setKasePrice('');
    setPortions('');
    setShowAddForm(false);
    setSuccessMsg('Menu surplus berhasil ditambahkan dan langsung tayang!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteMenu = (id) => {
    setMenuList(menuList.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F4F5F8] p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Dashboard */}
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Store size={24} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Merchant Portal</span>
              <h1 className="text-lg font-black text-gray-900">Bakery & Resto Berkah (Mitra KASE)</h1>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Mode Pembeli</span>
          </button>
        </div>

        {/* Notifikasi Sukses */}
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Package size={20} /></div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Menu Aktif</span>
              <h3 className="text-base font-black text-gray-900">{menuList.length} Item</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><DollarSign size={20} /></div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Total Terbantu</span>
              <h3 className="text-base font-black text-gray-900">Rp 245.000</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Store size={20} /></div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Status Toko</span>
              <h3 className="text-base font-black text-emerald-600">Buka (Menerima Rescue)</h3>
            </div>
          </div>
        </div>

        {/* Konten Utama: Daftar Menu & Tombol Tambah */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-gray-900">Kelola Makanan Surplus Hari Ini</h3>
              <p className="text-xs text-gray-500">Posting makanan berlebih sebelum toko tutup agar tidak terbuang.</p>
            </div>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={16} />
              <span>{showAddForm ? 'Tutup Form' : 'Tambah Menu Surplus'}</span>
            </button>
          </div>

          {/* Form Tambah Menu Baru (Muncul saat tombol diklik) */}
          {showAddForm && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleAddMenu} 
              className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3"
            >
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Form Upload Makanan Surplus</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Nama Makanan (Contoh: Roti Manis Sisa Etalase)" 
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                  required
                />
                <input 
                  type="number" 
                  placeholder="Jumlah Porsi (Contoh: 5)" 
                  value={portions}
                  onChange={(e) => setPortions(e.target.value)}
                  className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                  required
                />
                <input 
                  type="number" 
                  placeholder="Harga Asli (Rp)" 
                  value={origPrice}
                  onChange={(e) => setOrigPrice(e.target.value)}
                  className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                  required
                />
                <input 
                  type="number" 
                  placeholder="Harga Diskon Rescue KASE (Rp)" 
                  value={kasePrice}
                  onChange={(e) => setKasePrice(e.target.value)}
                  className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 text-xs font-bold hover:bg-gray-200 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow cursor-pointer"
                >
                  Simpan & Tayangkan
                </button>
              </div>
            </motion.form>
          )}

          {/* Tabel / Daftar Makanan */}
          <div className="space-y-3 pt-2">
            {menuList.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">Belum ada menu surplus yang di-upload hari ini.</p>
            ) : (
              menuList.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-[#F4F5F8]/50 hover:bg-white transition-all">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Stok: {item.portions} Porsi</span>
                    <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                    <div className="text-[11px] text-gray-500 flex gap-3">
                      <span>Asli: <span className="line-through">Rp {item.originalPrice.toLocaleString('id-ID')}</span></span>
                      <span className="text-emerald-600 font-extrabold">Rescue: Rp {item.kasePrice.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                      {item.status}
                    </span>
                    <button 
                      onClick={() => handleDeleteMenu(item.id)}
                      className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                      title="Hapus Menu"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}