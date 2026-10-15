import React from 'react';
import { Home, Compass, PieChart, Store, User } from 'lucide-react';

export default function MobileNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'landing', icon: Home, label: 'Beranda' },
    { id: 'discover', icon: Compass, label: 'Temukan' },
    { id: 'dashboard', icon: PieChart, label: 'Dampak' },
    { id: 'provider', icon: Store, label: 'Partner' },
    { id: 'profile', icon: User, label: 'Profil' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-black/[0.06] px-6 py-2.5 flex items-center justify-between">
      {navItems.map(nav => {
        const Icon = nav.icon;
        const isActive = activeTab === nav.id;
        return (
          <button
            key={nav.id}
            onClick={() => setActiveTab(nav.id)}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
              isActive ? 'text-kaseGreen font-bold scale-105' : 'text-gray-400'
            }`}
          >
            <Icon size={20} />
            <span>{nav.label}</span>
          </button>
        );
      })}
    </div>
  );
}