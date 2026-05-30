"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden px-4">
      {/* Stadium ambient light effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-premium/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-3xl opacity-20 pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card max-w-md w-full rounded-3xl p-8 border border-white/5 bg-slate-900/10 backdrop-blur-md text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
        id="construction-card"
      >
        {/* Animated Trophy Icon with Neon/Gold Glow */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-gold-premium/10 border border-gold-premium/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(229,184,66,0.1)]"
        >
          <Trophy size={32} className="text-gold-premium" />
        </motion.div>

        {/* Primary Title */}
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          COPA DO MUNDO <span className="text-gold-premium glow-text-gold">2026</span>
        </h1>

        {/* Status Badge */}
        <div className="mt-4 bg-neon-green/10 border border-neon-green/20 px-4 py-1.5 rounded-full text-neon-green text-[10px] font-black uppercase tracking-widest animate-pulse">
          Em Construção
        </div>

        {/* Message */}
        <p className="text-xs text-slate-400 mt-6 leading-relaxed max-w-xs">
          Estamos preparando uma plataforma premium com estatísticas, grupos e placares em tempo real para o maior mundial de todos os tempos.
        </p>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-white/10 my-6" />

        {/* Footer note */}
        <span className="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">
          Radar da Torcida &bull; Hub de Elite
        </span>
      </motion.div>
    </div>
  );
}
