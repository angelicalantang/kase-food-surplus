import React from 'react';

export default function Logo({ onClick }) {
  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group"
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-2xl bg-kaseGreen flex items-center justify-center text-white shadow-md shadow-kaseGreen/20 group-hover:scale-105 transition-transform">
        <span className="font-extrabold text-xl tracking-tighter">K</span>
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-2xl tracking-tight text-kaseDark flex items-center gap-1">
          kase
          <span className="w-2 h-2 rounded-full bg-kaseRed inline-block"></span>
        </span>
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider -mt-1">
          save food. kase value.
        </span>
      </div>
    </div>
  );
}