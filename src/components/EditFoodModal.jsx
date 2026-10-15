import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';

export default function EditFoodModal({ food, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: food.name,
    category: food.category,
    originalPrice: food.originalPrice,
    kasePrice: food.kasePrice,
    portionsLeft: food.portionsLeft,
    pickupTime: food.pickupTime,
    description: food.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...food,
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
        className="bg-white rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-black/10 relative max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:text-kaseDark flex items-center justify-center"
        >
          <X size={16} />
        </button>

        <div className="space-y-1 mb-5">
          <span className="text-xs font-bold text-kaseGreen uppercase">Merchant Management</span>
          <h2 className="text-2xl font-extrabold text-kaseDark">Edit Listing Makanan</h2>
          <p className="text-xs text-gray-500">Perbarui jumlah porsi sisa atau informasi harga makanan Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-gray-700">Nama Makanan</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
            />
          </div>

          {/* Quick Porsi Stepper Control */}
          <div className="bg-kaseMint/40 p-4 rounded-2xl border border-kaseGreen/20 space-y-2">
            <label className="font-extrabold text-kaseGreen block">Atur Porsi Tersisa:</label>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Sisa Porsi Saat Ini</span>
              <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-black/5 shadow-sm">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, portionsLeft: Math.max(0, Number(formData.portionsLeft) - 1)})}
                  className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-200"
                >
                  -
                </button>
                <input 
                  type="number"
                  min="0"
                  value={formData.portionsLeft}
                  onChange={e => setFormData({...formData, portionsLeft: Math.max(0, Number(e.target.value))})}
                  className="w-12 text-center font-extrabold text-base text-kaseDark outline-none bg-transparent"
                />
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, portionsLeft: Number(formData.portionsLeft) + 1})}
                  className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
              <label className="font-bold text-gray-700">Harga Diskon KASE (Rp)</label>
              <input 
                type="number" 
                value={formData.kasePrice}
                onChange={e => setFormData({...formData, kasePrice: e.target.value})}
                className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Jam Pengambilan</label>
            <input 
              type="text" 
              value={formData.pickupTime}
              onChange={e => setFormData({...formData, pickupTime: e.target.value})}
              className="w-full p-3 bg-[#F4F5F8] rounded-xl outline-none focus:ring-2 focus:ring-kaseGreen font-medium"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-kaseDark hover:bg-kaseGreen text-white font-bold py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Save size={16} />
            <span>Simpan Perubahan</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}