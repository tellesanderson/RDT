import { useState, useMemo, useEffect } from "react";
import { Trophy, Calendar, Award, Activity, Heart, Globe, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownHero from "./components/CountdownHero";
import MatchCenter from "./components/MatchCenter";
import StandingsGrid from "./components/StandingsGrid";
import { mockWorldCupData } from "./data/mockWorldCup";
import { calculateStandings } from "./utils/standingsCalculator";
import { Round } from "./types/worldcup";

export default function App() {
  const [rounds, setRounds] = useState<Round[]>(mockWorldCupData.rounds);
  const [activeTab, setActiveTab] = useState<"partidas" | "chaves">("partidas");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("rdt-theme");
    return (stored as "light" | "dark") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("rdt-theme", theme);
  }, [theme]);

  // Flat-map matches to calculate standings
  const allMatches = useMemo(() => {
    return rounds.flatMap((round) => round.matches);
  }, [rounds]);

  // Compute standings on the fly
  const standings = useMemo(() => {
    return calculateStandings(allMatches);
  }, [allMatches]);

  // Calculate quick stats for header metrics
  const stats = useMemo(() => {
    const total = allMatches.length;
    const played = allMatches.filter((m) => m.score1 !== null && m.score2 !== null).length;
    const goals = allMatches.reduce((acc, m) => {
      if (m.score1 !== null && m.score2 !== null) {
        return acc + m.score1 + m.score2;
      }
      return acc;
    }, 0);
    return { total, played, goals };
  }, [allMatches]);

  // Handle score simulations
  const handleMatchScoreChange = (
    roundIdx: number,
    matchIdx: number,
    score1: number | null,
    score2: number | null
  ) => {
    setRounds((prevRounds) => {
      const updated = [...prevRounds];
      updated[roundIdx] = {
        ...updated[roundIdx],
        matches: [...updated[roundIdx].matches],
      };
      updated[roundIdx].matches[matchIdx] = {
        ...updated[roundIdx].matches[matchIdx],
        score1,
        score2,
      };
      return updated;
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-transparent">
      
      {/* Stadium Grid Ambient Lights */}
      <div className="grid-glow-bg pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-premium/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-gold-premium/30 flex items-center justify-center shadow-lg relative overflow-hidden">
              <Trophy size={18} className="text-gold-premium" />
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-neon-green" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-1.5 leading-none">
              Radar da Torcida
              <span className="text-[8px] bg-gold-premium/15 text-gold-premium px-1.5 py-0.5 rounded border border-gold-premium/20 font-black">
                MUNDIAL
              </span>
            </h1>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
              Painel de Simulação 2026
            </span>
          </div>
        </div>

        {/* Controls & Metrics */}
        <div className="flex items-center gap-3">
          {/* Global Live Stats */}
          <div className="hidden sm:flex items-center gap-4 bg-white/5 border border-white/5 pl-4 pr-5 py-1.5 rounded-2xl">
            <div className="text-left border-r border-white/10 pr-4">
              <span className="text-[8px] text-slate-500 font-bold block uppercase leading-none">Partidas Simuladas</span>
              <span className="text-xs font-black text-white block mt-0.5 tabular-nums">
                {stats.played} <span className="text-[9px] text-slate-500">/ {stats.total}</span>
              </span>
            </div>
            <div className="text-left">
              <span className="text-[8px] text-slate-500 font-bold block uppercase leading-none">Total de Gols</span>
              <span className="text-xs font-black text-gold-premium block mt-0.5 tabular-nums flex items-center gap-1">
                <Activity size={10} className="text-neon-green animate-pulse" />
                {stats.goals}
              </span>
            </div>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-gold-premium/30 transition-all cursor-pointer"
            title={theme === "light" ? "Mudar para Modo Escuro" : "Mudar para Modo Claro"}
            id="theme-toggle-button"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.div
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  key="moon"
                >
                  <Moon size={18} className="text-gold-premium" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  key="sun"
                >
                  <Sun size={18} className="text-gold-premium" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8 relative z-10">
        
        {/* Countdown Hero Banner */}
        <section aria-labelledby="countdown-title">
          <CountdownHero />
        </section>

        {/* Tab Navigator */}
        <div className="flex p-1 bg-slate-900/60 border border-white/5 rounded-2xl relative shadow-inner max-w-md w-full mx-auto">
          <button
            onClick={() => setActiveTab("partidas")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
              activeTab === "partidas"
                ? "bg-gold-premium text-slate-950 shadow-lg font-black"
                : "text-slate-400 hover:text-white"
            }`}
            id="tab-partidas"
          >
            <Calendar size={13} />
            Partidas & Simulador
          </button>
          <button
            onClick={() => setActiveTab("chaves")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
              activeTab === "chaves"
                ? "bg-gold-premium text-slate-950 shadow-lg font-black"
                : "text-slate-400 hover:text-white"
            }`}
            id="tab-chaves"
          >
            <Award size={13} />
            Classificação
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === "partidas" ? (
              <motion.div
                key="partidas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <MatchCenter 
                  rounds={rounds} 
                  onMatchScoreChange={handleMatchScoreChange} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="chaves"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <StandingsGrid standings={standings} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-white/5 mt-auto bg-slate-950/40 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Globe size={11} />
            <span>Radar da Torcida 2026</span>
            <span className="text-gold-premium">&bull;</span>
            <span className="text-slate-400 font-normal">Plataforma Independente de Estatísticas</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart size={10} className="text-red-500 fill-red-500/20" />
            <span>para torcedores de elite</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
