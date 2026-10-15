import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ListSurplusModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Meals',
    provider: 'Warung Nusantara',
    originalPrice: 25000,
    kasePrice: 12000,
    portionsLeft: 5,
    pickupTime: '17:00 – 19:00',
    description: '',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    location: 'Jl. Sam Ratulangi No. 45, Manado'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    onSubmit({
      ...formData,
      originalPrice: Number(formData.originalPrice),
      kasePrice: Number(formData.kasePrice),
      portionsLeft: Number(formData.portionsLeft)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-black/10 relative max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:text-kaseDark flex items-center justify-center"
        >
          <X size={16} />
        </button>

        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold text-kaseGreen uppercase">Partner Form</span>
          <h2 className="text-2xl font-extrabold text-kaseDark">Have food to spare? Kase it forward.</h2>
          <p className="text-xs text-gray-500">Bagikan surplus makanan usaha Anda agar tidak terbuang sia-sia.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Nama Makanan / Paket</label>
              <input 
                type="text" 
                required
                placeholder="Contoh: Nasi Goreng Box Surplus"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Kategori</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
              >
                <option value="Meals">Meals</option>
                <option value="Bakery">Bakery</option>
                <option value="Salads">Salads</option>
                <option value="Fruits">Fruits</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Harga Asli (Rp)</label>
              <input 
                type="number" 
                value={formData.originalPrice}
                onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Harga KASE Diskon (Rp)</label>
              <input 
                type="number" 
                value={formData.kasePrice}
                onChange={e => setFormData({...formData, kasePrice: e.target.value})}
                className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Jumlah Porsi Tersedia</label>
              <input 
                type="number" 
                value={formData.portionsLeft}
                onChange={e => setFormData({...formData, portionsLeft: e.target.value})}
                className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Waktu Pengambilan</label>
              <input 
                type="text" 
                value={formData.pickupTime}
                onChange={e => setFormData({...formData, pickupTime: e.target.value})}
                className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Deskripsi Singkat</label>
            <textarea 
              rows="2"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Jelaskan kondisi dan isi porsi makanan..."
              className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-kaseDark hover:bg-kaseGreen text-white font-bold py-4 rounded-full shadow-md transition-all text-xs"
          >
            Unggah & Bagikan Makanan
          </button>
        </form>
      </motion.div>
    </div>
  );
}