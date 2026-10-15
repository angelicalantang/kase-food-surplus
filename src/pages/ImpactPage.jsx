import React from 'react';

export default function ImpactPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="text-center max-w-2xl mx-auto space-y-4 pt-4">
        <span className="text-xs font-bold text-kaseGreen uppercase tracking-widest">Keberlanjutan Lingkungan</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-kaseDark tracking-tight">Small actions. Real impact.</h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Ketika makanan terbuang, kita tidak hanya membuang makanan — kita membuang air, energi, dan sumber daya tanah yang digunakan untuk memproduksinya.
        </p>
      </div>

      {/* Visual Transformation Chain */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-soft border border-black/[0.04] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2 p-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-kaseAmber mx-auto flex items-center justify-center font-bold text-xl">
            🍲
          </div>
          <h3 className="font-bold text-sm text-kaseDark">1. Surplus Food</h3>
          <p className="text-xs text-gray-500">Makanan lezat berkualitas berpotensi terbuang.</p>
        </div>
        <div className="space-y-2 p-4">
          <div className="w-16 h-16 rounded-3xl bg-kaseMint text-kaseGreen mx-auto flex items-center justify-center font-bold text-xl">
            📲
          </div>
          <h3 className="font-bold text-sm text-kaseDark">2. Platform KASE</h3>
          <p className="text-xs text-gray-500">Koneksi cepat berbasis lokasi untuk penyelamatan.</p>
        </div>
        <div className="space-y-2 p-4">
          <div className="w-16 h-16 rounded-3xl bg-red-50 text-kaseRed mx-auto flex items-center justify-center font-bold text-xl">
            🌱
          </div>
          <h3 className="font-bold text-sm text-kaseDark">3. Rescued Meal</h3>
          <p className="text-xs text-gray-500">Mencegah emisi gas rumah kaca & menghemat nilai.</p>
        </div>
      </div>
    </div>
  );
}