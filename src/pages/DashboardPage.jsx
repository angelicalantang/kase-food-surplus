import React from 'react';
import { ShieldCheck, Utensils, Leaf, Wallet, Award } from 'lucide-react';

export default function DashboardPage({ userStats }) {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Greeting */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-kaseDark">Good evening, Alex 👋</h1>
          <p className="text-xs text-gray-500">Your impact is growing every day. Keep rescuing!</p>
        </div>
        <div className="flex items-center gap-3 bg-kaseMint px-5 py-3 rounded-2xl border border-kaseGreen/20">
          <ShieldCheck size={24} className="text-kaseGreen" />
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Status Hero</p>
            <p className="text-xs font-extrabold text-kaseGreen">Eco Guardian Level 3</p>
          </div>
        </div>
      </div>

      {/* Impact Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Meals Saved", val: userStats.mealsSaved, icon: Utensils, color: "text-kaseGreen", bg: "bg-kaseMint" },
          { label: "Waste Prevented", val: `${userStats.wastePreventedKg} kg`, icon: Leaf, color: "text-kaseGreen", bg: "bg-kaseMint" },
          { label: "Money Saved", val: `Rp ${userStats.moneySavedRp.toLocaleString()}`, icon: Wallet, color: "text-kaseAmber", bg: "bg-amber-50" },
          { label: "Impact Score", val: `${userStats.impactScore}/100`, icon: Award, color: "text-kaseRed", bg: "bg-red-50" }
        ].map((card, i) => {
          const IconComponent = card.icon;
          return (
            <div key={i} className="bg-white rounded-[2.2rem] p-6 shadow-soft border border-black/[0.04] space-y-3">
              <div className={`w-10 h-10 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center`}>
                <IconComponent size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-kaseDark">{card.val}</h3>
                <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Circular Impact score visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 shadow-soft border border-black/[0.04] flex flex-col items-center justify-center text-center space-y-4">
          <h3 className="font-extrabold text-sm text-kaseDark">Skor Dampak Lingkungan</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="65" stroke="#F4F5F8" strokeWidth="14" fill="transparent" />
              <circle 
                cx="80" cy="80" r="65" 
                stroke="#3B6038" strokeWidth="14" 
                strokeDasharray="408" 
                strokeDashoffset={408 - (408 * userStats.impactScore) / 100}
                strokeLinecap="round" 
                fill="transparent" 
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-kaseDark">{userStats.impactScore}</span>
              <span className="block text-[10px] text-gray-400">Poin Hijau</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">Anda telah berkontribusi mengurangi emisi CO2 sebesar <b>16.8 kg</b> bulan ini! 🌱</p>
        </div>

        {/* Recent History */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 shadow-soft border border-black/[0.04] space-y-4">
          <h3 className="font-extrabold text-sm text-kaseDark">Riwayat Makanan Terselamatkan</h3>
          <div className="space-y-3">
            {[
              { name: "Mix Organic Salad", date: "Hari ini, 12:30", provider: "Nusantara Fresh", status: "Selesai", price: "Rp 12.000" },
              { name: "Roti Manis Assorted", date: "Kemarin, 18:00", provider: "Toko Roti Manado", status: "Selesai", price: "Rp 15.000" },
              { name: "Quinoa Salad Bowl", date: "4 Okt 2026", provider: "Healthy Bites", status: "Selesai", price: "Rp 18.000" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-[#F4F5F8] rounded-2xl text-xs">
                <div>
                  <p className="font-bold text-kaseDark">{item.name}</p>
                  <p className="text-[10px] text-gray-400">{item.provider} • {item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-kaseGreen">{item.price}</p>
                  <span className="text-[9px] font-bold bg-kaseMint text-kaseGreen px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}