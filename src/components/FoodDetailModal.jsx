import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Clock, MapPin, CheckCircle, Check } from 'lucide-react';

export default function FoodDetailModal({ food, onClose, onClaim, isSuccess }) {
  const [portions, setPortions] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl border border-black/10 relative"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-gray-600 hover:text-kaseDark flex items-center justify-center shadow-sm"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Food Cover Image */}
            <div className="relative h-56 bg-gray-100">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-4 bg-kaseDark/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                {food.category}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-kaseGreen">{food.provider}</span>
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <Star size={12} className="fill-kaseAmber text-kaseAmber" /> {food.rating}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-kaseDark mt-0.5">{food.name}</h2>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{food.description}</p>
              </div>

              {/* Price & Savings Highlight Box */}
              <div className="bg-[#F4F5F8] p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 line-through">
                    Rp {food.originalPrice.toLocaleString()}
                  </span>
                  <div className="text-2xl font-extrabold text-kaseDark">
                    Rp {(food.kasePrice * portions).toLocaleString()}
                  </div>
                </div>
                <span className="bg-kaseRed/10 text-kaseRed text-xs font-extrabold px-3 py-1.5 rounded-full">
                  Hemat {Math.round(((food.originalPrice - food.kasePrice) / food.originalPrice) * 100)}%
                </span>
              </div>

              {/* Details Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl">
                  <Clock size={16} className="text-kaseAmber" />
                  <div>
                    <p className="text-[10px] text-gray-400">Jam Ambil</p>
                    <p className="font-bold text-gray-800">{food.pickupTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl">
                  <MapPin size={16} className="text-kaseRed" />
                  <div>
                    <p className="text-[10px] text-gray-400">Jarak Lokasi</p>
                    <p className="font-bold text-gray-800">{food.distance}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-700">Jumlah Porsi:</span>
                <div className="flex items-center gap-3 bg-[#F4F5F8] p-1.5 rounded-xl">
                  <button 
                    onClick={() => setPortions(Math.max(1, portions - 1))}
                    className="w-7 h-7 rounded-lg bg-white text-gray-700 font-bold flex items-center justify-center shadow-sm disabled:opacity-50"
                    disabled={portions <= 1}
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{portions}</span>
                  <button 
                    onClick={() => setPortions(Math.min(food.portionsLeft, portions + 1))}
                    className="w-7 h-7 rounded-lg bg-white text-gray-700 font-bold flex items-center justify-center shadow-sm disabled:opacity-50"
                    disabled={portions >= food.portionsLeft}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => onClaim(portions)}
                className="w-full bg-kaseDark hover:bg-kaseGreen text-white font-bold text-sm py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} className="text-kaseAmber" />
                <span>Klaim Makanan Ini Sekarang</span>
              </button>
            </div>
          </div>
        ) : (
          /* Success State Screen */
          <div className="p-8 text-center space-y-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-kaseMint text-kaseGreen mx-auto flex items-center justify-center shadow-md"
            >
              <Check size={40} />
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-kaseDark">Makanan Terselamatkan! 🌱</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                "You just helped prevent one meal from going to waste."
              </p>
            </div>

            <div className="bg-[#F4F5F8] p-4 rounded-2xl text-left text-xs space-y-2">
              <p className="font-bold text-gray-800">Kode Pengambilan: <span className="text-kaseGreen font-mono font-extrabold">#KASE-8892</span></p>
              <p className="text-gray-500">Tunjukkan kode ini kepada staf <b className="text-gray-700">{food.provider}</b> saat pickup.</p>
              <p className="text-gray-400 text-[10px]">Alamat: {food.location}</p>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-kaseDark text-white text-xs font-bold py-3.5 rounded-full hover:bg-gray-800"
            >
              Tutup & Selesai
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}