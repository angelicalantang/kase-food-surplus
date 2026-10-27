import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ChevronRight, MapPin } from 'lucide-react';

export default function FoodCard({ food, onSelect, onToggleSave, isSaved, onOpenMap }) {
  const discountPct = Math.round(((food.originalPrice - food.kasePrice) / food.originalPrice) * 100);

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-white rounded-[2.2rem] p-4 shadow-soft hover:shadow-hover border border-black/[0.04] flex flex-col justify-between transition-all duration-300 group cursor-pointer relative"
      onClick={onSelect}
    >
      <div>
        {/* Image Header with Badges */}
        <div className="relative h-44 rounded-[1.8rem] overflow-hidden mb-3.5 bg-gray-100">
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Discount Tag */}
          <span className="absolute top-3 left-3 bg-kaseDark/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">
            {discountPct}% OFF
          </span>

          {/* Action Buttons Top Right (Save & Map) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {/* Tombol Buka Peta untuk Resto ini */}
            {onOpenMap && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenMap(food);
                }}
                className="p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-600 hover:text-amber-600 hover:bg-white transition-all shadow-sm"
                title="Lihat Lokasi di Peta"
              >
                <MapPin size={16} />
              </button>
            )}

            {/* Save Heart Button */}
            <button 
              onClick={onToggleSave}
              className="p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-600 hover:text-kaseRed hover:bg-white transition-all shadow-sm"
              title="Simpan Makanan"
            >
              <Heart 
                size={16} 
                className={isSaved ? "fill-kaseRed text-kaseRed" : ""} 
              />
            </button>
          </div>

          {/* Portions Remaining Badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-kaseAmber animate-pulse"></span>
            <span>Tersisa {food.portionsLeft} porsi</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span className="font-semibold text-kaseGreen">{food.provider}</span>
            <span className="flex items-center gap-0.5 font-bold text-gray-700">
              <Star size={12} className="fill-kaseAmber text-kaseAmber" />
              {food.rating}
            </span>
          </div>

          <h3 className="font-extrabold text-sm text-kaseDark group-hover:text-kaseGreen transition-colors line-clamp-1">
            {food.name}
          </h3>

          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>📍 {food.distance} away</span>
            <span>⏰ {food.pickupTime}</span>
          </div>
        </div>
      </div>

      {/* Bottom Price & Claim CTA */}
      <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 line-through">Rp {food.originalPrice.toLocaleString()}</p>
          <p className="text-base font-extrabold text-kaseDark">Rp {food.kasePrice.toLocaleString()}</p>
        </div>

        <button className="bg-kaseDark group-hover:bg-kaseGreen text-white text-xs font-bold px-4 py-2.5 rounded-full shadow transition-all duration-300 flex items-center gap-1">
          <span>Klaim</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}