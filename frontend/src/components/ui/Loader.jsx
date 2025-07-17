import React from 'react'

export default function Loader() {
  return (
    <div className="w-full h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 animate-ping opacity-40" />
        <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-inner shadow-pink-500/20 animate-spin-slow" />
        <div className="absolute inset-6 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
          <span className="text-white text-sm font-semibold animate-pulse tracking-widest">
            CONNECTING
          </span>
        </div>
      </div>
    </div>
  );
}
