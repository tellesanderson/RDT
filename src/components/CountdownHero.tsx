import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Globe, MapPin } from "lucide-react";
import MapModal from "./modals/MapModal";
import TeamsModal from "./modals/TeamsModal";
import ChampionsModal from "./modals/ChampionsModal";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownHero() {
  const targetDate = new Date("2026-06-11T17:00:00-05:00"); // Cidade do México abertura
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isChampionsOpen, setIsChampionsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/5 py-12 px-6 sm:px-8 text-center flex flex-col items-center">
      {/* Stadium neon gradients overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-premium/10 via-neon-green/5 to-transparent pointer-events-none"></div>

      {/* Floating Trophy Icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.2 }
        }}
        onClick={() => setIsChampionsOpen(true)}
        className="w-14 h-14 rounded-2xl bg-gold-premium/10 border border-gold-premium/30 hover:border-gold-premium/60 hover:bg-gold-premium/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(229,184,66,0.15)] z-10 cursor-pointer transition-colors"
        title="Ver Galeria de Campeões Históricos"
      >
        <Trophy size={26} className="text-gold-premium" />
      </motion.button>

      {/* Badges / Header info */}
      <div className="flex flex-wrap items-center justify-center gap-2 z-10 mb-4">
        <button
          onClick={() => setIsMapOpen(true)}
          className="text-[10px] font-black tracking-widest text-neon-green bg-neon-green/10 border border-neon-green/20 hover:bg-neon-green/25 hover:border-neon-green/35 px-3 py-1 rounded-full uppercase glow-text-neon cursor-pointer transition-all focus:outline-none"
        >
          AMÉRICA DO NORTE 2026
        </button>
        <button
          onClick={() => setIsTeamsOpen(true)}
          className="text-[10px] font-black tracking-widest text-gold-premium bg-gold-premium/10 border border-gold-premium/20 hover:bg-gold-premium/25 hover:border-gold-premium/35 px-3 py-1 rounded-full uppercase flex items-center gap-1 cursor-pointer transition-all focus:outline-none"
        >
          <Globe size={11} className="animate-spin-slow" />
          48 SELEÇÕES
        </button>
      </div>

      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white max-w-2xl leading-none z-10">
        A CONTAGEM REGRESSIVA <br className="hidden sm:inline" />PARA A <span className="text-gold-premium glow-text-gold">GLÓRIA MUNDIAL</span>
      </h2>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md w-full mt-8 z-10 px-2">
        {[
          { label: "Dias", val: timeLeft.days },
          { label: "Horas", val: timeLeft.hours },
          { label: "Minutos", val: timeLeft.minutes },
          { label: "Segundos", val: timeLeft.seconds },
        ].map((unit) => (
          <div key={unit.label} className="glass-card bg-slate-950/40 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-premium/50 to-transparent"></div>
            <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tabular-nums drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
              {String(unit.val).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-gold-premium/80 tracking-widest uppercase mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider z-10 border-t border-white/5 pt-6 w-full max-w-lg">
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-gold-premium" />
          <span>Cidade do México &bull; Toronto &bull; Nova York</span>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isMapOpen && (
          <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
        )}
        {isTeamsOpen && (
          <TeamsModal isOpen={isTeamsOpen} onClose={() => setIsTeamsOpen(false)} />
        )}
        {isChampionsOpen && (
          <ChampionsModal isOpen={isChampionsOpen} onClose={() => setIsChampionsOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
