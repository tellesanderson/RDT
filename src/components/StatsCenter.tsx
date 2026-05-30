import { useMemo } from "react";
import { Round } from "../types/worldcup";
import MiniFlag from "./MiniFlag";
import { Activity, ShieldAlert, Award, TrendingUp, Goal, Flame, HelpCircle } from "lucide-react";

interface StatsCenterProps {
  rounds: Round[];
}

interface TeamStatsAggregate {
  name: string;
  code: string;
  scored: number;
  conceded: number;
  played: number;
}

export default function StatsCenter({ rounds }: StatsCenterProps) {
  // Compute dynamic stats from simulated matches
  const dynamicStats = useMemo(() => {
    const allMatches = rounds.flatMap((r) => r.matches);
    const playedMatches = allMatches.filter((m) => m.score1 !== null && m.score2 !== null);
    
    let totalGoals = 0;
    const teamMap: { [code: string]: TeamStatsAggregate } = {};

    playedMatches.forEach((m) => {
      const s1 = m.score1 as number;
      const s2 = m.score2 as number;
      totalGoals += s1 + s2;

      // Initialize team stats if not present
      if (!teamMap[m.team1.code]) {
        teamMap[m.team1.code] = { name: m.team1.name, code: m.team1.code, scored: 0, conceded: 0, played: 0 };
      }
      if (!teamMap[m.team2.code]) {
        teamMap[m.team2.code] = { name: m.team2.name, code: m.team2.code, scored: 0, conceded: 0, played: 0 };
      }

      // Add metrics
      teamMap[m.team1.code].played += 1;
      teamMap[m.team1.code].scored += s1;
      teamMap[m.team1.code].conceded += s2;

      teamMap[m.team2.code].played += 1;
      teamMap[m.team2.code].scored += s2;
      teamMap[m.team2.code].conceded += s1;
    });

    const teamList = Object.values(teamMap);

    // 1. Find Best Attack (most goals scored)
    let bestAttack: TeamStatsAggregate | null = null;
    if (teamList.length > 0) {
      bestAttack = teamList.reduce((prev, current) => (current.scored > prev.scored ? current : prev), teamList[0]);
    }

    // 2. Find Best Defense (fewest goals conceded, must have played at least 1 game)
    let bestDefense: TeamStatsAggregate | null = null;
    if (teamList.length > 0) {
      bestDefense = teamList.reduce((prev, current) => (current.conceded < prev.conceded ? current : prev), teamList[0]);
    }

    const averageGoals = playedMatches.length > 0 ? (totalGoals / playedMatches.length).toFixed(2) : "0.00";

    return {
      playedCount: playedMatches.length,
      totalGoals,
      averageGoals,
      bestAttack,
      bestDefense,
    };
  }, [rounds]);

  // Mock static interesting stats for premium look
  const staticStats = {
    yellowCards: 204,
    redCards: 11,
    fastestGoal: { player: "Rafael Leão", team: "Portugal", code: "POR", time: "28 segundos" },
    mostCleanSheets: { player: "Alisson Becker", team: "Brasil", code: "BRA", count: 4 },
  };

  return (
    <div className="w-full flex flex-col gap-6" id="stats-center-container">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-gold-premium" />
          <h2 className="text-lg font-black uppercase tracking-wider text-white">
            Painel de Estatísticas do Torneio
          </h2>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          MÉTRICAS DA SIMULAÇÃO
        </span>
      </div>

      {/* Top 4 Stat Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Matches */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">
            Partidas Simuladas
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-white tabular-nums">
              {dynamicStats.playedCount}
            </span>
            <span className="text-slate-600 text-xs font-bold">/ 104</span>
          </div>
          <span className="text-[7.5px] font-bold text-slate-600 uppercase tracking-wider block mt-2">
            Progresso Geral da Copa
          </span>
        </div>

        {/* Total Goals */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">
            Gols Marcados
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Goal className="text-neon-green" size={18} />
            <span className="text-2xl font-black text-white glow-text-gold tabular-nums">
              {dynamicStats.totalGoals}
            </span>
          </div>
          <span className="text-[7.5px] font-bold text-slate-600 uppercase tracking-wider block mt-2">
            Rede Balançada no Simulador
          </span>
        </div>

        {/* Avg Goals */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">
            Média de Gols
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Activity className="text-gold-premium animate-pulse" size={18} />
            <span className="text-2xl font-black text-white tabular-nums">
              {dynamicStats.averageGoals}
            </span>
          </div>
          <span className="text-[7.5px] font-bold text-slate-600 uppercase tracking-wider block mt-2">
            Gols por Jogo Simulados
          </span>
        </div>

        {/* Red Cards */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">
            Cartões Aplicados
          </span>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-black text-yellow-500 tabular-nums">
                {staticStats.yellowCards}
              </span>
              <span className="text-[8px] font-bold text-slate-600 uppercase">A</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-black text-red-500 tabular-nums">
                {staticStats.redCards}
              </span>
              <span className="text-[8px] font-bold text-slate-600 uppercase">V</span>
            </div>
          </div>
          <span className="text-[7.5px] font-bold text-slate-600 uppercase tracking-wider block mt-2">
            Estimativa Disciplinar
          </span>
        </div>

      </div>

      {/* Main Grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dynamic Simulation Honors */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex flex-col gap-4">
          <h3 className="text-xs font-black tracking-widest uppercase text-slate-400 border-b border-white/5 pb-2">
            Líderes de Equipes (Calculados no Simulador)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Best Attack */}
            <div className="glass-card bg-slate-950/40 p-4 border border-white/5 rounded-xl flex items-center justify-between">
              <div className="flex flex-col min-w-0">
                <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-wider">
                  Melhor Ataque
                </span>
                {dynamicStats.bestAttack ? (
                  <>
                    <h4 className="text-sm font-black text-white uppercase tracking-wide truncate mt-1">
                      {dynamicStats.bestAttack.name}
                    </h4>
                    <span className="text-[9px] font-black text-neon-green uppercase mt-0.5 tabular-nums">
                      {dynamicStats.bestAttack.scored} Gols Marcados
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-500 italic mt-1">Nenhum jogo simulado</span>
                )}
              </div>
              {dynamicStats.bestAttack && (
                <MiniFlag code={dynamicStats.bestAttack.code} className="w-10 h-7 rounded shadow" />
              )}
            </div>

            {/* Best Defense */}
            <div className="glass-card bg-slate-950/40 p-4 border border-white/5 rounded-xl flex items-center justify-between">
              <div className="flex flex-col min-w-0">
                <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-wider">
                  Melhor Defesa
                </span>
                {dynamicStats.bestDefense ? (
                  <>
                    <h4 className="text-sm font-black text-white uppercase tracking-wide truncate mt-1">
                      {dynamicStats.bestDefense.name}
                    </h4>
                    <span className="text-[9px] font-black text-gold-premium uppercase mt-0.5 tabular-nums">
                      {dynamicStats.bestDefense.conceded} Gols Sofridos
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-500 italic mt-1">Nenhum jogo simulado</span>
                )}
              </div>
              {dynamicStats.bestDefense && (
                <MiniFlag code={dynamicStats.bestDefense.code} className="w-10 h-7 rounded shadow" />
              )}
            </div>
          </div>
          
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">
            * O "Melhor Ataque" e "Melhor Defesa" são re-calculados dinamicamente em tempo real sempre que você altera qualquer placar na Central de Partidas ou Chaves.
          </span>
        </div>

        {/* Tournaments Curiosities */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex flex-col gap-4">
          <h3 className="text-xs font-black tracking-widest uppercase text-slate-400 border-b border-white/5 pb-2">
            Fatos & Curiosidades
          </h3>

          <div className="flex flex-col gap-3">
            {/* Clean sheet highlight */}
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <div className="flex items-center gap-3">
                <MiniFlag code={staticStats.mostCleanSheets.code} className="w-5 h-3.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-white uppercase tracking-wide">
                    {staticStats.mostCleanSheets.player}
                  </span>
                  <span className="text-[7.5px] font-bold text-slate-500 uppercase">
                    Mais Jogos Sem Sofrer Gols ({staticStats.mostCleanSheets.team})
                  </span>
                </div>
              </div>
              <span className="text-sm font-black text-gold-premium tabular-nums">
                {staticStats.mostCleanSheets.count}
              </span>
            </div>

            {/* Fastest goal */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <MiniFlag code={staticStats.fastestGoal.code} className="w-5 h-3.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-white uppercase tracking-wide">
                    {staticStats.fastestGoal.player}
                  </span>
                  <span className="text-[7.5px] font-bold text-slate-500 uppercase">
                    Gol Mais Rápido do Torneio ({staticStats.fastestGoal.team})
                  </span>
                </div>
              </div>
              <span className="text-xs font-black text-white uppercase tracking-wide">
                {staticStats.fastestGoal.time}
              </span>
            </div>
          </div>

          <div className="bg-slate-950/30 border border-white/5 p-3 rounded-xl flex gap-2 items-start mt-1">
            <ShieldAlert size={14} className="text-gold-premium shrink-0 mt-0.5" />
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
              Os dados de disciplina (cartões), goleiro menos vazado e gol mais rápido são estimativas projetadas para a Copa de 2026.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
