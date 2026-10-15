import React from 'react';
import { motion } from 'framer-motion';
import { Store, MapPin, HeartHandshake } from 'lucide-react';

export default function HowItWorksPage({ onStartClick }) {
  const steps = [
    {
      number: "01",
      title: "List Surplus",
      desc: "Restoran, bakery, atau cafe mengunggah makanan lezat layak makan yang belum terjual di akhir sesi.",
      icon: Store
    },
    {
      number: "02",
      title: "Discover Nearby",
      desc: "Masyarakat sekitar menemukan pilihan makanan terdekat dengan potongan harga spesial 40-70%.",
      icon: MapPin
    },
    {
      number: "03",
      title: "Kase & Enjoy",
      desc: "Pengguna melakukan klaim, mengambil makanan di lokasi mitra, dan memberi kesempatan kedua pada makanan.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-soft border border-black/[0.04] space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-kaseGreen uppercase tracking-widest">Simple & Sustainable</span>
        <h2 className="text-3xl font-extrabold text-kaseDark">From surplus to someone's next meal.</h2>
        <p className="text-xs sm:text-sm text-gray-500">3 langkah mudah menyelamatkan makanan dan memberikan dampak nyata.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#F4F5F8] p-6 rounded-3xl space-y-4 relative group hover:bg-kaseMint/40 transition-all border border-transparent hover:border-kaseGreen/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-kaseGreen/40 group-hover:text-kaseGreen transition-colors">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white text-kaseDark shadow-sm flex items-center justify-center">
                  <IconComponent size={22} className="text-kaseGreen" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-kaseDark">{step.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button 
          onClick={onStartClick}
          className="bg-kaseDark text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-md hover:bg-gray-800 transition-all"
        >
          Mulai Selamatkan Food Sekarang
        </button>
      </div>
    </div>
  );
}