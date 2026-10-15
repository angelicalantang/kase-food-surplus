import React from 'react';
import { ShoppingBag, Heart, Bell, Settings, HelpCircle, ChevronRight } from 'lucide-react';

export default function ProfilePage({ userStats, savedCount }) {
  const menuItems = [
    { icon: ShoppingBag, label: "Pesanan Klaim Saya" },
    { icon: Heart, label: "Makanan Disimpan" },
    { icon: Bell, label: "Notifikasi KASE" },
    { icon: Settings, label: "Pengaturan Akun" },
    { icon: HelpCircle, label: "Pusat Bantuan & CS" }
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-16">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-black/[0.04] text-center space-y-4">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
          alt="Alex" 
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-kaseMint"
        />
        <div>
          <h2 className="text-xl font-extrabold text-kaseDark">Alex Manado</h2>
          <p className="text-xs text-gray-500">📍 Manado, Indonesia</p>
        </div>
        <div className="flex justify-center gap-4 text-xs pt-2">
          <div className="bg-[#F4F5F8] px-4 py-2 rounded-2xl">
            <p className="font-extrabold text-kaseDark">{userStats.mealsSaved}</p>
            <p className="text-[10px] text-gray-400">Meals Saved</p>
          </div>
          <div className="bg-[#F4F5F8] px-4 py-2 rounded-2xl">
            <p className="font-extrabold text-kaseDark">{savedCount}</p>
            <p className="text-[10px] text-gray-400">Disimpan</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-4 shadow-soft border border-black/[0.04] space-y-1 text-xs">
        {menuItems.map((m, i) => {
          const IconComponent = m.icon;
          return (
            <button key={i} className="w-full flex items-center justify-between p-3.5 hover:bg-[#F4F5F8] rounded-2xl transition-colors text-gray-700 font-semibold">
              <div className="flex items-center gap-3">
                <IconComponent size={18} className="text-kaseGreen" />
                <span>{m.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
}