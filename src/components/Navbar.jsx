import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ activeTab, setActiveTab, onOpenListModal, savedCount }) {
  const navLinks = [
    { id: 'landing', label: 'Beranda' },
    { id: 'discover', label: 'Temukan Makanan' },
    { id: 'how', label: 'Cara Kerja' },
    { id: 'impact', label: 'Dampak Eco' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'provider', label: 'Partner View' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F4F5F8]/80 backdrop-blur-md border-b border-black/[0.04] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo onClick={() => setActiveTab('landing')} />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-black/[0.05] shadow-sm">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === link.id 
                  ? 'bg-kaseDark text-white shadow-sm' 
                  : 'text-gray-600 hover:text-kaseDark hover:bg-gray-100/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('discover')}
            className="p-2.5 rounded-full bg-white text-gray-700 hover:text-kaseDark hover:bg-gray-100 border border-black/[0.05] transition-all"
            title="Search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={onOpenListModal}
            className="hidden sm:flex items-center gap-2 bg-kaseDark hover:bg-gray-800 text-white text-xs font-bold px-5 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <PlusCircle size={16} className="text-kaseAmber" />
            <span>Bagikan Surplus</span>
          </button>

          {/* User Avatar */}
          <button 
            onClick={() => setActiveTab('profile')}
            className="relative p-1 rounded-full border-2 border-kaseGreen/30 hover:border-kaseGreen transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Alex Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-kaseRed text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {savedCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}