import { useState, useMemo, useEffect } from "react";
import { Trophy, Calendar, Award, Activity, Heart, Globe, Sun, Moon, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownHero from "./components/CountdownHero";
import MatchCenter from "./components/MatchCenter";
import StandingsGrid from "./components/StandingsGrid";
import KnockoutBracket from "./components/KnockoutBracket";
import TopScorers from "./components/TopScorers";
import StatsCenter from "./components/StatsCenter";
import { mockWorldCupData } from "./data/mockWorldCup";
import { calculateStandings } from "./utils/standingsCalculator";
import { resolveAllRounds } from "./utils/playoffResolver";
import { Round } from "./types/worldcup";

export default function App() {
  // Load rounds from localStorage or default to mock data
  const [rounds, setRounds] = useState<Round[]>(() => {
    const stored = localStorage.getItem("rdt-rounds");
    return stored ? JSON.parse(stored) : mockWorldCupData.rounds;
  });

  // Load penalty winners from localStorage
  const [knockoutWinners, setKnockoutWinners] = useState<{ [matchNum: number]: 1 | 2 }>(() => {
    const stored = localStorage.getItem("rdt-knockout-winners");
    return stored ? JSON.parse(stored) : {};
  });

  const [activeTab, setActiveTab] = useState<"partidas" | "grupos" | "mata-mata" | "artilharia" | "estatisticas">("partidas");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("rdt-theme");
    return (stored as "light" | "dark") || "light";
  });

  // Sync rounds to localStorage
  useEffect(() => {
    localStorage.setItem("rdt-rounds", JSON.stringify(rounds));
  }, [rounds]);

  // Sync knockout winners to localStorage
  useEffect(() => {
    localStorage.setItem("rdt-knockout-winners", JSON.stringify(knockoutWinners));
  }, [knockoutWinners]);

  // Sync theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("rdt-theme", theme);
  }, [theme]);

  // Compute standings on the fly from group stage matches
  const standings = useMemo(() => {
    // Only pass matches from rounds that represent group stages (Rodada 1, 2, 3 in portuguese translation)
    const groupMatches = rounds
      .filter((round) => round.name.startsWith("Rodada "))
      .flatMap((round) => round.matches);
    return calculateStandings(groupMatches);
  }, [rounds]);

  // Resolve playoff teams dynamically
  const resolvedRounds = useMemo(() => {
    return resolveAllRounds(rounds, standings, knockoutWinners);
  }, [rounds, standings, knockoutWinners]);

  // Calculate stats based on resolved matches (so playoffs are counted too)
  const allMatches = useMemo(() => {
    return resolvedRounds.flatMap((round) => round.matches);
  }, [resolvedRounds]);

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

  // Handle selecting winner in tiebreak
  const handleSelectKnockoutWinner = (matchNum: number, winnerNum: 1 | 2) => {
    setKnockoutWinners((prev) => ({
      ...prev,
      [matchNum]: winnerNum,
    }));
  };

  // Reset simulation back to defaults
  const handleResetSimulation = () => {
    if (window.confirm("Deseja realmente limpar toda a sua simulação?")) {
      setRounds(mockWorldCupData.rounds);
      setKnockoutWinners({});
      localStorage.removeItem("rdt-rounds");
      localStorage.removeItem("rdt-knockout-winners");
    }
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

          {/* Reset Simulation Button */}
          <button
            onClick={handleResetSimulation}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
            title="Limpar toda a simulação"
            id="reset-simulation-button"
          >
            <RotateCcw size={16} />
          </button>

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
        <div className="flex flex-wrap p-1 bg-slate-900/60 border border-white/5 rounded-2xl relative shadow-inner max-w-3xl w-full mx-auto justify-between gap-1">
          <button
            onClick={() => setActiveTab("partidas")}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
              activeTab === "partidas"
                ? "bg-gold-premium text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white"
            }`}
            id="tab-partidas"
          >
            <Calendar size={12} />
            Simulador
          </button>
          <button
            onClick={() => setActiveTab("grupos")}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
              activeTab === "grupos"
                ? "bg-gold-premium text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white"
            }`}
            id="tab-grupos"
          >
            <Trophy size={12} />
            Grupos
          </button>
          <button
            onClick={() => setActiveTab("mata-mata")}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
              activeTab === "mata-mata"
                ? "bg-gold-premium text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white"
            }`}
            id="tab-mata-mata"
          >
            <Award size={12} />
            Mata-Mata
          </button>
          <button
            onClick={() => setActiveTab("artilharia")}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
              activeTab === "artilharia"
                ? "bg-gold-premium text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white"
            }`}
            id="tab-artilharia"
          >
            <Activity size={12} />
            Artilharia
          </button>
          <button
            onClick={() => setActiveTab("estatisticas")}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
              activeTab === "estatisticas"
                ? "bg-gold-premium text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white"
            }`}
            id="tab-estatisticas"
          >
            <Globe size={12} />
            Estatísticas
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === "partidas" && (
              <motion.div
                key="partidas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <MatchCenter 
                  rounds={resolvedRounds} 
                  onMatchScoreChange={handleMatchScoreChange} 
                />
              </motion.div>
            )}
            
            {activeTab === "grupos" && (
              <motion.div
                key="grupos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <StandingsGrid standings={standings} />
              </motion.div>
            )}

            {activeTab === "mata-mata" && (
              <motion.div
                key="mata-mata"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <KnockoutBracket
                  rounds={resolvedRounds}
                  knockoutWinners={knockoutWinners}
                  onMatchScoreChange={handleMatchScoreChange}
                  onSelectKnockoutWinner={handleSelectKnockoutWinner}
                />
              </motion.div>
            )}

            {activeTab === "artilharia" && (
              <motion.div
                key="artilharia"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <TopScorers />
              </motion.div>
            )}

            {activeTab === "estatisticas" && (
              <motion.div
                key="estatisticas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <StatsCenter rounds={resolvedRounds} />
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
