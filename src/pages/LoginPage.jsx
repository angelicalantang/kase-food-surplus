import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, User, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [role, setRole] = useState('user'); // 'user' (Pembeli) atau 'merchant' (Mitra)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Mohon isi nama dan email terlebih dahulu.');
      return;
    }

    const userData = {
      name,
      email,
      role, // 'user' atau 'merchant'
      isGuest: false
    };

    onLoginSuccess(userData);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F8] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Ornaments */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-xl border border-black/[0.04] p-8 max-w-md w-full relative z-10 space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#1E293B] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Leaf size={28} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#1E293B]">Selamat Datang di KASE</h1>
          <p className="text-xs text-gray-500">Platform penyelamat surplus makanan terpercaya.</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#F4F5F8] p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === 'user' 
                ? 'bg-white text-[#1E293B] shadow-sm' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <User size={16} className="text-emerald-600" />
            <span>Pemberi / Pembeli</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRole('merchant')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === 'merchant' 
                ? 'bg-white text-[#1E293B] shadow-sm' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Store size={16} className="text-amber-600" />
            <span>Mitra / Resto</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 ml-1">Nama Lengkap / Nama Usaha</label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'merchant' ? "Contoh: Bakery Berkah" : "Contoh: Andi Pratama"}
              className="w-full px-4 py-3 text-xs bg-[#F4F5F8] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-[#1E293B] font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 ml-1">Alamat Email</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 text-xs bg-[#F4F5F8] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-[#1E293B] font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E293B] hover:bg-black text-white text-xs font-bold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            <span>Masuk ke Aplikasi</span>
            <ArrowRight size={16} className="text-amber-400" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Aman, cepat, dan ramah lingkungan</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}