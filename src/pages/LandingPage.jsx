import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Zap } from 'lucide-react';
import FoodCard from '../components/FoodCard';

export default function LandingPage({ 
  foodItems, 
  onDiscoverClick, 
  onSelectFood, 
  toggleSave, 
  savedIds,
  onOpenMap,
  userStats // <-- Terima data statistik real di sini
}) {
  const featuredItems = foodItems.slice(0, 4);

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. HERO BANNER UTAMA */}
      <div className="bg-[#1E293B] rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-amber-400">
            <Leaf size={14} />
            <span>Gerakan Penyelamatan Pangan KASE</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Selamatkan Makanan, <span className="text-emerald-400">Selamatkan Bumi.</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Beli makanan layak konsumsi berkualitas tinggi dari kafe dan restoran terdekat dengan harga miring hingga 60%. Praktis, hemat, dan berdampak nyata.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onDiscoverClick}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs transition-all cursor-pointer"
            >
              <span>Jelajahi Makanan</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. ECO WIDGET & CARA KERJA (Data Angka Sekarang Bersifat Real-Time) */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-black/[0.04] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Sisi Kiri: Dampak Ekologis Nyata (Terkoneksi ke userStats) */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Dampak Bersama Kamu</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-black text-[#1E293B]">
                {userStats?.mealsSaved || 0} Porsi
              </div>
              <div className="text-[11px] text-gray-500 font-medium">Makanan Diselamatkan</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">
                {userStats?.wastePreventedKg || 0} kg
              </div>
              <div className="text-[11px] text-gray-500 font-medium">Limbah CO₂ Dicegah</div>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Konsep 3-Tap Rescue */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#1E293B] font-black text-xs uppercase tracking-wider">
            <Zap size={16} className="text-amber-500" />
            <span>3 Langkah Mudah Penyelamatan</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-xs font-black text-[#1E293B]">1. Pilih</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Menu terdekat</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-xs font-black text-[#1E293B]">2. Klaim</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Satu sentuhan</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-xs font-black text-[#1E293B]">3. Ambil</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Datang ke toko</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. DAFTAR MAKANAN TERBARU */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#1E293B]">Surplus Tersedia Hari Ini</h2>
            <p className="text-xs text-gray-500">Amankan sebelum kehabisan di jam operasional penarikan.</p>
          </div>
          <button
            onClick={onDiscoverClick}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map(food => (
            <FoodCard 
              key={food.id} 
              food={food} 
              onSelect={() => onSelectFood(food)} 
              onToggleSave={(e) => toggleSave(food.id, e)}
              isSaved={savedIds.includes(food.id)}
              onOpenMap={onOpenMap}
            />
          ))}
        </div>
      </div>

    </div>
  );
}