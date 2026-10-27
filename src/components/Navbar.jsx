import React from 'react';
import { Leaf, LogOut, Store, Compass, Home, ShoppingBag } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  setIsListModalOpen, 
  savedCount, 
  currentUser, 
  onLogout 
}) {
  const isMerchant = currentUser?.role === 'merchant';

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab(isMerchant ? 'provider' : 'landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#1E293B] text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Leaf size={20} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-[#1E293B]">KASE</span>
            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Food Rescue</span>
          </div>
        </div>

        {/* Desktop Menu Links (Clean & Minimalist) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4F5F8] p-1.5 rounded-2xl">
          {isMerchant ? (
            // Menu khusus Merchant
            <button
              onClick={() => setActiveTab('provider')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'provider' ? 'bg-white text-[#1E293B] shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Store size={15} className="text-amber-500" />
              <span>Kelola Toko</span>
            </button>
          ) : (
            // Menu khusus Pembeli
            <>
              <button
                onClick={() => setActiveTab('landing')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'landing' ? 'bg-white text-[#1E293B] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Home size={14} />
                <span>Beranda</span>
              </button>
              
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'discover' ? 'bg-white text-[#1E293B] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Compass size={14} />
                <span>Jelajahi</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'orders' ? 'bg-white text-[#1E293B] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <ShoppingBag size={14} />
                <span>Pesanan Saya</span>
              </button>
            </>
          )}
        </nav>

        {/* Action Buttons (User Profile & Logout) */}
        <div className="flex items-center gap-3">
          
          {/* Profil / Info User */}
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all border ${
              activeTab === 'profile' 
                ? 'bg-[#1E293B] text-white border-[#1E293B]' 
                : 'bg-[#F4F5F8] hover:bg-gray-200/60 text-[#1E293B] border-transparent'
            }`}
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xs font-black text-emerald-700">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-xs font-bold max-w-[100px] truncate hidden sm:inline">
              {currentUser?.name}
            </span>
          </button>

          {/* Tombol Logout */}
          <button
            onClick={onLogout}
            title="Keluar Akun"
            className="p-2.5 rounded-2xl bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all cursor-pointer"
          >
            <LogOut size={16} />
          </button>
          
        </div>

      </div>
    </header>
  );
}