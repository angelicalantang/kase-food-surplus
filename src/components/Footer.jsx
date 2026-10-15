import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.05] mt-20 py-10 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-kaseGreen flex items-center justify-center text-white font-extrabold text-sm">
            K
          </div>
          <div>
            <p className="font-bold text-sm text-kaseDark">KASE Platform</p>
            <p className="text-xs text-gray-500">“Kase” means “give” in Manado. Saving food together.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-gray-500 font-medium">
          <a href="#" className="hover:text-kaseDark transition-colors">Syarat & Ketentuan</a>
          <a href="#" className="hover:text-kaseDark transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-kaseDark transition-colors">Panduan Keamanan Food</a>
          <a href="#" className="hover:text-kaseDark transition-colors">Hubungi Kami</a>
        </div>
        <p className="text-xs text-gray-400">© 2026 KASE Indonesia. All rights reserved.</p>
      </div>
    </footer>
  );
}