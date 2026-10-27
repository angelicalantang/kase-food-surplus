import React from 'react';
import { Home, Compass, User, Store, ShoppingBag } from 'lucide-react';

export default function MobileNavigation({ activeTab, setActiveTab, currentUser }) {
  const isMerchant = currentUser?.role === 'merchant';

  if (isMerchant) {
    // Navigasi bawah khusus Merchant
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-3 z-30 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('provider')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'provider' ? 'text-amber-600 font-bold' : 'text-gray-400 font-medium'
          }`}
        >
          <Store size={20} />
          <span className="text-[10px]">Toko Saya</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'profile' ? 'text-amber-600 font-bold' : 'text-gray-400 font-medium'
          }`}
        >
          <User size={20} />
          <span className="text-[10px]">Profil</span>
        </button>
      </div>
    );
  }

  // Navigasi bawah khusus Pembeli / User
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-3 z-30 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveTab('landing')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'landing' ? 'text-emerald-600 font-bold' : 'text-gray-400 font-medium'
        }`}
      >
        <Home size={20} />
        <span className="text-[10px]">Beranda</span>
      </button>

      <button
        onClick={() => setActiveTab('discover')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'discover' ? 'text-emerald-600 font-bold' : 'text-gray-400 font-medium'
        }`}
      >
        <Compass size={20} />
        <span className="text-[10px]">Jelajahi</span>
      </button>

      <button
        onClick={() => setActiveTab('orders')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'orders' ? 'text-emerald-600 font-bold' : 'text-gray-400 font-medium'
        }`}
      >
        <ShoppingBag size={20} />
        <span className="text-[10px]">Pesanan</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'profile' ? 'text-emerald-600 font-bold' : 'text-gray-400 font-medium'
        }`}
      >
        <User size={20} />
        <span className="text-[10px]">Profil</span>
      </button>
    </div>
  );
}