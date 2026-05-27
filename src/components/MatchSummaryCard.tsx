import React from "react";
import { MatchData } from "../mocks/mockData";
import { ClubBadge } from "./ClubBadge";
import { Sparkles, AlertTriangle, Flame, TrendingUp, TrendingDown } from "lucide-react";

interface MatchSummaryCardProps {
  data: MatchData;
  selectedClubId: string;
}

export const MatchSummaryCard: React.FC<MatchSummaryCardProps> = ({ data, selectedClubId }) => {
  const { match_info, teams, highlights_1_minuto } = data;

  return (
    <div className="w-full rounded-3xl glass-panel p-5 shadow-2xl relative overflow-hidden border border-white/5">
      {/* Dynamic Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-club-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-club-accent/5 blur-3xl pointer-events-none" />

      {/* Tournament Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {match_info.tournament}
        </span>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-club-primary/10 text-club-accent text-[9px] font-black uppercase tracking-wider border border-club-primary/20">
          <Flame size={10} className="animate-pulse" />
          Finalizado
        </div>
      </div>

      {/* Scoreboard Row */}
      <div className="flex items-center justify-between py-4 px-1 relative">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <ClubBadge 
              clubId={teams.home.id.replace("team_", "").toLowerCase()} 
              size={54} 
              className="relative z-10 transition-transform group-hover:scale-105" 
            />
          </div>
          <span className="text-[10px] font-black text-white mt-3 tracking-widest uppercase truncate max-w-[85px]">
            {teams.home.name}
          </span>
        </div>

        {/* Score and vs Divider */}
        <div className="flex items-center justify-center gap-4 bg-slate-950/80 border border-white/5 px-5 py-2.5 rounded-2xl shadow-inner">
          <span className="text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
            {teams.home.score}
          </span>
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">x</span>
          <span className="text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
            {teams.away.score}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <ClubBadge 
              clubId={teams.away.id.replace("team_", "").toLowerCase()} 
              size={54} 
              className="relative z-10 transition-transform group-hover:scale-105" 
            />
          </div>
          <span className="text-[10px] font-black text-white mt-3 tracking-widest uppercase truncate max-w-[85px]">
            {teams.away.name}
          </span>
        </div>
      </div>

      {/* Goals Timeline Section */}
      <div className="mt-6 bg-slate-950/40 rounded-2xl p-4 border border-white/5">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 text-center">
          Cronologia de Gols
        </h3>
        
        {highlights_1_minuto.goals.length > 0 ? (
          <div className="relative flex flex-col items-center my-2">
            {/* Vertical timeline line */}
            <div className="absolute top-2 bottom-2 w-0.5 bg-slate-900 border-l border-white/5" />
            
            {highlights_1_minuto.goals.map((goal, idx) => {
              const isHome = goal.team === "home";
              return (
                <div key={idx} className="relative w-full grid grid-cols-2 gap-8 my-2.5 items-center z-10">
                  {/* Left (Home goal) */}
                  <div className={`text-right flex items-center justify-end gap-2.5 pr-2 ${isHome ? "opacity-100" : "opacity-0 select-none pointer-events-none"}`}>
                    <span className="text-xs font-black text-slate-100 truncate">{goal.player}</span>
                    <span className="text-[8px] font-black bg-club-primary/10 border border-club-primary/20 text-club-accent px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0">⚽ GOL</span>
                  </div>
                  
                  {/* Center Node (Minute) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center shadow-lg">
                      <span className="text-[9px] font-black text-club-accent">{goal.minute}&apos;</span>
                    </div>
                  </div>
                  
                  {/* Right (Away goal) */}
                  <div className={`text-left flex items-center justify-start gap-2.5 pl-2 ${!isHome ? "opacity-100" : "opacity-0 select-none pointer-events-none"}`}>
                    <span className="text-[8px] font-black bg-club-primary/10 border border-club-primary/20 text-club-accent px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0">⚽ GOL</span>
                    <span className="text-xs font-black text-slate-100 truncate">{goal.player}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider text-center py-2">
            Nenhum gol marcado nesta partida.
          </p>
        )}
      </div>

      {/* Editorial Positivo / Negativo */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Destaque Positivo */}
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-950/15 border border-emerald-500/10">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <TrendingUp size={15} />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
              {highlights_1_minuto.editorial_positive.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 font-semibold leading-relaxed">
              {highlights_1_minuto.editorial_positive.description}
            </p>
          </div>
        </div>

        {/* Destaque Negativo */}
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-rose-950/15 border border-rose-500/10">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <TrendingDown size={15} />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest">
              {highlights_1_minuto.editorial_negative.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 font-semibold leading-relaxed">
              {highlights_1_minuto.editorial_negative.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
